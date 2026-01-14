"use client"

import { useState } from 'react'
import { OCRUpload } from './OCRUpload'
import { TradeCertificateData } from '@/lib/ocr/types'
import { useLLCToSPCStore } from '@/store/llcToSpcStore'

export function LLCSPCOCRPanel() {
    const [extractionStatus, setExtractionStatus] = useState<string | null>(null)

    const {
        updateThirdParty,
        updateManager,
        updateLicense
    } = useLLCToSPCStore()

    const handleTradeCertificateExtracted = (data: TradeCertificateData) => {
        // Clean up trade name - remove "Trade Name" prefix if present
        const cleanName = (name: string) => name?.replace(/^Trade\s*Name[:\s]*/i, '').trim() || ''

        // Update company/license info
        updateLicense({
            companyName: cleanName(data.tradeName),
            companyNameAr: data.tradeNameAr
        })

        // Find owner and manager from the owners array
        const ownerData = data.owners.find(o =>
            o.role.toLowerCase() === 'owner' || o.role === 'مالك'
        )
        const managerData = data.owners.find(o =>
            o.role.toLowerCase() === 'manager' || o.role === 'مدير'
        )

        // Update Third Party (New Owner) if owner data found
        if (ownerData) {
            updateThirdParty({
                name: ownerData.nameEn,
                nameAr: ownerData.nameAr,
                nationality: ownerData.nationality,
                nationalityAr: ownerData.nationalityAr
            })
        }

        // Update Manager if manager data found and different from owner
        if (managerData) {
            const isSameAsOwner = ownerData &&
                managerData.nameEn.toLowerCase() === ownerData.nameEn.toLowerCase()

            if (isSameAsOwner) {
                updateManager({ isSameAsThirdParty: true })
            } else {
                updateManager({
                    isSameAsThirdParty: false,
                    name: managerData.nameEn,
                    nameAr: managerData.nameAr
                })
            }
        }

        // Build status message
        const extractedItems = []
        if (data.tradeName) extractedItems.push('Trade Name')
        if (ownerData) extractedItems.push('Owner')
        if (managerData) extractedItems.push('Manager')

        setExtractionStatus(
            extractedItems.length > 0
                ? `Extracted: ${extractedItems.join(', ')}`
                : 'No owner/manager data found'
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-sm font-semibold text-gray-900">Scan New Trade License (SPC)</h2>
            </div>

            <p className="text-xs text-gray-500 mb-3">
                Upload the new trade license after conversion to auto-fill owner and manager details.
            </p>

            <OCRUpload
                documentType="trade_certificate"
                onExtracted={handleTradeCertificateExtracted}
                label="New Trade License"
                description="Extracts: Trade Name, Owner, Manager, Nationality"
            />

            {extractionStatus && (
                <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
                    ✓ {extractionStatus}
                </div>
            )}
        </div>
    )
}
