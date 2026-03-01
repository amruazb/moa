'use client'

import { useState, useMemo, useEffect } from 'react'
import { ERPPermissionData, extractERPPermissionContext } from '@/lib/focus_erp_permission/types'
import { generateERPPermissionDocument } from '@/lib/focus_erp_permission/generator'
import { generateERPPermissionDocx } from '@/lib/focus_erp_permission/wordGenerator'

export function FocusERPPermissionWorkspace() {
    const [formData, setFormData] = useState<ERPPermissionData>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('erp_permission_form_alsaqiya')
            return saved ? JSON.parse(saved) : { accessTime: 'Permanent' }
        }
        return { accessTime: 'Permanent' }
    })

    const [history, setHistory] = useState<ERPPermissionData[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('erp_permission_history_alsaqiya')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })

    const [isSaved, setIsSaved] = useState(true)

    useEffect(() => {
        localStorage.setItem('erp_permission_form_alsaqiya', JSON.stringify(formData))
        setIsSaved(false)
        const timer = setTimeout(() => {
            setIsSaved(true)
        }, 1000)
        return () => clearTimeout(timer)
    }, [formData])

    useEffect(() => {
        localStorage.setItem('erp_permission_history_alsaqiya', JSON.stringify(history))
    }, [history])

    const context = useMemo(() => extractERPPermissionContext(formData), [formData])
    const htmlContent = useMemo(() => generateERPPermissionDocument(context), [context])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        if (printWindow) {
            printWindow.document.write(htmlContent)
            printWindow.document.close()
            printWindow.focus()
            setTimeout(() => {
                printWindow.print()
            }, 250)
        }
    }

    const handleDownloadWord = async () => {
        await generateERPPermissionDocx(context)
    }

    const saveToHistory = () => {
        if (!formData.employeeName) {
            alert('Please enter an employee name before saving.')
            return
        }

        const exists = history.some(item =>
            item.employeeName === formData.employeeName &&
            item.permissionsRequested === formData.permissionsRequested
        )

        if (exists) {
            if (!confirm('This entry already exists in history. Save anyway?')) return
        }

        const newHistory = [formData, ...history].slice(0, 20)
        setHistory(newHistory)
        alert('Saved to history!')
    }

    const loadFromHistory = (item: ERPPermissionData) => {
        if (confirm('Load this entry? Current form data will be overwritten.')) {
            setFormData(item)
        }
    }

    const removeFromHistory = (index: number) => {
        if (confirm('Remove this entry from history?')) {
            const newHistory = history.filter((_, i) => i !== index)
            setHistory(newHistory)
        }
    }

    const resetForm = () => {
        if (confirm('Are you sure you want to reset the form?')) {
            setFormData({ accessTime: 'Permanent' })
        }
    }

    return (
        <div className="flex gap-8 items-start pb-12">
            {/* Form Section */}
            <div className="w-[550px] flex-shrink-0 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 leading-none mb-1">Al Saqiya Trading</h2>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Access Permission Form</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] uppercase font-bold tracking-wider transition-opacity duration-300 ${isSaved ? 'text-green-600 opacity-100' : 'text-gray-400 opacity-50'}`}>
                                {isSaved ? '● Auto-Saved' : '○ Saving...'}
                            </span>
                            <button
                                onClick={resetForm}
                                className="text-xs text-red-600 hover:text-red-700 font-bold transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 uppercase">Employee Name</label>
                                <input
                                    type="text"
                                    name="employeeName"
                                    value={formData.employeeName || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 uppercase">Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={formData.department || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium"
                                    placeholder="IT / Accounts / etc"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 uppercase">Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle || ''}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-300 font-medium"
                                    placeholder="Position"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 uppercase">Access Time</label>
                                <div className="flex p-1 bg-gray-100 rounded-xl">
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, accessTime: 'Permanent' }))}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${formData.accessTime === 'Permanent' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        PERMANENT
                                    </button>
                                    <button
                                        onClick={() => setFormData(prev => ({ ...prev, accessTime: 'Temporary' }))}
                                        className={`flex-1 py-1 text-[10px] font-bold rounded-lg transition-all ${formData.accessTime === 'Temporary' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        TEMPORARY
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700 uppercase">System / Service to be accessed</label>
                            <textarea
                                name="permissionsRequested"
                                value={formData.permissionsRequested || ''}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none placeholder:text-gray-300 font-medium"
                                placeholder="Module or specific service name..."
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700 uppercase">Reason for Request</label>
                            <textarea
                                name="reasonForRequest"
                                value={formData.reasonForRequest || ''}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none placeholder:text-gray-300 font-medium"
                                placeholder="Purpose of this access..."
                            />
                        </div>

                        <div className="pt-4 mt-2 border-t border-gray-100">
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">Authorization Details</h3>

                            <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-blue-900 uppercase">Supervisor Recommendation</label>
                                    <textarea
                                        name="supervisorRecommendation"
                                        value={formData.supervisorRecommendation || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
                                        placeholder="Recommendation details..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-blue-900 uppercase">Line Manager Name</label>
                                        <input
                                            type="text"
                                            name="lineManagerName"
                                            value={formData.lineManagerName || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-blue-900 uppercase">Manager Job Title</label>
                                        <input
                                            type="text"
                                            name="lineManagerJobTitle"
                                            value={formData.lineManagerJobTitle || ''}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-blue-900 uppercase">Line Manager Sign Date</label>
                                    <input
                                        type="text"
                                        name="lineManagerDate"
                                        value={formData.lineManagerDate || ''}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 bg-white border border-blue-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                        placeholder="e.g. 18/01/2026"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                            <button
                                onClick={handlePrint}
                                className="w-full px-4 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-100 active:scale-[0.98]"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                                Print Document
                            </button>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={saveToHistory}
                                    className="px-4 py-3 bg-gray-50 text-gray-700 border border-gray-200 rounded-2xl hover:bg-gray-100 transition-all font-bold text-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    Archive
                                </button>
                                <button
                                    onClick={handleDownloadWord}
                                    className="px-4 py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl hover:bg-emerald-100 transition-all font-bold text-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    MS Word
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Section */}
                {history.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">History</h3>
                            <span className="text-[10px] bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold">{history.length}</span>
                        </div>
                        <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto">
                            {history.map((item, index) => (
                                <div key={index} className="px-6 py-3 hover:bg-blue-50/30 group flex items-center justify-between transition-colors">
                                    <div
                                        className="flex-1 cursor-pointer"
                                        onClick={() => loadFromHistory(item)}
                                    >
                                        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.employeeName}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">{item.date} • {item.accessTime}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromHistory(index)}
                                        className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Preview Section */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-8">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                        <div className="bg-gray-800 px-6 py-3 flex items-center justify-between">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Preview</span>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                            </div>
                        </div>
                        <div className="p-12 bg-gray-100/50 flex justify-center backdrop-blur-sm">
                            <div className="w-full max-w-[800px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] origin-top scale-[0.65]">
                                <iframe
                                    srcDoc={htmlContent}
                                    className="w-full h-[1150px] bg-white pointer-events-none"
                                    title="Form Preview"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
