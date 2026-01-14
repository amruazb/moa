import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page9(ctx: LLCToSPCContext, pageNum: number = 9): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 16: General Assembly Deliberations -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (16): General Assembly Deliberations</h3>
          <p>The general assembly may not deliberate any matter except those specified in the agenda; resolutions adopted by the general assembly shall be binding.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (16): مداولات الجمعية العمومية</h3>
          <p>لا يجوز للجمعية العمومية العادية أن تتداول في غير المسائل الواردة بجدول الأعمال المبين في خطاب الدعوة وتكون القرارات التي تصدرها الجمعية ملزمة.</p>
        </div>
      </div>

      <!-- Article 17: Annual General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (17): Annual General Assembly</h3>
          <p>The general assembly shall be convened on yearly basis by invitation from the Board of Directors within four months following end of the financial year, particularly to hear Managing Director's report on financial position and activity, to approve the balance sheet and loss and profit account, and determine dividends to be distributed. And to appoint directors, determine their remuneration and other matters. Resolutions of the general assembly shall be valid only if they were issued by majority of votes representing not less than the capital. In the event of lack of quorum, the general assembly shall be convened within the following 14 days and the next meeting shall be valid regardless of the number of shares represented therein.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (17): الجمعية العمومية السنوية</h3>
          <p>تنعقد الجمعية العمومية كل سنة بناء على دعوة من مجلس إدارة الشركة خلال الأربعة أشهر التالية لنهاية السنة المالية للشركة وتجتمع على الأخص لسماع تقرير المدير التنفيذي عن نشاط الشركة ومركزها المالي والتصديق على الميزانية العمومية وحساب الأرباح والخسائر وتحديد حصص الأرباح التي توزع وتعيين المديرين وتحديد مكافأتهم وغير ذلك من المسائل. ولا تكون قرارات الجمعية صحيحة إلا إذا صدرت بأغلبية الأصوات التي تمثل رأس المال على الأقل. وفي حالة عدم توفر النصاب لصحة الاجتماع الأول، تعين عقد الجمعية العمومية ثانية خلال 14 يوما التالية ويعتبر اجتماعها الثاني صحيحا مهما كان عدد الحصص الممثلة فيه.</p>
        </div>
      </div>

      <!-- Article 18: Extraordinary General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18): Extraordinary General Assembly</h3>
          <p>The extra ordinary general assembly shall have the right to amend the memorandum of association. As for resolutions discharging the director, 51% of the votes shall be sufficient.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18): الجمعية العمومية غير العادية</h3>
          <p>للجمعية العمومية الغير عادية أن تعدل عقد تأسيس الشركة على أنه في حالة التصويت على القرارات الخاصة بإبراء ذمة المدير، يكتفى بأكثرية أصوات تمثل 51% من رأس المال.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
