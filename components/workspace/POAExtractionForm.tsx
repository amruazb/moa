'use client'

import { usePOAStore } from '@/store/poaStore'
import { PrincipalSection } from './PrincipalSection'
import { AttorneySection } from './AttorneySection'

export function POAExtractionForm() {
    const {
        poaData,
        addPrincipal,
        removePrincipal,
        addAttorney,
        removeAttorney,
        updateLicense,
        updateSections,
        updateValidity,
        resetToDefault
    } = usePOAStore()

    const { principals, attorneys, attorney, license, sections, validity } = poaData
    
    // Support both attorneys array (new) and attorney (legacy)
    const attorneysList = attorneys || (attorney ? [attorney] : [])

    return (
        <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            {/* Principals Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-800">Principals (Power Givers)</h2>
                    <button
                        onClick={addPrincipal}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Principal
                    </button>
                </div>

                {/* Render all principals dynamically */}
                {principals?.map((principal, index) => (
                    <div key={index} className="space-y-3">
                        <PrincipalSection
                            principal={principal}
                            index={index}
                            canRemove={(principals?.length || 0) > 1}
                            onRemove={() => removePrincipal(index)}
                        />
                    </div>
                ))}
            </div>

            {/* Attorneys Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-gray-800">Attorneys (Power Receivers)</h2>
                    <button
                        onClick={addAttorney}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Attorney
                    </button>
                </div>

                {/* Render all attorneys dynamically */}
                {attorneysList.map((attorney, index) => (
                    <div key={index} className="space-y-3">
                        <AttorneySection
                            attorney={attorney}
                            index={index}
                            canRemove={attorneysList.length > 1}
                            onRemove={() => removeAttorney(index)}
                        />
                    </div>
                ))}
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

            {/* Restrictions / Points to Note */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Restrictions / Points to Note
                </h3>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-xs text-red-700 mb-3 font-medium">Enable restrictions to add "Points to note" section in the document:</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={sections?.noSaleVehiclesAssets ?? false}
                                onChange={(e) => updateSections({ noSaleVehiclesAssets: e.target.checked })}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            No right to sale any of vehicles /assets
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={sections?.noLoansFacilities ?? false}
                                onChange={(e) => updateSections({ noLoansFacilities: e.target.checked })}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            No any type of loans /facilities from any bank
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={sections?.noChequeBooks ?? false}
                                onChange={(e) => updateSections({ noChequeBooks: e.target.checked })}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            No any right to cheque books
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={sections?.noSignCheques ?? false}
                                onChange={(e) => updateSections({ noSignCheques: e.target.checked })}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            No any right to sign the cheques
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="checkbox"
                                checked={sections?.noTransferShares ?? false}
                                onChange={(e) => updateSections({ noTransferShares: e.target.checked })}
                                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                            />
                            No any right to transfer shares or ownership
                        </label>
                    </div>
                </div>
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
