import { LLCNewMOAContext, pageFooter } from '../types'

export function page27(ctx: LLCNewMOAContext, pageNum: number = 27): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 18 continued -->
      <div class="article-pair">
        <div class="block">
          <p>18-2 The Managing Director shall register the dissolution of the Company in the Commercial Register and shall publish it in two local daily newspapers issued in the UAE, one of them issued in Arabic.</p>
        </div>
        <div class="block rtl">
          <p>2-18 يتعين على المدير تسجيل حل الشركة في السجل التجاري ونشره في جريدتين محليتين يوميتين في الدولة تصدر إحداهما باللغة العربية.</p>
        </div>
      </div>

      <!-- Article 19: Liquidation of the Company -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 19</p>
          <p class="bold">LIQUIDATION OF THE COMPANY</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 19</p>
          <p class="bold">تصفية الشركة</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>19-1 One or more liquidators shall be appointed by way of a Special Resolution of the General Assembly in accordance with the provisions of Article 308 of the Commercial Companies Law.</p>
          <p>19-2 If the liquidation is by decision of a court in Abu Dhabi, the court shall determine the manner of the liquidation and shall appoint a liquidator, and the powers of the Managing Director shall cease when such liquidator is appointed.</p>
          <p>19-3 In case of liquidation, assets of the Company resulting from liquidation shall be distributed among the Partners after settlement of its debts. Upon distribution, each Partner shall receive an amount equal to his capital contribution and the balance of Company assets shall be divided among the Partners in accordance with their respective share of profits.</p>
        </div>
        <div class="block rtl">
          <p>1-19 يتم تعيين مصفي واحد أو أكثر بموجب قرار خاص صادر من الجمعية العمومية وفقاً لأحكام المادة 308 من قانون الشركات التجارية.</p>
          <p>2-19 إذا كانت التصفية بموجب قرار صادر من محكمة أبوظبي وجب على المحكمة تحديد أسلوب التصفية وتعيين مصفي وعندئذ تزول وتتوقف جميع صلاحيات المدير.</p>
          <p>3-19 في حال تصفية الشركة، تقسم أصول الشركة الناتجة عن التصفية على الشريكين وذلك بعد أداء ما على الشركة من ديون، ويحصل كل شريك عند القسمة على مبلغ يعادل قيمة الحصة التي قدمها من رأس المال، ويقسم الباقي من أصول الشركة بين الشريكين وفقاً لحصة كل منهما في الأرباح.</p>
        </div>
      </div>

      <!-- Article 20: Notices -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 20</p>
          <p class="bold">NOTICES</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 20</p>
          <p class="bold">الإخطارات</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>20-1 All notices, requests, consents and other communications hereunder to any Partner shall be deemed effective if contained in a written instrument delivered in person or by telecopy or sent by internationally recognized overnight courier addressed to such Partner at the address kept by the Company in the Register or at such other address as may hereafter be designated in writing by such Partner to the Company and the other Partner.</p>
        </div>
        <div class="block rtl">
          <p>1-20 تعتبر جميع الإشعارات والطلبات والموافقات والاتصالات الأخرى بموجب العقد إلى أي شريك صحيحة وسارية إذا كانت على هيئة مستند كتابي يتم تسليمه باليد، أو إذا أرسل بالفاكس أو بواسطة شركة بريد سريع معترف بها عالمياً بنظام التسليم في اليوم التالي، ومرسلة إلى الشريك المعني على العنوان الوارد في سجل الشركة أو على عنوان آخر يتم الإخطار به كتابياً من قبل هذا الشريك إلى كل من الشركة والشريك الآخر.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}

