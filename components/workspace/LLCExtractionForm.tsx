"use client"

import { useState, useCallback, useRef } from 'react'
import { useDocumentStore, PartyData } from '@/store/documentStore'
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
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${isProcessing ? 'bg-blue-100 text-blue-600' :
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

// Partner card component for each partner
function PartnerCard({
    partner,
    index,
    totalShares,
    onUpdate,
    onUpdateShares,
    onRemove,
    onEIDExtracted,
    onPassportExtracted,
    canRemove
}: {
    partner: PartyData & { shareCount?: number }
    index: number
    totalShares: number
    onUpdate: (field: string, value: string) => void
    onUpdateShares: (value: number) => void
    onRemove: () => void
    onEIDExtracted: (data: EmiratesIDData) => void
    onPassportExtracted: (data: PassportData) => void
    canRemove: boolean
}) {
    const shareCount = partner.shareCount || 0
    const sharePercent = totalShares > 0 ? ((shareCount / totalShares) * 100).toFixed(2) : '0.00'

    return (
        <div className="border border-purple-200 rounded-lg p-3 space-y-2 bg-purple-50/30">
            <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-purple-700">Partner {index + 1}</h4>
                <div className="flex items-center gap-2">
                    <OCRButton
                        documentType="emirates_id"
                        onExtracted={onEIDExtracted}
                        label="Scan EID"
                    />
                    <OCRButton
                        documentType="passport"
                        onExtracted={onPassportExtracted}
                        label="Scan Passport"
                    />
                    {canRemove && (
                        <button
                            onClick={onRemove}
                            className="px-2 py-1 text-xs text-red-600 hover:bg-red-100 rounded"
                            title="Remove partner"
                        >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <label className="block text-xs text-gray-600">Title
                    <select
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.salutation || 'mr'}
                        onChange={(e) => onUpdate('salutation', e.target.value)}
                    >
                        <option value="mr">Mr.</option>
                        <option value="ms">Ms.</option>
                        <option value="mrs">Mrs.</option>
                    </select>
                </label>
                <label className="block text-xs text-gray-600 col-span-2">Name (EN)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.name || ''}
                        onChange={(e) => onUpdate('name', e.target.value)}
                    />
                </label>
                <label className="block text-xs text-gray-600">Name (AR)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        dir="rtl"
                        value={partner.nameAr || ''}
                        onChange={(e) => onUpdate('nameAr', e.target.value)}
                    />
                </label>
                <label className="block text-xs text-gray-600">Nationality (EN)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.nationality || ''}
                        onChange={(e) => onUpdate('nationality', e.target.value)}
                    />
                </label>
                <label className="block text-xs text-gray-600">Nationality (AR)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        dir="rtl"
                        value={partner.nationalityAr || ''}
                        onChange={(e) => onUpdate('nationalityAr', e.target.value)}
                    />
                </label>
                <label className="block text-xs text-gray-600">ID Type
                    <select
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.documentType || 'eid'}
                        onChange={(e) => onUpdate('documentType', e.target.value)}
                    >
                        <option value="eid">Emirates ID</option>
                        <option value="passport">Passport</option>
                    </select>
                </label>
                <label className="block text-xs text-gray-600">ID Number ({partner.documentType === 'passport' ? 'Passport' : 'EID'})
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.documentType === 'passport' ? (partner.passportNumber || '') : (partner.eidNumber || '')}
                        onChange={(e) => onUpdate(partner.documentType === 'passport' ? 'passportNumber' : 'eidNumber', e.target.value)}
                    />
                </label>
                <label className="block text-xs text-gray-600">UID Number (Passport)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.uidNumber || ''}
                        onChange={(e) => onUpdate('uidNumber', e.target.value)}
                        placeholder="For passport holders"
                    />
                </label>
                <label className="block text-xs text-gray-600">Date of Birth
                    <input
                        type="date"
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.dob || ''}
                        onChange={(e) => onUpdate('dob', e.target.value)}
                    />
                </label>
                <label className="block text-xs text-gray-600">Address (EN)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={partner.address || ''}
                        onChange={(e) => onUpdate('address', e.target.value)}
                        placeholder="e.g., Abu Dhabi, U.A.E"
                    />
                </label>
                <label className="block text-xs text-gray-600">Address (AR)
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        dir="rtl"
                        value={partner.addressAr || ''}
                        onChange={(e) => onUpdate('addressAr', e.target.value)}
                        placeholder="أبوظبي، الإمارات"
                    />
                </label>
            </div>

            {/* Share Distribution */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-purple-200">
                <label className="block text-xs text-gray-600">Share Count
                    <input
                        type="number"
                        className="mt-1 w-full rounded border px-2 py-1 text-xs"
                        value={shareCount || ''}
                        onChange={(e) => onUpdateShares(parseInt(e.target.value) || 0)}
                        placeholder="e.g., 50"
                    />
                </label>
                <label className="block text-xs text-gray-600">Share Percentage
                    <input
                        className="mt-1 w-full rounded border px-2 py-1 text-xs bg-gray-50"
                        value={`${sharePercent}%`}
                        readOnly
                        title="Auto-calculated from share count"
                    />
                </label>
            </div>
        </div>
    )
}

