'use client'

import { LLCToSPCExtractionForm } from './workspace/LLCToSPCExtractionForm'
import { LLCToSPCLivePreviewPane } from './workspace/LLCToSPCLivePreviewPane'
import { FormattingToolbar } from './workspace/FormattingToolbar'
import { LLCSPCOCRPanel } from './ocr/LLCSPCOCRPanel'
import { useEffect } from 'react'
import { useLLCToSPCStore } from '@/store/llcToSpcStore'
import { useFormattingStore } from '@/store/formattingStore'

export function LLCToSPCWorkspace() {
    const initializeFromCache = useLLCToSPCStore((state) => state.initializeFromCache)
    const initializeFormattingFromCache = useFormattingStore((state) => state.initializeFromCache)

    useEffect(() => {
        // Initialize from cache when component mounts
        initializeFromCache()
        initializeFormattingFromCache()
    }, [initializeFromCache, initializeFormattingFromCache])

    return (
        <div className="flex gap-6 items-start">
            {/* Left side - Edit Form */}
            <div className="w-[480px] flex-shrink-0">
                {/* Formatting Toolbar */}
                <FormattingToolbar />

                {/* OCR Scanning Panel */}
                <LLCSPCOCRPanel />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-900">LLC to SPC Conversion Editor</h2>
                    </div>
                    <LLCToSPCExtractionForm />
                </div>
            </div>

            {/* Right side - Live Preview */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-4">
                    <LLCToSPCLivePreviewPane />
                </div>
            </div>
        </div>
    )
}
