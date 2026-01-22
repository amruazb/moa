'use client'

import { useLLCNewMoaStore } from '@/store/llcNewMoaStore'
import { Salutation } from '@/lib/llc_new_moa/types'

export function LLCNewMoaExtractionForm() {
    const { data, updateCompany, updatePartner, updatePartnerRepresentative, updateManager, updateCapital, resetData, loadSampleData } = useLLCNewMoaStore()

    return (
        <div className="space-y-6">
            {/* Company Info Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    New Company Details
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (English)</label>
                        <input
                            type="text"
                            value={data.company.name}
                            onChange={(e) => updateCompany('name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="COMPANY NAME L.L.C"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (Arabic)</label>
                        <input
                            type="text"
                            value={data.company.nameAr}
                            onChange={(e) => updateCompany('nameAr', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                            placeholder="اسم الشركة ذ.م.م"
                            dir="rtl"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Emirate</label>
                        <select
                            value={data.company.emirate}
                            onChange={(e) => {
                                updateCompany('emirate', e.target.value)
                                const emirateAr = e.target.value === 'Abu Dhabi' ? 'أبوظبي' :
                                    e.target.value === 'Dubai' ? 'دبي' :
                                        e.target.value === 'Sharjah' ? 'الشارقة' : e.target.value
                                updateCompany('emirateAr', emirateAr)
                            }}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Sharjah">Sharjah</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">MOA Date</label>
                        <input
                            type="date"
                            value={data.company.moaDate}
                            onChange={(e) => updateCompany('moaDate', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Partner 1 Section */}
            <PartnerSection
                title="First Partner (Company)"
                partnerIndex={0}
                partner={data.partners[0]}
                updatePartner={updatePartner}
                updatePartnerRepresentative={updatePartnerRepresentative}
            />

            {/* Partner 2 Section */}
            <PartnerSection
                title="Second Partner (Company)"
                partnerIndex={1}
                partner={data.partners[1]}
                updatePartner={updatePartner}
                updatePartnerRepresentative={updatePartnerRepresentative}
            />

            {/* Manager Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                <h3 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Managing Director
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Salutation</label>
                        <select
                            value={data.manager.salutation}
                            onChange={(e) => updateManager('salutation', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="mr">Mr.</option>
                            <option value="ms">Ms.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Emirates ID</label>
                        <input
                            type="text"
                            value={data.manager.eid}
                            onChange={(e) => updateManager('eid', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="784-XXXX-XXXXXXX-X"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={data.manager.name}
                            onChange={(e) => updateManager('name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Full name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            value={data.manager.nameAr}
                            onChange={(e) => updateManager('nameAr', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 text-right"
                            placeholder="الاسم الكامل"
                            dir="rtl"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (English)</label>
                        <input
                            type="text"
                            value={data.manager.nationality}
                            onChange={(e) => updateManager('nationality', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Indian"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (Arabic)</label>
                        <input
                            type="text"
                            value={data.manager.nationalityAr}
                            onChange={(e) => updateManager('nationalityAr', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 text-right"
                            placeholder="هندي"
                            dir="rtl"
                        />
                    </div>
                </div>
            </div>

            {/* Capital Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Capital & Shares
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Total Capital (AED)</label>
                        <input
                            type="number"
                            value={data.capital.totalCapital}
                            onChange={(e) => updateCapital('totalCapital', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Total Shares</label>
                        <input
                            type="number"
                            value={data.capital.shareCount}
                            onChange={(e) => updateCapital('shareCount', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Share Value (AED)</label>
                        <input
                            type="number"
                            value={data.capital.shareValue}
                            readOnly
                            className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50"
                        />
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Partner 1 Shares</label>
                        <input
                            type="number"
                            value={data.partners[0].shareCount}
                            onChange={(e) => updatePartner(0, 'shareCount', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Partner 2 Shares</label>
                        <input
                            type="number"
                            value={data.partners[1].shareCount}
                            onChange={(e) => updatePartner(1, 'shareCount', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
                <button
                    onClick={loadSampleData}
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                >
                    Load Sample Data
                </button>
                <button
                    onClick={resetData}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                    Reset Form
                </button>
            </div>
        </div>
    )
}

// Partner Section Component
interface PartnerSectionProps {
    title: string
    partnerIndex: number
    partner: {
        name: string
        nameAr: string
        country: string
        countryAr: string
        licenseNo: string
        address: string
        addressAr: string
        email?: string
        shareCount: number
        representative: {
            salutation: Salutation
            name: string
            nameAr: string
            eid: string
            dob: string
            nationality: string
            nationalityAr: string
        }
    }
    updatePartner: (index: number, field: string, value: string | number) => void
    updatePartnerRepresentative: (partnerIndex: number, field: string, value: string) => void
}

function PartnerSection({ title, partnerIndex, partner, updatePartner, updatePartnerRepresentative }: PartnerSectionProps) {
    const bgColor = partnerIndex === 0 ? 'from-amber-50 to-orange-50' : 'from-cyan-50 to-blue-50'
    const borderColor = partnerIndex === 0 ? 'border-amber-100' : 'border-cyan-100'
    const textColor = partnerIndex === 0 ? 'text-amber-900' : 'text-cyan-900'
    const ringColor = partnerIndex === 0 ? 'focus:ring-amber-500' : 'focus:ring-cyan-500'

    return (
        <div className={`bg-gradient-to-r ${bgColor} rounded-lg p-4 border ${borderColor}`}>
            <h3 className={`font-semibold ${textColor} mb-3 flex items-center gap-2`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {title}
            </h3>

            {/* Company Details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (English)</label>
                    <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => updatePartner(partnerIndex, 'name', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        placeholder="COMPANY NAME LTD"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (Arabic)</label>
                    <input
                        type="text"
                        value={partner.nameAr}
                        onChange={(e) => updatePartner(partnerIndex, 'nameAr', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2 text-right`}
                        placeholder="اسم الشركة"
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country (English)</label>
                    <input
                        type="text"
                        value={partner.country}
                        onChange={(e) => updatePartner(partnerIndex, 'country', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        placeholder="Marshall Islands"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country (Arabic)</label>
                    <input
                        type="text"
                        value={partner.countryAr}
                        onChange={(e) => updatePartner(partnerIndex, 'countryAr', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2 text-right`}
                        placeholder="جزر مارشال"
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">License/Registration No.</label>
                    <input
                        type="text"
                        value={partner.licenseNo}
                        onChange={(e) => updatePartner(partnerIndex, 'licenseNo', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        placeholder="123456"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                    <input
                        type="email"
                        value={partner.email || ''}
                        onChange={(e) => updatePartner(partnerIndex, 'email', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        placeholder="company@email.com"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Address (English)</label>
                    <input
                        type="text"
                        value={partner.address}
                        onChange={(e) => updatePartner(partnerIndex, 'address', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        placeholder="Full address"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Address (Arabic)</label>
                    <input
                        type="text"
                        value={partner.addressAr}
                        onChange={(e) => updatePartner(partnerIndex, 'addressAr', e.target.value)}
                        className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2 text-right`}
                        placeholder="العنوان الكامل"
                        dir="rtl"
                    />
                </div>
            </div>

            {/* Representative Details */}
            <div className="border-t border-gray-200 pt-3 mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Authorized Representative</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Salutation</label>
                        <select
                            value={partner.representative.salutation}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'salutation', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        >
                            <option value="mr">Mr.</option>
                            <option value="ms">Ms.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Emirates ID</label>
                        <input
                            type="text"
                            value={partner.representative.eid}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'eid', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                            placeholder="784-XXXX-XXXXXXX-X"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={partner.representative.name}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'name', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                            placeholder="Full name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            value={partner.representative.nameAr}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'nameAr', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2 text-right`}
                            placeholder="الاسم الكامل"
                            dir="rtl"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            value={partner.representative.dob}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'dob', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (English)</label>
                        <input
                            type="text"
                            value={partner.representative.nationality}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'nationality', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2`}
                            placeholder="Indian"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (Arabic)</label>
                        <input
                            type="text"
                            value={partner.representative.nationalityAr}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'nationalityAr', e.target.value)}
                            className={`w-full px-3 py-2 text-sm border rounded-lg ${ringColor} focus:ring-2 text-right`}
                            placeholder="هندي"
                            dir="rtl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
