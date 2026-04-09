'use client'

import { usePOAStore } from '@/store/poaStore'
import { POAPrincipal, POAPrincipalRole } from '@/lib/poa/types'

interface PrincipalSectionProps {
    principal: Partial<POAPrincipal>
    index: number
    canRemove: boolean
    onRemove: () => void
}

export function PrincipalSection({ principal, index, canRemove, onRemove }: PrincipalSectionProps) {
    const { updatePrincipal, updatePrincipalRepresentative } = usePOAStore()

    return (
        <>
            {/* Principal Information */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Principal {index + 1} (Power Giver)
                    </h3>
                    {canRemove && (
                        <button
                            onClick={onRemove}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                            title="Remove principal"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                        <input
                            type="text"
                            value={principal?.name || ''}
                            onChange={(e) => updatePrincipal(index, { name: e.target.value })}
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
                            onChange={(e) => updatePrincipal(index, { nameAr: e.target.value })}
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
                            onChange={(e) => updatePrincipal(index, { salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
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
                            onChange={(e) => updatePrincipal(index, { nationality: e.target.value })}
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
                            onChange={(e) => updatePrincipal(index, { nationalityAr: e.target.value })}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            placeholder="إماراتية"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Capacity (company)</label>
                    <select
                        value={principal?.role || 'owner'}
                        onChange={(e) => updatePrincipal(index, { role: e.target.value as POAPrincipalRole })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    >
                        <option value="owner">Owner</option>
                        <option value="partner">Partner</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">EID / Passport Number</label>
                    <input
                        type="text"
                        value={principal?.eidOrPassport || ''}
                        onChange={(e) => updatePrincipal(index, { eidOrPassport: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                        placeholder="784-XXXX-XXXXXXX-X"
                    />
                </div>
                <div className="flex items-center gap-2 pt-2">
                    <input
                        type="checkbox"
                        id={`principal${index}-represented`}
                        checked={principal?.isRepresented || false}
                        onChange={(e) => updatePrincipal(index, { isRepresented: e.target.checked })}
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor={`principal${index}-represented`} className="text-sm text-gray-700">
                        This principal is signing through a representative
                    </label>
                </div>
            </div>

            {/* Representative Information */}
            {principal?.isRepresented && (
                <div className="space-y-3 ml-4 border-l-2 border-purple-200 pl-4">
                    <h4 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Representative for Principal {index + 1}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Name (English)</label>
                            <input
                                type="text"
                                value={principal?.representative?.name || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { name: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="Representative's full name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Name (Arabic)</label>
                            <input
                                type="text"
                                dir="rtl"
                                value={principal?.representative?.nameAr || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { nameAr: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="اسم المندوب"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Salutation</label>
                            <select
                                value={principal?.representative?.salutation || 'mr'}
                                onChange={(e) => updatePrincipalRepresentative(index, { salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
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
                                value={principal?.representative?.nationality || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { nationality: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="e.g. Indian"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Date of Birth</label>
                            <input
                                type="text"
                                value={principal?.representative?.dateOfBirth || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { dateOfBirth: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">EID / Passport Number</label>
                            <input
                                type="text"
                                value={principal?.representative?.eidOrPassport || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { eidOrPassport: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="784-XXXX-XXXXXXX-X"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">POA Number</label>
                            <input
                                type="text"
                                value={principal?.representative?.poaNumber || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { poaNumber: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="POA attestation number"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">POA Date</label>
                            <input
                                type="text"
                                value={principal?.representative?.poaDate || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { poaDate: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="DD/MM/YYYY"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">POA Location</label>
                            <input
                                type="text"
                                value={principal?.representative?.poaLocation || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { poaLocation: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="e.g. Abu Dhabi"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Address</label>
                            <input
                                type="text"
                                value={principal?.representative?.address || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { address: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="Representative's address"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Nationality (AR)</label>
                            <input
                                type="text"
                                dir="rtl"
                                value={principal?.representative?.nationalityAr || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { nationalityAr: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="هندي"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Address (AR)</label>
                            <input
                                type="text"
                                dir="rtl"
                                value={principal?.representative?.addressAr || ''}
                                onChange={(e) => updatePrincipalRepresentative(index, { addressAr: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                                placeholder="عنوان المندوب"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
