"use client"

import { useState, useCallback, useRef } from 'react'
import { useDocumentStore } from '@/store/documentStore'
import { DocumentType, EmiratesIDData, PassportData, TradeCertificateData } from '@/lib/ocr/types'

// Inline OCR Upload Button Component
function OCRButton({ 
  documentType, 
  onExtracted, 
  label 
}: { 
  documentType: DocumentType
  onExtracted: (data: any) => void
  label: string 
}) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusText, setStatusText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true)
    setStatus('idle')
    setStatusText('Uploading...')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('documentType', documentType)

      setStatusText('Scanning...')
      
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success && result.data) {
        onExtracted(result.data)
        setStatus('success')
        setStatusText('Done!')
        setTimeout(() => { setStatus('idle'); setStatusText('') }, 2000)
      } else {
        setStatus('error')
        setStatusText(result.error || 'Failed')
        console.error('OCR Error:', result.error)
        setTimeout(() => { setStatus('idle'); setStatusText('') }, 3000)
      }
    } catch (err) {
      setStatus('error')
      setStatusText('Error')
      console.error('OCR Error:', err)
      setTimeout(() => { setStatus('idle'); setStatusText('') }, 3000)
    } finally {
      setIsProcessing(false)
    }
  }, [documentType, onExtracted])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [processFile])

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isProcessing}
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
          isProcessing ? 'bg-blue-100 text-blue-600' :
          status === 'success' ? 'bg-green-100 text-green-600' :
          status === 'error' ? 'bg-red-100 text-red-600' :
          'bg-blue-50 text-blue-600 hover:bg-blue-100'
        }`}
      >
        {isProcessing ? (
          <>
            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {statusText || 'Scanning...'}
          </>
        ) : status === 'success' ? (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {statusText || 'Done'}
          </>
        ) : status === 'error' ? (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {statusText || 'Failed'}
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {label}
          </>
        )}
      </button>
    </>
  )
}

export function ExtractionForm() {
  const { extractedData, setExtractedData, clearCache, resetToDefault } = useDocumentStore()
  const company = extractedData.company || {}
  const sourceParties = extractedData.sourceParties || []
  const destinationParties = extractedData.destinationParties || []
  const shares = extractedData.shares || { source: [], destination: [] }
  const managerArticle = extractedData.managerArticle || {}
  const ownerArticle = extractedData.ownerArticle || {}
  const capitalData = extractedData.capital || { totalCapital: 10000, shareCount: 100, shareValue: 100 }

  const updateCompany = (field: string, value: string) => {
    setExtractedData({ company: { ...company, [field]: value } })
  }

  const updateSourceParty = (idx: number, field: string, value: string) => {
    const updated = [...sourceParties]
    updated[idx] = { ...updated[idx], [field]: value }
    setExtractedData({ sourceParties: updated })
  }

  const updateDestParty = (idx: number, field: string, value: string) => {
    const updated = [...destinationParties]
    updated[idx] = { ...updated[idx], [field]: value }
    setExtractedData({ destinationParties: updated })
  }

  const updateShares = (type: 'source' | 'destination', idx: number, value: string) => {
    const updated = { ...shares }
    updated[type][idx] = parseFloat(value) || 0
    setExtractedData({ shares: updated })
  }

  const updateManager = (field: string, value: string) => {
    setExtractedData({ managerArticle: { ...managerArticle, [field]: value } })
  }

  const updateOwner = (field: string, value: string) => {
    setExtractedData({ ownerArticle: { ...ownerArticle, [field]: value } })
  }

  const updateCapital = (field: string, value: number) => {
    const updated = { ...capitalData, [field]: value }
    // Auto-calculate share value when capital or share count changes
    if (field === 'totalCapital' || field === 'shareCount') {
      const capital = field === 'totalCapital' ? value : (updated.totalCapital || 10000)
      const shares = field === 'shareCount' ? value : (updated.shareCount || 100)
      if (shares > 0) {
        updated.shareValue = Math.round((capital / shares) * 100) / 100
      }
    }
    setExtractedData({ capital: updated })
  }

  const syncManagerFromSource = () => {
    const source = sourceParties[0]
    if (source) {
      setExtractedData({
        managerArticle: {
          ...managerArticle,
          managerName: source.name || '',
          managerNameAr: source.nameAr || '',
          managerIdNumber: source.eidNumber || source.passportNumber || '',
          managerDocType: source.eidNumber ? 'eid' : 'passport'
        }
      })
    }
  }

  // Manager OCR handlers
  const handleManagerEIDExtracted = (data: EmiratesIDData) => {
    // ONLY extract EID number and DOB from scan
    // Names and nationality should come from Trade License or manual entry
    setExtractedData({
      managerArticle: {
        ...managerArticle,
        // DO NOT update names from EID - keep existing names from Trade License
        // DO NOT update nationality from EID - keep existing nationality from Trade License
        managerIdNumber: data.idNumber || managerArticle.managerIdNumber,
        managerDob: data.dateOfBirth || managerArticle.managerDob,
        managerDocType: 'eid'
      }
    })
  }

  const handleManagerPassportExtracted = (data: PassportData) => {
    // ONLY extract passport number and DOB from scan
    // Names and nationality should come from Trade License or manual entry
    setExtractedData({
      managerArticle: {
        ...managerArticle,
        // DO NOT update names from Passport - keep existing names from Trade License
        // DO NOT update nationality from Passport - keep existing nationality from Trade License
        managerIdNumber: data.passportNumber || managerArticle.managerIdNumber,
        managerDob: data.dateOfBirth || managerArticle.managerDob,
        managerDocType: 'passport'
      }
    })
  }

  // Owner OCR handlers
  const handleOwnerEIDExtracted = (data: EmiratesIDData) => {
    // ONLY extract EID number and DOB from scan
    // Names and nationality should come from Trade License or manual entry
    setExtractedData({
      ownerArticle: {
        ...ownerArticle,
        // DO NOT update names from EID - keep existing names from Trade License
        // DO NOT update nationality from EID - keep existing nationality from Trade License
        ownerIdNumber: data.idNumber || ownerArticle.ownerIdNumber,
        ownerDob: data.dateOfBirth || ownerArticle.ownerDob,
        ownerDocType: 'eid'
      }
    })
  }

  const handleOwnerPassportExtracted = (data: PassportData) => {
    // ONLY extract passport number and DOB from scan
    // Names and nationality should come from Trade License or manual entry
    setExtractedData({
      ownerArticle: {
        ...ownerArticle,
        // DO NOT update names from Passport - keep existing names from Trade License
        // DO NOT update nationality from Passport - keep existing nationality from Trade License
        ownerIdNumber: data.passportNumber || ownerArticle.ownerIdNumber,
        ownerDob: data.dateOfBirth || ownerArticle.ownerDob,
        ownerDocType: 'passport'
      }
    })
  }

  const handleOwnerTradeCertificateExtracted = (data: TradeCertificateData) => {
    // Extract owner data from trade certificate
    if (data.owners && data.owners.length > 0) {
      // Find owner role first, otherwise use first owner
      const owner = data.owners.find(o => o.role?.toLowerCase() === 'owner') || data.owners[0]
      if (owner) {
        setExtractedData({
          ownerArticle: {
            ...ownerArticle,
            ownerName: owner.nameEn || ownerArticle.ownerName,
            ownerNameAr: owner.nameAr || ownerArticle.ownerNameAr,
            ownerNationality: owner.nationality || ownerArticle.ownerNationality,
            ownerNationalityAr: owner.nationalityAr || ownerArticle.ownerNationalityAr,
          }
        })
      }
    }
  }

  const syncOwnerFromSource = () => {
    const source = sourceParties[0]
    if (source) {
      setExtractedData({
        ownerArticle: {
          ...ownerArticle,
          ownerName: source.name || '',
          ownerNameAr: source.nameAr || '',
          ownerIdNumber: source.eidNumber || source.passportNumber || '',
          ownerDocType: source.eidNumber ? 'eid' : 'passport'
        }
      })
    }
  }

  const addDestParty = () => {
    setExtractedData({ destinationParties: [...destinationParties, {}] })
  }

  const addSourceParty = () => {
    setExtractedData({ sourceParties: [...sourceParties, {}] })
  }

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear all cached data? This will reset the form to default values.')) {
      clearCache()
    }
  }

  // OCR extraction handlers
  const handleEmiratesIDExtracted = (partyType: 'source' | 'destination', idx: number) => (data: EmiratesIDData) => {
    const parties = partyType === 'source' 
      ? [...sourceParties]
      : [...destinationParties]
    
    // ONLY extract EID number and DOB from scan
    // Names and nationality should come from Trade License or manual entry
    parties[idx] = {
      ...parties[idx],
      // DO NOT update names from EID - keep existing names from Trade License
      // DO NOT update nationality from EID - keep existing nationality from Trade License
      eidNumber: data.idNumber || parties[idx].eidNumber,
      dob: data.dateOfBirth || parties[idx].dob,
      documentType: 'eid',
    }
    
    if (partyType === 'source') {
      setExtractedData({ sourceParties: parties })
    } else {
      setExtractedData({ destinationParties: parties })
    }
  }

  const handlePassportExtracted = (partyType: 'source' | 'destination', idx: number) => (data: PassportData) => {
    const parties = partyType === 'source' 
      ? [...sourceParties]
      : [...destinationParties]
    
    // ONLY extract passport number and DOB from scan
    // Names and nationality should come from Trade License or manual entry
    parties[idx] = {
      ...parties[idx],
      // DO NOT update names from Passport - keep existing names from Trade License
      // DO NOT update nationality from Passport - keep existing nationality from Trade License
      passportNumber: data.passportNumber || parties[idx].passportNumber,
      dob: data.dateOfBirth || parties[idx].dob,
      documentType: 'passport',
    }
    
    if (partyType === 'source') {
      setExtractedData({ sourceParties: parties })
    } else {
      setExtractedData({ destinationParties: parties })
    }
  }

  const handleTradeCertificateExtracted = (data: TradeCertificateData) => {
    // Clean up trade name - remove "Trade Name" prefix if present
    const cleanName = (name: string) => name?.replace(/^Trade\s*Name[:\s]*/i, '').trim() || ''
    
    setExtractedData({
      company: {
        ...company,
        name: cleanName(data.tradeName) || company.name,
        nameAr: data.tradeNameAr || company.nameAr,
        registrationDate: data.issueDate || company.registrationDate,
        activities: data.activities?.map(a => a.nameEn).join('; ') || company.activities,
        activitiesAr: data.activities?.map(a => a.nameAr).join('؛ ') || company.activitiesAr,
      }
    })

    // If there are owners, update source parties
    if (data.owners && data.owners.length > 0) {
      const newSourceParties = data.owners.map((owner, idx) => ({
        ...(sourceParties[idx] || {}),
        name: owner.nameEn,
        nameAr: owner.nameAr,
        nationality: owner.nationality,
        nationalityAr: owner.nationalityAr,
        capacity: owner.role,
        capacityAr: owner.roleAr,
      }))
      setExtractedData({ sourceParties: newSourceParties })
      
      // Also update Manager (Article 10) with the first owner/manager
      // Find manager role first, otherwise use first owner
      const manager = data.owners.find(o => o.role?.toLowerCase() === 'manager') || data.owners[0]
      if (manager) {
        setExtractedData({
          managerArticle: {
            ...managerArticle,
            managerName: manager.nameEn || managerArticle.managerName,
            managerNameAr: manager.nameAr || managerArticle.managerNameAr,
            managerNationality: manager.nationality || managerArticle.managerNationality,
            managerNationalityAr: manager.nationalityAr || managerArticle.managerNationalityAr,
          }
        })
      }
    }
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-180px)]">
      <div className="flex justify-between items-center sticky top-0 bg-white py-2 z-10 border-b border-gray-100 -mx-4 px-4 -mt-4">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Edit Data</h3>
        <button 
          onClick={handleClearCache}
          className="px-2 py-1 text-[10px] font-medium text-red-600 bg-red-50 rounded border border-red-200 hover:bg-red-100"
        >
          Clear
        </button>
      </div>
      
      {/* Company Section */}
      <fieldset className="border border-gray-200 rounded-xl p-3 space-y-2">
        <legend className="text-xs font-semibold text-slate-900 px-2">Company</legend>
        <div className="flex justify-end mb-2">
          <OCRButton 
            documentType="trade_certificate" 
            onExtracted={handleTradeCertificateExtracted}
            label="Scan Trade License"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-gray-600">Name (EN)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.name || ''} onChange={(e) => updateCompany('name', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Name (AR)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={company.nameAr || ''} onChange={(e) => updateCompany('nameAr', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">License Number
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.licenseNumber || ''} onChange={(e) => updateCompany('licenseNumber', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">MOA Date
            <input type="date" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.moaDate || ''} onChange={(e) => updateCompany('moaDate', e.target.value)} />
          </label>
        </div>
        <label className="block text-xs text-gray-600">Activities (EN)
          <textarea className="mt-1 w-full rounded border px-2 py-1 text-xs" rows={2} value={company.activities || ''} onChange={(e) => updateCompany('activities', e.target.value)} />
        </label>
        <label className="block text-xs text-gray-600">Activities (AR)
          <textarea className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" rows={2} value={company.activitiesAr || ''} onChange={(e) => updateCompany('activitiesAr', e.target.value)} />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-gray-600">Address (EN)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.address || ''} onChange={(e) => updateCompany('address', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Address (AR)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={company.addressAr || ''} onChange={(e) => updateCompany('addressAr', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Emirate (EN)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.emirate || ''} onChange={(e) => updateCompany('emirate', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Emirate (AR)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={company.emirateAr || ''} onChange={(e) => updateCompany('emirateAr', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Notarization #
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.notarizationNumber || ''} onChange={(e) => updateCompany('notarizationNumber', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Notarization Date
            <input type="date" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.notarizationDate || ''} onChange={(e) => updateCompany('notarizationDate', e.target.value)} />
          </label>
        </div>
      </fieldset>

      {/* Capital & Shares Section (Article 6) */}
      <fieldset className="border border-gray-200 rounded-xl p-3 space-y-2">
        <legend className="text-xs font-semibold text-slate-900 px-2">Capital & Shares (Article 6)</legend>
        <div className="grid grid-cols-3 gap-2">
          <label className="block text-xs text-gray-600">Total Capital (AED)
            <input 
              type="number" 
              className="mt-1 w-full rounded border px-2 py-1 text-xs" 
              value={capitalData.totalCapital || ''} 
              onChange={(e) => updateCapital('totalCapital', parseFloat(e.target.value) || 0)} 
              placeholder="e.g., 100000"
            />
          </label>
          <label className="block text-xs text-gray-600">Number of Shares
            <input 
              type="number" 
              className="mt-1 w-full rounded border px-2 py-1 text-xs" 
              value={capitalData.shareCount || ''} 
              onChange={(e) => updateCapital('shareCount', parseFloat(e.target.value) || 0)} 
              placeholder="e.g., 100"
            />
          </label>
          <label className="block text-xs text-gray-600">Value per Share (AED)
            <input 
              type="number" 
              className="mt-1 w-full rounded border px-2 py-1 text-xs bg-gray-50" 
              value={capitalData.shareValue || ''} 
              readOnly
              title="Auto-calculated from Capital ÷ Shares"
            />
          </label>
        </div>
        <div className="text-[10px] text-gray-500 bg-blue-50 p-2 rounded">
          <strong>Preview:</strong> AED {(capitalData.totalCapital || 0).toLocaleString()} divided into {capitalData.shareCount || 0} shares @ AED {(capitalData.shareValue || 0).toLocaleString()} each
        </div>
      </fieldset>

      {/* Owner Article Section */}
      <fieldset className="border border-gray-200 rounded-xl p-3 space-y-2">
        <legend className="text-xs font-semibold text-slate-900 px-2">Owner (Article 5)</legend>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <OCRButton 
              documentType="trade_certificate" 
              onExtracted={handleOwnerTradeCertificateExtracted}
              label="Scan Trade License"
            />
            <OCRButton 
              documentType="emirates_id" 
              onExtracted={handleOwnerEIDExtracted}
              label="Scan EID"
            />
            <OCRButton 
              documentType="passport" 
              onExtracted={handleOwnerPassportExtracted}
              label="Scan Passport"
            />
          </div>
          <button
            onClick={syncOwnerFromSource}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-green-50 text-green-600 hover:bg-green-100"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync from Source Party
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-gray-600">Owner Name (EN)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={ownerArticle.ownerName || ''} onChange={(e) => updateOwner('ownerName', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Owner Name (AR)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={ownerArticle.ownerNameAr || ''} onChange={(e) => updateOwner('ownerNameAr', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Owner ID Number
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={ownerArticle.ownerIdNumber || ''} onChange={(e) => updateOwner('ownerIdNumber', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">ID Type
            <select className="mt-1 w-full rounded border px-2 py-1 text-xs" value={ownerArticle.ownerDocType || 'eid'} onChange={(e) => updateOwner('ownerDocType', e.target.value)}>
              <option value="eid">Emirates ID</option>
              <option value="passport">Passport</option>
            </select>
          </label>
        </div>
      </fieldset>

      {/* Manager Article Section */}
      <fieldset className="border border-gray-200 rounded-xl p-3 space-y-2">
        <legend className="text-xs font-semibold text-slate-900 px-2">Manager (Article 10)</legend>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <OCRButton 
              documentType="emirates_id" 
              onExtracted={handleManagerEIDExtracted}
              label="Scan EID"
            />
            <OCRButton 
              documentType="passport" 
              onExtracted={handleManagerPassportExtracted}
              label="Scan Passport"
            />
          </div>
          <button
            onClick={syncManagerFromSource}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded bg-green-50 text-green-600 hover:bg-green-100"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Sync from Source Party
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <label className="block text-xs text-gray-600">Manager Name (EN)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={managerArticle.managerName || ''} onChange={(e) => updateManager('managerName', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Manager Name (AR)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={managerArticle.managerNameAr || ''} onChange={(e) => updateManager('managerNameAr', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">Manager ID Number
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={managerArticle.managerIdNumber || ''} onChange={(e) => updateManager('managerIdNumber', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">ID Type
            <select className="mt-1 w-full rounded border px-2 py-1 text-xs" value={managerArticle.managerDocType || 'eid'} onChange={(e) => updateManager('managerDocType', e.target.value)}>
              <option value="eid">Emirates ID</option>
              <option value="passport">Passport</option>
            </select>
          </label>
        </div>
      </fieldset>
    </div>
  )
}
