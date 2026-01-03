"use client"

import { useState, useCallback, useRef } from 'react'
import { DocumentType } from '@/lib/ocr/types'
import dynamic from 'next/dynamic'

// Dynamically import ClientOCR to avoid SSR issues
const ClientOCR = dynamic(() => import('./ClientOCR').then(mod => ({ default: mod.ClientOCR })), {
  ssr: false
})

interface OCRUploadProps {
  documentType: DocumentType
  onExtracted: (data: any) => void
  label: string
  description?: string
}

export function OCRUpload({ documentType, onExtracted, label, description }: OCRUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [useClientOCR, setUseClientOCR] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true)
    setError(null)
    setSuccess(false)
    setUploadedFile(file)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Compress/resize image for faster processing
      const optimizedFile = await optimizeImage(file)

      // Send to API for OCR processing
      const formData = new FormData()
      formData.append('file', optimizedFile)
      formData.append('documentType', documentType)

      // Timeout based on Vercel plan (10s for Free, 60s for Pro)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 9000) // 9s to be safe

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        // Handle timeout (504) and other errors
        if (response.status === 504) {
          throw new Error('TIMEOUT')
        }
        
        // Try to parse JSON error, fallback to status text
        let errorMessage = 'OCR processing failed'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // Response is not JSON (likely HTML error page)
          errorMessage = `Server error (${response.status}): ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()

      if (result.success && result.data) {
        onExtracted(result.data)
        setSuccess(true)
        setError(null)
      } else {
        setError(result.error || 'Failed to extract data from document')
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError' || err.message === 'TIMEOUT') {
          // Offer client-side OCR as fallback
          setError('SERVER_TIMEOUT')
        } else {
          setError(err.message)
        }
      } else {
        setError('Processing failed')
      }
    } finally {
      setIsProcessing(false)
    }
  }, [documentType, onExtracted])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }, [processFile])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }, [processFile])

  const clearUpload = () => {
    setPreview(null)
    setError(null)
    setSuccess(false)
    setUseClientOCR(false)
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Switch to client-side OCR
  const tryClientOCR = () => {
    if (uploadedFile) {
      setUseClientOCR(true)
      setError(null)
    }
  }

  // If using client OCR, render that component
  if (useClientOCR && uploadedFile) {
    return (
      <ClientOCR
        documentType={documentType}
        onExtracted={(data) => {
          onExtracted(data)
          setSuccess(true)
          setUseClientOCR(false)
        }}
        imageFile={uploadedFile}
        onCancel={() => {
          setUseClientOCR(false)
          clearUpload()
        }}
      />
    )
  }

  const getIcon = () => {
    switch (documentType) {
      case 'emirates_id':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        )
      case 'passport':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'trade_certificate':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
          {getIcon()}
          <span>{label}</span>
        </div>
        {preview && (
          <button
            onClick={clearUpload}
            className="text-xs text-gray-500 hover:text-red-500"
          >
            Clear
          </button>
        )}
      </div>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      
      {/* Helpful tip for better results */}
      {!preview && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          💡 Tip: Use clear, well-lit photos for best results (auto-compresses to 800px)
        </p>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`
          relative border-2 border-dashed rounded-lg p-4 transition-all cursor-pointer
          ${isProcessing ? 'border-blue-400 bg-blue-50' : ''}
          ${success ? 'border-green-400 bg-green-50' : ''}
          ${error ? 'border-red-400 bg-red-50' : ''}
          ${!isProcessing && !success && !error ? 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50' : ''}
        `}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {preview ? (
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="Document preview"
              className="w-16 h-12 object-cover rounded border"
            />
            <div className="flex-1 min-w-0">
              {isProcessing && (
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing with OCR...
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 text-xs text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Data extracted successfully!
                </div>
              )}
              {error && error !== 'SERVER_TIMEOUT' && (
                <div className="text-xs text-red-600">{error}</div>
              )}
              {error === 'SERVER_TIMEOUT' && (
                <div className="space-y-2">
                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-300 rounded px-2 py-1">
                    ⏱️ Server timeout: OCR took &gt;10s (Vercel Free tier limit)
                  </div>
                  <button
                    onClick={tryClientOCR}
                    className="w-full text-xs bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 font-medium"
                  >
                    🚀 Try Browser OCR (No timeout, runs locally)
                  </button>
                  <p className="text-xs text-gray-500">
                    Or: Take clearer photo • Upgrade to Pro plan
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <svg className="mx-auto w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-1 text-xs text-gray-500">
              Drop image or <span className="text-blue-600">browse</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Optimize image for faster OCR processing
async function optimizeImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    img.onload = () => {
      let width = img.width
      let height = img.height
      
      // More aggressive compression for Vercel Free tier (must finish in <10s)
      const maxWidth = 800  // Reduced from 1200
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw with slight quality reduction for faster processing
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob((blob) => {
        if (blob) {
          // Create new File object
          const optimizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now()
          })
          resolve(optimizedFile)
        } else {
          // If optimization fails, use original
          resolve(file)
        }
      }, file.type, 0.75) // 75% quality - more aggressive compression
    }
    
    img.onerror = () => {
      // If image load fails, use original
      resolve(file)
    }
    
    img.src = URL.createObjectURL(file)
  })
}
