'use client'

import { useEffect, useMemo } from 'react'
import { generatePOAVehicle, extractPOAVehicleContext, samplePOAVehicleFilled } from '@/lib/poa_vehicle'
import { useFormattingStore } from '@/store/formattingStore'
import { FormattingToolbar } from './workspace/FormattingToolbar'

export function POAVehicleWorkspace() {
    const settings = useFormattingStore((state) => state.settings)
    const initializeFormattingFromCache = useFormattingStore((state) => state.initializeFromCache)

    useEffect(() => {
        // Initialize formatting from cache when component mounts
        initializeFormattingFromCache()
    }, [initializeFormattingFromCache])

    // Generate the document HTML using the sample data
    const htmlContent = useMemo(() => {
        const context = extractPOAVehicleContext(samplePOAVehicleFilled)
        return generatePOAVehicle(context, settings)
    }, [settings])

    // Print handler
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

    return (
        <div className="flex gap-6 items-start">
            {/* Left side - Info Panel */}
            <div className="w-[480px] flex-shrink-0">
                {/* Formatting Toolbar */}
                <FormattingToolbar />

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-sm font-semibold text-gray-900">POA Vehicle Generator</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <h3 className="font-semibold text-orange-900 mb-2">Document Type</h3>
                            <p className="text-sm text-orange-800">Power of Attorney for Selling Mortgaged Vehicles</p>
                        </div>

                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">Sample Data Included</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Owner: Mohamed Shamnas Chakeeri</li>
                                <li>• 3 Vehicles (SHACMOTO X5000)</li>
                                <li>• Bank: Bank of Baroda</li>
                                <li>• Validity: 3 years</li>
                            </ul>
                        </div>

                        <button
                            onClick={handlePrint}
                            className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print Document
                        </button>

                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-2">Coming Soon</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Editable owner information</li>
                                <li>• Dynamic vehicle addition/removal</li>
                                <li>• Custom bank details</li>
                                <li>• PDF export</li>
                                <li>• Template saving</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Live Preview */}
            <div className="flex-1 min-w-0">
                <div className="sticky top-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="text-sm font-semibold text-white">Live Preview</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50">
                            <iframe
                                srcDoc={htmlContent}
                                className="w-full h-[800px] bg-white rounded border border-gray-300"
                                title="POA Vehicle Preview"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
