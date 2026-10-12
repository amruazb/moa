'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  generateAdnocLetter,
  extractAdnocLetterContext,
  sampleAdnocLetterData,
  AdnocLetterData,
} from '@/lib/adnoc_letter'
import { useFormattingStore } from '@/store/formattingStore'
import { FormattingToolbar } from './workspace/FormattingToolbar'

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200'

export function AdnocLetterWorkspace() {
  const settings = useFormattingStore(state => state.settings)
  const initializeFormattingFromCache = useFormattingStore(state => state.initializeFromCache)

  const [formData, setFormData] = useState<AdnocLetterData>(sampleAdnocLetterData)

  useEffect(() => {
    initializeFormattingFromCache()
  }, [initializeFormattingFromCache])

  const handleChange = (field: keyof AdnocLetterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const context = useMemo(() => extractAdnocLetterContext(formData), [formData])
  const htmlContent = useMemo(() => generateAdnocLetter(context, settings), [context, settings])

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => printWindow.print(), 250)
    }
  }

  return (
    <div className="flex gap-6 items-start">
      <div className="w-[480px] flex-shrink-0">
        <FormattingToolbar />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4 mt-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-sm font-semibold text-gray-900">ADNOC Declaration Letter</h2>
          </div>

          <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
            <h3 className="font-semibold text-teal-900 mb-1">Document Type</h3>
            <p className="text-sm text-teal-800">
              Declaration and undertaking of not working in ADNOC and its group of companies.
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Date</label>
            <input
              className={inputClass}
              value={formData.date ?? ''}
              onChange={e => handleChange('date', e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Name (Arabic)</label>
            <input
              dir="rtl"
              className={`${inputClass} text-right`}
              value={formData.name ?? ''}
              onChange={e => handleChange('name', e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Emirates ID Number</label>
            <input
              className={inputClass}
              value={formData.eidNumber ?? ''}
              onChange={e => handleChange('eidNumber', e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">Company Name (Arabic)</label>
            <textarea
              dir="rtl"
              className={`${inputClass} resize-y min-h-[60px] text-right`}
              rows={2}
              value={formData.companyName ?? ''}
              onChange={e => handleChange('companyName', e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 block mb-1">License Number</label>
            <input
              className={inputClass}
              value={formData.companyNumber ?? ''}
              onChange={e => handleChange('companyNumber', e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs text-gray-500 block">Signature Spacing</label>
              <span className="text-xs font-medium text-teal-600">{formData.signatureSpacing ?? 80}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="200"
              step="10"
              className="w-full accent-teal-600"
              value={formData.signatureSpacing ?? 80}
              onChange={e => handleChange('signatureSpacing', Number(e.target.value) as any)}
            />
          </div>

          <button
            onClick={handlePrint}
            className="w-full px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Document
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="sticky top-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-sm font-semibold text-white">Live Preview</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50">
              <iframe
                srcDoc={htmlContent}
                className="w-full h-[800px] bg-white rounded border border-gray-300"
                title="ADNOC Declaration Letter Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
