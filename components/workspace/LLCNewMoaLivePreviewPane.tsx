'use client'

import { useLLCNewMoaStore } from '@/store/llcNewMoaStore'
import { generateLLCNewMOA } from '@/lib/llc_new_moa'
import { useFormattingStore } from '@/store/formattingStore'
import { useMemo, useEffect, useRef, useState, useCallback } from 'react'

export function LLCNewMoaLivePreviewPane() {
    const data = useLLCNewMoaStore((state) => state.data)
    const { settings, initializeFromCache } = useFormattingStore()
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const editModeRef = useRef(false)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        initializeFromCache()
    }, [initializeFromCache])

    const documentHtml = useMemo(() => {
        return generateLLCNewMOA(data, settings)
    }, [data, settings])

    // Push new HTML into iframe only when NOT in edit mode
    useEffect(() => {
        if (editModeRef.current) return
        const iframe = iframeRef.current
        if (!iframe) return
        iframe.srcdoc = documentHtml
    }, [documentHtml])

    const toggleEditMode = useCallback(() => {
        const iframe = iframeRef.current
        if (!iframe?.contentDocument) return

        if (!editModeRef.current) {
            iframe.contentDocument.designMode = 'on'
            editModeRef.current = true
            setEditMode(true)
        } else {
            iframe.contentDocument.designMode = 'off'
            editModeRef.current = false
            setEditMode(false)
        }
    }, [])

    const handlePrint = useCallback(() => {
        const iframe = iframeRef.current
        if (iframe?.contentWindow) {
            iframe.contentWindow.print()
        }
    }, [])

    const handleDownloadPDF = useCallback(async () => {
        const html2pdf = (await import('html2pdf.js')).default
        const iframe = iframeRef.current
        if (!iframe?.contentDocument) return

        const container = document.createElement('div')
        container.innerHTML = iframe.contentDocument.body.innerHTML

        const styleEl = document.createElement('style')
        const iframeStyles = Array.from(iframe.contentDocument.styleSheets)
            .map(sheet => {
                try {
                    return Array.from(sheet.cssRules).map(r => r.cssText).join('\n')
                } catch { return '' }
            })
            .join('\n')
        styleEl.textContent = iframeStyles
        container.prepend(styleEl)
        document.body.appendChild(container)

        const opt = {
            margin: 0,
            filename: `${data.company.name || 'LLC_MOA'}_Company_Partners.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        }

        await html2pdf().set(opt).from(container).save()
        document.body.removeChild(container)
    }, [data.company.name])

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Header with actions */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <h2 className="text-sm font-semibold text-gray-900">Live Preview</h2>
                    {editMode && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full font-medium">
                            Editing
                        </span>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={toggleEditMode}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${
                            editMode
                                ? 'bg-amber-100 hover:bg-amber-200 text-amber-700 border border-amber-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        {editMode ? 'Stop Editing' : 'Edit'}
                    </button>
                    <button
                        onClick={handlePrint}
                        className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        PDF
                    </button>
                </div>
            </div>

            {/* Edit mode hint */}
            {editMode && (
                <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-700">
                    Click any text in the document to edit it directly. Print/PDF will capture your edits.
                </div>
            )}

            {/* Preview iframe */}
            <div className="p-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50" style={{ height: '70vh' }}>
                    <iframe
                        ref={iframeRef}
                        className="w-full h-full"
                        title="LLC New MOA Preview"
                        style={{ border: 'none', transform: 'scale(0.75)', transformOrigin: 'top left', width: '133.33%', height: '133.33%' }}
                    />
                </div>
            </div>
        </div>
    )
}
