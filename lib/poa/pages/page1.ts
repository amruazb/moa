// POA Page 1: Header, Principal Info, Attorney Info, Section 1
import { POAContext, poaPageFooter } from '../types'

export function page1(ctx: POAContext, pageNum: number = 1): string {
  const { principals, attorneys, license } = ctx
  const attorneysList = attorneys && attorneys.length > 0 ? attorneys : [ctx.attorney]

  return `
    <div class="page page-1">
      <div class="page-content">

      <!-- Title -->
      <div class="title-pair">
        <div class="title-en">SPECIAL POWER OF ATTORNEY</div>
        <div class="title-ar rtl">وكـــالة خاصـــة</div>
      </div>

      <!-- Principal Info -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>${principals.length > 1 ? 'We' : 'I'}, the undersigned:<br/>
          ${principals.map((principal, index) => {
    let principalText = `${principal.pronouns.title} <span class="edited">${principal.name}</span>, <span class="edited">${principal.nationality}</span> national, holder of resident Emirates ID No. <span class="edited no-break">${principal.eidOrPassport}</span>`

    if (principal.isRepresented && principal.representative) {
      principalText += `<br/>Represented by: ${principal.representative.pronouns.title} <span class="edited">${principal.representative.name}</span>, <span class="edited">${principal.representative.nationality}</span> National, holder of resident Emirates ID No. <span class="edited no-break">${principal.representative.eidOrPassport}</span>, by virtue of Power of Attorney attested by Notary Public, <span class="edited">${principal.representative.poaLocation}</span>, under No.: <span class="edited no-break">${principal.representative.poaNumber}</span> dated <span class="edited">${principal.representative.poaDate}</span>, residing at <span class="edited">${principal.representative.address}</span>.`
    }

    return principalText + (index < principals.length - 1 ? '; and<br/>' : ',')
  }).join('')}</p>
        </div>
        <div class="block rtl">
          <p>${principals.length > 1 ? 'نحن الموقعون أدناه' : 'أنا الموقعة أدناه'}:${principals.length > 1 ? '' : '<br/>'}
          ${principals.map((principal, index) => {
    let principalText = `${principal.pronouns.titleAr} / <span class="edited">${principal.nameAr}</span>، <span class="edited">${principal.nationalityAr}</span> الجنسية، حامل بطاقة هوية مقيم رقم: <span class="edited no-break">${principal.eidOrPassport}</span>`

    if (principal.isRepresented && principal.representative) {
      principalText += `<br/>ممثل بـ: ${principal.representative.pronouns.titleAr} / <span class="edited">${principal.representative.nameAr}</span>، <span class="edited">${principal.representative.nationalityAr}</span> الجنسية، حامل بطاقة الهوية الإماراتية رقم: <span class="edited no-break">${principal.representative.eidOrPassport}</span>، بموجب التوكيل المصدق من كاتب العدل، <span class="edited">${principal.representative.poaLocation}</span>، تحت رقم: <span class="edited no-break">${principal.representative.poaNumber}</span> بتاريخ <span class="edited">${principal.representative.poaDate}</span>، مقيم في <span class="edited">${principal.representative.addressAr}</span>.`
    }

    return principalText + (index < principals.length - 1 ? '؛ و<br/>' : '،')
  }).join('')}</p>
        </div>
      </div>

      <!-- License Info -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>In ${principals.length > 1 ? 'Our' : 'My'} capacit${principals.length > 1 ? 'ies' : 'y'} as ${principals.length > 1 ? 'partners' : 'owner'} of the following License No. <span class="edited no-break">${license.licenseNumber}</span>, named: "<span class="edited">${license.companyName}</span>", issued from the <span class="edited">${license.issuingAuthority}</span>, do hereby authorize:</p>
        </div>
        <div class="block rtl">
          <p>بصفت${principals.length > 1 ? 'نا' : 'ي'} ${principals.length > 1 ? 'شركاء' : (principals[0].salutation === 'mr' ? 'مالك' : 'مالكة')} في الرخصة رقم: <span class="edited no-break">${license.licenseNumber}</span>، المسماة: "<span class="edited">${license.companyNameAr}</span>"، الصادرة من <span class="edited">${license.issuingAuthorityAr}</span>، ${principals.length > 1 ? 'نوكل' : 'أوكل'}:</p>
        </div>
      </div>

      <!-- Attorney Info with Authorization (multiple attorneys) -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>${attorneysList.map((attorney, index) => {
    const idPart = `holder of resident Emirates ID No. <span class="edited no-break">${attorney.eidOrPassport}</span>`
    const namePart = `<span class="edited">${attorney.pronouns.title} ${attorney.name}</span>, <span class="edited">${attorney.nationality}</span> national, ${idPart}`
    if (index === 0) return namePart
    if (index === attorneysList.length - 1) return `<br/><br/>, and ${namePart}`
    return `<br/><br/>, ${namePart}`
  }).join('')},<br/>
          to act on ${principals.length > 1 ? 'our' : 'my'} behalf, represent the company, and sign documents individually or jointly within the scope of the following powers:</p>
        </div>
        <div class="block rtl">
          <p>${attorneysList.map((attorney, index) => {
    const idPart = `حامل بطاقة هوية مقيم رقم: <span class="edited no-break">${attorney.eidOrPassport}</span>`
    const namePart = `<span class="edited">${attorney.pronouns.titleAr} / ${attorney.nameAr}</span>، <span class="edited">${attorney.nationalityAr}</span> الجنسية، ${idPart}`
    if (index === 0) return namePart
    if (index === attorneysList.length - 1) return `<br/><br/>، و${namePart}`
    return `<br/><br/>، ${namePart}`
  }).join('')}،<br/>
          ل${principals.length > 1 ? 'نوب عنا' : 'نوب عني'}، ومثل الشركة، والتوقيع على المستندات بوكيل فرد أو مشترك في نطاق الصلاحيات التالية:</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
