// Single centered bilingual signature card (matches the POA sign-off design).
// One card per signatory: role label EN | AR, name EN, name AR, optional extra lines, one signature line.

export interface SignatureCardInput {
  roleEn: string
  roleAr: string
  nameEn: string
  nameAr: string
  /** Optional extra bilingual lines, e.g. a company representative */
  extraLines?: { en: string; ar: string }[]
  /** Optional extra label shown beside "Signature" (e.g. Date / التاريخ) */
  dateLabel?: boolean
}

export function signatureCard(c: SignatureCardInput): string {
  const sep = '<span style="color: #64748b; margin: 0 6px; font-weight: 400;">|</span>'
  const extra = (c.extraLines || []).map((l) => `
          <p style="margin: 2px 0;">${l.en}</p>
          <p dir="rtl" style="margin: 2px 0;">${l.ar}</p>`).join('')
  return `
      <div class="signature-card-wrap" style="display: flex; justify-content: center; width: 100%; page-break-inside: avoid; break-inside: avoid;">
        <div class="signature-card" style="max-width: 420px; width: 100%; margin: 0 auto 14px; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px 20px; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08); text-align: center; page-break-inside: avoid; break-inside: avoid;">
          <p style="margin: 0 0 4px;"><strong>${c.roleEn}</strong>${sep}<strong dir="rtl">${c.roleAr}</strong></p>
          <p style="margin: 2px 0;"><span class="edited">${c.nameEn}</span></p>
          <p dir="rtl" style="margin: 2px 0;"><span class="edited">${c.nameAr}</span></p>${extra}
          <div style="margin: 48px auto 6px; border-top: 1px solid #000; width: 70%; height: 6px;"></div>
          <p style="margin: 0;"><strong>Signature</strong>${sep}<strong dir="rtl">التوقيع</strong>${c.dateLabel ? `<span style="margin-left: 28px;"><strong>Date</strong>${sep}<strong dir="rtl">التاريخ</strong></span>` : ''}</p>
        </div>
      </div>`
}

export function ordinalParty(index: number): { en: string; ar: string } {
  const en = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
  const ar = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر']
  return { en: `${en[index] || `${index + 1}th`} Party`, ar: `الطرف ${ar[index] || index + 1}` }
}

/**
 * Split cards so they flow across pages: the first `firstPageCapacity` cards stay on the
 * current page; the rest go on continuation pages (`perPage` each).
 */
export function splitSignatureCards(cards: string[], firstPageCapacity: number, perPage: number = 5): { first: string; overflow: string[] } {
  const first = cards.slice(0, firstPageCapacity).join('')
  const overflow: string[] = []
  for (let i = firstPageCapacity; i < cards.length; i += perPage) overflow.push(cards.slice(i, i + perPage).join(''))
  return { first, overflow }
}
