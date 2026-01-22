'use client'

import { useMemo, useEffect } from 'react'
import { useLLCAmendmentMoaStore } from '@/store/llcAmendmentMoaStore'
import { useFormattingStore } from '@/store/formattingStore'
import { generateLLCAmendmentMOA } from '@/lib/llc_amendment_moa'

export function LLCAmendmentMoaLivePreviewPane() {
    const data = useLLCAmendmentMoaStore((state) => state.data)
    const { settings, initializeFromCache } = useFormattingStore()

    useEffect(() => {
        initializeFromCache()
    }, [initializeFromCache])

    const documentHtml = useMemo(() => {
        return generateLLCAmendmentMOA(data, settings)
    }, [data, settings])

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
            printWindow.document.write(documentHtml)
            printWindow.document.close()
            setTimeout(() => {
                printWindow.print()
            }, 500)
        }
    }

    const handleDownloadPDF = async () => {
        try {
            const response = await fetch('/api/generate-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    html: documentHtml,
                    filename: `LLC_Amendment_MOA_${data.company.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
                }),
            })

            if (response.ok) {
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.style.display = 'none'
                a.href = url
                a.download = `LLC_Amendment_MOA_${data.company.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
            }
        } catch (error) {
            console.error('Error generating PDF:', error)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Header with actions */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <h2 className="text-sm font-semibold text-gray-900">Live Preview</h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handlePrint}
                        className="px-3 py-1.5 text-xs bg-gray-50 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF
                    </button>
                </div>
            </div>

            {/* Preview iframe */}
            <div className="p-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50" style={{ height: '70vh' }}>
                    <iframe
                        srcDoc={documentHtml}
                        className="w-full h-full"
                        title="LLC Amendment MOA Preview"
                        style={{ border: 'none', transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }}
                    />
                </div>
            </div>
        </div>
    )
}
