import { LLCMOAContext, pageFooter } from '../types'

export function page11(_ctx: LLCMOAContext, pageNum: number = 11): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18): Annual General Assembly</h3>
          <p>The general assembly shall be convened on yearly basis upon invitation from the Board of Directors within four months following end of the financial year, particularly to hear Managing Director's report on financial position and activity, approve the balance sheet and loss and profit account, and determine dividends to be distributed among partners. And to appoint directors, determine their remuneration and other matters. Resolutions of the general assembly shall be valid only if they were issued by majority of votes representing not less than the capital. In the event of lack of quorum, the general assembly shall be convened within the following 14 days and the next meeting shall be valid regardless of the number of shares represented therein.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18): الجمعية العمومية السنوية</h3>
          <p>تنعقد الجمعية العمومية كل سنة بناء على دعوة من مجلس إدارة الشركة خلال الأربعة أشهر التالية لنهاية السنة المالية للشركة وتجتمع على الأخص لسماء تقرير المدير التنفيذي عن نشاط الشركة ومركزها المالي والتصديق على الميزانية العمومية وحساب الأرباح والخسائر وتحديد حصص الأرباح التي توزع على الشركاء وتعيين المديرين وتحديد مكافآتهم وغير ذلك من المسائل ولاتكون قرارات الجمعية صحيحة إلا إذا صدرت بأغلبية الأصوات التى تمثل رأس المال على الأقل. وفي حالة عدم توفر النصاب لجمعية الاجتماع الأول تعين عقد الجمعية العمومية ثانية خلال 14 يوما التالية ويعتبر اجتماعها الثاني صحيحا مهما كان عدد الحصص الممثلة فيه.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (19): Extraordinary General Assembly</h3>
          <p>The extra ordinary general assembly shall have the right to amend the memorandum of association, As for resolutions discharging the director, 51% of the votes shall be sufficient.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (19): الجمعية العمومية غير العادية</h3>
          <p>للجمعية العمومية الفير عادية أن تعدل عقد تأسيس الشركة على أنه في حالة التصويت على القرارات الخاصة بإبراء ذمة المديرة يكتفى بأكثرية أصوات تمثل 51% من رأس المال.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (20): General Assembly Minutes</h3>
          <p>General Assembly deliberations and resolutions shall be registered in minutes then be entered in special numbered register signed by chairman, the reporter, the two reviewers and the accounts controller.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (20): محاضر الجمعية العمومية</h3>
          <p>تدون مداولات الجمعية العمومية وقراراتها في محاضر تقيد في سجل خاص مرقمة صفحاته ويوقع عليها رئيس الجمعية ومقرر الاجتماع ومراجعي الأصوات ومراقب الحسابات.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
