'use client'

import { useEffect, useMemo, useState } from 'react'
import {
    generateTerminationLetter,
    extractTerminationLetterContext,
    sampleTerminationLetterData,
    generateTerminationLetterDocx,
    TerminationLetterData,
} from '@/lib/termination_letter'
import { useFormattingStore } from '@/store/formattingStore'
import { FormattingToolbar } from './workspace/FormattingToolbar'

export function TerminationLetterWorkspace() {
    const settings = useFormattingStore((state) => state.settings)
    const initializeFormattingFromCache = useFormattingStore((state) => state.initializeFromCache)

    const [formData, setFormData] = useState<TerminationLetterData>(sampleTerminationLetterData)

    useEffect(() => {
        initializeFormattingFromCache()
    }, [initializeFormattingFromCache])

    const handleChange = (field: string, value: string | number) => {
        if (field.startsWith('employee.')) {
            const key = field.replace('employee.', '') as keyof TerminationLetterData['employee'] & string
            setFormData(prev => ({
                ...prev,
                employee: { ...prev.employee, [key]: value }
            }))
        } else {
            setFormData(prev => ({ ...prev, [field]: value }))
        }
    }

    const context = useMemo(() => extractTerminationLetterContext(formData), [formData])
    const htmlContent = useMemo(() => generateTerminationLetter(context, settings), [context, settings])

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
            printWindow.document.write(htmlContent)
            printWindow.document.close()
            printWindow.focus()
            setTimeout(() => { printWindow.print() }, 250)
        }
    }

    const handleDownloadWord = async () => {
        await generateTerminationLetterDocx(context, settings)
    }

    const inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400'
    const labelClass = 'block text-xs font-medium text-gray-600 mb-1'

    return (
        <div className="flex gap-6 items-start">
            {/* Left panel */}
            <div className="w-[480px] flex-shrink-0 space-y-4">
                <FormattingToolbar />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-900">Termination Letter</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Company & Date */}
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-3">
                            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Letter Details</h3>
                            <div>
                                <label className={labelClass}>Company Name</label>
                                <input className={inputClass} value={formData.companyName || ''} onChange={e => handleChange('companyName', e.target.value)} placeholder="e.g. INTERACT TYPING" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Letter Date</label>
                                    <input className={inputClass} value={formData.date || ''} onChange={e => handleChange('date', e.target.value)} placeholder="e.g. 1st March 2026" />
                                </div>
                                <div>
                                    <label className={labelClass}>Termination Date</label>
                                    <input className={inputClass} value={formData.terminationDate || ''} onChange={e => handleChange('terminationDate', e.target.value)} placeholder="e.g. 1st April 2026" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Notice Period (months)</label>
                                <input type="number" min={0} max={12} className={inputClass} value={formData.noticePeriodMonths ?? 1} onChange={e => handleChange('noticePeriodMonths', parseInt(e.target.value) || 1)} />
                            </div>
                        </div>

                        {/* Employee Details */}
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg space-y-3">
                            <h3 className="text-xs font-semibold text-red-700 uppercase tracking-wide">Employee Details</h3>
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <input className={inputClass} value={formData.employee?.name || ''} onChange={e => handleChange('employee.name', e.target.value)} placeholder="Full name" />
                            </div>
                            <div>
                                <label className={labelClass}>Emirates ID No.</label>
                                <input className={inputClass} value={formData.employee?.emiratesId || ''} onChange={e => handleChange('employee.emiratesId', e.target.value)} placeholder="784-XXXX-XXXXXXX-X" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className={labelClass}>Date of Birth</label>
                                    <input className={inputClass} value={formData.employee?.dob || ''} onChange={e => handleChange('employee.dob', e.target.value)} placeholder="DD/MM/YYYY" />
                                </div>
                                <div>
                                    <label className={labelClass}>Nationality</label>
                                    <input className={inputClass} value={formData.employee?.nationality || ''} onChange={e => handleChange('employee.nationality', e.target.value)} placeholder="e.g. Indian" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Occupation / Job Title</label>
                                <input className={inputClass} value={formData.employee?.occupation || ''} onChange={e => handleChange('employee.occupation', e.target.value)} placeholder="e.g. Messenger" />
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handlePrint}
                            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Document
                        </button>

                        <button
                            onClick={handleDownloadWord}
                            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download as Word
                        </button>
                    </div>
                </div>
            </div>

            {/* Right side - Live Preview */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-3 flex items-center gap-2">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span className="text-sm font-semibold text-white">Live Preview</span>
                        </div>
                        <div className="p-4 bg-gray-50">
                            <iframe
                                srcDoc={htmlContent}
                                className="w-full h-[800px] bg-white rounded border border-gray-300"
                                title="Termination Letter Preview"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
