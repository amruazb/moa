'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, Building, User, Users } from 'lucide-react'
import { useDocumentStore } from '@/store/documentStore'
import { processDocument } from '@/lib/documentProcessor'
import toast from 'react-hot-toast'

interface UploadAreaProps {
  type: 'oldMoa' | 'tradeLicense'
  title: string
  description: string
  icon: React.ReactNode
  acceptedTypes: string[]
}

const UploadArea = ({ type, title, description, icon, acceptedTypes }: UploadAreaProps) => {
  const { uploadedFiles, setUploadedFile, setExtractedData, language } = useDocumentStore()

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploadedFile(type, file)
    toast.success(`${title} uploaded successfully!`)

    try {
      const extractedData = await processDocument(file, type)
      setExtractedData(extractedData)
      toast.success('Data extracted successfully!')
    } catch (error) {
      toast.error('Failed to extract data from document')
      console.error('Document processing error:', error)
    }
  }, [type, title, setUploadedFile, setExtractedData])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    multiple: false
  })

  const isUploaded = uploadedFiles[type] !== null

  return (
    <div
      {...getRootProps()}
      className={`upload-area ${isUploaded ? 'active' : ''} ${isDragActive ? 'border-primary-600' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {icon}
        <p className="mt-2 font-medium text-gray-700">{title}</p>
        <small className="text-gray-500">
          {isUploaded ? `✓ ${uploadedFiles[type]?.name}` : description}
        </small>
      </div>
    </div>
  )
}

export const DocumentUpload = () => {
  const { language, extractedData, setExtractedData } = useDocumentStore()
  const shares = extractedData.shares || { source: [100], destination: [100] }

  const handleShareChange = (party: 'source' | 'destination', index: number, value: number) => {
    const newShares = { ...shares }
    newShares[party] = [...newShares[party]]
    newShares[party][index] = value

    setExtractedData({ shares: newShares })
  }

  return (
    <div className="space-y-6">
      {/* Document Upload Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'ar' ? 'رفع المستندات' : 'Document Upload'}
        </h2>

        <div className="space-y-4">
          <UploadArea
            type="oldMoa"
            title={language === 'ar' ? 'مذكرة التأسيس القديمة' : 'Old MOA'}
            description={language === 'ar' ? 'انقر لرفع PDF/DOCX' : 'Click to upload PDF/DOCX'}
            icon={<FileText className="w-8 h-8 text-primary-500" />}
            acceptedTypes={['application/pdf', '.docx', '.doc']}
          />

          <UploadArea
            type="tradeLicense"
            title={language === 'ar' ? 'رخصة تجارية جديدة' : 'New Trade License'}
            description={language === 'ar' ? 'انقر لرفع' : 'Click to upload'}
            icon={<Building className="w-8 h-8 text-primary-500" />}
            acceptedTypes={['application/pdf', 'image/jpeg', 'image/png']}
          />
        </div>
      </div>

      {/* Share Distribution Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {language === 'ar' ? 'توزيع الأسهم' : 'Share Distribution'}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {language === 'ar' ? 'توزيع الأسهم مصدر' : 'Source Share Distribution'}
            </label>
            <div className="text-sm text-gray-600">
              {language === 'ar' ? 'استخدم علامة التبويب "يدوي" لإدارة توزيع الأسهم التفصيلي' : 'Use the "Manual" tab to manage detailed share distribution'}
            </div>
          </div>

          <small className="text-gray-500">
            {language === 'ar' ? 'يجب أن يساوي المجموع 100%' : 'Total must equal 100%'}
          </small>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => {
            // Process documents logic
            toast.success('Processing documents...')
          }}
          className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          {language === 'ar' ? 'معالجة المستندات' : 'Process Documents'}
        </button>

        <button
          onClick={() => {
            if (confirm(language === 'ar' ? 'هل أنت متأكد من إعادة تعيين جميع البيانات؟' : 'Are you sure you want to reset all data?')) {
              window.location.reload()
            }
          }}
          className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
        </button>
      </div>
    </div>
  )
}
