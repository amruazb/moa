import { LLCNewMOAContext, pageFooter } from '../types'

export function page19(ctx: LLCNewMOAContext, pageNum: number = 19): string {
    const { partners } = ctx

    return `
    <div class="page">
      <div class="page-content">
      
      <!-- Article 15 continued -->
      <div class="article-pair">
        <div class="block">
          <p>15-5 The agenda for the annual General Assembly must include the following matters:</p>
          <p>(a) to review and approve the Managing Director's report on the Company's activities and its financial position during the year and the Auditor's report;</p>
          <p>(b) to discuss and approve the balance sheet and the profit and loss account of the Company for the preceding financial year;</p>
          <p>(c) to determine the dividends to be distributed to the Partners;</p>
          <p>(d) to discharge the Managing Director from their liability for the concerned financial year;</p>
          <p>(e) to appoint the Auditors from time to time and determining their remuneration; and</p>
          <p>(f) to discuss and consider any other matter within the competence of the Partners in accordance with the provisions of the Commercial Companies Law and this Memorandum.</p>
        </div>
        <div class="block rtl">
          <p>15-5 يجب أن يتضمن جدول أعمال الجمعية العمومية السنوية المسائل التالية:</p>
          <p>(أ) مراجعة واعتماد تقرير المدير العام عن أنشطة الشركة ووضعها المالي خلال السنة وتقرير مدقق الحسابات؛</p>
          <p>(ب) مناقشة واعتماد الميزانية العمومية وحساب الأرباح والخسائر للشركة عن السنة المالية السابقة؛</p>
          <p>(ج) تحديد الأرباح المقرر توزيعها على الشركاء؛</p>
          <p>(د) إبراء ذمة المدير العام عن السنة المالية المعنية؛</p>
          <p>(هـ) تعيين مدققي الحسابات من وقت لآخر وتحديد أتعابهم؛ و</p>
          <p>(و) مناقشة والنظر في أي مسألة أخرى تدخل ضمن اختصاص الشركاء وفقاً لأحكام قانون الشركات التجارية وهذا العقد.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p>15-6 The General Assembly may not deliberate matters not included in the agenda unless serious issues were disclosed at the meeting that require discussion. Should any one of the Partners request the inclusion of a specific matter on the agenda, the Managing Director must do so, otherwise the relevant Partner shall have the right to appeal to the General Assembly.</p>
          <p>15-7 The quorum at the General Assembly shall not be valid unless Partners holding at least 75% (seventy five percent) of the Shares are present. In the event that the quorum is not met during the first meeting, a second meeting shall be convened within 14 (fourteen) days following the first meeting and at such time meeting shall be validly convened by having Partners holding at least 75% (seventy five percent) of the Shares. In the event that the quorum is not met in the second meeting, then a third meeting shall be convened after the expiration of 30 (thirty) days from the date of the second meeting and at such time the meeting shall be validly convened by having Partners holding at least 75% (seventy five percent) of the Shares.</p>
          <p>15-8 A resolution of the General Assembly shall not be valid unless adopted by virtue of a Special Resolution.</p>
        </div>
        <div class="block rtl">
          <p>15-6 لا يجوز للجمعية العمومية التداول في مسائل غير واردة في جدول الأعمال إلا إذا كشف أثناء الاجتماع عن وقائع خطيرة تستوجب المناقشة. وإذا طلب أحد الشركاء إضافة مسألة معينة على جدول الأعمال، فيجب على المدير العام ذلك، وإلا كان من حق الشريك المعني الطعن أمام الجمعية العمومية.</p>
          <p>15-7 لا يكون اجتماع الجمعية العمومية صحيحاً إلا بحضور شركاء يملكون 75% (خمسة وسبعون بالمائة) على الأقل من الحصص. وإذا لم يكتمل النصاب خلال الاجتماع الأول، يُعقد اجتماع ثانٍ خلال 14 (أربعة عشر) يوماً من الاجتماع الأول ويكون الاجتماع صحيحاً بحضور شركاء يملكون 75% (خمسة وسبعون بالمائة) على الأقل من الحصص. وإذا لم يكتمل النصاب في الاجتماع الثاني، يُعقد اجتماع ثالث بعد انقضاء 30 (ثلاثين) يوماً من تاريخ الاجتماع الثاني ويكون الاجتماع صحيحاً بحضور شركاء يملكون 75% (خمسة وسبعون بالمائة) على الأقل من الحصص.</p>
          <p>15-8 لا يكون قرار الجمعية العمومية صحيحاً إلا إذا صدر بموجب قرار خاص.</p>
        </div>
      </div>
      
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
