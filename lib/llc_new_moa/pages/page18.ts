import { LLCNewMOAContext, pageFooter } from '../types'

export function page18(ctx: LLCNewMOAContext, pageNum: number = 18): string {
    const { partners } = ctx

    return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 14 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 14</h3>
          <h4 class="bold underline">FINANCIAL MANAGEMENT</h4>
          <p>14-1 The Managing Director shall prepare the Company's balance sheet and profit and loss account in addition to an annual report of the Company's activities, its financial position and the proposal for the distribution of profits. All the foregoing should be completed within 3 (three) months from the end of each financial year of the Company.</p>
          <p>14-2 The balance sheet and the profit and loss account shall be submitted to the annual General Assembly for approval.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 14</h3>
          <h4 class="bold underline">الإدارة المالية</h4>
          <p>14-1 يقوم المدير العام بإعداد الميزانية العمومية للشركة وحساب الأرباح والخسائر بالإضافة إلى تقرير سنوي عن أنشطة الشركة ووضعها المالي ومقترح توزيع الأرباح. ويجب إتمام كل ما سبق خلال 3 (ثلاثة) أشهر من نهاية كل سنة مالية للشركة.</p>
          <p>14-2 يجب تقديم الميزانية العمومية وحساب الأرباح والخسائر للجمعية العمومية السنوية للموافقة عليها.</p>
        </div>
      </div>
      
      <!-- Article 15 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">ARTICLE 15</h3>
          <h4 class="bold underline">THE GENERAL ASSEMBLY</h4>
          <p>15-1 The Company shall have a General Assembly composed of the Partners. The General Assembly shall be convened at the invitation of either of the Managing Director or if requested by one of the Partners.</p>
          <p>15-2 An annual General Assembly shall be convened at least once a year on the date and at the place to be determined by the Managing Director during the 4 (four) months following the end of the Company's financial year.</p>
          <p>15-3 Invitations to attend the General Assembly shall be sent by registered letter with acknowledgement of receipt addressed to each Partner at least 15 (fifteen) calendar days before the date of the meeting. The invitations must include the particulars of the agenda and the place, date and time of the meeting.</p>
          <p>15-4 Every Partner shall have the right to attend a General Assembly irrespective of the number of Shares it holds. A Partner may, by proxy, delegate the other Partner to represent it at the General Assembly. Each Partner shall have a number of votes equal to the number of Shares it holds or represents.</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">المادة 15</h3>
          <h4 class="bold underline">الجمعية العمومية</h4>
          <p>15-1 يكون للشركة جمعية عمومية تتكون من الشركاء. وتنعقد الجمعية العمومية بدعوة من المدير العام أو إذا طلب ذلك أحد الشركاء.</p>
          <p>15-2 تنعقد الجمعية العمومية السنوية مرة واحدة على الأقل في السنة في التاريخ والمكان الذي يحدده المدير العام خلال 4 (أربعة) أشهر من نهاية السنة المالية للشركة.</p>
          <p>15-3 ترسل الدعوات لحضور الجمعية العمومية بموجب خطاب مسجل مع إشعار بالاستلام موجه إلى كل شريك قبل 15 (خمسة عشر) يوماً تقويمياً على الأقل من تاريخ الاجتماع. ويجب أن تتضمن الدعوات تفاصيل جدول الأعمال ومكان وتاريخ ووقت الاجتماع.</p>
          <p>15-4 يحق لكل شريك حضور الجمعية العمومية بصرف النظر عن عدد الحصص التي يملكها. ويجوز للشريك بموجب توكيل تفويض الشريك الآخر لتمثيله في الجمعية العمومية. ويكون لكل شريك عدد من الأصوات يساوي عدد الحصص التي يملكها أو يمثلها.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
