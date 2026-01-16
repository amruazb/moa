"use client"

import { useState } from 'react'
import { OCRUpload } from './OCRUpload'
import { TradeCertificateData } from '@/lib/ocr/types'
import { useLLCToSPCStore } from '@/store/llcToSpcStore'

export function LLCSPCOCRPanel() {
    const [oldLicenseStatus, setOldLicenseStatus] = useState<string | null>(null)
    const [newLicenseStatus, setNewLicenseStatus] = useState<string | null>(null)

    const {
        updateFirstParty,
        updateSecondParty,
        updateThirdParty,
        updateNewOwner,
        updateManager,
        updateLicense,
        updateActivities
    } = useLLCToSPCStore()

    // Handler for OLD LLC license (before conversion)
    const handleOldLicenseExtracted = (data: TradeCertificateData) => {
        const cleanName = (name: string) => name?.replace(/^Trade\s*Name[:\s]*/i, '').trim() || ''

        // Update OLD company name and license number
        updateLicense({
            oldCompanyName: cleanName(data.tradeName),
            oldCompanyNameAr: data.tradeNameAr,
            licenseNumber: data.economicRegistryNumber || data.transactionNumber || ''
        })

        // Find partners from the owners array (more flexible matching)
        const partners = data.owners.filter(o => {
            const roleLower = o.role.toLowerCase()
            return (
                roleLower.includes('partner') ||
                roleLower.includes('owner') ||
                roleLower.includes('shareholder') ||
                roleLower.includes('member') ||
                o.role.includes('شريك') ||
                o.role.includes('مالك') ||
                o.role.includes('عضو')
            )
        })

        // Update First Party (first partner)
        if (partners.length >= 1) {
            const firstPartner = partners[0]
            updateFirstParty({
                name: firstPartner.nameEn,
                nameAr: firstPartner.nameAr,
                nationality: firstPartner.nationality,
                nationalityAr: firstPartner.nationalityAr
            })
        }

        // Update Second Party (second partner)
        if (partners.length >= 2) {
            const secondPartner = partners[1]
            updateSecondParty({
                name: secondPartner.nameEn,
                nameAr: secondPartner.nameAr,
                nationality: secondPartner.nationality,
                nationalityAr: secondPartner.nationalityAr
            })
        }

        // Update Third Party (third partner - selling)
        if (partners.length >= 3) {
            const thirdPartner = partners[2]
            updateThirdParty({
                name: thirdPartner.nameEn,
                nameAr: thirdPartner.nameAr,
                nationality: thirdPartner.nationality,
                nationalityAr: thirdPartner.nationalityAr
            })
        }

        // Update Activities from old license
        if (data.activities && data.activities.length > 0) {
            const activities = data.activities.map(a => ({
                code: a.code || '',
                nameEn: a.nameEn,
                nameAr: a.nameAr
            }))
            updateActivities(activities)
        }

        // Build status message
        const extractedItems = []
        if (data.tradeName) extractedItems.push('Company Name')
        if (partners.length >= 1) extractedItems.push('First Partner')
        if (partners.length >= 2) extractedItems.push('Second Partner')
        if (partners.length >= 3) extractedItems.push('Third Partner')
        if (data.activities && data.activities.length > 0) {
            extractedItems.push(`${data.activities.length} Activities`)
        }

        setOldLicenseStatus(
            extractedItems.length > 0
                ? `Extracted: ${extractedItems.join(', ')}`
                : 'No partner data found'
        )
    }

    // Handler for NEW SPC license (after conversion)
    const handleNewLicenseExtracted = (data: TradeCertificateData) => {
        const cleanName = (name: string) => name?.replace(/^Trade\s*Name[:\s]*/i, '').trim() || ''

        // Update NEW company name
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

        // Update New Owner (buyer) if owner data found
        if (ownerData) {
            updateNewOwner({
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
        if (data.tradeName) extractedItems.push('New Company Name')
        if (ownerData) extractedItems.push('New Owner')
        if (managerData) extractedItems.push('Manager')

        setNewLicenseStatus(
            extractedItems.length > 0
                ? `Extracted: ${extractedItems.join(', ')}`
                : 'No owner/manager data found'
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4 space-y-4">
            {/* Scan OLD LLC License */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-sm font-semibold text-gray-900">1. Scan OLD Trade License (LLC)</h2>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                    Upload the original LLC trade license to get partners and company details.
                </p>
                <OCRUpload
                    documentType="trade_certificate"
                    onExtracted={handleOldLicenseExtracted}
                    label="Old LLC License"
                    description="Extracts: Company Name, Partners, Activities"
                />
                {oldLicenseStatus && (
                    <div className="mt-2 text-xs text-orange-600 bg-orange-50 border border-orange-200 rounded px-2 py-1">
                        ✓ {oldLicenseStatus}
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Scan NEW SPC License */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h2 className="text-sm font-semibold text-gray-900">2. Scan NEW Trade License (SPC)</h2>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                    Upload the new SPC trade license to get new owner and manager details.
                </p>
                <OCRUpload
                    documentType="trade_certificate"
                    onExtracted={handleNewLicenseExtracted}
                    label="New SPC License"
                    description="Extracts: New Company Name, New Owner, Manager"
                />
                {newLicenseStatus && (
                    <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded px-2 py-1">
                        ✓ {newLicenseStatus}
                    </div>
                )}
            </div>
        </div>
    )
}
