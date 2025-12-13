'use client'

import { useState } from 'react'
import { DocumentUpload } from '@/components/DocumentUpload'
import { DataExtraction } from '@/components/DataExtraction'
import { DocumentPreview } from '@/components/DocumentPreview'
import { LanguageToggle } from '@/components/LanguageToggle'
import { ConversionTypeSelector } from '@/components/ConversionTypeSelector'
import { LivePreviewPane } from '@/components/LivePreviewPane'
import { useDocumentStore } from '@/store/documentStore'
import { FileText, Upload as UploadIcon, Edit, Eye } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'extracted' | 'manual' | 'preview'>('upload')
  const { language } = useDocumentStore()

  return (
    <div className={`min-h-screen bg-gray-100 ${language === 'ar' ? 'rtl' : ''}`}>
      {/* Header */}
      <div className="gradient-bg text-white p-6 shadow-lg">
        <div className="container mx-auto max-w-[1800px]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {language === 'ar' ? 'محرر وثائق مذكرة التأسيس' : 'MOA Document Editor'}
              </h1>
              <p className="text-sm opacity-90">
                {language === 'ar'
                  ? 'معالج تحويل الشركات الذكي مع معاينة فورية'
                  : 'Smart Company Conversion Processor with Live Preview'
                }
              </p>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="container mx-auto max-w-[1800px] p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-180px)]">

          {/* Left Sidebar - Upload (3 columns on large screens) */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md overflow-y-auto">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <UploadIcon className="w-5 h-5 text-primary-500" />
                {language === 'ar' ? 'رفع المستندات' : 'Upload Documents'}
              </h2>
              <DocumentUpload />
            </div>
          </div>

          {/* Center - Main Form (6 columns on large screens) */}
          <div className="lg:col-span-6 bg-white rounded-lg shadow-md overflow-y-auto">
            <div className="p-6">
              <ConversionTypeSelector />

              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b-2 border-gray-200">
                <button
                  className={`tab ${activeTab === 'extracted' ? 'active' : ''}`}
                  onClick={() => setActiveTab('extracted')}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {language === 'ar' ? 'البيانات' : 'Data'}
                  </span>
                </button>
                <button
                  className={`tab ${activeTab === 'manual' ? 'active' : ''}`}
                  onClick={() => setActiveTab('manual')}
                >
                  <span className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    {language === 'ar' ? 'يدوي' : 'Manual'}
                  </span>
                </button>
                <button
                  className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('preview')}
                >
                  <span className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {language === 'ar' ? 'معاينة' : 'Preview'}
                  </span>
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'extracted' && <DataExtraction />}
              {activeTab === 'manual' && <DataExtraction />}
              {activeTab === 'preview' && <DocumentPreview />}
            </div>
          </div>

          {/* Right Sidebar - Live Preview (3 columns on large screens, hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md h-full overflow-hidden">
              <LivePreviewPane />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

