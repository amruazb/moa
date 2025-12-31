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
  const { extractedData, setExtractedData } = useDocumentStore()
  const company = extractedData.company || {}
  const sourceParties = extractedData.sourceParties || []
  const destinationParties = extractedData.destinationParties || []
  const shares = extractedData.shares || { source: [], destination: [] }

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

  const addDestParty = () => {
    setExtractedData({ destinationParties: [...destinationParties, {}] })
  }

  const addSourceParty = () => {
    setExtractedData({ sourceParties: [...sourceParties, {}] })
  }

  // OCR extraction handlers
  const handleEmiratesIDExtracted = (partyType: 'source' | 'destination', idx: number) => (data: EmiratesIDData) => {
    const parties = partyType === 'source' 
      ? [...sourceParties]
      : [...destinationParties]
    
    parties[idx] = {
      ...parties[idx],
      name: data.nameEn || parties[idx].name,
      nameAr: data.nameAr || parties[idx].nameAr,
      eidNumber: data.idNumber || parties[idx].eidNumber,
      nationality: data.nationality || parties[idx].nationality,
      nationalityAr: data.nationalityAr || parties[idx].nationalityAr,
      dob: data.dateOfBirth || parties[idx].dob,
      documentType: 'eid',
      expiryDate: data.expiryDate || parties[idx].expiryDate,
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
    
    parties[idx] = {
      ...parties[idx],
      name: data.nameEn || parties[idx].name,
      passportNumber: data.passportNumber || parties[idx].passportNumber,
      nationality: data.nationality || parties[idx].nationality,
      nationalityAr: data.nationalityAr || parties[idx].nationalityAr,
      dob: data.dateOfBirth || parties[idx].dob,
      documentType: 'passport',
      expiryDate: data.expiryDate || parties[idx].expiryDate,
    }
    
    if (partyType === 'source') {
      setExtractedData({ sourceParties: parties })
    } else {
      setExtractedData({ destinationParties: parties })
    }
  }

  const handleTradeCertificateExtracted = (data: TradeCertificateData) => {
    setExtractedData({
      company: {
        ...company,
        name: data.tradeName || company.name,
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
    }
  }

  return (
    <div className="space-y-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_14px_40px_rgba(15,23,42,0.08)] overflow-y-auto max-h-[80vh]">
      <h3 className="text-sm font-semibold text-slate-900 sticky top-0 bg-white pb-2">Edit Extracted Data</h3>
      
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
          <label className="block text-xs text-gray-600">New Name (EN)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.newName || ''} onChange={(e) => updateCompany('newName', e.target.value)} />
          </label>
          <label className="block text-xs text-gray-600">New Name (AR)
            <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={company.newNameAr || ''} onChange={(e) => updateCompany('newNameAr', e.target.value)} />
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

      {/* Source Parties */}
      <fieldset className="border border-gray-200 rounded-xl p-3 space-y-3">
        <legend className="text-xs font-semibold text-slate-900 px-2">Source Parties (Before Transfer)</legend>
        {sourceParties.map((party, idx) => (
          <div key={idx} className="border border-gray-100 rounded p-2 space-y-2 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-gray-700">Party {idx + 1}</div>
              <div className="flex items-center gap-2">
                <OCRButton 
                  documentType="emirates_id" 
                  onExtracted={handleEmiratesIDExtracted('source', idx)}
                  label="Scan EID"
                />
                <OCRButton 
                  documentType="passport" 
                  onExtracted={handlePassportExtracted('source', idx)}
                  label="Scan Passport"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-xs text-gray-600">Name (EN)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.name || ''} onChange={(e) => updateSourceParty(idx, 'name', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Name (AR)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={party.nameAr || ''} onChange={(e) => updateSourceParty(idx, 'nameAr', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Nationality (EN)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.nationality || ''} onChange={(e) => updateSourceParty(idx, 'nationality', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Nationality (AR)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={party.nationalityAr || ''} onChange={(e) => updateSourceParty(idx, 'nationalityAr', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">EID Number
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.eidNumber || ''} onChange={(e) => updateSourceParty(idx, 'eidNumber', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Passport Number
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.passportNumber || ''} onChange={(e) => updateSourceParty(idx, 'passportNumber', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">DOB
                <input type="date" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.dob || ''} onChange={(e) => updateSourceParty(idx, 'dob', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Share (%)
                <input type="number" step="0.01" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={shares.source[idx] || ''} onChange={(e) => updateShares('source', idx, e.target.value)} />
              </label>
            </div>
          </div>
        ))}
        <button onClick={addSourceParty} className="w-full py-2 border border-dashed border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
          + Add Source Party
        </button>
      </fieldset>

      {/* Destination Parties */}
      <fieldset className="border border-gray-200 rounded-xl p-3 space-y-3">
        <legend className="text-xs font-semibold text-slate-900 px-2">Destination Parties (After Transfer)</legend>
        {destinationParties.map((party, idx) => (
          <div key={idx} className="border border-gray-100 rounded p-2 space-y-2 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium text-gray-700">Party {idx + 1}</div>
              <div className="flex items-center gap-2">
                <OCRButton 
                  documentType="emirates_id" 
                  onExtracted={handleEmiratesIDExtracted('destination', idx)}
                  label="Scan EID"
                />
                <OCRButton 
                  documentType="passport" 
                  onExtracted={handlePassportExtracted('destination', idx)}
                  label="Scan Passport"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-xs text-gray-600">Name (EN)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.name || ''} onChange={(e) => updateDestParty(idx, 'name', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Name (AR)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={party.nameAr || ''} onChange={(e) => updateDestParty(idx, 'nameAr', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Nationality (EN)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.nationality || ''} onChange={(e) => updateDestParty(idx, 'nationality', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Nationality (AR)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={party.nationalityAr || ''} onChange={(e) => updateDestParty(idx, 'nationalityAr', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">EID Number
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.eidNumber || ''} onChange={(e) => updateDestParty(idx, 'eidNumber', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Passport Number
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.passportNumber || ''} onChange={(e) => updateDestParty(idx, 'passportNumber', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">DOB
                <input type="date" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.dob || ''} onChange={(e) => updateDestParty(idx, 'dob', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Capacity (EN)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={party.capacity || ''} onChange={(e) => updateDestParty(idx, 'capacity', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Capacity (AR)
                <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={party.capacityAr || ''} onChange={(e) => updateDestParty(idx, 'capacityAr', e.target.value)} />
              </label>
              <label className="block text-xs text-gray-600">Share (%)
                <input type="number" step="0.01" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={shares.destination[idx] || ''} onChange={(e) => updateShares('destination', idx, e.target.value)} />
              </label>
            </div>
          </div>
        ))}
        <button onClick={addDestParty} className="w-full py-2 border border-dashed border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
          + Add Destination Party
        </button>
      </fieldset>
    </div>
  )
}
