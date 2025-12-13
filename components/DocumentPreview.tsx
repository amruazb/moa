'use client'

import { useState, useEffect } from 'react'
import { useDocumentStore } from '@/store/documentStore'
import { Building, User, FileText, Download, Eye } from 'lucide-react'
import { generateDocument } from '@/lib/documentGenerator'

export const DocumentPreview = () => {
  const { language, extractedData, isProcessing, setProcessing } = useDocumentStore()
  const [progress, setProgress] = useState(0)
  const [previewData, setPreviewData] = useState({
    company: '',
    firstParty: '',
    secondParty: '',
    shares: '',
    preamble: ''
  })

  // Safe defaults
  const company = extractedData.company || { name: '', newName: '', licenseNumber: '', moaDate: '' }
  const firstParty = extractedData.firstParty || { name: '', eidNumber: '', dob: '', nationality: '' }
  const secondParty = extractedData.secondParty || { name: '', eidNumber: '', dob: '', nationality: '' }
  const oldMoa = extractedData.oldMoa || { notarizationNumber: '', notarizationDate: '', originalShares: { firstParty: 49, secondParty: 51 } }
  const shares = extractedData.shares || { firstParty: 0, secondParty: 100 }

  useEffect(() => {
    updatePreview()
  }, [extractedData, language])

  const updatePreview = () => {
    const firstPartyName = firstParty.name || '-'
    const secondPartyName = secondParty.name || '-'
    const companyName = company.name || '-'

    const shareText = `${shares.firstParty}% to ${shares.secondParty}%`

    let preamble = ''
    if (shares.secondParty === 100) {
      preamble = language === 'ar'
        ? `الطرف الأول، ${firstPartyName}، ينقل جميع أسهمه (${oldMoa.originalShares?.firstParty || shares.firstParty}%) في ${companyName} إلى الطرف الثاني، ${secondPartyName}، مجاناً. هذا النقل يحول الشركة من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة.`
        : `The First Party, ${firstPartyName}, hereby transfers all of their shares (${oldMoa.originalShares?.firstParty || shares.firstParty}%) in ${companyName} to the Second Party, ${secondPartyName}, free of cost. This transfer converts the company from LLC to SPC structure.`
    } else {
      preamble = language === 'ar'
        ? `اتفاقية نقل الأسهم بين ${firstPartyName} و ${secondPartyName} لتحويل ${companyName} من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة.`
        : `Share transfer agreement between ${firstPartyName} and ${secondPartyName} for the conversion of ${companyName} from LLC to SPC structure.`
    }

    setPreviewData({
      company: companyName,
      firstParty: firstPartyName,
      secondParty: secondPartyName,
      shares: shareText,
      preamble
    })
  }

  const handleProcessDocuments = async () => {
    setProcessing(true)
    setProgress(0)

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleGenerateDocument = async () => {
    try {
      setProcessing(true)
      const safeData = {
        company,
        firstParty,
        secondParty,
        oldMoa,
        shares
      }
      // Get conversion type from store
      const { conversionType } = useDocumentStore.getState()
      await generateDocument(safeData, language, conversionType)
    } catch (error) {
      console.error('Document generation failed:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleExportToWord = async () => {
    try {
      setProcessing(true)
      // This would implement actual Word export
      console.log('Exporting to Word...', extractedData)
    } catch (error) {
      console.error('Word export failed:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      {isProcessing && (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {language === 'ar' ? 'معالجة المستندات...' : 'Processing Documents...'}
          </h3>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {progress}% {language === 'ar' ? 'مكتمل' : 'complete'}
          </p>
        </div>
      )}

      {/* Document Preview */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Eye className="w-6 h-6 text-primary-500" />
          {language === 'ar' ? 'معاينة المستند' : 'Document Preview'}
        </h3>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-primary-500">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-primary-500" />
              <strong className="text-primary-600">
                {language === 'ar' ? 'الشركة:' : 'Company:'}
              </strong>
            </div>
            <span className="text-gray-800">{previewData.company}</span>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-primary-500">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary-500" />
              <strong className="text-primary-600">
                {language === 'ar' ? 'النوع:' : 'Type:'}
              </strong>
            </div>
            <span className="text-gray-800">
              {language === 'ar' ? 'تحويل من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة' : 'LLC to SPC Conversion'}
            </span>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-primary-500">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-primary-500" />
              <strong className="text-primary-600">
                {language === 'ar' ? 'الطرف الأول:' : 'First Party:'}
              </strong>
            </div>
            <span className="text-gray-800">{previewData.firstParty}</span>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-primary-500">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-primary-500" />
              <strong className="text-primary-600">
                {language === 'ar' ? 'الطرف الثاني:' : 'Second Party:'}
              </strong>
            </div>
            <span className="text-gray-800">{previewData.secondParty}</span>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-primary-500">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary-500" />
              <strong className="text-primary-600">
                {language === 'ar' ? 'نقل الأسهم:' : 'Share Transfer:'}
              </strong>
            </div>
            <span className="text-gray-800">{previewData.shares}</span>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-primary-500">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary-500" />
              <strong className="text-primary-600">
                {language === 'ar' ? 'المقدمة:' : 'Preamble:'}
              </strong>
            </div>
            <p className="text-gray-800 mt-2 leading-relaxed">
              {previewData.preamble}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={handleProcessDocuments}
            disabled={isProcessing}
            className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5" />
            {language === 'ar' ? 'معالجة المستندات' : 'Process Documents'}
          </button>

          <button
            onClick={handleGenerateDocument}
            disabled={isProcessing}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FileText className="w-5 h-5" />
            {language === 'ar' ? 'إنشاء المستند النهائي' : 'Generate Final Document'}
          </button>

          <button
            onClick={handleExportToWord}
            disabled={isProcessing}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            {language === 'ar' ? 'تصدير إلى Word' : 'Export to Word'}
          </button>
        </div>
      </div>
    </div>
  )
}
