'use client'

import { POAExtractionForm } from './workspace/POAExtractionForm'
import { POALivePreviewPane } from './workspace/POALivePreviewPane'
import { FormattingToolbar } from './workspace/FormattingToolbar'
import { TemplateManager } from './templates/TemplateManager'
import { useEffect } from 'react'
import { usePOAStore } from '@/store/poaStore'
import { useFormattingStore } from '@/store/formattingStore'

export function POAWorkspace() {
    const initializeFromCache = usePOAStore((state) => state.initializeFromCache)
    const initializeFormattingFromCache = useFormattingStore((state) => state.initializeFromCache)
    const setPOAData = usePOAStore((state) => state.setPOAData)
    const poaData = usePOAStore((state) => state.poaData)

    useEffect(() => {
        // Initialize from cache when component mounts
        initializeFromCache()
        initializeFormattingFromCache()
    }, [initializeFromCache, initializeFormattingFromCache])

    const handleLoadTemplate = (data: any) => {
        setPOAData(data)
    }

    return (
        <div className="flex gap-6 items-start">
            {/* Left side - Edit Form */}
            <div className="w-[480px] flex-shrink-0">
                {/* Formatting Toolbar */}
                <FormattingToolbar />

                {/* Template Manager */}
                <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <TemplateManager
                        documentType="poa"
                        currentData={poaData}
                        onLoadTemplate={handleLoadTemplate}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-900">POA Editor</h2>
                    </div>
                    <POAExtractionForm />
                </div>
            </div>

            {/* Right side - Live Preview */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-4">
                    <POALivePreviewPane />
                </div>
            </div>
        </div>
    )
}

