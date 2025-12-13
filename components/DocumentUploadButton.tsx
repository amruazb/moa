'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Loader2, FileType, CheckCircle } from 'lucide-react'
import { processDocument } from '@/lib/documentProcessor'
import { DocumentData } from '@/store/documentStore'
import toast from 'react-hot-toast'

interface DocumentUploadButtonProps {
    type: 'companyLicense' | 'partyDocument'
    partyIndex?: number
    label: string
    onDataExtracted: (data: any) => void
    onFileSelect: (file: File) => void
    currentFile?: File | null
}

export const DocumentUploadButton = ({
    type,
    partyIndex,
    label,
    onDataExtracted,
    onFileSelect,
    currentFile
}: DocumentUploadButtonProps) => {
    const [isProcessing, setIsProcessing] = useState(false)

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (!file) return

        onFileSelect(file)
        setIsProcessing(true)

        try {
            const extractedData = await processDocument(file, type, partyIndex)
            onDataExtracted(extractedData)
            toast.success('Document processed successfully')
        } catch (error) {
            console.error(error)
            toast.error('Failed to process document')
        } finally {
            setIsProcessing(false)
        }
    }, [type, partyIndex, onFileSelect, onDataExtracted])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
            // 'application/pdf': ['.pdf'] // Add back when PDF support is ready
        },
        multiple: false
    })

    return (
        <div className="mb-4">
            <div
                {...getRootProps()}
                className={`
          relative border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}
          ${currentFile ? 'bg-green-50 border-green-300' : ''}
        `}
            >
                <input {...getInputProps()} />

                <div className="flex items-center justify-center gap-3">
                    {isProcessing ? (
                        <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
                    ) : currentFile ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                    )}

                    <div className="text-sm">
                        <div className="font-medium text-gray-700">
                            {isProcessing ? 'Processing OCR...' : currentFile ? currentFile.name : label}
                        </div>
                        {!isProcessing && !currentFile && (
                            <div className="text-gray-500 text-xs">
                                Drag & drop or click to upload (JPG/PNG)
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
