'use client'

import { PaymentMethod, YardLeaseData, YardLeasePerson } from '@/lib/internal_agreement'

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
          Short bilingual lease. Empty fields print as ________ in English and Arabic.
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dates and place</h3>
        <Field label="Execution date" value={data.agreementDate} onChange={v => set('agreementDate', v)} placeholder="________" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Commencement date" value={data.commencementDate} onChange={v => set('commencementDate', v)} placeholder="________" />
          <Field label="End date" value={data.endDate} onChange={v => set('endDate', v)} placeholder="________" />
        </div>
        <Field label="Place (English)" value={data.place} onChange={v => set('place', v)} />
        <Field label="Place (Arabic)" value={data.placeAr} onChange={v => set('placeAr', v)} rtl />
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lessor (Second Party)</h3>
        <Field label="Full name (English)" value={data.lessor.name} onChange={v => setPerson('lessor', 'name', v)} />
        <Field label="Full name (Arabic)" value={data.lessor.nameAr} onChange={v => setPerson('lessor', 'nameAr', v)} rtl />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nationality" value={data.lessor.nationality} onChange={v => setPerson('lessor', 'nationality', v)} />
          <Field label="Emirates ID" value={data.lessor.eid} onChange={v => setPerson('lessor', 'eid', v)} />
        </div>
        <Field label="Date of birth" value={data.lessor.dob} onChange={v => setPerson('lessor', 'dob', v)} placeholder="DD/MM/YYYY" />
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lessee (First Party)</h3>
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
        <Field label="Attorney date of birth" value={data.attorney.dob} onChange={v => setPerson('attorney', 'dob', v)} placeholder="DD/MM/YYYY" />
        <Field label="Special POA No." value={data.poaNumber} onChange={v => set('poaNumber', v)} />
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Land</h3>
        <Field label="Location (English)" value={data.propertyLocation} onChange={v => set('propertyLocation', v)} />
        <Field label="Location (Arabic)" value={data.propertyLocationAr} onChange={v => set('propertyLocationAr', v)} rtl />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Length (m)" value={data.lengthM} onChange={v => set('lengthM', v)} />
          <Field label="Width (m)" value={data.widthM} onChange={v => set('widthM', v)} />
          <Field label="Area (sq. m)" value={data.areaSqm} onChange={v => set('areaSqm', v)} />
        </div>
        <Field label="Block No. / plot number" value={data.blockNo} onChange={v => set('blockNo', v)} placeholder="________" />
      </section>

      <section className="space-y-3 pt-2 border-t border-gray-100">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Rent and payment blanks</h3>
        <Field label="Annual rent (AED)" value={String(data.rent)} onChange={v => set('rent', Number(v) || 0)} />
        <InstallmentFields
          title="First instalment"
          amount={data.firstInstallment}
          method={data.firstMethod}
          transferRef={data.firstTransferRef}
          chequeNo={data.firstChequeNo}
          chequeDate={data.firstChequeDate}
          chequeBank={data.firstChequeBank}
          onAmount={v => set('firstInstallment', Number(v) || 0)}
          onMethod={v => set('firstMethod', v)}
          onTransferRef={v => set('firstTransferRef', v)}
          onChequeNo={v => set('firstChequeNo', v)}
          onChequeDate={v => set('firstChequeDate', v)}
          onChequeBank={v => set('firstChequeBank', v)}
        />
        <InstallmentFields
          title="Second instalment"
          amount={data.secondInstallment}
          method={data.secondMethod}
          transferRef={data.secondTransferRef}
          chequeNo={data.secondChequeNo}
          chequeDate={data.secondChequeDate}
          chequeBank={data.secondChequeBank}
          onAmount={v => set('secondInstallment', Number(v) || 0)}
          onMethod={v => set('secondMethod', v)}
          onTransferRef={v => set('secondTransferRef', v)}
          onChequeNo={v => set('secondChequeNo', v)}
          onChequeDate={v => set('secondChequeDate', v)}
          onChequeBank={v => set('secondChequeBank', v)}
        />
      </section>
    </div>
  )
}

function InstallmentFields({
  title,
  amount,
  method,
  transferRef,
  chequeNo,
  chequeDate,
  chequeBank,
  onAmount,
  onMethod,
  onTransferRef,
  onChequeNo,
  onChequeDate,
  onChequeBank,
}: {
  title: string
  amount: number
  method: PaymentMethod
  transferRef: string
  chequeNo: string
  chequeDate: string
  chequeBank: string
  onAmount: (value: string) => void
  onMethod: (value: PaymentMethod) => void
  onTransferRef: (value: string) => void
  onChequeNo: (value: string) => void
  onChequeDate: (value: string) => void
  onChequeBank: (value: string) => void
}) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-100 p-3">
      <h4 className="text-xs font-semibold text-slate-600">{title}</h4>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Amount (AED)" value={String(amount)} onChange={onAmount} />
        <div>
          <label className="text-xs text-gray-500 block mb-1">Payment method</label>
          <select
            className={inputClass}
            value={method}
            onChange={e => onMethod(e.target.value as PaymentMethod)}
          >
            <option value="transfer">Bank transfer</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>
      </div>
      {method === 'cheque' ? (
        <div className="grid grid-cols-3 gap-3">
          <Field label="Cheque No." value={chequeNo} onChange={onChequeNo} placeholder="________" />
          <Field label="Cheque date" value={chequeDate} onChange={onChequeDate} placeholder="________" />
          <Field label="Bank name" value={chequeBank} onChange={onChequeBank} placeholder="________" />
        </div>
      ) : (
        <Field label="Transfer reference / date" value={transferRef} onChange={onTransferRef} placeholder="________" />
      )}
    </div>
  )
}
