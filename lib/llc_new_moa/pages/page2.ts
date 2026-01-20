import { LLCNewMOAContext, pageFooter } from '../types'

export function page2(ctx: LLCNewMOAContext, pageNum: number = 2): string {
  const { company, partners } = ctx

  // Generate partner list for preamble
  const partnerListEn = partners.map((_p, i) => {
    if (i === 0) return 'first'
    if (i === 1) return 'second'
    if (i === 2) return 'third'
    if (i === 3) return 'fourth'
    if (i === 4) return 'fifth'
    return `${i + 1}th`
  }).join(' and ')

  const partnerListAr = partners.map((_p, i) => {
    if (i === 0) return 'الأول'
    if (i === 1) return 'الثاني'
    if (i === 2) return 'الثالث'
    if (i === 3) return 'الرابع'
    if (i === 4) return 'الخامس'
    return `${i + 1}`
  }).join(' و ')

  return `
    <div class="page">
      <div class="page-content">

      <!-- Preamble -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline center">PREAMBLE</h3>
          <p>The ${partnerListEn} parties, in their lawful sound capacity to contract, have agreed to incorporate a Limited Liability Company in the Emirate of <span class="edited">${company.emirate}</span> in accordance with the provisions of the Federal Law No. 32 of 2021, as amended concerning commercial companies (the Commercial Law) and provisions of this contract and as per the following conditions:-</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline center">المقدمة</h3>
          <p>اتفق الطرف ${partnerListAr} وهما بكامل أهليتهما القانونية للتعاقد على تأسيس شركة ذات مسؤولية محدودة في إمارة <span class="edited">${company.emirateAr}</span> وفقا لأحكام القانون الاتحادي رقم (32) لسنة 2021 وتعديلاته بشأن الشركات التجارية (القانون التجاري) وأحكام هذا العقد ووفقا للشروط التالية:</p>
        </div>
      </div>

      <!-- Definitions -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold underline">DEFINITIONS:</h3>
          <p>In this Memorandum, the following words shall have the following meanings:</p>

          <p><strong>"Affiliate"</strong> means, in relation to a Partner, any person controlling, controlled by, or under common control with that Partner, whether directly or indirectly, where "control" means, in relation to a body corporate, the power of a person to ensure that the affairs of that body corporate are conducted in accordance with the wishes of that person:</p>
          <p>(a) by means of holding stocks, shares and/or voting rights in or in relation to any other body corporate; or</p>
          <p>(b) as conferred by the memorandum of association or any other document regulating that or any other body corporate.</p>

          <p><strong>"Annual Budget"</strong> means the budget approved and adopted annually by the Managing Director and its approved and adopted amendments in accordance with the provisions of this Memorandum.</p>

          <p><strong>"Auditor"</strong> means the auditor of the Company appointed from time to time and shall have the powers and responsibilities stipulated under this Memorandum.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">تعريفات:</h3>
          <p>في هذا العقد، تحمل الكلمات والعبارات التالية المعاني الواردة أدناه:</p>

          <p><strong>"شركة حليفة"</strong> تعني، فيما يتعلق بأي شريك، أي شخص يسيطر على ذلك الشريك أو يخضع لسيطرته أو يخضع معه لسيطرة مشتركة، سواءً بشكل مباشر أو غير مباشر، حيث يُقصد بمصطلح "السيطرة"، فيما يتعلق بأي كيان اعتباري/شركة، سلطة أي شخص في ضمان تسيير أعمال ذلك الكيان الاعتباري وفقًا لرغباته، وذلك:</p>
          <p>(أ) عن طريق امتلاك الأسهم و/أو الحصص و/أو حقوق التصويت في أو فيما يتعلق بأي كيان اعتباري آخر؛ أو</p>
          <p>(ب) وفقًا لما هو مقرر بموجب عقد التأسيس أو أي مستند آخر ينظم ذلك أو أي كيان اعتباري آخر.</p>

          <p><strong>"الميزانية السنوية"</strong> تعني الميزانية المعتمدة والمقرة سنويًا من قبل المدير العام وتعديلاتها المعتمدة والمقرة وفقًا لأحكام هذا العقد.</p>

          <p><strong>"المدقق"</strong> يعني مدقق حسابات الشركة المعين من وقت لآخر وتكون له الصلاحيات والمسؤوليات المنصوص عليها في هذا العقد.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
