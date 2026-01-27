// POA Page 1: Header, Principal Info, Attorney Info, Section 1
import { POAContext, poaPageFooter } from '../types'

export function page1(ctx: POAContext, pageNum: number = 1): string {
  const { principals, attorney, license } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Title -->
      <div class="title-pair">
        <div class="title-en">SPECIAL POWER OF ATTORNEY</div>
        <div class="title-ar rtl">وكـــالة خاصـــة</div>
      </div>

      <!-- Principal Info -->
      <div class="article-pair">
        <div class="block">
          <p>${principals.length > 1 ? 'We' : 'I'}, the undersigned:<br/>
          ${principals.map((principal, index) => {
            let principalText = `${principal.pronouns.title} <span class="edited">${principal.name}</span>, <span class="edited">${principal.nationality}</span> national, holder of resident Emirates ID No. <span class="edited">${principal.eidOrPassport}</span>`
            
            if (principal.isRepresented && principal.representative) {
              principalText += `<br/>Represented by: ${principal.representative.pronouns.title} <span class="edited">${principal.representative.name}</span>, <span class="edited">${principal.representative.nationality}</span> National, holder of resident Emirates ID No. <span class="edited">${principal.representative.eidOrPassport}</span>, by virtue of Power of Attorney attested by Notary Public, <span class="edited">${principal.representative.poaLocation}</span>, under No.: <span class="edited">${principal.representative.poaNumber}</span> dated <span class="edited">${principal.representative.poaDate}</span>, residing at <span class="edited">${principal.representative.address}</span>.`
            }
            
            return principalText + (index < principals.length - 1 ? '; and<br/>' : ',')
          }).join('')}</p>
        </div>
        <div class="block rtl">
          <p>${principals.length > 1 ? 'نحن الموقعون أدناه' : 'أنا الموقعة أدناه'}:${principals.length > 1 ? '' : '<br/>'}
          ${principals.map((principal, index) => {
            let principalText = `${principal.pronouns.titleAr} / <span class="edited">${principal.nameAr}</span>، <span class="edited">${principal.nationalityAr}</span> الجنسية بحمل بطاقة هوية مقيم رقم: <span class="edited">${principal.eidOrPassport}</span>`
            
            if (principal.isRepresented && principal.representative) {
              principalText += `<br/>ممثل بـ: ${principal.representative.pronouns.titleAr} / <span class="edited">${principal.representative.nameAr}</span>، <span class="edited">${principal.representative.nationalityAr}</span> الجنسية، حامل بطاقة الهوية الإماراتية رقم: <span class="edited">${principal.representative.eidOrPassport}</span>، بموجب التوكيل المصدق من كاتب العدل، <span class="edited">${principal.representative.poaLocation}</span>، تحت رقم: <span class="edited">${principal.representative.poaNumber}</span> بتاريخ <span class="edited">${principal.representative.poaDate}</span>، مقيم في <span class="edited">${principal.representative.addressAr}</span>.`
            }
            
            return principalText + (index < principals.length - 1 ? '؛ و<br/>' : '،')
          }).join('')}</p>
        </div>
      </div>

      <!-- License Info -->
      <div class="article-pair">
        <div class="block">
          <p>In ${principals.length > 1 ? 'Our' : 'My'} capacit${principals.length > 1 ? 'ies' : 'y'} as ${principals.length > 1 ? 'partners' : 'partner'} of the<br/>
          following License No: <span class="edited">${license.licenseNumber}</span><br/>
          named :-<br/>
          "<span class="edited">${license.companyName}</span>"<br/>
          issued from the <span class="edited">${license.issuingAuthority}</span>,<br/>
          do hereby authorize:</p>
        </div>
        <div class="block rtl">
          <p>بصفت${principals.length > 1 ? 'نا' : 'ي'} ${principals.length > 1 ? 'شركاء' : 'شريكة'} في الرخصة رقم: <span class="edited">${license.licenseNumber}</span><br/>
          المسماة :-<br/>
          "<span class="edited">${license.companyNameAr}</span>" الصادرة<br/>
          من <span class="edited">${license.issuingAuthorityAr}</span>،<br/>
          ${principals.length > 1 ? 'نوكل' : 'أوكل'}:</p>
        </div>
      </div>

      <!-- Attorney Info -->
      <div class="article-pair">
        <div class="block">
          <p><span class="edited">${attorney.pronouns.title} ${attorney.name}</span>, <span class="edited">${attorney.nationality}</span> national,<br/>
          holder of resident Emirates<br/>
          ID No. <span class="edited">${attorney.eidOrPassport}</span>,</p>
        </div>
        <div class="block rtl">
          <p><span class="edited">${attorney.pronouns.titleAr}/ ${attorney.nameAr}</span>، <span class="edited">${attorney.nationalityAr}</span> الجنسية<br/>
          بحمل بطاقة هوية مقيــم رقم:<br/>
          <span class="edited">${attorney.eidOrPassport}</span>،</p>
        </div>
      </div>

      <!-- Authority Statement -->
      <div class="article-pair">
        <div class="block">
          <p>To act and represent ${principals.length > 1 ? 'us' : 'me'}, to perform on ${principals.length > 1 ? 'our' : 'my'} behalf, and to sign jointly within the limits of ${principals.length > 1 ? 'our' : 'my'} share${principals.length > 1 ? 's' : ''} in the license, as provided hereunder:</p>
        </div>
        <div class="block rtl">
          <p>ل${principals.length > 1 ? 'ي' : ''}نوب عن${principals.length > 1 ? 'ا' : 'ي'} و${principals.length > 1 ? 'ي' : ''}قوم مقام${principals.length > 1 ? 'نا' : 'ي'} و${principals.length > 1 ? 'ي' : ''}مض${principals.length > 1 ? 'ي' : ''} بالتوقيع، وذلك في حدود ${principals.length > 1 ? 'حصصنا' : 'حصتي'} فيما يخص الرخصة المذكورة أعلاه وذلك كما يلي:</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
