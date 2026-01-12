'use client'

import { useEffect, useState, useRef } from 'react'
import { usePOAStore } from '@/store/poaStore'
import { generatePOAHTML } from '@/lib/poa'
import { useFormattingStore } from '@/store/formattingStore'

export function POALivePreviewPane() {
    const poaData = usePOAStore((state) => state.poaData)
    const fontSettings = useFormattingStore((state) => state.settings)
    const [htmlContent, setHtmlContent] = useState('')
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const html = generatePOAHTML(poaData, fontSettings)
        setHtmlContent(html)
    }, [poaData, fontSettings])

    const handlePrint = () => {
        const iframe = iframeRef.current
        if (iframe?.contentWindow) {
            iframe.contentWindow.print()
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header with Print Button */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <h2 className="text-sm font-semibold text-gray-900">POA Live Preview</h2>
                </div>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print / PDF
                </button>
            </div>

            {/* Preview Area */}
            <div className="h-[calc(100vh-180px)] overflow-auto bg-gray-100 p-4">
                <iframe
                    ref={iframeRef}
                    srcDoc={htmlContent}
                    className="w-full h-full bg-white shadow-lg"
                    title="POA Preview"
                    style={{ minHeight: '1200px' }}
                />
            </div>
        </div>
    )
}
