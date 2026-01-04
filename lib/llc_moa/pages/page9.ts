import { LLCMOAContext, pageFooter } from '../types'

export function page9(_ctx: LLCMOAContext, pageNum: number = 9): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="section-bar"><span>CHAPTER FIVE: GENERAL ASSEMBLY</span><span class="rtl">الباب الخامس: الجمعية العمومية</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (16)</h3>
          <h3 class="underline center">GENERAL ASSEMBLY OF PARTNERS</h3>
          <p>The partners shall constitute the General Assembly of the Company. The General Assembly shall convene at least once a year within four (4) months from the end of the financial year. The Managing Director may convene extraordinary meetings whenever necessary.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (16)</h3>
          <h3 class="underline center">الجمعية العمومية للشركاء</h3>
          <p>يشكل الشركاء الجمعية العمومية للشركة. وتجتمع الجمعية العمومية مرة واحدة على الأقل في السنة خلال أربعة (4) أشهر من نهاية السنة المالية. ويجوز للمدير دعوة اجتماعات استثنائية كلما دعت الضرورة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (17)</h3>
          <h3 class="underline center">NOTICE OF MEETINGS</h3>
          <p>Partners shall be invited to attend meetings by registered letter or by any other means agreed upon, at least fifteen (15) days before the meeting date. The invitation shall include the agenda, date, time, and place of the meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (17)</h3>
          <h3 class="underline center">الدعوة للاجتماعات</h3>
          <p>يتم دعوة الشركاء لحضور الاجتماعات بخطاب مسجل أو بأي وسيلة أخرى متفق عليها، قبل خمسة عشر (15) يوماً على الأقل من موعد الاجتماع. ويجب أن تتضمن الدعوة جدول الأعمال وتاريخ ووقت ومكان الاجتماع.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18)</h3>
          <h3 class="underline center">QUORUM</h3>
          <p>The meeting of the General Assembly shall be valid if attended by partners holding more than half of the shares. If this quorum is not achieved, a second meeting shall be held within thirty (30) days of the first meeting and shall be valid regardless of the number of shares represented.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18)</h3>
          <h3 class="underline center">النصاب</h3>
          <p>يكون اجتماع الجمعية العمومية صحيحاً إذا حضره شركاء يملكون أكثر من نصف الحصص. وإذا لم يتوفر هذا النصاب، يعقد اجتماع ثان خلال ثلاثين (30) يوماً من الاجتماع الأول ويكون صحيحاً بغض النظر عن عدد الحصص الممثلة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
