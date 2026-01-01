"use client"

import { useState } from 'react'
import { OCRUpload } from './OCRUpload'
import { DocumentType, EmiratesIDData, PassportData, TradeCertificateData } from '@/lib/ocr/types'
import { useDocumentStore } from '@/store/documentStore'

interface OCRPanelProps {
  targetPartyType?: 'source' | 'destination'
  targetPartyIndex?: number
}

export function OCRPanel({ targetPartyType = 'source', targetPartyIndex = 0 }: OCRPanelProps) {
  const { extractedData, setExtractedData } = useDocumentStore()
  const [activeTab, setActiveTab] = useState<'person' | 'company'>('person')

  const handleEmiratesIDExtracted = (data: EmiratesIDData) => {
    const parties = targetPartyType === 'source' 
      ? [...(extractedData.sourceParties || [])]
      : [...(extractedData.destinationParties || [])]
    
    // Try to match EID to existing party by name (from Trade License)
    // Normalize names for comparison
    const normalizeName = (name: string) => 
      (name || '').toLowerCase().replace(/[^a-z\u0600-\u06FF]/g, '')
    
    const eidNameEn = normalizeName(data.nameEn)
    const eidNameAr = normalizeName(data.nameAr)
    
    // Find matching party by name
    let matchedIndex = -1
    for (let i = 0; i < parties.length; i++) {
      const partyNameEn = normalizeName(parties[i].name || '')
      const partyNameAr = normalizeName(parties[i].nameAr || '')
      
      // Match if English or Arabic names are similar
      if ((eidNameEn && partyNameEn && (
            partyNameEn.includes(eidNameEn) || 
            eidNameEn.includes(partyNameEn) ||
            partyNameEn === eidNameEn
          )) ||
          (eidNameAr && partyNameAr && (
            partyNameAr.includes(eidNameAr) || 
            eidNameAr.includes(partyNameAr) ||
            partyNameAr === eidNameAr
          ))) {
        matchedIndex = i
        break
      }
    }
    
    // If no match found, use the target index
    const updateIndex = matchedIndex >= 0 ? matchedIndex : targetPartyIndex
    
    // Ensure the party exists
    while (parties.length <= updateIndex) {
      parties.push({})
    }
    
    // Update party data from Emirates ID - ONLY EID number and DOB
    // Names come from Trade License, not from EID scan
    parties[updateIndex] = {
      ...parties[updateIndex],
      // DO NOT update names - keep existing names from Trade License
      // name: data.nameEn || parties[updateIndex].name,
      // nameAr: data.nameAr || parties[updateIndex].nameAr,
      eidNumber: data.idNumber || parties[updateIndex].eidNumber,
      dob: data.dateOfBirth || parties[updateIndex].dob,
      documentType: 'eid',
      // Keep nationality from Trade License if already set, otherwise use EID
      nationality: parties[updateIndex].nationality || data.nationality,
      nationalityAr: parties[updateIndex].nationalityAr || data.nationalityAr,
      expiryDate: data.expiryDate || parties[updateIndex].expiryDate,
    }
    
    if (targetPartyType === 'source') {
      setExtractedData({ sourceParties: parties })
    } else {
      setExtractedData({ destinationParties: parties })
    }
  }

  const handlePassportExtracted = (data: PassportData) => {
    const parties = targetPartyType === 'source' 
      ? [...(extractedData.sourceParties || [])]
      : [...(extractedData.destinationParties || [])]
    
    // Try to match Passport to existing party by name (from Trade License)
    const normalizeName = (name: string) => 
      (name || '').toLowerCase().replace(/[^a-z\u0600-\u06FF]/g, '')
    
    const passportNameEn = normalizeName(data.nameEn)
    
    // Find matching party by name
    let matchedIndex = -1
    for (let i = 0; i < parties.length; i++) {
      const partyNameEn = normalizeName(parties[i].name || '')
      
      if (passportNameEn && partyNameEn && (
            partyNameEn.includes(passportNameEn) || 
            passportNameEn.includes(partyNameEn) ||
            partyNameEn === passportNameEn
          )) {
        matchedIndex = i
        break
      }
    }
    
    // If no match found, use the target index
    const updateIndex = matchedIndex >= 0 ? matchedIndex : targetPartyIndex
    
    // Ensure the party exists
    while (parties.length <= updateIndex) {
      parties.push({})
    }
    
    // Update party data from Passport - ONLY passport number and DOB
    // Names come from Trade License, not from Passport scan
    parties[updateIndex] = {
      ...parties[updateIndex],
      // DO NOT update names - keep existing names from Trade License
      // name: data.nameEn || parties[updateIndex].name,
      passportNumber: data.passportNumber || parties[updateIndex].passportNumber,
      dob: data.dateOfBirth || parties[updateIndex].dob,
      documentType: 'passport',
      // Keep nationality from Trade License if already set
      nationality: parties[updateIndex].nationality || data.nationality,
      nationalityAr: parties[updateIndex].nationalityAr || data.nationalityAr,
      expiryDate: data.expiryDate || parties[updateIndex].expiryDate,
    }
    
    if (targetPartyType === 'source') {
      setExtractedData({ sourceParties: parties })
    } else {
      setExtractedData({ destinationParties: parties })
    }
  }

  const handleTradeCertificateExtracted = (data: TradeCertificateData) => {
    // Update company data
    const company = extractedData.company || {}
    
    // Clean up trade name - remove "Trade Name" prefix if present
    const cleanName = (name: string) => name?.replace(/^Trade\s*Name[:\s]*/i, '').trim() || ''
    
    setExtractedData({
      company: {
        ...company,
        name: cleanName(data.tradeName) || company.name,
        nameAr: data.tradeNameAr || company.nameAr,
        registrationDate: data.issueDate || company.registrationDate,
        // Extract activities as semicolon-separated string
        activities: data.activities.map(a => a.nameEn).join('; ') || company.activities,
        activitiesAr: data.activities.map(a => a.nameAr).join('؛ ') || company.activitiesAr,
      }
    })

    // If there are owners, update source parties
    if (data.owners && data.owners.length > 0) {
      const sourceParties = data.owners.map((owner, idx) => ({
        ...(extractedData.sourceParties?.[idx] || {}),
        name: owner.nameEn,
        nameAr: owner.nameAr,
        nationality: owner.nationality,
        nationalityAr: owner.nationalityAr,
        capacity: owner.role,
        capacityAr: owner.roleAr,
      }))
      setExtractedData({ sourceParties })
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_14px_40px_rgba(15,23,42,0.08)] overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-100 p-3">
        <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Document Scanner (OCR)
        </h3>
        <p className="text-xs text-gray-500 mt-1">Upload documents to auto-fill form fields</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('person')}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            activeTab === 'person'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Person ID
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`flex-1 py-2 text-xs font-medium transition-colors ${
            activeTab === 'company'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Company Docs
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-4">
        {activeTab === 'person' && (
          <>
            {/* Target Party Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Fill data for:</span>
              <select
                value={`${targetPartyType}-${targetPartyIndex}`}
                onChange={(e) => {
                  const [type, idx] = e.target.value.split('-')
                  // Would need to lift state or use context to change these
                }}
                className="rounded border border-gray-200 px-2 py-1 text-xs"
                disabled
              >
                {(extractedData.sourceParties || []).map((_, idx) => (
                  <option key={`source-${idx}`} value={`source-${idx}`}>
                    Source Party {idx + 1}
                  </option>
                ))}
                {(extractedData.destinationParties || []).map((_, idx) => (
                  <option key={`dest-${idx}`} value={`destination-${idx}`}>
                    Destination Party {idx + 1}
                  </option>
                ))}
              </select>
            </div>

            <OCRUpload
              documentType="emirates_id"
              onExtracted={handleEmiratesIDExtracted}
              label="Emirates ID"
              description="Front or back of UAE Emirates ID card"
            />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-xs text-gray-400">or</span>
              </div>
            </div>
            
            <OCRUpload
              documentType="passport"
              onExtracted={handlePassportExtracted}
              label="Passport"
              description="Data page of passport"
            />
          </>
        )}

        {activeTab === 'company' && (
          <OCRUpload
            documentType="trade_certificate"
            onExtracted={handleTradeCertificateExtracted}
            label="Trade Name Certificate"
            description="Upload trade license or certificate to extract company details"
          />
        )}
      </div>

      {/* Footer hint */}
      <div className="border-t border-gray-100 p-3 bg-gray-50">
        <p className="text-xs text-gray-500 flex items-start gap-2">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Extracted data will automatically fill the form fields. You can review and edit before saving.
          </span>
        </p>
      </div>
    </div>
  )
}
