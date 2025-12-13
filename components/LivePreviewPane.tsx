'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDocumentStore } from '@/store/documentStore'
import { CONVERSION_TYPES } from '@/lib/validation'
import { Eye, EyeOff, Maximize2, Minimize2, FileText } from 'lucide-react'

export const LivePreviewPane = () => {
    const { language, extractedData, conversionType, autoPreview, setAutoPreview } = useDocumentStore()
    const [isMinimized, setIsMinimized] = useState(false)
    const [previewContent, setPreviewContent] = useState('')

    // Safe defaults
    const company = extractedData.company || { name: '', newName: '', licenseNumber: '', moaDate: '' }
    const firstParty = extractedData.firstParty || { name: '', eidNumber: '', dob: '', nationality: '' }
    const secondParty = extractedData.secondParty || { name: '', eidNumber: '', dob: '', nationality: '' }
    const oldMoa = extractedData.oldMoa || { notarizationNumber: '', notarizationDate: '', originalShares: { firstParty: 49, secondParty: 51 } }
    const shares = extractedData.shares || { firstParty: 0, secondParty: 100 }

    const conversionInfo = CONVERSION_TYPES[conversionType]

    const generatePreview = useCallback(() => {
        const firstPartyName = firstParty.name || (language === 'ar' ? '[الطرف الأول]' : '[First Party]')
        const secondPartyName = secondParty.name || (language === 'ar' ? '[الطرف الثاني]' : '[Second Party]')
        const companyName = company.name || (language === 'ar' ? '[اسم الشركة]' : '[Company Name]')
        const newCompanyName = company.newName || (language === 'ar' ? '[الاسم الجديد]' : '[New Company Name]')

        // Generate dynamic preamble based on conversion type
        let preamble = ''
        if (shares.secondParty === 100) {
            preamble = language === 'ar'
                ? `الطرف الأول، ${firstPartyName}، ينقل جميع أسهمه (${oldMoa.originalShares?.firstParty || shares.firstParty}%) في ${companyName} إلى الطرف الثاني، ${secondPartyName}، مجاناً. هذا النقل يحول الشركة من ${conversionInfo.label.ar}.`
                : `The First Party, ${firstPartyName}, hereby transfers all of their shares (${oldMoa.originalShares?.firstParty || shares.firstParty}%) in ${companyName} to the Second Party, ${secondPartyName}, free of cost. This transfer converts the company ${conversionInfo.label.en}.`
        } else {
            preamble = language === 'ar'
                ? `اتفاقية تحويل بين ${firstPartyName} و ${secondPartyName} لتحويل ${companyName} - ${conversionInfo.label.ar}.`
                : `Conversion agreement between ${firstPartyName} and ${secondPartyName} for ${companyName} - ${conversionInfo.label.en}.`
        }

        if (language === 'ar') {
            return `
        <div class="document-preview" dir="rtl">
          <h1 class="doc-title">مذكرة تعديل مذكرة التأسيس</h1>
          <h2 class="doc-subtitle">${conversionInfo.label.ar}</h2>
          
          <section class="doc-section">
            <h3>معلومات الشركة</h3>
            <div class="doc-field">
              <span class="field-label">اسم الشركة الحالي:</span>
              <span class="field-value ${!company.name ? 'incomplete' : ''}">${companyName}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">الاسم الجديد:</span>
              <span class="field-value ${!company.newName ? 'incomplete' : ''}">${newCompanyName}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">رقم الترخيص:</span>
              <span class="field-value ${!company.licenseNumber ? 'incomplete' : ''}">${company.licenseNumber || '[رقم الترخيص]'}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">تاريخ المذكرة:</span>
              <span class="field-value ${!company.moaDate ? 'incomplete' : ''}">${company.moaDate || '[التاريخ]'}</span>
            </div>
          </section>

          <section class="doc-section">
            <h3>الأطراف</h3>
            <div class="party-info">
              <h4>الطرف الأول</h4>
              <div class="doc-field">
                <span class="field-label">الاسم:</span>
                <span class="field-value ${!firstParty.name ? 'incomplete' : ''}">${firstPartyName}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">رقم الهوية:</span>
                <span class="field-value ${!firstParty.eidNumber ? 'incomplete' : ''}">${firstParty.eidNumber || '[رقم الهوية]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">الجنسية:</span>
                <span class="field-value ${!firstParty.nationality ? 'incomplete' : ''}">${firstParty.nationality || '[الجنسية]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">الحصة:</span>
                <span class="field-value">${shares.firstParty}%</span>
              </div>
            </div>

            ${shares.secondParty > 0 ? `
            <div class="party-info">
              <h4>الطرف الثاني</h4>
              <div class="doc-field">
                <span class="field-label">الاسم:</span>
                <span class="field-value ${!secondParty.name ? 'incomplete' : ''}">${secondPartyName}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">رقم الهوية:</span>
                <span class="field-value ${!secondParty.eidNumber ? 'incomplete' : ''}">${secondParty.eidNumber || '[رقم الهوية]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">الجنسية:</span>
                <span class="field-value ${!secondParty.nationality ? 'incomplete' : ''}">${secondParty.nationality || '[الجنسية]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">الحصة:</span>
                <span class="field-value">${shares.secondParty}%</span>
              </div>
            </div>
            ` : ''}
          </section>

          <section class="doc-section">
            <h3>المقدمة</h3>
            <p class="preamble">${preamble}</p>
          </section>

          <section class="doc-section">
            <h3>مذكرة التأسيس القديمة</h3>
            <div class="doc-field">
              <span class="field-label">رقم التوثيق:</span>
              <span class="field-value ${!oldMoa.notarizationNumber ? 'incomplete' : ''}">${oldMoa.notarizationNumber || '[رقم التوثيق]'}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">تاريخ التوثيق:</span>
              <span class="field-value ${!oldMoa.notarizationDate ? 'incomplete' : ''}">${oldMoa.notarizationDate || '[تاريخ التوثيق]'}</span>
            </div>
          </section>
        </div>
      `
        } else {
            return `
        <div class="document-preview">
          <h1 class="doc-title">MEMORANDUM OF ASSOCIATION AMENDMENT</h1>
          <h2 class="doc-subtitle">${conversionInfo.label.en}</h2>
          
          <section class="doc-section">
            <h3>Company Information</h3>
            <div class="doc-field">
              <span class="field-label">Current Company Name:</span>
              <span class="field-value ${!company.name ? 'incomplete' : ''}">${companyName}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">New Company Name:</span>
              <span class="field-value ${!company.newName ? 'incomplete' : ''}">${newCompanyName}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">License Number:</span>
              <span class="field-value ${!company.licenseNumber ? 'incomplete' : ''}">${company.licenseNumber || '[License Number]'}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">MOA Date:</span>
              <span class="field-value ${!company.moaDate ? 'incomplete' : ''}">${company.moaDate || '[Date]'}</span>
            </div>
          </section>

          <section class="doc-section">
            <h3>Parties</h3>
            <div class="party-info">
              <h4>First Party</h4>
              <div class="doc-field">
                <span class="field-label">Name:</span>
                <span class="field-value ${!firstParty.name ? 'incomplete' : ''}">${firstPartyName}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">EID Number:</span>
                <span class="field-value ${!firstParty.eidNumber ? 'incomplete' : ''}">${firstParty.eidNumber || '[EID Number]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">Nationality:</span>
                <span class="field-value ${!firstParty.nationality ? 'incomplete' : ''}">${firstParty.nationality || '[Nationality]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">Shares:</span>
                <span class="field-value">${shares.firstParty}%</span>
              </div>
            </div>

            ${shares.secondParty > 0 ? `
            <div class="party-info">
              <h4>Second Party</h4>
              <div class="doc-field">
                <span class="field-label">Name:</span>
                <span class="field-value ${!secondParty.name ? 'incomplete' : ''}">${secondPartyName}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">EID Number:</span>
                <span class="field-value ${!secondParty.eidNumber ? 'incomplete' : ''}">${secondParty.eidNumber || '[EID Number]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">Nationality:</span>
                <span class="field-value ${!secondParty.nationality ? 'incomplete' : ''}">${secondParty.nationality || '[Nationality]'}</span>
              </div>
              <div class="doc-field">
                <span class="field-label">Shares:</span>
                <span class="field-value">${shares.secondParty}%</span>
              </div>
            </div>
            ` : ''}
          </section>

          <section class="doc-section">
            <h3>Preamble</h3>
            <p class="preamble">${preamble}</p>
          </section>

          <section class="doc-section">
            <h3>Old MOA Details</h3>
            <div class="doc-field">
              <span class="field-label">Notarization Number:</span>
              <span class="field-value ${!oldMoa.notarizationNumber ? 'incomplete' : ''}">${oldMoa.notarizationNumber || '[Notarization Number]'}</span>
            </div>
            <div class="doc-field">
              <span class="field-label">Notarization Date:</span>
              <span class="field-value ${!oldMoa.notarizationDate ? 'incomplete' : ''}">${oldMoa.notarizationDate || '[Notarization Date]'}</span>
            </div>
          </section>
        </div>
      `
        }
    }, [extractedData, language, conversionType, shares])

    // Update preview (with debounce)
    useEffect(() => {
        if (!autoPreview) return

        const timeoutId = setTimeout(() => {
            setPreviewContent(generatePreview())
        }, 300) // 300ms debounce

        return () => clearTimeout(timeoutId)
    }, [extractedData, language, conversionType, autoPreview, generatePreview])

    // Manual refresh
    const handleRefresh = () => {
        setPreviewContent(generatePreview())
    }

    if (isMinimized) {
        return (
            <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-500" />
                    <span className="font-medium text-gray-700">
                        {language === 'ar' ? 'معاينة المستند' : 'Document Preview'}
                    </span>
                    <button
                        onClick={() => setIsMinimized(false)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded"
                        title={language === 'ar' ? 'تكبير' : 'Maximize'}
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col bg-white border-l border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary-500" />
                    <h3 className="font-semibold text-gray-800">
                        {language === 'ar' ? 'معاينة المستند' : 'Live Preview'}
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    {/* Auto-preview toggle */}
                    <button
                        onClick={() => setAutoPreview(!autoPreview)}
                        className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${autoPreview
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                        title={autoPreview
                            ? (language === 'ar' ? 'المعاينة التلقائية مفعلة' : 'Auto-preview ON')
                            : (language === 'ar' ? 'المعاينة التلقائية متوقفة' : 'Auto-preview OFF')
                        }
                    >
                        {autoPreview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        <span className="hidden md:inline">
                            {language === 'ar' ? 'تلقائي' : 'Auto'}
                        </span>
                    </button>

                    {/* Manual refresh */}
                    {!autoPreview && (
                        <button
                            onClick={handleRefresh}
                            className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600"
                        >
                            {language === 'ar' ? 'تحديث' : 'Refresh'}
                        </button>
                    )}

                    {/* Minimize */}
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="p-1 hover:bg-gray-200 rounded"
                        title={language === 'ar' ? 'تصغير' : 'Minimize'}
                    >
                        <Minimize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: previewContent || generatePreview() }}
                />
            </div>

            {/* Status bar */}
            <div className="px-4 py-2 border-t border-gray-200 bg-white text-xs text-gray-500 flex items-center justify-between">
                <span>
                    {language === 'ar' ? 'يتم التحديث تلقائياً' : 'Updates automatically'}
                </span>
                <span className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${autoPreview ? 'bg-green-500' : 'bg-gray-400'}`} />
                    {autoPreview ? (language === 'ar' ? 'مفعل' : 'Live') : (language === 'ar' ? 'متوقف' : 'Paused')}
                </span>
            </div>
        </div>
    )
}
