"use client"

import { useDocumentStore } from '@/store/documentStore'
import { generateMOAHTML } from '@/lib/moaGenerator'

export function LivePreviewPane() {
  const { extractedData } = useDocumentStore()
  
  // Generate HTML on every update
  const htmlContent = generateMOAHTML(extractedData)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_20px_45px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Live Preview</h3>
          <p className="text-[11px] text-slate-500">Bilingual layout auto-updates as you edit.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              // Open in new window for printing
              const printWindow = window.open('', '_blank')
              if (printWindow) {
                printWindow.document.write(htmlContent)
                printWindow.document.close()
                // Wait for styles to load then print
                setTimeout(() => {
                  printWindow.print()
                }, 500)
              }
            }}
            className="px-3 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
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
            className="px-3 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 shadow-sm"
          >
            Download HTML
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
                  alert('PDF generation not yet implemented. Install puppeteer-core first.')
                }
              } catch (error) {
                console.error('PDF generation error:', error)
                alert('PDF generation failed')
              }
            }}
            className="px-3 py-2 text-xs font-semibold bg-white text-slate-800 rounded-lg border border-slate-200 hover:border-slate-400"
          >
            Download PDF
          </button>
        </div>
      </div>
      <div 
        className="overflow-y-auto max-h-[75vh] border rounded-xl p-4 bg-slate-50"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