export function LLCExtractionForm() {
    const { extractedData, setExtractedData, resetToLLCDefault } = useDocumentStore()
    const company = extractedData.company || {}
    const sourceParties = extractedData.sourceParties || [{}, {}] // Default 2 partners
    const managerArticle = extractedData.managerArticle || {}
    const capitalData = extractedData.capital || { totalCapital: 10000, shareCount: 100, shareValue: 100 }

    // Calculate total shares from all partners
    const partnerShares = sourceParties.map((p: any) => p.shareCount || 0)
    const totalPartnerShares = partnerShares.reduce((a: number, b: number) => a + b, 0)

    const updateCompany = (field: string, value: string) => {
        setExtractedData({ company: { ...company, [field]: value } })
    }

    const updatePartner = (idx: number, field: string, value: string | number) => {
        const updated = [...sourceParties]
        updated[idx] = { ...updated[idx], [field]: value }
        setExtractedData({ sourceParties: updated })
    }

    const updatePartnerShares = (idx: number, value: number) => {
        const updated = [...sourceParties] as any[]
        updated[idx] = { ...updated[idx], shareCount: value }
        setExtractedData({ sourceParties: updated })
    }

    const addPartner = () => {
        setExtractedData({ sourceParties: [...sourceParties, {}] })
    }

    const removePartner = (idx: number) => {
        if (sourceParties.length <= 2) return // Minimum 2 partners
        const updated = sourceParties.filter((_: any, i: number) => i !== idx)
        setExtractedData({ sourceParties: updated })
    }

    const updateManager = (field: string, value: string) => {
        setExtractedData({ managerArticle: { ...managerArticle, [field]: value } })
    }

    const updateCapital = (field: string, value: number) => {
        const updated = { ...capitalData, [field]: value }
        if (field === 'totalCapital' || field === 'shareCount') {
            const capital = field === 'totalCapital' ? value : (updated.totalCapital || 10000)
            const shares = field === 'shareCount' ? value : (updated.shareCount || 100)
            if (shares > 0) {
                updated.shareValue = Math.round((capital / shares) * 100) / 100
            }
        }
        setExtractedData({ capital: updated })
    }

    const handlePartnerEIDExtracted = (idx: number) => (data: EmiratesIDData) => {
        const updated = [...sourceParties]
        updated[idx] = {
            ...updated[idx],
            eidNumber: data.idNumber || updated[idx].eidNumber,
            dob: data.dateOfBirth || updated[idx].dob,
            documentType: 'eid',
        }
        setExtractedData({ sourceParties: updated })
    }

    const handlePartnerPassportExtracted = (idx: number) => (data: PassportData) => {
        const updated = [...sourceParties]
        updated[idx] = {
            ...updated[idx],
            passportNumber: data.passportNumber || updated[idx].passportNumber,
            dob: data.dateOfBirth || updated[idx].dob,
            documentType: 'passport',
        }
        setExtractedData({ sourceParties: updated })
    }

    const handleManagerEIDExtracted = (data: EmiratesIDData) => {
        setExtractedData({
            managerArticle: {
                ...managerArticle,
                managerIdNumber: data.idNumber || managerArticle.managerIdNumber,
                managerDob: data.dateOfBirth || managerArticle.managerDob,
                managerDocType: 'eid'
            }
        })
    }

    const handleManagerPassportExtracted = (data: PassportData) => {
        setExtractedData({
            managerArticle: {
                ...managerArticle,
                managerIdNumber: data.passportNumber || managerArticle.managerIdNumber,
                managerDob: data.dateOfBirth || managerArticle.managerDob,
                managerDocType: 'passport'
            }
        })
    }

    const handleTradeCertificateExtracted = (data: TradeCertificateData) => {
        const cleanName = (name: string) => name?.replace(/^Trade\s*Name[:\s]*/i, '').trim() || ''

        // Update company info
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

        // Update partners from owners list
        if (data.owners && data.owners.length > 0) {
            // Filter to only partners (exclude manager-only entries)
            const partners = data.owners.filter(o =>
                o.role?.toLowerCase() === 'partner' ||
                o.role?.toLowerCase() === 'owner' ||
                !o.role
            )

            if (partners.length > 0) {
                const newPartners = partners.map((owner, idx) => ({
                    ...(sourceParties[idx] || {}),
                    name: owner.nameEn,
                    nameAr: owner.nameAr,
                    nationality: owner.nationality,
                    nationalityAr: owner.nationalityAr,
                    capacity: owner.role,
                    capacityAr: owner.roleAr,
                }))
                setExtractedData({ sourceParties: newPartners })
            }

            // Find and set manager
            const manager = data.owners.find(o => o.role?.toLowerCase() === 'manager')
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

    const syncManagerFromPartner = (idx: number) => {
        const partner = sourceParties[idx]
        if (partner) {
            setExtractedData({
                managerArticle: {
                    ...managerArticle,
                    managerName: partner.name || '',
                    managerNameAr: partner.nameAr || '',
                    managerNationality: partner.nationality || '',
                    managerNationalityAr: partner.nationalityAr || '',
                    managerIdNumber: partner.eidNumber || partner.passportNumber || '',
                    managerDocType: partner.eidNumber ? 'eid' : 'passport',
                    managerAddress: partner.address || '',
                    managerAddressAr: partner.addressAr || ''
                }
            })
        }
    }

    const handleClearCache = () => {
        if (confirm('Are you sure you want to clear all data and reset to defaults?')) {
            resetToLLCDefault()
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
                    <label className="block text-xs text-gray-600">Emirate (EN)
                        <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.emirate || ''} onChange={(e) => updateCompany('emirate', e.target.value)} />
                    </label>
                    <label className="block text-xs text-gray-600">Emirate (AR)
                        <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={company.emirateAr || ''} onChange={(e) => updateCompany('emirateAr', e.target.value)} />
                    </label>
                    <label className="block text-xs text-gray-600">MOA Date
                        <input type="date" className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.moaDate || ''} onChange={(e) => updateCompany('moaDate', e.target.value)} />
                    </label>
                    <label className="block text-xs text-gray-600">License Number
                        <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={company.licenseNumber || ''} onChange={(e) => updateCompany('licenseNumber', e.target.value)} />
                    </label>
                </div>
                <label className="block text-xs text-gray-600">Activities (EN)
                    <textarea className="mt-1 w-full rounded border px-2 py-1 text-xs" rows={2} value={company.activities || ''} onChange={(e) => updateCompany('activities', e.target.value)} />
                </label>
                <label className="block text-xs text-gray-600">Activities (AR)
                    <textarea className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" rows={2} value={company.activitiesAr || ''} onChange={(e) => updateCompany('activitiesAr', e.target.value)} />
                </label>
            </fieldset>

            {/* Capital & Shares Section */}
            <fieldset className="border border-gray-200 rounded-xl p-3 space-y-2">
                <legend className="text-xs font-semibold text-slate-900 px-2">Capital & Shares (Article 5)</legend>
                <div className="grid grid-cols-3 gap-2">
                    <label className="block text-xs text-gray-600">Total Capital (AED)
                        <input
                            type="number"
                            className="mt-1 w-full rounded border px-2 py-1 text-xs"
                            value={capitalData.totalCapital || ''}
                            onChange={(e) => updateCapital('totalCapital', parseFloat(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block text-xs text-gray-600">Number of Shares
                        <input
                            type="number"
                            className="mt-1 w-full rounded border px-2 py-1 text-xs"
                            value={capitalData.shareCount || ''}
                            onChange={(e) => updateCapital('shareCount', parseFloat(e.target.value) || 0)}
                        />
                    </label>
                    <label className="block text-xs text-gray-600">Value per Share (AED)
                        <input
                            className="mt-1 w-full rounded border px-2 py-1 text-xs bg-gray-50"
                            value={capitalData.shareValue || ''}
                            readOnly
                        />
                    </label>
                </div>
                <div className="text-[10px] text-gray-500 bg-blue-50 p-2 rounded">
                    <strong>Preview:</strong> AED {(capitalData.totalCapital || 0).toLocaleString()} ÷ {capitalData.shareCount || 0} shares = AED {(capitalData.shareValue || 0).toLocaleString()}/share
                </div>
                {totalPartnerShares !== capitalData.shareCount && totalPartnerShares > 0 && (
                    <div className="text-[10px] text-orange-600 bg-orange-50 p-2 rounded">
                        ⚠️ Partner shares ({totalPartnerShares}) don't match total shares ({capitalData.shareCount})
                    </div>
                )}
            </fieldset>

            {/* Partners Section */}
            <fieldset className="border border-purple-300 rounded-xl p-3 space-y-3 bg-purple-50/20">
                <legend className="text-xs font-semibold text-purple-800 px-2">Partners (Shareholders)</legend>

                {sourceParties.map((partner: any, idx: number) => (
                    <PartnerCard
                        key={idx}
                        partner={partner}
                        index={idx}
                        totalShares={capitalData.shareCount || 100}
                        onUpdate={(field, value) => updatePartner(idx, field, value)}
                        onUpdateShares={(value) => updatePartnerShares(idx, value)}
                        onRemove={() => removePartner(idx)}
                        onEIDExtracted={handlePartnerEIDExtracted(idx)}
                        onPassportExtracted={handlePartnerPassportExtracted(idx)}
                        canRemove={sourceParties.length > 2}
                    />
                ))}

                <button
                    onClick={addPartner}
                    className="w-full py-2 text-xs font-medium text-purple-600 bg-white border border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
                >
                    + Add Partner
                </button>
            </fieldset>

            {/* Manager Section */}
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
                    <select
                        onChange={(e) => {
                            const idx = parseInt(e.target.value)
                            if (!isNaN(idx)) syncManagerFromPartner(idx)
                        }}
                        className="text-xs rounded border px-2 py-1 bg-green-50 text-green-700"
                        defaultValue=""
                    >
                        <option value="" disabled>Copy from Partner...</option>
                        {sourceParties.map((_: any, idx: number) => (
                            <option key={idx} value={idx}>Partner {idx + 1}</option>
                        ))}
                    </select>
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
                    <label className="block text-xs text-gray-600">Address (EN)
                        <input className="mt-1 w-full rounded border px-2 py-1 text-xs" value={managerArticle.managerAddress || ''} onChange={(e) => updateManager('managerAddress', e.target.value)} placeholder="e.g., Abu Dhabi, U.A.E" />
                    </label>
                    <label className="block text-xs text-gray-600">Address (AR)
                        <input className="mt-1 w-full rounded border px-2 py-1 text-xs" dir="rtl" value={managerArticle.managerAddressAr || ''} onChange={(e) => updateManager('managerAddressAr', e.target.value)} placeholder="مثال: أبوظبي، الإمارات" />
                    </label>
                </div>
            </fieldset>
        </div>
    )
}
