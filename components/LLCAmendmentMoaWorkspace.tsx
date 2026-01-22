'use client'

import { LLCAmendmentMoaExtractionForm } from './workspace/LLCAmendmentMoaExtractionForm'
import { LLCAmendmentMoaLivePreviewPane } from './workspace/LLCAmendmentMoaLivePreviewPane'
import { FormattingToolbar } from './workspace/FormattingToolbar'
import { useEffect } from 'react'
import { useLLCAmendmentMoaStore } from '@/store/llcAmendmentMoaStore'

export function LLCAmendmentMoaWorkspace() {
    const initializeFromCache = useLLCAmendmentMoaStore((state) => state.initializeFromCache)

    useEffect(() => {
        // Initialize from cache when component mounts
        initializeFromCache()
    }, [initializeFromCache])

    return (
        <div className="flex gap-6 items-start">
            {/* Left side - Edit Form */}
            <div className="w-[520px] flex-shrink-0">
                {/* Formatting Toolbar */}
                <FormattingToolbar />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-900">LLC Amendment MOA Editor</h2>
                    </div>
                    <LLCAmendmentMoaExtractionForm />
                </div>
            </div>

            {/* Right side - Live Preview */}
            <div className="flex-1">
                <LLCAmendmentMoaLivePreviewPane />
            </div>
        </div>
    )
}
