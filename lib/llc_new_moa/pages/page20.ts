import { LLCNewMOAContext, pageFooter } from '../types'

export function page20(ctx: LLCNewMOAContext, pageNum: number = 20): string {
    const { partners } = ctx

    return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 15 continued -->
      <div class="article-pair">
        <div class="block">
          <p>15-9 The Managing Director may not participate in voting on resolutions relating to the discharge of his responsibility for the management of the Company.</p>
          <p>15-10 Minutes adequately summarising the discussions of the General Assembly shall be prepared. The minutes and the resolutions of the General Assembly shall be recorded in a special register kept at the Company's head office. Any of the Partners may review the register personally or through an attorney. They may review the Company's balance sheet, profit and loss account and annual report.</p>
          <p>15-11 Written resolutions signed by all of the Partners or their duly authorized representatives in the General Assembly shall be as valid and effective as if the same had been passed at a General Assembly duly convened and held.</p>
        </div>
        <div class="block rtl">
          <p>15-9 لا يجوز للمدير العام المشاركة في التصويت على القرارات المتعلقة بإبراء ذمته عن مسؤولية إدارة الشركة.</p>
          <p>15-10 يتم إعداد محاضر تلخص بشكل كافٍ مناقشات الجمعية العمومية. وتُسجَّل المحاضر وقرارات الجمعية العمومية في سجل خاص يُحفظ في المقر الرئيسي للشركة. ويجوز لأي من الشركاء الاطلاع على السجل شخصياً أو من خلال وكيل. كما يجوز لهم الاطلاع على الميزانية العمومية وحساب الأرباح والخسائر والتقرير السنوي للشركة.</p>
          <p>15-11 تكون القرارات الكتابية الموقعة من جميع الشركاء أو ممثليهم المفوضين حسب الأصول في الجمعية العمومية صحيحة ونافذة كما لو كانت قد صدرت في جمعية عمومية منعقدة حسب الأصول.</p>
        </div>
      </div>
      
      <!-- Article 16 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 16</h3>
          <h4 class="bold underline">THE FINANCIAL YEAR</h4>
          <p>The financial year of the Company shall commence on January 1st and shall end on December 31st of each year.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 16</h3>
          <h4 class="bold underline">السنة المالية</h4>
          <p>تبدأ السنة المالية للشركة في الأول من يناير وتنتهي في 31 ديسمبر من كل سنة.</p>
        </div>
      </div>
      
      <!-- Article 17 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 17</h3>
          <h4 class="bold underline">PROFITS AND LOSSES</h4>
          <p>17-1 The Company shall allocate a minimum of 10% (ten percent) of its net profits each year to create a statutory reserve. The Partners may resolve to allocate additional reserves as they deem fit. The Partners may resolve that the allocation of the net profits to the statutory reserve be discontinued when the reserve reaches half of the capital of the Company.</p>
          <p>17-2 The net profits shall be distributed annually between the Partners in accordance with the following percentages immediately after the annual General Assembly:</p>
          <ul>
            <li>First Partner: <span class="edited">${partners[0].sharePercent}%</span> (<span class="edited">${partners[0].sharePercent === 99 ? 'ninety nine' : partners[0].sharePercent === 90 ? 'ninety' : partners[0].sharePercent}</span> percent)</li>
            <li>Second Partner: <span class="edited">${partners[1].sharePercent}%</span> (<span class="edited">${partners[1].sharePercent === 1 ? 'one' : partners[1].sharePercent === 10 ? 'ten' : partners[1].sharePercent}</span> percent)</li>
          </ul>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 17</h3>
          <h4 class="bold underline">الأرباح والخسائر</h4>
          <p>17-1 تخصص الشركة ما لا يقل عن 10% (عشرة بالمائة) من صافي أرباحها سنوياً لإنشاء احتياطي قانوني. ويجوز للشركاء أن يقرروا تخصيص احتياطيات إضافية حسبما يرونه مناسباً. ويجوز للشركاء أن يقرروا وقف تخصيص صافي الأرباح للاحتياطي القانوني عندما يبلغ الاحتياطي نصف رأس مال الشركة.</p>
          <p>17-2 توزع صافي الأرباح سنوياً بين الشركاء وفقاً للنسب التالية فوراً بعد الجمعية العمومية السنوية:</p>
          <ul>
            <li>الشريك الأول: <span class="edited">%${partners[0].sharePercent}</span> (${partners[0].sharePercent === 99 ? 'تسعة وتسعون' : partners[0].sharePercent === 90 ? 'تسعون' : partners[0].sharePercent} بالمائة)</li>
            <li>الشريك الثاني: <span class="edited">%${partners[1].sharePercent}</span> (${partners[1].sharePercent === 1 ? 'واحد' : partners[1].sharePercent === 10 ? 'عشرة' : partners[1].sharePercent} بالمائة)</li>
          </ul>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
