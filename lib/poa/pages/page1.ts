// POA Page 1: Header, Principal Info, Attorney Info, Section 1
import { POAContext, poaPageFooter, POAAttorney, POAPrincipal, POALicense, POAPrincipalRole } from '../types'

function getLicenseCapacityEn(principals: POAPrincipal[], license: POALicense): string {
  const roles = principals.map((p) => (p.role || 'owner') as POAPrincipalRole)
  const hasMgr = roles.some((r) => r === 'manager')
  const moaSuffixEn =
    hasMgr && license.moaNumber && license.moaDate
      ? ` by virtue of the Memorandum of Association No. <span class="edited no-break">${license.moaNumber}</span> dated <span class="edited">${license.moaDate}</span>`
      : ''

  if (principals.length === 1) {
    const p = principals[0]
    const role = (p.role || 'owner') as POAPrincipalRole
    if (role === 'partner') return 'partner'
    if (role === 'manager') return `manager${moaSuffixEn}`
    return 'owner'
  }

  const uniq = [...new Set(roles)]
  if (uniq.length === 1) {
    if (uniq[0] === 'partner') return 'partners'
    if (uniq[0] === 'owner') return 'owners'
    if (uniq[0] === 'manager') return `managers${moaSuffixEn}`
  }

  const order: POAPrincipalRole[] = ['owner', 'partner', 'manager']
  const sorted = [...uniq].sort((a, b) => order.indexOf(a) - order.indexOf(b))
  const words = sorted.map((r) => (r === 'owner' ? 'owner' : r === 'partner' ? 'partner' : 'manager'))
  if (words.length === 2) return `${words[0]} and ${words[1]}${moaSuffixEn}`
  return `${words.slice(0, -1).join(', ')}, and ${words[words.length - 1]}${moaSuffixEn}`
}

function getLicenseCapacityAr(principals: POAPrincipal[], license: POALicense): string {
  const roles = principals.map((p) => (p.role || 'owner') as POAPrincipalRole)
  const hasMgr = roles.some((r) => r === 'manager')
  const moaSuffixAr =
    hasMgr && license.moaNumber && license.moaDate
      ? ` بموجب عقد التأسيس رقم <span class="edited no-break">${license.moaNumber}</span> بتاريخ <span class="edited">${license.moaDate}</span>`
      : ''

  if (principals.length === 1) {
    const p = principals[0]
    const role = (p.role || 'owner') as POAPrincipalRole
    if (role === 'manager') {
      const title = p.salutation === 'mr' ? 'مدير' : 'مديرة'
      return `${title}${moaSuffixAr}`
    }
    if (role === 'partner') return p.salutation === 'mr' ? 'شريك' : 'شريكة'
    return p.salutation === 'mr' ? 'مالك' : 'مالكة'
  }

  const uniq = [...new Set(roles)] as POAPrincipalRole[]
  if (uniq.length === 1) {
    if (uniq[0] === 'partner') return 'شركاء'
    if (uniq[0] === 'owner') return 'مالكين'
    if (uniq[0] === 'manager') return `مديرين${moaSuffixAr}`
  }

  const order: POAPrincipalRole[] = ['owner', 'partner', 'manager']
  const sorted = [...uniq].sort((a, b) => order.indexOf(a) - order.indexOf(b))
  const words = sorted.map((r) => (r === 'owner' ? 'مالك' : r === 'partner' ? 'شريك' : 'مدير'))
  return `${words.join(' و')}${moaSuffixAr}`
}

export function page1(ctx: POAContext, pageNum: number = 1): string {
  const { principals, license } = ctx
  const attorneysList: POAAttorney[] = ctx.attorneys.length > 0 ? ctx.attorneys : [ctx.attorney]

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
          <p>In ${principals.length > 1 ? 'Our' : 'My'} capacit${principals.length > 1 ? 'ies' : 'y'} as ${getLicenseCapacityEn(principals, license)} of the following License No. <span class="edited no-break">${license.licenseNumber}</span>, named: "<span class="edited">${license.companyName}</span>", issued from the <span class="edited">${license.issuingAuthority}</span>, do hereby authorize:</p>
        </div>
        <div class="block rtl">
          <p>بصفت${principals.length > 1 ? 'نا' : 'ي'} ${getLicenseCapacityAr(principals, license)} في الرخصة رقم: <span class="edited no-break">${license.licenseNumber}</span>، المسماة: "<span class="edited">${license.companyNameAr}</span>"، الصادرة من <span class="edited">${license.issuingAuthorityAr}</span>، ${principals.length > 1 ? 'نوكل' : 'أوكل'}:</p>
        </div>
      </div>

      <!-- Attorney Info with Authorization (multiple attorneys) -->
      <div class="article-pair intro-section">
        <div class="block">
          <p>${attorneysList.map((attorney: POAAttorney, index: number) => {
      const idPart = `holder of resident Emirates ID No. <span class="edited no-break">${attorney.eidOrPassport}</span>`
      const namePart = `<span class="edited">${attorney.pronouns.title} ${attorney.name}</span>, <span class="edited">${attorney.nationality}</span> national, ${idPart}`
      if (index === 0) return namePart
      if (index === attorneysList.length - 1) return `<br/><br/>, and ${namePart}`
      return `<br/><br/>, ${namePart}`
    }).join('')},<br/>
          to act on ${principals.length > 1 ? 'our' : 'my'} behalf, represent the company, and sign documents individually or jointly within the scope of the following powers:</p>
        </div>
        <div class="block rtl">
          <p>${attorneysList.map((attorney: POAAttorney, index: number) => {
      const idPart = `حامل بطاقة هوية مقيم رقم: <span class="edited no-break">${attorney.eidOrPassport}</span>`
      const namePart = `<span class="edited">${attorney.pronouns.titleAr} / ${attorney.nameAr}</span>، <span class="edited">${attorney.nationalityAr}</span> الجنسية، ${idPart}`
      if (index === 0) return namePart
      if (index === attorneysList.length - 1) return `<br/><br/>، و${namePart}`
      return `<br/><br/>، ${namePart}`
    }).join('')}،<br/>
          ل${principals.length > 1 ? 'نوب عنا' : 'نوب عني'}، ومثل الشركة، والتوقيع على المستندات بوكيل فرد أو مشترك في نطاق الصلاحيات التالية:</p>
        </div>
      </div>

      <!-- Section 1: Execute Transactions (header + first paragraph) -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>1</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To Execute Transactions:</span></p>
          <p>To contact all the relevant government and non-government departments, Ministries, local authorities, embassies, committees, councils, semi-government departments, consulates, notary public, Ministry of Human Resources and Emiratization, Department of Economic Development (to open branches, issue all licenses required, change activities and Trade Name), Chamber of Commerce and Industry, Abu Dhabi Tourism and Cultural Authority,</p>
        </div>
        <div class="block rtl">
          <p><strong>1</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">إنهاء المعاملات:</span></p>
          <p>مراجعة كافة الدوائر وكافة الجهات الحكومية حكومية والوزارات والهيئات المحلية والسفــارات واللجان والمجالس والدوائر حكومية والقنصليـــات والكتاب العدل ووزارة الموارد البشـــرية والتوطين ودائرة التنميـــة الاقتصادية لفتح فروعها واصـــدار كل الرخص المطلوبة وتعديل نشـــاطات والاســـم التجاري، وغرفة التجارة والصناعة وهيئة أبوظبي للسياحة والثقافية</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
