'use client'

import { LLCNewMoaExtractionForm } from './workspace/LLCNewMoaExtractionForm'
import { LLCNewMoaLivePreviewPane } from './workspace/LLCNewMoaLivePreviewPane'
import { FormattingToolbar } from './workspace/FormattingToolbar'
import { useEffect } from 'react'
import { useLLCNewMoaStore } from '@/store/llcNewMoaStore'

export function LLCNewMoaWorkspace() {
    const initializeFromCache = useLLCNewMoaStore((state) => state.initializeFromCache)

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
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-900">LLC MOA (Company Partners) Editor</h2>
                    </div>
                    <LLCNewMoaExtractionForm />
                </div>
            </div>

            {/* Right side - Live Preview */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-4">
                    <LLCNewMoaLivePreviewPane />
                </div>
            </div>
        </div>
    )
}
