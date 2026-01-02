import { MOAContext, pageFooter } from '../types'

export function page5(ctx: MOAContext, pageNum: number = 5): string {
  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER IV</h3>
          <h3 class="center">General Assembly</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الرابع</h3>
          <h3 class="center">الجمعية العمومية</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (15)</h3>
          <p>The General Assembly shall be comprised of all the partners. Each partner shall have a number of votes proportional to their share in the capital. The General Assembly shall have the authority to:</p>
          <ul class="list">
            <li>Approve the annual accounts and balance sheet</li>
            <li>Decide on the distribution of profits</li>
            <li>Appoint and dismiss the manager</li>
            <li>Amend the Memorandum of Association</li>
            <li>Increase or decrease the capital</li>
            <li>Approve the merger or dissolution of the Company</li>
          </ul>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (15)</h3>
          <p>تتألف الجمعية العمومية من جميع الشركاء. ولكل شريك عدد من الأصوات يتناسب مع حصته في رأس المال. وتختص الجمعية العمومية بما يلي:</p>
          <ul class="list">
            <li>المصادقة على الحسابات السنوية والميزانية</li>
            <li>البت في توزيع الأرباح</li>
            <li>تعيين وعزل المدير</li>
            <li>تعديل عقد التأسيس</li>
            <li>زيادة أو تخفيض رأس المال</li>
            <li>الموافقة على اندماج أو حل الشركة</li>
          </ul>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (16)</h3>
          <p>The General Assembly shall hold at least one annual meeting within four months from the end of each financial year. The manager may call for an extraordinary meeting of the General Assembly whenever necessary.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (16)</h3>
          <p>تعقد الجمعية العمومية اجتماعاً سنوياً واحداً على الأقل خلال أربعة أشهر من نهاية كل سنة مالية. ويجوز للمدير دعوة الجمعية العمومية لاجتماع استثنائي كلما دعت الحاجة.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (17)</h3>
          <p>The notice of the General Assembly meeting shall be given at least fifteen days before the date of the meeting. The notice shall specify the date, time, place, and agenda of the meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (17)</h3>
          <p>يتم الإخطار باجتماع الجمعية العمومية قبل خمسة عشر يوماً على الأقل من تاريخ الاجتماع. ويجب أن يتضمن الإخطار تاريخ ووقت ومكان وجدول أعمال الاجتماع.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18)</h3>
          <p>The General Assembly meeting shall not be valid unless attended by partners representing at least 75% of the capital. If the required quorum is not present, a second meeting shall be held within thirty days, which shall be valid regardless of the number of partners present.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18)</h3>
          <p>لا يكون اجتماع الجمعية العمومية صحيحاً إلا إذا حضره شركاء يمثلون 75% على الأقل من رأس المال. وإذا لم يتوفر النصاب المطلوب يعقد اجتماع ثانٍ خلال ثلاثين يوماً يكون صحيحاً بغض النظر عن عدد الشركاء الحاضرين.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
