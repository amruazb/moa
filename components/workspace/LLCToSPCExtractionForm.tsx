'use client'

import { useState } from 'react'
import { useLLCToSPCStore } from '@/store/llcToSpcStore'
import { Activity } from '@/lib/llc_to_spc/types'

export function LLCToSPCExtractionForm() {
    const {
        conversionData,
        updateFirstParty,
        updateSecondParty,
        updateThirdParty,
        updateNewOwner,
        updateManager,
        updateLicense,
        updateOriginalMOA,
        updateCapitalInfo,
        updateAgreementDate,
        addActivity,
        removeActivity,
        updateActivity,
        resetToDefault
    } = useLLCToSPCStore()

    const { agreementDate, firstParty, secondParty, thirdParty, newOwner, license, originalMOA, capitalInfo, activities } = conversionData

    // State for new activity form
    const [newActivity, setNewActivity] = useState<Partial<Activity>>({ code: '', nameEn: '', nameAr: '' })

    return (
        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Agreement Date */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    Agreement Date
                </h3>
                <div>
                    <input
                        type="date"
                        value={agreementDate || ''}
                        onChange={(e) => updateAgreementDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* First Party */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    First Party (Transferor 1)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={firstParty?.name || ''}
                            onChange={(e) => updateFirstParty({ name: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="Full name in English"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={firstParty?.nameAr || ''}
                            onChange={(e) => updateFirstParty({ nameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="الاسم بالعربية"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                        <select
                            value={firstParty?.salutation || 'mr'}
                            onChange={(e) => updateFirstParty({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        >
                            <option value="mr">Mr.</option>
                            <option value="ms">Ms.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality</label>
                        <input
                            type="text"
                            value={firstParty?.nationality || ''}
                            onChange={(e) => updateFirstParty({ nationality: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="e.g. Indian"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={firstParty?.nationalityAr || ''}
                            onChange={(e) => updateFirstParty({ nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="هندي"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">EID / Passport</label>
                        <input
                            type="text"
                            value={firstParty?.eidOrPassport || ''}
                            onChange={(e) => updateFirstParty({ eidOrPassport: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="784-XXXX-XXXXXXX-X"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                        <input
                            type="text"
                            value={firstParty?.dob || ''}
                            onChange={(e) => updateFirstParty({ dob: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="DD/MM/YYYY"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Shares %</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={firstParty?.sharesPercent || 50}
                        onChange={(e) => updateFirstParty({ sharesPercent: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* Second Party */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Second Party (Transferor 2)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={secondParty?.name || ''}
                            onChange={(e) => updateSecondParty({ name: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Full name in English"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={secondParty?.nameAr || ''}
                            onChange={(e) => updateSecondParty({ nameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="الاسم بالعربية"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                        <select
                            value={secondParty?.salutation || 'mr'}
                            onChange={(e) => updateSecondParty({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="mr">Mr.</option>
                            <option value="ms">Ms.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality</label>
                        <input
                            type="text"
                            value={secondParty?.nationality || ''}
                            onChange={(e) => updateSecondParty({ nationality: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="e.g. Indian"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={secondParty?.nationalityAr || ''}
                            onChange={(e) => updateSecondParty({ nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="هندي"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">EID / Passport</label>
                        <input
                            type="text"
                            value={secondParty?.eidOrPassport || ''}
                            onChange={(e) => updateSecondParty({ eidOrPassport: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="784-XXXX-XXXXXXX-X"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                        <input
                            type="text"
                            value={secondParty?.dob || ''}
                            onChange={(e) => updateSecondParty({ dob: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="DD/MM/YYYY"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Shares %</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={secondParty?.sharesPercent || 50}
                        onChange={(e) => updateSecondParty({ sharesPercent: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* Third Party (Third Selling Partner) */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Third Party (3rd Selling Partner)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={thirdParty?.name || ''}
                            onChange={(e) => updateThirdParty({ name: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                            placeholder="Full name in English"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={thirdParty?.nameAr || ''}
                            onChange={(e) => updateThirdParty({ nameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                            placeholder="الاسم بالعربية"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                        <select
                            value={thirdParty?.salutation || 'mr'}
                            onChange={(e) => updateThirdParty({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                        >
                            <option value="mr">Mr.</option>
                            <option value="ms">Ms.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality</label>
                        <input
                            type="text"
                            value={thirdParty?.nationality || ''}
                            onChange={(e) => updateThirdParty({ nationality: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                            placeholder="e.g. Indian"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={thirdParty?.nationalityAr || ''}
                            onChange={(e) => updateThirdParty({ nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                            placeholder="هندي"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">EID / Passport</label>
                        <input
                            type="text"
                            value={thirdParty?.eidOrPassport || ''}
                            onChange={(e) => updateThirdParty({ eidOrPassport: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                            placeholder="784-XXXX-XXXXXXX-X"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                        <input
                            type="text"
                            value={thirdParty?.dob || ''}
                            onChange={(e) => updateThirdParty({ dob: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                            placeholder="DD/MM/YYYY"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Shares %</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={thirdParty?.sharesPercent || 0}
                        onChange={(e) => updateThirdParty({ sharesPercent: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    />
                </div>
            </div>

            {/* New Owner (Buyer) */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    New Owner (Buyer - 100% Shares)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={newOwner?.name || ''}
                            onChange={(e) => updateNewOwner({ name: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="Full name in English"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={newOwner?.nameAr || ''}
                            onChange={(e) => updateNewOwner({ nameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="الاسم بالعربية"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                        <select
                            value={newOwner?.salutation || 'ms'}
                            onChange={(e) => updateNewOwner({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                        >
                            <option value="mr">Mr.</option>
                            <option value="ms">Ms.</option>
                            <option value="mrs">Mrs.</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality</label>
                        <input
                            type="text"
                            value={newOwner?.nationality || ''}
                            onChange={(e) => updateNewOwner({ nationality: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="e.g. Indian"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={newOwner?.nationalityAr || ''}
                            onChange={(e) => updateNewOwner({ nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="هندي"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">EID / Passport</label>
                        <input
                            type="text"
                            value={newOwner?.eidOrPassport || ''}
                            onChange={(e) => updateNewOwner({ eidOrPassport: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="784-XXXX-XXXXXXX-X"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                        <input
                            type="text"
                            value={newOwner?.dob || ''}
                            onChange={(e) => updateNewOwner({ dob: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="DD/MM/YYYY"
                        />
                    </div>
                </div>
            </div>

            {/* Manager */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    Manager (Managing Director)
                </h3>
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        id="managerSameAsNewOwner"
                        checked={conversionData.manager?.isSameAsThirdParty !== false}
                        onChange={(e) => updateManager({ isSameAsThirdParty: e.target.checked })}
                        className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="managerSameAsNewOwner" className="text-xs text-gray-600">
                        Same as New Owner (Buyer)
                    </label>
                </div>
                {conversionData.manager?.isSameAsThirdParty === false && (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                                <input
                                    type="text"
                                    value={conversionData.manager?.name || ''}
                                    onChange={(e) => updateManager({ name: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="Full name in English"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                                <input
                                    type="text"
                                    dir="rtl"
                                    value={conversionData.manager?.nameAr || ''}
                                    onChange={(e) => updateManager({ nameAr: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="الاسم بالعربية"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                                <select
                                    value={conversionData.manager?.salutation || 'mr'}
                                    onChange={(e) => updateManager({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                >
                                    <option value="mr">Mr.</option>
                                    <option value="ms">Ms.</option>
                                    <option value="mrs">Mrs.</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 mb-1">EID / Passport</label>
                                <input
                                    type="text"
                                    value={conversionData.manager?.eidOrPassport || ''}
                                    onChange={(e) => updateManager({ eidOrPassport: e.target.value })}
                                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                                    placeholder="784-XXXX-XXXXXXX-X"
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* License Information */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    License / Company
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">License Number</label>
                        <input
                            type="text"
                            value={license?.licenseNumber || ''}
                            onChange={(e) => updateLicense({ licenseNumber: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            placeholder="CN-XXXXXXX"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Issuing Authority</label>
                        <input
                            type="text"
                            value={license?.issuingAuthority || ''}
                            onChange={(e) => updateLicense({ issuingAuthority: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            placeholder="DED Abu Dhabi"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Old Company Name (English)</label>
                        <input
                            type="text"
                            value={license?.oldCompanyName || ''}
                            onChange={(e) => updateLicense({ oldCompanyName: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            placeholder="Company - L.L.C"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Old Company Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={license?.oldCompanyNameAr || ''}
                            onChange={(e) => updateLicense({ oldCompanyNameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            placeholder="اسم الشركة ذ.م.م"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">New Company Name (English)</label>
                        <input
                            type="text"
                            value={license?.companyName || ''}
                            onChange={(e) => updateLicense({ companyName: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            placeholder="Company - L.L.C - S.P.C"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">New Company Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={license?.companyNameAr || ''}
                            onChange={(e) => updateLicense({ companyNameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                            placeholder="اسم الشركة ذ.م.م - ش.ش.و"
                        />
                    </div>
                </div>
            </div>

            {/* Original MOA */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Original MOA Reference
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">MOA Number</label>
                        <input
                            type="text"
                            value={originalMOA?.moaNumber || ''}
                            onChange={(e) => updateOriginalMOA({ moaNumber: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            placeholder="Notary attestation number"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">MOA Date</label>
                        <input
                            type="text"
                            value={originalMOA?.moaDate || ''}
                            onChange={(e) => updateOriginalMOA({ moaDate: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                            placeholder="DD/MM/YYYY"
                        />
                    </div>
                </div>
            </div>

            {/* Capital & Shares */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Capital & Shares
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Total Capital (AED)</label>
                        <input
                            type="number"
                            value={capitalInfo?.capital || 10000}
                            onChange={(e) => updateCapitalInfo({ capital: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="10000"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Share Count</label>
                        <input
                            type="number"
                            value={capitalInfo?.shareCount || 100}
                            onChange={(e) => updateCapitalInfo({ shareCount: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="100"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Share Value (AED)</label>
                        <input
                            type="number"
                            value={capitalInfo?.shareValue || 100}
                            onChange={(e) => updateCapitalInfo({ shareValue: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                            placeholder="100"
                        />
                    </div>
                </div>
            </div>

            {/* Activities */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                    Company Activities / Objectives
                </h3>

                {/* Current Activities List */}
                <div className="space-y-2">
                    {(activities || []).map((activity, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-400 font-mono">{activity.code || 'N/A'}</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={activity.nameEn}
                                        onChange={(e) => updateActivity(index, { nameEn: e.target.value })}
                                        className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Activity name (English)"
                                    />
                                    <input
                                        type="text"
                                        dir="rtl"
                                        value={activity.nameAr}
                                        onChange={(e) => updateActivity(index, { nameAr: e.target.value })}
                                        className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="اسم النشاط (عربي)"
                                    />
                                </div>
                                <button
                                    onClick={() => removeActivity(index)}
                                    className="text-red-400 hover:text-red-600 p-1"
                                    title="Remove activity"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add New Activity */}
                <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
                    <p className="text-xs text-cyan-700 font-medium mb-2">Add New Activity</p>
                    <div className="space-y-2">
                        <input
                            type="text"
                            value={newActivity.code || ''}
                            onChange={(e) => setNewActivity({ ...newActivity, code: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-cyan-200 rounded focus:ring-1 focus:ring-cyan-500"
                            placeholder="Activity code (optional)"
                        />
                        <input
                            type="text"
                            value={newActivity.nameEn || ''}
                            onChange={(e) => setNewActivity({ ...newActivity, nameEn: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-cyan-200 rounded focus:ring-1 focus:ring-cyan-500"
                            placeholder="Activity name (English)"
                        />
                        <input
                            type="text"
                            dir="rtl"
                            value={newActivity.nameAr || ''}
                            onChange={(e) => setNewActivity({ ...newActivity, nameAr: e.target.value })}
                            className="w-full px-2 py-1 text-xs border border-cyan-200 rounded focus:ring-1 focus:ring-cyan-500"
                            placeholder="اسم النشاط (عربي)"
                        />
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault()
                                if (newActivity.nameEn) {
                                    addActivity({
                                        code: newActivity.code || '',
                                        nameEn: newActivity.nameEn,
                                        nameAr: newActivity.nameAr || ''
                                    })
                                    setNewActivity({ code: '', nameEn: '', nameAr: '' })
                                }
                            }}
                            disabled={!newActivity.nameEn}
                            className="w-full px-2 py-1 text-xs text-white bg-cyan-500 rounded hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                        >
                            + Add Activity
                        </button>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200">
                <button
                    onClick={resetToDefault}
                    className="w-full px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                    Reset to Sample Data
                </button>
            </div>
        </div>
    )
}
