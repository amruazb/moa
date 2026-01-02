import { MOAContext, pageFooter } from '../types'

export function page6(ctx: MOAContext, pageNum: number = 6): string {
  return `
    <div class="page">
      <div class="page-content">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (19)</h3>
          <p>Resolutions of the General Assembly shall be passed by a majority of the capital represented at the meeting, except for resolutions relating to amendment of the Memorandum, increase or decrease of capital, merger, or dissolution, which shall require the approval of partners representing at least 75% of the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (19)</h3>
          <p>تصدر قرارات الجمعية العمومية بأغلبية رأس المال الممثل في الاجتماع، باستثناء القرارات المتعلقة بتعديل عقد التأسيس أو زيادة أو تخفيض رأس المال أو الاندماج أو الحل، التي تستلزم موافقة شركاء يمثلون ما لا يقل عن 75% من رأس المال.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (20)</h3>
          <p>A partner may appoint another partner or a third party to represent them at the General Assembly meeting by virtue of a written power of attorney. A representative may not represent more than one partner at any meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (20)</h3>
          <p>يجوز للشريك أن ينيب عنه شريكاً آخر أو شخصاً من الغير لتمثيله في اجتماع الجمعية العمومية بموجب توكيل كتابي. ولا يجوز للنائب أن يمثل أكثر من شريك واحد في أي اجتماع.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (21)</h3>
          <p>General Assembly deliberations and resolutions shall be registered in minutes then be entered in special numbered register signed by chairman, the reporter, the two reviewers and the accounts controller.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (21)</h3>
          <p>تدون مداولات الجمعية العمومية وقراراتها في محاضر تقيد في سجل خاص مرقمة صفحاته ويوقع عليها رئيس الجمعية ومقرر الاجتماع ومراجعي الأصوات ومراقب الحسابات.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">CHAPTER V</h3>
          <h3 class="center">Financial Year</h3>
        </div>
        <div class="block rtl">
          <h3 class="underline center">الباب الخامس</h3>
          <h3 class="center">السنة المالية للشركة</h3>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (22)</h3>
          <p>The financial year shall commence at the beginning of January and end at the end of December of each year, provided that the first year shall include the period from the date of final incorporation of the Company till the coming December. The first general assembly shall be convened immediately after this year.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (22)</h3>
          <p>تبدأ السنة المالية للشركة في أول يناير (كانون الثاني) من كل سنة وتنتهي في آخر ديسمبر (كانون الأول) من كل سنة, على أن السنة الأولى تشمل المدة التي تنقضي من تاريخ تأسيس الشركة النهائي حتى ديسمبر (كانون الأول) التالي وتنعقد أول جمعية عمومية عقب هذا السنة.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (23)</h3>
          <p>a) Annual net profit shall be considered after deducting all general expenses and other costs. 10% (ten Percentage) shall be deducted to form legal reserve as stipulated in law. Such deduction shall be stopped if the legal reserve reached 50% of the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (23)</h3>
          <p>أ) تؤلف الارباح الصافية السنوية بعد خصم جميع المصاريف العمومية والتكاليف الأخرى ويقتطع منها مبلغ يوازي 10% (عشرة بالمائة) لتكوين الاحتياطي القانوني المنصوص في القانون ويوقف هذا الاقتطاع عند بلوغ مجموع الاحتياطي قدرا يوازي نصف رأس المال.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
