'use client'

import { useState, useEffect, useMemo } from 'react'
import { useDocumentStore } from '@/store/documentStore'
import { Eye, EyeOff, Maximize2, Minimize2, FileText, RefreshCw } from 'lucide-react'
import { MOADocument } from './MOADocument'
import { MOAData, Party, ShareAllocation } from '@/lib/moa/types'

export const LivePreviewPane = () => {
  const { language, extractedData, autoPreview, setAutoPreview } = useDocumentStore()
  const [isMinimized, setIsMinimized] = useState(false)
  const [debouncedData, setDebouncedData] = useState<MOAData | null>(null)

  // Map extractedData to MOAData
  const moaData: MOAData = useMemo(() => {
    // defaults
    const companyName = extractedData.company?.name || 'COMPANY NAME'
    const license = extractedData.company?.licenseNumber || '...'

    // Combine Source and Destination Parties
    // Assignments typically list: 
    // First Party: Reviewer/Assignor (Source)
    // Second Party: Assignee (Destination)
    // Subsequent parties follow.

    const sourcePartiesList = extractedData.sourceParties || [];
    const destPartiesList = extractedData.destinationParties || [];

    // Combined list for the "Parties" section of the document
    // We map them to the unified Party interface
    const allPartiesData = [...sourcePartiesList, ...destPartiesList];

    const parties: Party[] = allPartiesData.map(p => ({
      nameEn: p.name || 'Pending Name...',
      nameAr: p.nameAr || '...', // Keep strictly Arabic or empty placeholder
      nationalityEn: p.nationality || 'UAE',
      nationalityAr: p.nationalityAr || 'المتحدة',
      idNumber: p.eidNumber || '...',
      dob: p.dob || '...',
      addressEn: 'UAE',
      addressAr: 'الإمارات',
      documentType: p.documentType,
      expiryDate: p.expiryDate
    }));

    // Ensure at least placeholders if empty
    if (parties.length === 0) {
      parties.push({
        nameEn: 'First Party Name',
        nameAr: 'اسم الطرف الأول',
        nationalityEn: 'UAE',
        nationalityAr: 'إماراتي',
        idNumber: '...',
        dob: '...',
        addressEn: 'UAE',
        addressAr: 'الإمارات'
      })
    }

    // Share Allocations
    // We need to map the 'shares' object to the correct party indices in the `parties` array.
    // indices 0 to sourcePartiesList.length - 1  are Source Parties.
    // indices sourcePartiesList.length to ...     are Destination Parties.

    const sourceShares = extractedData.shares?.source || [];
    const destShares = extractedData.shares?.destination || [];

    const allocations: ShareAllocation[] = [];

    // Map Source Shares
    sourceShares.forEach((share, i) => {
      if (share > 0) { // Only list if they hold shares (or should we list 0? usually table is final state)
        allocations.push({
          partyIndex: i, // Index in the combined 'parties' array
          shareCount: Math.floor(share), // Approximation
          shareValue: share * 1000,
          percentage: share
        });
      }
    });

    // Map Destination Shares
    destShares.forEach((share, i) => {
      // Destination party indices start after source parties
      const globalIndex = sourcePartiesList.length + i;
      if (share > 0) {
        allocations.push({
          partyIndex: globalIndex,
          shareCount: Math.floor(share),
          shareValue: share * 1000,
          percentage: share
        });
      }
    });

    return {
      company: {
        nameEn: companyName,
        nameAr: extractedData.company?.nameAr || companyName, // Use Arabic Company Name if available
        licenseNumber: license,
        addressEn: 'Abu Dhabi',
        addressAr: 'أبو ظبي'
      },
      parties: parties,
      totalShares: 100,
      totalCapital: 100000,
      shareAllocations: allocations,
      effectiveDate: extractedData.company?.moaDate || new Date().toLocaleDateString()
    }
  }, [extractedData]);

  // Handle Debounce
  useEffect(() => {
    if (!autoPreview) return;
    const timer = setTimeout(() => {
      setDebouncedData(moaData)
    }, 500);
    return () => clearTimeout(timer);
  }, [moaData, autoPreview]);

  // Initial load
  useEffect(() => {
    if (!debouncedData) setDebouncedData(moaData)
  }, [])

  const handleRefresh = () => {
    setDebouncedData(moaData)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-500" />
          <span className="font-medium text-gray-700">
            {language === 'ar' ? 'معاينة المستند' : 'Document Preview'}
          </span>
          <button
            onClick={() => setIsMinimized(false)}
            className="ml-2 p-1 hover:bg-gray-100 rounded"
            title={language === 'ar' ? 'تكبير' : 'Maximize'}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary-500" />
          <h3 className="font-semibold text-gray-800">
            {language === 'ar' ? 'معاينة المستند' : 'Live Preview'}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto-preview toggle */}
          <button
            onClick={() => setAutoPreview(!autoPreview)}
            className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${autoPreview
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600'
              }`}
            title={autoPreview
              ? (language === 'ar' ? 'المعاينة التلقائية مفعلة' : 'Auto-preview ON')
              : (language === 'ar' ? 'المعاينة التلقائية متوقفة' : 'Auto-preview OFF')
            }
          >
            {autoPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="hidden md:inline">
              {language === 'ar' ? 'تلقائي' : 'Auto'}
            </span>
          </button>

          {/* Manual refresh */}
          {!autoPreview && (
            <button
              onClick={handleRefresh}
              className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              {language === 'ar' ? 'تحديث' : 'Refresh'}
            </button>
          )}

          {/* Minimize */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-gray-200 rounded"
            title={language === 'ar' ? 'تصغير' : 'Minimize'}
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50 text-black">
        <div className="preview-content bg-white shadow-sm min-h-[800px] overflow-hidden">
          {debouncedData ? (
            <MOADocument data={debouncedData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">Loading preview...</div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 border-t border-gray-200 bg-white text-xs text-gray-500 flex items-center justify-between">
        <span>
          {language === 'ar' ? 'يتم التحديث تلقائياً' : 'Updates automatically'}
        </span>
        <span className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${autoPreview ? 'bg-green-500' : 'bg-gray-400'}`} />
          {autoPreview ? (language === 'ar' ? 'مفعل' : 'Live') : (language === 'ar' ? 'متوقف' : 'Paused')}
        </span>
      </div>
    </div>
  )
}
