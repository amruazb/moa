'use client'

import { ExtractionForm } from './workspace/ExtractionForm'
import { LivePreviewPane } from './workspace/LivePreviewPane'
import { useState } from 'react'

export function Workspace() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-1 space-y-4">
        <div className="flex items-center gap-2 text-sm">
          {(['edit', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border text-xs font-semibold transition shadow-sm ${
                activeTab === tab
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {tab === 'edit' ? 'Edit' : 'Preview'}
            </button>
          ))}
        </div>
        {activeTab === 'edit' && <ExtractionForm />}
      </div>
      <div className="lg:col-span-2">
        <LivePreviewPane />
      </div>
    </div>
  )
}
