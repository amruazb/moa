"use client"

import { useDocumentStore } from '@/store/documentStore'
import { generateMOAHTML } from '@/lib/moaGenerator'

export function LivePreviewPane() {
  const { extractedData } = useDocumentStore()
  
  // Generate HTML on every update
  const htmlContent = generateMOAHTML(extractedData)

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Live Preview</h3>
            <p className="text-[11px] text-slate-500">Auto-updates as you edit</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const printWindow = window.open('', '_blank')
              if (printWindow) {
                printWindow.document.write(htmlContent)
                printWindow.document.close()
                setTimeout(() => printWindow.print(), 500)
              }
            }}
            className="px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Print
          </button>
          <button 
            onClick={() => {
              const blob = new Blob([htmlContent], { type: 'text/html' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `MOA_${extractedData.company?.name || 'document'}.html`
              a.click()
              URL.revokeObjectURL(url)
            }}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition"
          >
            HTML
          </button>
          <button 
            onClick={async () => {
              try {
                const res = await fetch('/api/generate-document', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ data: extractedData, format: 'pdf' })
                })
                if (res.ok) {
                  const blob = await res.blob()
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement('a')
                  a.href = url
                  a.download = `MOA_${extractedData.company?.name || 'document'}.pdf`
                  a.click()
                  URL.revokeObjectURL(url)
                } else {
                  alert('PDF generation not yet implemented.')
                }
              } catch (error) {
                console.error('PDF generation error:', error)
                alert('PDF generation failed')
              }
            }}
            className="px-3 py-1.5 text-xs font-medium bg-white text-slate-700 rounded-lg border border-slate-300 hover:border-slate-400 transition"
          >
            PDF
          </button>
        </div>
      </div>
      {/* Preview Content */}
      <div 
        className="overflow-y-auto max-h-[calc(100vh-180px)] p-4 bg-white"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
