"use client"

import { useDocumentStore } from '@/store/documentStore'
import { useFormattingStore } from '@/store/formattingStore'
import { generateMOAHTML } from '@/lib/moaGenerator'
import { useRef } from 'react'

export function LivePreviewPane() {
  const { extractedData } = useDocumentStore()
  const { settings } = useFormattingStore()
  const previewRef = useRef<HTMLDivElement>(null)
  
  // Generate HTML on every update with formatting settings
  const htmlContent = generateMOAHTML(extractedData, settings)

  const generatePDF = async () => {
    if (!previewRef.current) return
    
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default
      
      // Clone the element for PDF generation
      const clone = previewRef.current.cloneNode(true) as HTMLElement
      
      // Create a wrapper with proper styling for PDF
      const wrapper = document.createElement('div')
      wrapper.style.position = 'absolute'
      wrapper.style.left = '-9999px'
      wrapper.style.top = '0'
      wrapper.style.width = '190mm'
      wrapper.appendChild(clone)
      document.body.appendChild(wrapper)
      
      // Apply PDF-specific styles to fix width issues
      const docElements = clone.querySelectorAll('.doc')
      docElements.forEach((el) => {
        (el as HTMLElement).style.width = '100%';
        (el as HTMLElement).style.maxWidth = '100%';
        (el as HTMLElement).style.boxShadow = 'none';
      })
      
      const pageElements = clone.querySelectorAll('.page')
      pageElements.forEach((el) => {
        (el as HTMLElement).style.width = '100%';
        (el as HTMLElement).style.maxWidth = '100%';
        (el as HTMLElement).style.padding = '5mm';
        (el as HTMLElement).style.minHeight = 'auto';
      })
      
      // Fix bilingual blocks to prevent overflow
      const bilingualElements = clone.querySelectorAll('.bilingual')
      bilingualElements.forEach((el) => {
        (el as HTMLElement).style.width = '100%';
        (el as HTMLElement).style.maxWidth = '100%';
        (el as HTMLElement).style.overflow = 'hidden';
      })
      
      const blockElements = clone.querySelectorAll('.block')
      blockElements.forEach((el) => {
        (el as HTMLElement).style.overflow = 'hidden';
        (el as HTMLElement).style.wordWrap = 'break-word';
      })
      
      clone.style.maxHeight = 'none'
      clone.style.overflow = 'visible'
      clone.style.width = '100%'
      
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `MOA_${extractedData.company?.name || 'document'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
          logging: false,
          width: 718, // 190mm at 96dpi
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as const
        },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['tr', 'td', '.block'] }
      }
      
      await html2pdf().set(opt).from(clone).save()
      
      // Clean up
      document.body.removeChild(wrapper)
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('PDF generation failed. Please try again.')
    }
  }

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
            onClick={generatePDF}
            className="px-3 py-1.5 text-xs font-medium bg-white text-slate-700 rounded-lg border border-slate-300 hover:border-slate-400 transition"
          >
            PDF
          </button>
        </div>
      </div>
      {/* Preview Content */}
      <div 
        ref={previewRef}
        className="overflow-y-auto max-h-[calc(100vh-180px)] p-4 bg-white"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  )
}
