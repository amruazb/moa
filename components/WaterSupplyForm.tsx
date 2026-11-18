'use client'

import { WaterSupplyData } from '@/lib/internal_agreement'

const inputClass =
  'w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200'

export function WaterSupplyForm({
  data,
  onChange,
}: {
  data: WaterSupplyData
  onChange: (next: WaterSupplyData) => void
}) {
  const set = <K extends keyof WaterSupplyData>(key: K, value: WaterSupplyData[K]) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-5">
      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Agreement</h3>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Signing date (blank if not yet signed)</label>
          <input className={inputClass} value={data.agreementDate} onChange={e => set('agreementDate', e.target.value)} placeholder="________" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Payment period (blank if not given)</label>
          <input className={inputClass} value={data.paymentPeriod} onChange={e => set('paymentPeriod', e.target.value)} placeholder="________" />
        </div>
      </section>
      <section className="space-y-2 text-sm text-gray-700">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Parties</h3>
        <p><span className="text-gray-500">Supplier:</span> {data.recipientCompany}</p>
        <p dir="rtl" className="text-right">{data.recipientCompanyAr}</p>
        <p><span className="text-gray-500">Recipient:</span> {data.supplier.name}</p>
        <p dir="rtl" className="text-right">{data.supplier.nameAr}</p>
        <p><span className="text-gray-500">EID / DOB:</span> {data.supplier.eid} · {data.supplier.dob}</p>
        <p><span className="text-gray-500">Licence:</span> {data.licenseNo}</p>
        <p><span className="text-gray-500">Attorney:</span> {data.attorney.name}</p>
        <p><span className="text-gray-500">Tank location:</span> {data.propertyLocation}</p>
      </section>
    </div>
  )
}
