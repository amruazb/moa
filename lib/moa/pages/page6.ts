import { MOAContext } from '../types'

export function page6(ctx: MOAContext): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11)</h3>
          <p>Ms. ${manager.name}, ID No. ${manager.id}, has been appointed as Managing Director with full authority to manage the Company's affairs, including but not limited to:</p>
          <ul class="list">
            <li>Opening and operating bank accounts</li>
            <li>Signing contracts on behalf of the Company</li>
            <li>Representing the Company before all authorities</li>
            <li>Hiring and dismissing employees</li>
            <li>Taking all necessary actions for the Company's benefit</li>
          </ul>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11)</h3>
          <p>تم تعيين السيدة/ ${manager.nameAr}، الهوية رقم ${manager.id}، كمديرة مفوضة مع كافة الصلاحيات لإدارة شؤون الشركة، بما في ذلك على سبيل المثال لا الحصر:</p>
          <ul class="list">
            <li>فتح وتشغيل الحسابات المصرفية</li>
            <li>توقيع العقود نيابة عن الشركة</li>
            <li>تمثيل الشركة أمام جميع الجهات</li>
            <li>توظيف وفصل الموظفين</li>
            <li>اتخاذ جميع الإجراءات اللازمة لمصلحة الشركة</li>
          </ul>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (12)</h3>
          <p>The manager shall keep accurate records and accounts of all the Company's transactions and shall prepare an annual balance sheet and profit and loss account within three months from the end of each financial year.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (12)</h3>
          <p>يحتفظ المدير بسجلات وحسابات دقيقة لجميع معاملات الشركة ويعد ميزانية سنوية وحساب أرباح وخسائر خلال ثلاثة أشهر من نهاية كل سنة مالية.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (13)</h3>
          <p>The manager's appointment shall be for an unlimited period unless otherwise specified by the partners. The manager may resign upon giving thirty days' written notice to the partners.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (13)</h3>
          <p>يكون تعيين المدير لمدة غير محددة ما لم يحدد الشركاء خلاف ذلك. ويجوز للمدير الاستقالة بعد إخطار الشركاء كتابياً قبل ثلاثين يوماً.</p>
        </div>
      </div>
      <div class="page-num">6</div>
    </div>`
}
