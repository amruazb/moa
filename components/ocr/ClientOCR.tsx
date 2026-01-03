"use client"

import { useState, useCallback } from 'react'
import Tesseract from 'tesseract.js'
import { DocumentType } from '@/lib/ocr/types'

interface ClientOCRProps {
  documentType: DocumentType
  onExtracted: (data: any) => void
  imageFile: File
  onCancel: () => void
}

export function ClientOCR({ documentType, onExtracted, imageFile, onCancel }: ClientOCRProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')
  const [currentLanguage, setCurrentLanguage] = useState<'eng' | 'ara'>('eng')
  const [error, setError] = useState<string | null>(null)

  const processOCR = useCallback(async () => {
    try {
      setStatus('Preparing image...')
      
      // Resize image to speed up processing
      const resizedImage = await resizeImage(imageFile, 1200)
      
      // Process English
      setCurrentLanguage('eng')
      setStatus('Scanning English text...')
      const englishText = await runClientOCR(resizedImage, 'eng', (p) => {
        setProgress(p * 0.5) // 0-50%
      })
      
      // Process Arabic
      setCurrentLanguage('ara')
      setStatus('Scanning Arabic text...')
      const arabicText = await runClientOCR(resizedImage, 'ara', (p) => {
        setProgress(50 + (p * 0.5)) // 50-100%
      })
      
      setStatus('Extracting data...')
      setProgress(100)
      
      // Send extracted text to server for parsing
      const response = await fetch('/api/ocr/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          englishText,
          arabicText,
          documentType
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to parse extracted text')
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        onExtracted(result.data)
      } else {
        throw new Error(result.error || 'Failed to extract data')
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR processing failed')
    }
  }, [documentType, imageFile, onExtracted])

  // Start processing on mount
  useState(() => {
    processOCR()
  })

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-4">
          Processing Document
        </h3>
        
        {error ? (
          <>
            <div className="text-red-600 mb-4">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
            <button
              onClick={onCancel}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{status}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                {currentLanguage === 'eng' ? '🔤 English' : '🔤 العربية'} • Processing in browser (no timeout)
              </div>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress > 0 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>English scan {progress >= 50 ? '✓' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Arabic scan {progress >= 100 ? '✓' : ''}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span>Data extraction</span>
              </div>
            </div>
            
            <button
              onClick={onCancel}
              className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}

async function runClientOCR(
  imageBlob: Blob,
  language: 'eng' | 'ara',
  onProgress: (progress: number) => void
): Promise<string> {
  const worker = await Tesseract.createWorker(language, 1, {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        onProgress(m.progress)
      }
    },
    // Use CDN for client-side (works in browser)
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@4.1.4/dist/worker.min.js',
    corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@4.0.4/tesseract-core.wasm.js'
  })
  
  const { data: { text } } = await worker.recognize(imageBlob)
  await worker.terminate()
  
  return text
}

async function resizeImage(file: File, maxWidth: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    img.onload = () => {
      let width = img.width
      let height = img.height
      
      // Only resize if image is larger than max width
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      
      canvas.width = width
      canvas.height = height
      
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to resize image'))
        }
      }, file.type, 0.9)
    }
    
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}
