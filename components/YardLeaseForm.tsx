'use client'

import { YardLeaseData, YardLeasePerson } from '@/lib/internal_agreement'

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200'

function Field({
  label,
  value,
  onChange,
  rtl,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rtl?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="text-xs text-gray-500 block mb-1">{label}</label>
      <input
        className={`${inputClass}${rtl ? ' text-right' : ''}`}
        dir={rtl ? 'rtl' : undefined}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}

export function YardLeaseForm({
  data,
  onChange,
}: {
  data: YardLeaseData
  onChange: (next: YardLeaseData) => void
}) {
  const set = <K extends keyof YardLeaseData>(key: K, value: YardLeaseData[K]) => {
    onChange({ ...data, [key]: value })
  }

  const setPerson = (key: 'lessor' | 'attorney', field: keyof YardLeasePerson, value: string) => {
    onChange({ ...data, [key]: { ...data[key], [field]: value } })
  }

  return (
    <div className="space-y-5">
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <h3 className="font-semibold text-slate-900 mb-1">Yard lease — Liwa</h3>
        <p className="text-sm text-slate-700">
          One-year yard lease. Leave area, security deposit, insurance limit and cheque details
          blank to print a marked blank.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Agreement</h3>
        <Field label="Date of execution (blank prints ________)" value={data.agreementDate} onChange={v => set('agreementDate', v)} placeholder="DD/MM/YYYY" />
        <Field label="Place (English)" value={data.place} onChange={v => set('place', v)} />
        <Field label="Place (Arabic)" value={data.placeAr} onChange={v => set('placeAr', v)} rtl />
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lessor</h3>
        <Field label="Full name (English)" value={data.lessor.name} onChange={v => setPerson('lessor', 'name', v)} />
        <Field label="Full name (Arabic)" value={data.lessor.nameAr} onChange={v => setPerson('lessor', 'nameAr', v)} rtl />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nationality" value={data.lessor.nationality} onChange={v => setPerson('lessor', 'nationality', v)} />
          <Field label="Emirates ID" value={data.lessor.eid} onChange={v => setPerson('lessor', 'eid', v)} />
        </div>
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lessee</h3>
        <Field label="Company (English)" value={data.lesseeCompany} onChange={v => set('lesseeCompany', v)} />
        <Field label="Company (Arabic)" value={data.lesseeCompanyAr} onChange={v => set('lesseeCompanyAr', v)} rtl />
        <Field label="Trade licence No." value={data.licenseNo} onChange={v => set('licenseNo', v)} />
        <Field label="Licensing authority" value={data.issuingAuthority} onChange={v => set('issuingAuthority', v)} />
        <Field label="Attorney (English)" value={data.attorney.name} onChange={v => setPerson('attorney', 'name', v)} />
        <Field label="Attorney (Arabic)" value={data.attorney.nameAr} onChange={v => setPerson('attorney', 'nameAr', v)} rtl />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Attorney nationality" value={data.attorney.nationality} onChange={v => setPerson('attorney', 'nationality', v)} />
          <Field label="Attorney Emirates ID" value={data.attorney.eid} onChange={v => setPerson('attorney', 'eid', v)} />
        </div>
        <Field label="Special POA No." value={data.poaNumber} onChange={v => set('poaNumber', v)} />
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Property and rent</h3>
        <Field label="Location (English)" value={data.propertyLocation} onChange={v => set('propertyLocation', v)} />
        <Field label="Location (Arabic)" value={data.propertyLocationAr} onChange={v => set('propertyLocationAr', v)} rtl />
        <Field
          label="Area (sq. m) — leave blank to print ________ sq. m"
          value={data.areaSqm}
          onChange={v => set('areaSqm', v)}
          placeholder="________"
        />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Rent (AED)" value={String(data.rent)} onChange={v => set('rent', Number(v) || 0)} />
          <Field label="1st instalment" value={String(data.firstInstallment)} onChange={v => set('firstInstallment', Number(v) || 0)} />
          <Field label="2nd instalment" value={String(data.secondInstallment)} onChange={v => set('secondInstallment', Number(v) || 0)} />
        </div>
        <Field label="Security deposit (AED, blank if undecided)" value={data.securityDeposit} onChange={v => set('securityDeposit', v)} placeholder="________" />
        <Field label="Liability cover per occurrence (AED)" value={data.liabilityLimit} onChange={v => set('liabilityLimit', v)} placeholder="________" />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Cheque No." value={data.chequeNo} onChange={v => set('chequeNo', v)} placeholder="________" />
          <Field label="Cheque bank" value={data.chequeBank} onChange={v => set('chequeBank', v)} placeholder="________" />
          <Field label="Cheque date" value={data.chequeDate} onChange={v => set('chequeDate', v)} placeholder="________" />
        </div>
      </section>
    </div>
  )
}
