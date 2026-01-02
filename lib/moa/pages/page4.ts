import { MOAContext, pageFooter } from '../types'

export function page4(ctx: MOAContext): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (9)</h3>
          <p>a) Each partner is liable for the company obligation to the extent of value of shares in the capital.</p>
          <p>b) The company shall be managed and its signature shall be by the Managing Director appointed herein.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (9)</h3>
          <p>أ) يكون كل شريك مسؤولاً عن التزامات الشركة بقدر حصته في رأس المال.</p>
          <p>ب) يتولى إدارة الشركة والتوقيع عنها المديرة المفوض المعين في هذا العقد.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER III</h3>
          <h3 class="center">Management of the Company</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الثالث</h3>
          <h3 class="center">إدارة الشركة</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10)</h3>
          <p>a) The sole owner may solely appoint one or more managers from among the partners or from third parties and fix their remuneration. The manager shall have full power and authority to manage the Company and act on its behalf in all matters related to the Company's objectives and activities, except matters which are legally required to be resolved by the General Assembly.</p>
          <p>b) The manager may delegate some of their powers to another person and may appoint agents and attorneys for specific matters.</p>
          <p>c) The manager shall exercise their powers in accordance with the provisions of this Memorandum and within the limits of the Company's objectives. They shall not undertake any activity that may cause harm to the Company or conflict with its interests.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10)</h3>
          <p>أ) يجوز للمالك الوحيد تعيين مدير أو أكثر من بين الشركاء أو من الغير ويحدد أجره. يكون للمدير كافة الصلاحيات والسلطات لإدارة الشركة والتصرف نيابة عنها في جميع الأمور المتعلقة بأغراض الشركة وأنشطتها، باستثناء الأمور التي يتطلب القانون أن يتم البت فيها بقرار من الجمعية العمومية.</p>
          <p>ب) يجوز للمدير تفويض بعض صلاحياته لشخص آخر كما يجوز له تعيين وكلاء ومحامين لأمور محددة.</p>
          <p>ج) يمارس المدير صلاحياته وفقاً لأحكام هذا العقد وفي حدود أغراض الشركة. ولا يجوز له القيام بأي نشاط قد يلحق الضرر بالشركة أو يتعارض مع مصالحها.</p>
        </div>
      </div>
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
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (14)</h3>
          <p>The manager shall not carry on or participate in a business competing with that of the Company without the written consent of all partners. Violation of this provision shall entitle the Company to claim compensation for any damages suffered.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (14)</h3>
          <p>لا يجوز للمدير أن يمارس أو يشارك في نشاط منافس لنشاط الشركة دون موافقة كتابية من جميع الشركاء. ومخالفة هذا الحكم يخول الشركة المطالبة بالتعويض عن أية أضرار تلحق بها.</p>
        </div>
      </div>
      </div>
      ${pageFooter(4)}
    </div>`
}
