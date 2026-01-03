import { MOAContext, pageFooter } from '../types'

export function page9(ctx: MOAContext, pageNum: number = 9): string {
  const { pronouns } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (15)</h3>
          <p>The General Assembly shall be presided by the Local partner or ${pronouns.possessive} deputy. The chairman shall appoint one reporter and two reviewers for votes counting, upon approval of the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (15)</h3>
          <p>يرأس الجمعية العمومية الشريك المواطن أو من ينوب عنه ويعين الرئيس مقرراً للاجتماع ومراجعين اثنين لفرز الأصوات على أن تقرر الجمعية العمومية تعيينهم.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (16)</h3>
          <p>Invitation for the General Assembly shall be served via registered letters to each partner within at least 14 days prior to the scheduled time. Invitation letter shall include the agenda, place and time of the meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (16)</h3>
          <p>توجه الدعوة لحضور الجمعيات العمومية بموجب خطابات موصى عليها ترسل لكل شريك قبل موعد انعقادها بأربعة عشر يوم على الأقل. ويجب أن يتضمن خطاب الدعوة بيان جدول الأعمال ومكان الاجتماع وزمانه.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (17)</h3>
          <p>The general assembly may not deliberate any matter except those specified in the agenda; resolutions adopted by the general assembly shall be binding on all partners.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (17)</h3>
          <p>لا يجوز للجمعية العمومية العادية أن تتداول في غير المسائل الواردة بجدول الأعمال المبين في خطاب الدعوة وتكون القرارات التي تصدرها الجمعية ملزمة لجميع الشركاء.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18)</h3>
          <p>The general assembly shall be convened on yearly basis by invitation from the Board of Directors within four months following end of the financial year, particularly to hear Managing Director's report on financial position and activity, to approve the balance sheet and loss and profit account, and determine dividends to be distributed among partners. And to appoint directors, determine their remuneration and other matters. Resolutions of the general assembly</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18)</h3>
          <p>تنعقد الجمعية العمومية كل سنة بناء على دعوة من مجلس إدارة الشركة خلال الأربعة أشهر التالية لنهاية السنة المالية للشركة وتجتمع على الأخص لسماع تقرير المديرة التنفيذية عن نشاط الشركة ومركزها المالي والتصديق على الميزانية العمومية وحساب الأرباح والخسائر وتحديد حصص الأرباح التي توزع على الشركاء وتعيين المديرين وتحديد مكافأتهم وغير ذلك من المسائل. ولا تكون قرارات الجمعية</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
