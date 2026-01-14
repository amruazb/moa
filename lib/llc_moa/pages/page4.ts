import { LLCMOAContext, pageFooter } from '../types'

const defaultActivitiesEn = ['Management Consultancy', 'Business Consultancy', 'General Trading']
const defaultActivitiesAr = ['استشارات إدارية', 'استشارات الأعمال', 'تجارة عامة']

export function page4(ctx: LLCMOAContext, pageNum: number = 4): string {
  const { company, activitiesEn, activitiesAr } = ctx
  const actEn = activitiesEn.length ? activitiesEn : defaultActivitiesEn
  const actAr = activitiesAr.length ? activitiesAr : defaultActivitiesAr

  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (2): Head Office of the Company</h3>
          <p>The Registered and Head Office of the Company shall be located in the Emirate of <span class="edited">${company.emirate}</span>, United Arab Emirates. The Company may open branches, offices or agencies within the U.A.E. and abroad subject to obtaining necessary approvals.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (2): المقر الرئيسي للشركة</h3>
          <p>يكون المقر الرئيسي والمسجل للشركة في إمارة <span class="edited">${company.emirateAr}</span>، الإمارات العربية المتحدة. ويحق للشركة أن تفتح فروعاً أو مكاتب أو وكالات داخل الدولة أو خارجها بعد الحصول على الموافقات اللازمة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (3): Objectives of the Company</h3>
          <p><strong>The objectives of the company are:</strong></p>
          <ul class="list">${actEn.map(a => '<li class="edited">' + a + '</li>').join('')}</ul>
          <p>The Company may engage in any other lawful business activity permitted under UAE law, subject to obtaining the necessary licenses and approvals.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (3): أغراض الشركة</h3>
          <p><strong>أغراض الشركة هي:</strong></p>
          <ul class="list">${actAr.map(a => '<li class="edited">' + a + '</li>').join('')}</ul>
          <p>يجوز للشركة ممارسة أي نشاط تجاري آخر مشروع يسمح به قانون دولة الإمارات، وذلك بعد الحصول على التراخيص والموافقات اللازمة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (4): Duration of the Company</h3>
          <p>The duration of the Company shall be twenty-five (25) years commencing from the date of its registration in the Commercial Register. This period may be extended or reduced by a resolution of the General Assembly of partners in accordance with the provisions of the law.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (4): مدة الشركة</h3>
          <p>تكون مدة الشركة خمساً وعشرين (25) سنة تبدأ من تاريخ قيدها في السجل التجاري. ويجوز تمديد هذه المدة أو تقصيرها بقرار من الجمعية العمومية للشركاء وفقاً لأحكام القانون.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
