'use client'

import { usePOAStore } from '@/store/poaStore'

export function POAExtractionForm() {
    const {
        poaData,
        updatePrincipal,
        updateAttorney,
        updateLicense,
        updateSections,
        updateValidity,
        resetToDefault
    } = usePOAStore()

    const { principal, attorney, license, sections, validity } = poaData

    return (
        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Principal Information */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Principal (Power Giver)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={principal?.name || ''}
                            onChange={(e) => updatePrincipal({ name: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="Full name in English"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={principal?.nameAr || ''}
                            onChange={(e) => updatePrincipal({ nameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="الاسم بالعربية"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                        <select
                            value={principal?.salutation || 'mr'}
                            onChange={(e) => updatePrincipal({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
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
                            value={principal?.nationality || ''}
                            onChange={(e) => updatePrincipal({ nationality: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="e.g. UAE"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={principal?.nationalityAr || ''}
                            onChange={(e) => updatePrincipal({ nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="إماراتية"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">EID / Passport Number</label>
                    <input
                        type="text"
                        value={principal?.eidOrPassport || ''}
                        onChange={(e) => updatePrincipal({ eidOrPassport: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        placeholder="784-XXXX-XXXXXXX-X"
                    />
                </div>
            </div>

            {/* Attorney Information */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Attorney (Power Receiver)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={attorney?.name || ''}
                            onChange={(e) => updateAttorney({ name: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Full name in English"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={attorney?.nameAr || ''}
                            onChange={(e) => updateAttorney({ nameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="الاسم بالعربية"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                        <select
                            value={attorney?.salutation || 'mr'}
                            onChange={(e) => updateAttorney({ salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
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
                            value={attorney?.nationality || ''}
                            onChange={(e) => updateAttorney({ nationality: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="e.g. Indian"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={attorney?.nationalityAr || ''}
                            onChange={(e) => updateAttorney({ nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="هندي"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">EID / Passport Number</label>
                    <input
                        type="text"
                        value={attorney?.eidOrPassport || ''}
                        onChange={(e) => updateAttorney({ eidOrPassport: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="784-XXXX-XXXXXXX-X"
                    />
                </div>
            </div>

            {/* License Information */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    License / Company Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">License Number</label>
                        <input
                            type="text"
                            value={license?.licenseNumber || ''}
                            onChange={(e) => updateLicense({ licenseNumber: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="CN-XXXXXXX"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Issuing Authority</label>
                        <input
                            type="text"
                            value={license?.issuingAuthority || ''}
                            onChange={(e) => updateLicense({ issuingAuthority: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="Department of Economic Development"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Company Name (English)</label>
                        <input
                            type="text"
                            value={license?.companyName || ''}
                            onChange={(e) => updateLicense({ companyName: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="Company - L.L.C"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Company Name (Arabic)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={license?.companyNameAr || ''}
                            onChange={(e) => updateLicense({ companyNameAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            placeholder="اسم الشركة ذ.م.م"
                        />
                    </div>
                </div>
            </div>

            {/* POA Sections (Powers Granted) */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Powers Granted
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.executeTransactions ?? true}
                            onChange={(e) => updateSections({ executeTransactions: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Execute Transactions
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.employees ?? true}
                            onChange={(e) => updateSections({ employees: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Employees
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.utilities ?? true}
                            onChange={(e) => updateSections({ utilities: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Utilities
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.banks ?? true}
                            onChange={(e) => updateSections({ banks: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Banks
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.contracts ?? true}
                            onChange={(e) => updateSections({ contracts: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Contracts
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.receivables ?? true}
                            onChange={(e) => updateSections({ receivables: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Receivables
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.motorVehicles ?? true}
                            onChange={(e) => updateSections({ motorVehicles: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Motor Vehicles
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={sections?.approachCourts ?? true}
                            onChange={(e) => updateSections({ approachCourts: e.target.checked })}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                        />
                        Approach Courts
                    </label>
                </div>

                {/* Banks - With/Without Loan Toggle */}
                {sections?.banks && (
                    <div className="ml-6 mt-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <label className="flex items-center gap-2 text-sm font-medium text-orange-700">
                            <input
                                type="checkbox"
                                checked={sections?.banksWithLoan ?? false}
                                onChange={(e) => updateSections({ banksWithLoan: e.target.checked })}
                                className="w-4 h-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500"
                            />
                            With Loan Facilities
                        </label>
                        <p className="text-xs text-orange-600 mt-1 ml-6">
                            {sections?.banksWithLoan
                                ? 'Includes cash loan from banks'
                                : 'Without cash loan from banks'}
                        </p>
                    </div>
                )}
            </div>

            {/* Validity Period */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Validity Period
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Duration (Years)</label>
                        <select
                            value={validity?.years || 3}
                            onChange={(e) => updateValidity({ years: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                        >
                            <option value={1}>1 Year</option>
                            <option value={2}>2 Years</option>
                            <option value={3}>3 Years</option>
                            <option value={4}>4 Years</option>
                            <option value={5}>5 Years</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Attestation Date</label>
                        <input
                            type="date"
                            value={validity?.attestationDate || ''}
                            onChange={(e) => updateValidity({ attestationDate: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                        />
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
