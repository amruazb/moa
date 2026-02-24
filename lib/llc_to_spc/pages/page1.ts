import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page1(ctx: LLCToSPCContext, pageNum: number = 1): string {
  const { agreementDate, firstParty, secondParty, newOwner, license } = ctx

  return `
    <div class="page">
      <div class="page-content">
      
      <!-- Document Header -->
      <div class="bilingual-header">
        <div class="header-left">
          <h1>Contract of</h1>
          <h2>Assignment & Transfer of</h2>
          <h2>Limited Liability Company to</h2>
          <h2>Sole Proprietorship LLC</h2>
          <h3 class="edited">${license.companyName}</h3>
        </div>
        <div class="header-right">
          <h1>عقد تنازل وتحويل</h1>
          <h2>شركة ذات مسئولية محدودة الى</h2>
          <h2>شركة الشخص الواحد</h2>
          <h2>ذ.م.م</h2>
          <h3 class="edited">${license.companyNameAr}</h3>
        </div>
      </div>

      <!-- Agreement Date -->
      <div class="article-pair">
        <div class="block">
          <p>It is on this day <strong class="edited">${agreementDate}</strong>, this agreement has been made between the undersigned:</p>
        </div>
        <div class="block rtl">
          <p>إنه في هذا اليوم <strong class="edited">${agreementDate}</strong> الموافق تم الاتفاق و الرضى بين الموقعين أدناه:</p>
        </div>
      </div>

      <!-- First Party -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">First Party</h3>
          <p><strong class="edited">${firstParty.pronouns.title} ${firstParty.name}</strong>, <span class="edited">${firstParty.nationality}</span> national, holder of ${firstParty.documentType === 'eid' ? 'Emirates ID' : 'Passport'} No. <strong class="edited">${firstParty.eidOrPassport}</strong>, ${firstParty.pronouns.possessive} date of birth: <span class="edited">${firstParty.dob}</span>, ${firstParty.pronouns.possessive} address: <span class="edited">${firstParty.address}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الطرف الأول</h3>
          <p><strong class="edited">${firstParty.pronouns.titleAr}/ ${firstParty.nameAr}</strong>، <span class="edited">${firstParty.nationalityAr}</span> الجنسية، يحمل ${firstParty.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <strong class="edited">${firstParty.eidOrPassport}</strong>، تاريخ ميلاد${firstParty.pronouns.possessiveAr}: <span class="edited">${firstParty.dob}</span>، عنوان${firstParty.pronouns.possessiveAr}: <span class="edited">${firstParty.addressAr}</span>.</p>
        </div>
      </div>

      <!-- Second Party -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Second Party</h3>
          <p><strong class="edited">${secondParty.pronouns.title} ${secondParty.name}</strong>, <span class="edited">${secondParty.nationality}</span> national, holder of ${secondParty.documentType === 'eid' ? 'Emirates ID' : 'Passport'} No. <strong class="edited">${secondParty.eidOrPassport}</strong>, ${secondParty.pronouns.possessive} date of birth: <span class="edited">${secondParty.dob}</span>, ${secondParty.pronouns.possessive} address: <span class="edited">${secondParty.address}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الطرف الثاني</h3>
          <p><strong class="edited">${secondParty.pronouns.titleAr}/ ${secondParty.nameAr}</strong>، <span class="edited">${secondParty.nationalityAr}</span> الجنسية، يحمل ${secondParty.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <strong class="edited">${secondParty.eidOrPassport}</strong>، تاريخ ميلاد${secondParty.pronouns.possessiveAr}: <span class="edited">${secondParty.dob}</span>، عنوان${secondParty.pronouns.possessiveAr}: <span class="edited">${secondParty.addressAr}</span>.</p>
        </div>
      </div>

      <!-- Third Party (New Owner) -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Third Party (New Owner)</h3>
          <p><strong class="edited">${newOwner.pronouns.title} ${newOwner.name}</strong>, <span class="edited">${newOwner.nationality}</span> national, holder of ${newOwner.documentType === 'eid' ? 'Emirates ID' : 'Passport'} No. <strong class="edited">${newOwner.eidOrPassport}</strong>, ${newOwner.pronouns.possessive} date of birth: <span class="edited">${newOwner.dob}</span>, ${newOwner.pronouns.possessive} address: <span class="edited">${newOwner.address}</span>.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الطرف الثالث (المالك الجديد)</h3>
          <p><strong class="edited">${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}</strong>، <span class="edited">${newOwner.nationalityAr}</span> الجنسية، يحمل ${newOwner.documentType === 'eid' ? 'بطاقة هوية' : 'جواز سفر'} رقم: <strong class="edited">${newOwner.eidOrPassport}</strong>، تاريخ ميلاد${newOwner.pronouns.possessiveAr}: <span class="edited">${newOwner.dob}</span>، عنوان${newOwner.pronouns.possessiveAr}: <span class="edited">${newOwner.addressAr}</span>.</p>
        </div>
      </div>
      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
