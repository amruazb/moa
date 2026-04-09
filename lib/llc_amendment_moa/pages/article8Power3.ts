import type { LLCAmendmentMOAContext } from '../types'

/** Item 3 under 8-3: government / courts representation (POA checklist–driven). */
export function power3Blocks(ctx: LLCAmendmentMOAContext): string {
    const { powers: p } = ctx
    const gov = p.executeTransactions
    const court = p.approachCourts
    if (!gov && !court) return ''

    const fullEn =
        'To represent the Company before all government, local and federal departments, private companies and establishments, to sign jointly on all papers and transactions, to represent the Company before all courts, in all lawsuits filed by or against the Company, and to appoint one or more advocates and dismiss them.'
    const govOnlyEn =
        'To represent the Company before all government, local and federal departments, private companies and establishments, to sign jointly on all papers and transactions.'
    const courtOnlyEn =
        'To represent the Company before all courts, in all lawsuits filed by or against the Company, and to appoint one or more advocates and dismiss them.'

    const bodyEn = gov && court ? fullEn : gov ? govOnlyEn : courtOnlyEn

    const fullAr =
        'تمثيل الشركة أمام جميع الجهات الحكومية والمحلية والاتحادية والشركات والمؤسسات الخاصة، والتوقيع مجتمعين على كافة الأوراق والمعاملات، وتمثيل الشركة أمام جميع المحاكم في الدعاوى المقامة من الشركة أو ضدها، وتعيين محام أو أكثر وعزلهم.'
    const govOnlyAr =
        'تمثيل الشركة أمام جميع الجهات الحكومية والمحلية والاتحادية والشركات والمؤسسات الخاصة، والتوقيع مجتمعين على كافة الأوراق والمعاملات.'
    const courtOnlyAr =
        'تمثيل الشركة أمام جميع المحاكم في الدعاوى المقامة من الشركة أو ضدها، وتعيين محام أو أكثر وعزلهم.'

    const bodyAr = gov && court ? fullAr : gov ? govOnlyAr : courtOnlyAr

    return `
        <div class="article-pair">
          <div class="block">
            <p><strong>8-3-3.</strong> ${bodyEn}</p>
          </div>
          <div class="block rtl">
            <p><strong>8-3-3.</strong> ${bodyAr}</p>
          </div>
        </div>`
}
