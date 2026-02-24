'use client'

import { usePOAStore } from '@/store/poaStore'
import { POAAttorney } from '@/lib/poa/types'

interface AttorneySectionProps {
    attorney: Partial<POAAttorney>
    index: number
    canRemove: boolean
    onRemove: () => void
}

export function AttorneySection({ attorney, index, canRemove, onRemove }: AttorneySectionProps) {
    const { updateAttorneyByIndex } = usePOAStore()

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Attorney {index + 1} (Power Receiver)
                </h3>
                {canRemove && (
                    <button
                        onClick={onRemove}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        title="Remove attorney"
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
                        value={attorney?.name || ''}
                        onChange={(e) => updateAttorneyByIndex(index, { name: e.target.value })}
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
                        onChange={(e) => updateAttorneyByIndex(index, { nameAr: e.target.value })}
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
                        onChange={(e) => updateAttorneyByIndex(index, { salutation: e.target.value as 'mr' | 'ms' | 'mrs' })}
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
                        onChange={(e) => updateAttorneyByIndex(index, { nationality: e.target.value })}
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
                        onChange={(e) => updateAttorneyByIndex(index, { nationalityAr: e.target.value })}
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
                    onChange={(e) => updateAttorneyByIndex(index, { eidOrPassport: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="784-XXXX-XXXXXXX-X"
                />
            </div>
        </div>
    )
}
