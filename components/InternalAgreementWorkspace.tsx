'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  generateInternalAgreement,
  extractInternalAgreementContext,
  sampleInternalAgreementData,
  generateYardLease,
  extractYardLeaseContext,
  sampleYardLeaseNas,
  INTERNAL_AGREEMENT_SAMPLES,
  InternalAgreementData,
  InternalParty,
  YardLeaseData,
} from '@/lib/internal_agreement'
import { useFormattingStore } from '@/store/formattingStore'
import { FormattingToolbar } from './workspace/FormattingToolbar'
import { YardLeaseForm } from './YardLeaseForm'

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200'

const partyTitles = ['First Party — Latheef (70%)', 'Second Party — Shafeeq (20%)', 'Third Party — Shamnas (10%)']

export function InternalAgreementWorkspace({ initialSampleId }: { initialSampleId?: string }) {
  const settings = useFormattingStore(state => state.settings)
  const initializeFormattingFromCache = useFormattingStore(state => state.initializeFromCache)
  const initialSample = INTERNAL_AGREEMENT_SAMPLES.find(sample => sample.id === initialSampleId)

  const [sampleId, setSampleId] = useState(initialSample?.id ?? INTERNAL_AGREEMENT_SAMPLES[0]?.id ?? 'shareholding-mabel')
  const [formData, setFormData] = useState<InternalAgreementData>(
    initialSample?.kind === 'shareholding' ? structuredClone(initialSample.data) : sampleInternalAgreementData,
  )
  const [leaseData, setLeaseData] = useState<YardLeaseData>(
    initialSample?.kind === 'yard-lease' ? structuredClone(initialSample.data) : sampleYardLeaseNas,
  )
  const activeSample = INTERNAL_AGREEMENT_SAMPLES.find(sample => sample.id === sampleId) ?? INTERNAL_AGREEMENT_SAMPLES[0]
  const isYardLease = activeSample?.kind === 'yard-lease'

  useEffect(() => {
    initializeFormattingFromCache()
  }, [initializeFormattingFromCache])

  const handleChange = (field: keyof InternalAgreementData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePartyChange = (index: number, field: keyof InternalParty, value: string | number) => {
    setFormData(prev => {
      const parties = [...(prev.parties || [])]
      parties[index] = { ...parties[index], [field]: value }
      return { ...prev, parties }
    })
  }

  const context = useMemo(() => extractInternalAgreementContext(formData), [formData])
  const leaseContext = useMemo(() => extractYardLeaseContext(leaseData), [leaseData])
  const htmlContent = useMemo(
    () =>
      isYardLease
        ? generateYardLease(leaseContext, settings)
        : generateInternalAgreement(context, settings),
    [isYardLease, leaseContext, context, settings],
  )

  const handleLoadSample = (id: string) => {
    const sample = INTERNAL_AGREEMENT_SAMPLES.find(item => item.id === id)
    if (!sample) return
    setSampleId(sample.id)
    if (sample.kind === 'yard-lease') {
      setLeaseData(structuredClone(sample.data))
      return
    }
    setFormData(structuredClone(sample.data))
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => printWindow.print(), 250)
    }
  }

  return (
    <div>
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isYardLease ? 'Yard Lease Agreement' : 'Internal Shareholding Agreement'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isYardLease
              ? 'Bilingual yard lease for Liwa, Al Dhafra. Empty fields print as a blank in both languages.'
              : 'Private bilingual record of agreed shares among the parties, for internal keeping.'}
          </p>
        </div>
      </header>

    <div className="flex gap-6 items-start">
      <div className="w-[480px] flex-shrink-0">
        <FormattingToolbar />

        <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">Load Sample:</span>
            <select
              value={sampleId}
              onChange={e => handleLoadSample(e.target.value)}
              className="flex-1 text-sm border border-gray-300 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              {INTERNAL_AGREEMENT_SAMPLES.map(sample => (
                <option key={sample.id} value={sample.id}>{sample.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5 mt-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-sm font-semibold text-gray-900">
              {isYardLease ? 'Yard Lease Agreement' : 'Internal Shareholding Agreement'}
            </h2>
          </div>

          {isYardLease ? (
            <YardLeaseForm data={leaseData} onChange={setLeaseData} />
          ) : (
          <>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <h3 className="font-semibold text-slate-900 mb-1">Private internal record</h3>
            <p className="text-sm text-slate-700">
              Written proof among the three parties of the 70% / 20% / 10% split. The commercial
              licence listing stays as issued.
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company</h3>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Agreement Date</label>
              <input className={inputClass} value={formData.agreementDate ?? ''} onChange={e => handleChange('agreementDate', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Trade Name (English)</label>
              <input className={inputClass} value={formData.companyName ?? ''} onChange={e => handleChange('companyName', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Trade Name (Arabic)</label>
              <input dir="rtl" className={`${inputClass} text-right`} value={formData.companyNameAr ?? ''} onChange={e => handleChange('companyNameAr', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Licence No.</label>
                <input className={inputClass} value={formData.licenseNo ?? ''} onChange={e => handleChange('licenseNo', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Capital (AED)</label>
                <input
                  type="number"
                  className={inputClass}
                  value={formData.capital ?? 1000000}
                  onChange={e => handleChange('capital', Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Unified Registration No.</label>
              <input className={inputClass} value={formData.unifiedRegNo ?? ''} onChange={e => handleChange('unifiedRegNo', e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Unified Licence No.</label>
              <input className={inputClass} value={formData.unifiedLicenseNo ?? ''} onChange={e => handleChange('unifiedLicenseNo', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Establishment Date</label>
                <input className={inputClass} value={formData.establishmentDate ?? ''} onChange={e => handleChange('establishmentDate', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Emirate</label>
                <input className={inputClass} value={formData.emirate ?? ''} onChange={e => handleChange('emirate', e.target.value)} />
              </div>
            </div>
          </section>

          {(formData.parties || []).map((party, index) => (
            <section key={index} className="space-y-3 pt-2 border-t border-gray-100">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {partyTitles[index]}
              </h3>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Full Name (English)</label>
                <input className={inputClass} value={party.name ?? ''} onChange={e => handlePartyChange(index, 'name', e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Full Name (Arabic)</label>
                <input dir="rtl" className={`${inputClass} text-right`} value={party.nameAr ?? ''} onChange={e => handlePartyChange(index, 'nameAr', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Emirates ID</label>
                  <input className={inputClass} value={party.eid ?? ''} onChange={e => handlePartyChange(index, 'eid', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Date of Birth</label>
                  <input className={inputClass} value={party.dob ?? ''} onChange={e => handlePartyChange(index, 'dob', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Share %</label>
                  <input
                    type="number"
                    className={inputClass}
                    value={party.sharePercent ?? 0}
                    onChange={e => handlePartyChange(index, 'sharePercent', Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Capacity</label>
                  <input className={inputClass} value={party.roleEn ?? ''} onChange={e => handlePartyChange(index, 'roleEn', e.target.value)} />
                </div>
              </div>
            </section>
          ))}
          </>
          )}

          <button
            onClick={handlePrint}
            className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Document
          </button>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="sticky top-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-600 to-slate-800 px-4 py-3 flex items-center justify-between">
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
                className="w-full h-[900px] bg-white rounded border border-gray-300"
                title={isYardLease ? 'Yard Lease Agreement Preview' : 'Internal Shareholding Agreement Preview'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
