import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page10(ctx: LLCToSPCContext, pageNum: number = 10): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 19: General Assembly Minutes -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (19): General Assembly Minutes</h3>
          <p>General Assembly deliberations and resolutions shall be registered in minutes then be entered in special numbered register signed by chairman, the reporter, the two reviewers and the accounts controller.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (19): محاضر الجمعية العمومية</h3>
          <p>تدون مداولات الجمعية العمومية وقراراتها في محاضر تقيد في سجل خاص مرقمة صفحاته ويوقع عليها رئيس الجمعية ومقرر الاجتماع ومراجعي الأصوات ومراقب الحسابات.</p>
        </div>
      </div>

      <!-- Chapter V: Financial Year -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER V</h3>
          <h3 class="center">Financial Year</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الخامس</h3>
          <h3 class="center">السنة المالية للشركة</h3>
        </div>
      </div>

      <!-- Article 20: Financial Year -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (20): Financial Year</h3>
          <p>The financial year shall commence at the beginning of January and end at the end of December of each year, provided that the first year shall include the period from the date of final incorporation of the Company till the coming December. The first general assembly shall be convened immediately after this year.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (20): السنة المالية</h3>
          <p>تبدأ السنة المالية للشركة في أول يناير (كانون الثاني) من كل سنة وتنتهي في آخر ديسمبر (كانون الأول) من كل سنة. على أن السنة الأولى تشمل المدة التي تنقضي من تاريخ تأسيس الشركة النهائي حتى ديسمبر (كانون الأول) التالي وتنعقد أول جمعية عمومية عقب هذا السنة.</p>
        </div>
      </div>

      <!-- Article 21: Net Profit -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (21): Net Profit</h3>
          <p>a) Annual net profit shall be considered after deducting all general expenses and other costs. 10% (ten Percentage) shall be deducted to form legal reserve as stipulated in law. Such deduction shall be stopped if the legal reserve reached 50% of the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (21): الأرباح الصافية</h3>
          <p>أ) تؤلف الأرباح الصافية السنوية بعد خصم جميع المصاريف العمومية والتكاليف الأخرى ويقتطع منها مبلغ يوازي 10% (عشرة بالمائة) لتكوين الاحتياطي القانوني المنصوص في القانون ويوقف هذا الاقتطاع عند بلوغ مجموع الاحتياطي قدرا يوازي نصف رأس المال.</p>
        </div>
      </div>

      <!-- Chapter VI: Dissolution and Liquidation -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER VI</h3>
          <h3 class="center">Dissolution and Liquidation</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب السادس</h3>
          <h3 class="center">حل الشركة وتصفيتها</h3>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
