'use client'

import { ExtractionForm } from './workspace/ExtractionForm'
import { LivePreviewPane } from './workspace/LivePreviewPane'
import { FormattingToolbar } from './workspace/FormattingToolbar'
import { useState, useEffect } from 'react'
import { useDocumentStore } from '@/store/documentStore'

export function Workspace() {
  const initializeFromCache = useDocumentStore((state) => state.initializeFromCache)
  
  useEffect(() => {
    // Initialize from cache when component mounts
    initializeFromCache()
  }, [initializeFromCache])
  
  return (
    <div className="flex gap-6 items-start">
      {/* Left side - Edit Form */}
      <div className="w-[480px] flex-shrink-0">
        {/* Formatting Toolbar */}
        <FormattingToolbar />
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h2 className="text-sm font-semibold text-gray-900">Document Editor</h2>
          </div>
          <ExtractionForm />
        </div>
      </div>
      
      {/* Right side - Live Preview */}
      <div className="flex-1 min-w-0">
        <div className="sticky top-4">
          <LivePreviewPane />
        </div>
      </div>
    </div>
  )
}
