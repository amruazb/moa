import { LLCNewMOAContext, pageFooter } from '../types'

export function page23(ctx: LLCNewMOAContext, pageNum: number = 23): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 14: The General Assembly -->
      <div class="article-pair">
        <div class="block">
          <p class="bold">ARTICLE 14</p>
          <p class="bold">THE GENERAL ASSEMBLY</p>
        </div>
        <div class="block rtl">
          <p class="bold">المادة 14</p>
          <p class="bold">الجمعية العمومية</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <p>14-1 The Company shall have a General Assembly composed of the Partners. The General Assembly shall be convened at the invitation of either of the Managing Director or if requested by one of the Partners.</p>
          <p>14-2 An annual General Assembly shall be convened at least once a year on the date and at the place to be determined by the Managing Director during the 4 (four) months following the end of the Company's financial year.</p>
          <p>14-3 Invitations to attend the General Assembly shall be sent by registered letter with acknowledgement of receipt addressed to each Partner at least 15 (fifteen) days before the date of the meeting. The invitations must include the particulars of the agenda and the place, date and time of the meeting.</p>
          <p>14-4 Every Partner shall have the right to attend a General Assembly irrespective of the number of Shares it holds. A Partner may, by proxy, delegate the other Partner to represent it at the General Assembly. Each Partner shall have a number of votes equal to the number of Shares it holds or represents.</p>
          <p>14-5 The agenda for the annual General Assembly must include the following matters:</p>
          <p><strong>(a)</strong> to review and approve the Managing Director's report on the Company's activities and its financial position during the year and the Auditor's report;</p>
          <p><strong>(b)</strong> to discuss and approve the balance sheet and the profit and loss account of the Company for the preceding financial year;</p>
          <p><strong>(c)</strong> to determine the dividends to be distributed to the Partners;</p>
          <p><strong>(d)</strong> to discharge the Managing Director from their liability for the concerned financial year;</p>
          <p><strong>(e)</strong> to appoint the Auditors from time to time and determining their remuneration; and</p>
        </div>
        <div class="block rtl">
          <p>1-14 تكون للشركة جمعية عمومية تتكون من الشريكين، وتنعقد الجمعية العمومية بدعوة من المدير أو إذا طلب أحد الشريكين ذلك.</p>
          <p>2-14 تنعقد الجمعية العمومية السنوية مرة واحدة في السنة على الأقل في الزمان والمكان الذي يحدده المدير وذلك خلال الأشهر الـ 4 (الأربعة) التالية لانتهاء السنة المالية للشركة.</p>
          <p>3-14 توجه الدعوة لحضور الجمعية العمومية بموجب خطاب مسجل بعلم الوصول يتم إرساله إلى كل شريك قبل موعد انعقادها بـ 15 (خمسة عشر) يوماً على الأقل، ويجب أن تشتمل الدعوة على بنود جدول الأعمال ومكان وزمان الاجتماع.</p>
          <p>4-14 لكل شريك حق حضور الجمعية العمومية بصرف النظر عن عدد الحصص التي يملكها. وللشريك أن يفوض الشريك الآخر، بموجب تفويض، لتمثيله في الجمعية العمومية، ويكون لكل شريك عدد من الأصوات بقدر العدد الذي يملكه أو يمثله من حصص.</p>
          <p>5-14 يجب أن يشتمل جدول أعمال الجمعية العمومية السنوية على الموضوعات التالية:</p>
          <p><strong>(أ)</strong> سماع واعتماد تقرير المديرين عن نشاط الشركة ومركزها المالي خلال السنة، وتقرير مدقق الحسابات؛</p>
          <p><strong>(ب)</strong> مناقشة واعتماد الميزانية العمومية وحساب الأرباح والخسائر للشركة عن السنة المالية المنتهية؛</p>
          <p><strong>(ت)</strong> تحديد الأرباح القابلة للتوزيع على الشريكين؛</p>
          <p><strong>(ث)</strong> إخلاء مسئولية المدير عن السنة المالية المعنية؛</p>
          <p><strong>(ج)</strong> تعيين مدققي حسابات الشركة من حين لآخر وتحديد أتعابهم؛ و</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
