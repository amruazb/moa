'use client'

import { useLLCAmendmentMoaStore } from '@/store/llcAmendmentMoaStore'
import { Salutation, mergeManagingDirectorPowers } from '@/lib/llc_amendment_moa/types'

export function LLCAmendmentMoaExtractionForm() {
    const { data, updateCompany, updatePartner, updatePartnerRepresentative, togglePartnerRepresentative, updateManager, updateCapital, updateManagingDirectorPowers, resetData, loadSampleData } = useLLCAmendmentMoaStore()
    const powers = mergeManagingDirectorPowers(data.managingDirectorPowers)

    return (
        <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={loadSampleData}
                    className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    Load Sample
                </button>
                <button
                    onClick={resetData}
                    className="px-3 py-1.5 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                >
                    Reset All
                </button>
            </div>

            {/* Company Information */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">Company Information</h3>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (EN)</label>
                        <input
                            type="text"
                            value={data.company.name}
                            onChange={(e) => updateCompany('name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Company Name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (AR)</label>
                        <input
                            type="text"
                            value={data.company.nameAr}
                            onChange={(e) => updateCompany('nameAr', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="اسم الشركة"
                            dir="rtl"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">License Number</label>
                        <input
                            type="text"
                            value={data.company.licenseNo}
                            onChange={(e) => updateCompany('licenseNo', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="CN-1234567"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Emirate</label>
                        <select
                            value={data.company.emirate}
                            onChange={(e) => updateCompany('emirate', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Sharjah">Sharjah</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Amendment Date</label>
                        <input
                            type="date"
                            value={data.company.amendmentDate}
                            onChange={(e) => updateCompany('amendmentDate', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Address (EN)</label>
                    <textarea
                        value={data.company.address}
                        onChange={(e) => updateCompany('address', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        rows={2}
                        placeholder="Company address"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Address (AR)</label>
                    <textarea
                        value={data.company.addressAr}
                        onChange={(e) => updateCompany('addressAr', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        rows={2}
                        placeholder="عنوان الشركة"
                        dir="rtl"
                    />
                </div>
            </div>

            {/* Partner 1 Section */}
            <PartnerSection
                title="First Partner (Company)"
                partnerIndex={0}
                partner={data.partners[0]}
                updatePartner={updatePartner}
                updatePartnerRepresentative={updatePartnerRepresentative}
                togglePartnerRepresentative={togglePartnerRepresentative}
            />

            {/* Partner 2 Section */}
            <PartnerSection
                title="Second Partner (Company)"
                partnerIndex={1}
                partner={data.partners[1]}
                updatePartner={updatePartner}
                updatePartnerRepresentative={updatePartnerRepresentative}
                togglePartnerRepresentative={togglePartnerRepresentative}
            />

            {/* Manager Section */}
            <ManagerSection
                manager={data.manager}
                updateManager={updateManager}
            />

            {/* Article 8 powers — same checklist fields as POA “Powers Granted” */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                    Managing Director Powers (Article 8)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.executeTransactions}
                            onChange={(e) => updateManagingDirectorPowers({ executeTransactions: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Execute Transactions
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.employees}
                            onChange={(e) => updateManagingDirectorPowers({ employees: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Employees
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.utilities}
                            onChange={(e) => updateManagingDirectorPowers({ utilities: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Utilities
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.banks}
                            onChange={(e) => updateManagingDirectorPowers({ banks: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Banks
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.contracts}
                            onChange={(e) => updateManagingDirectorPowers({ contracts: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Contracts
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.receivables}
                            onChange={(e) => updateManagingDirectorPowers({ receivables: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Receivables
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.motorVehicles}
                            onChange={(e) => updateManagingDirectorPowers({ motorVehicles: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Motor Vehicles
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.approachCourts}
                            onChange={(e) => updateManagingDirectorPowers({ approachCourts: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        Approach Courts
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.purchase}
                            onChange={(e) => updateManagingDirectorPowers({ purchase: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        To Purchase
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={powers.licenseTransfer}
                            onChange={(e) => updateManagingDirectorPowers({ licenseTransfer: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        License Transfer
                    </label>
                </div>
            </div>

            {/* Capital Section */}
            <CapitalSection
                capital={data.capital}
                updateCapital={updateCapital}
            />
        </div>
    )
}

// Partner Section Component
function PartnerSection({ title, partnerIndex, partner, updatePartner, updatePartnerRepresentative, togglePartnerRepresentative }: {
    title: string
    partnerIndex: number
    partner: any
    updatePartner: (index: number, field: string, value: any) => void
    updatePartnerRepresentative: (index: number, field: string, value: any) => void
    togglePartnerRepresentative: (index: number) => void
}) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">{title}</h3>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (EN)</label>
                    <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => updatePartner(partnerIndex, 'name', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Company Name (AR)</label>
                    <input
                        type="text"
                        value={partner.nameAr}
                        onChange={(e) => updatePartner(partnerIndex, 'nameAr', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country (EN)</label>
                    <input
                        type="text"
                        value={partner.country}
                        onChange={(e) => updatePartner(partnerIndex, 'country', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country (AR)</label>
                    <input
                        type="text"
                        value={partner.countryAr}
                        onChange={(e) => updatePartner(partnerIndex, 'countryAr', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">License Number</label>
                    <input
                        type="text"
                        value={partner.licenseNo}
                        onChange={(e) => updatePartner(partnerIndex, 'licenseNo', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Share Count</label>
                    <input
                        type="number"
                        value={partner.shareCount}
                        onChange={(e) => updatePartner(partnerIndex, 'shareCount', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                <input
                    type="email"
                    value={partner.email || ''}
                    onChange={(e) => updatePartner(partnerIndex, 'email', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Address (EN)</label>
                <textarea
                    value={partner.address || ''}
                    onChange={(e) => updatePartner(partnerIndex, 'address', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                    placeholder="Company address"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Address (AR)</label>
                <textarea
                    value={partner.addressAr || ''}
                    onChange={(e) => updatePartner(partnerIndex, 'addressAr', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                    placeholder="عنوان الشركة"
                    dir="rtl"
                />
            </div>

            {/* Representative Section */}
            <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-semibold text-gray-700">Authorized Representative</h4>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={partner.hasRepresentative}
                            onChange={() => togglePartnerRepresentative(partnerIndex)}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <span className="text-xs text-gray-600">Enable Representative</span>
                    </label>
                </div>
                {partner.hasRepresentative && (
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Salutation</label>
                        <select
                            value={partner.representative.salutation}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'salutation', e.target.value as Salutation)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name (EN)</label>
                        <input
                            type="text"
                            value={partner.representative.name}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Name (AR)</label>
                        <input
                            type="text"
                            value={partner.representative.nameAr}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'nameAr', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            dir="rtl"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                        <input
                            type="date"
                            value={partner.representative.dob}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'dob', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (EN)</label>
                        <input
                            type="text"
                            value={partner.representative.nationality}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'nationality', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (AR)</label>
                        <input
                            type="text"
                            value={partner.representative.nationalityAr}
                            onChange={(e) => updatePartnerRepresentative(partnerIndex, 'nationalityAr', e.target.value)}
                            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                            dir="rtl"
                        />
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

// Manager Section Component
function ManagerSection({ manager, updateManager }: {
    manager: any
    updateManager: (field: string, value: any) => void
}) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">Manager Information</h3>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Salutation</label>
                    <select
                        value={manager.salutation}
                        onChange={(e) => updateManager('salutation', e.target.value as Salutation)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                        value={manager.eid}
                        onChange={(e) => updateManager('eid', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Name (EN)</label>
                    <input
                        type="text"
                        value={manager.name}
                        onChange={(e) => updateManager('name', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Name (AR)</label>
                    <input
                        type="text"
                        value={manager.nameAr}
                        onChange={(e) => updateManager('nameAr', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        value={manager.dob}
                        onChange={(e) => updateManager('dob', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (EN)</label>
                    <input
                        type="text"
                        value={manager.nationality}
                        onChange={(e) => updateManager('nationality', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Nationality (AR)</label>
                    <input
                        type="text"
                        value={manager.nationalityAr}
                        onChange={(e) => updateManager('nationalityAr', e.target.value)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                        dir="rtl"
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Address (EN)</label>
                <textarea
                    value={manager.address}
                    onChange={(e) => updateManager('address', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Address (AR)</label>
                <textarea
                    value={manager.addressAr}
                    onChange={(e) => updateManager('addressAr', e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={2}
                    dir="rtl"
                />
            </div>
        </div>
    )
}

// Capital Section Component
function CapitalSection({ capital, updateCapital }: {
    capital: any
    updateCapital: (field: string, value: number) => void
}) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-200 pb-1">Capital Information</h3>
            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Total Capital (AED)</label>
                    <input
                        type="number"
                        value={capital.totalCapital}
                        onChange={(e) => updateCapital('totalCapital', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Total Shares</label>
                    <input
                        type="number"
                        value={capital.shareCount}
                        onChange={(e) => updateCapital('shareCount', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Share Value (AED)</label>
                    <input
                        type="number"
                        value={capital.shareValue}
                        onChange={(e) => updateCapital('shareValue', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
        </div>
    )
}
