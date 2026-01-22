import { LLCNewMOAContext, pageFooter } from '../types'

export function page25(ctx: LLCNewMOAContext, pageNum: number = 25): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 14 continued -->
      <div class="article-pair">
        <div class="block">
          <p>14-11 Written resolutions signed by all of the Partners or their duly authorized representatives in the General Assembly shall be as valid and effective as if the same had been passed at a General Assembly duly convened and held.</p>
        </div>
        <div class="block rtl">
          <p>11-14 تكون القرارات الخطية الموقعة من الشريكين أو ممن يمثلهما في الجمعية العمومية صحيحة ونافذة وكأنها صدرت بقرار في جمعية عمومية دعي إليها وانعقدت أصولاً.</p>
        </div>
      </div>

      <!-- Article 15: The Financial Year -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 15</p>
          <p class="bold">THE FINANCIAL YEAR</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 15</p>
          <p class="bold">السنة المالية</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>The financial year of the Company shall commence on January 1st and shall end on December 31st of each year.</p>
        </div>
        <div class="block rtl">
          <p>تبدأ السنة المالية للشركة في الأول من يناير وتنتهي في 31 ديسمبر من كل سنة.</p>
        </div>
      </div>

      <!-- Article 16: Profits and Losses -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 16</p>
          <p class="bold">PROFITS AND LOSSES</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 16</p>
          <p class="bold">الأرباح والخسائر</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>16-1 The Company shall allocate a minimum of 10% (ten percent) of its net profits each year to create a statutory reserve. The Partners may resolve to allocate additional reserves as they deem fit. The Partners may resolve that the allocation of the net profits to the statutory reserve be discontinued when the reserve reaches half of the capital of the Company.</p>
          <p>16-2 The net profits shall be distributed annually between the Partners in accordance with the following percentages immediately after the annual General Assembly:</p>
          <p>First Partner: 99% (ninety nine percent)</p>
          <p>Second Partner: 1% (one percent)</p>
          <p>16-3 The net distributable profits may at the request of the Managing Director be distributed on quarterly or semi-annual basis subject to the issuance of quarterly and/or semi-annual audited financial statements.</p>
          <p>16-4 The liability of each Partner for losses shall be limited to the value of its Shares and for the avoidance of any doubt, nothing in this Memorandum shall render a Partner liable for any amounts in excess of that Partner's share in the capital of the Company.</p>
        </div>
        <div class="block rtl">
          <p>1-16 تخصص الشركة ما لا يقل عن 10% (عشرة بالمئة) من صافي أرباحها السنوية كحد أدنى لتكوين احتياطي قانوني ويحق للشريكين اتخاذ قرار بتخصيص احتياطي إضافي حسبما يرونه مناسباً. كما يحق للشريكين اتخاذ قرار بإيقاف التخصيص من صافي الأرباح إلى الاحتياطي القانوني حال وصول الاحتياطي القانوني لنصف رأس مال الشركة.</p>
          <p>2-16 يتم توزيع صافي الأرباح سنوياً بين الشريكين وفقاً للنسب التالية فوراً بعد انعقاد الجمعية العمومية السنوية:</p>
          <p>الشريك الأول: 99% (تسع وتسعون بالمائة)</p>
          <p>الشريك الثاني: 1% (واحد بالمائة)</p>
          <p>3-16 يجوز بناءً على طلب المدير توزيع الأرباح الصافية القابلة للتوزيع على أسس ربع أو نصف سنوية شريطة صدور البيانات المالية المدققة الربع و/أو النصف سنوية للشركة.</p>
          <p>4-16 تنحصر التزامات كل شريك في حدود قيمة حصصه في رأس مال الشركة، ولتفادي أي شك يخلو هذا العقد من أي نص من شأنه أن يجعل أي شريك مسؤولاً عن أي مبالغ تزيد عن حصته في رأس مال الشركة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
