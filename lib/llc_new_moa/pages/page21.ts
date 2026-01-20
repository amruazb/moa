import { LLCNewMOAContext, pageFooter } from '../types'

export function page21(ctx: LLCNewMOAContext, pageNum: number = 21): string {
  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 11-4 continued -->
      <div class="article-pair">
        <div class="block">
          <p>to submit effective offer and accept judgments and execute the same, to apply for precautionary and executive attachment and revoke the same, to revoke powers of attorney, to appoint lawyers and authorize them to sue and defend, to reconcile, declare, deny, discharge, abate, appoint experts and arbitrators, as well as to appeal and challenge for cassation, to object and settle, to execute verdicts, decisions, awards and orders issued in favour of the Company, to file for execution complaints, to levy attachments, to cancel circulars issued by any entity whatsoever, to appear on behalf of the Company before courts, arbitral and judicial tribunals, conciliation panels, conflict settlement committees, and rent and commercial dispute committees;</p>
          <p>(y) to change in the accounting policies, bankers, accounting reference date or bank mandates;</p>
          <p>(z) to approve, modify or amend any operating plans of the Company and consideration and approval of any reports and draft financial statements prepared by the Auditor;</p>
          <p>(aa) to always keep and maintain true and faithful accounts of all dealings and transactions in relation to the Company and affairs ancillary and incidental thereto; and/or</p>
          <p>(bb) from time to time, as may be necessary or desirable for the proper conduct of the Company's affairs and business, to delegate by power of attorney or other appropriate written authorization all or any of the aforesaid powers to such Person(s), and on such terms as the Managing Director deem fit.</p>
        </div>
        <div class="block rtl">
          <p>وتقديم عرض حقيقي وفعال وقبوله وتنفيذها وفي طلب الحجز التحفظي والتنفيذي وإلغاؤه أو إبطاله، وإلغاء الوكالات، وتوكيل المحامين وتفويضهم لرفع الدعاوي القضائية والدفاع والصلح والإقرار والإنكار والإبراء وتعيين الخبراء والمحكمين وبالإضافة إلى الاستئناف والطعن بالتمييز والاعتراض والتسوية وتنفيذ الأحكام والقرارات والتعويضات والأوامر الصادرة لصالح الشركة والتقدم بإشكاليات التنفيذ وتوقيع الحجوزات وإلغاء التعاميم الصادرة من أي جهة كانت والحضور نيابة عن الشركة أمام المحاكم وهيئات التحكيم واللجان القضائية ولجان المصالحة ولجان فض وتسوية المنازعات ولجان المنازعات الإيجارية والتجارية؛</p>
          <p>(ن) تغيير السياسات المحاسبية والبنوك وتاريخ مرجع المحاسبة أو التفويضات البنكية؛</p>
          <p>(هـ) الموافقة على أو تغيير أو تعديل أية خطط تشغيل للشركة ودراسة والموافقة على أي تقارير ومسودات البيانات المالية التي يتم إعدادها من قبل مدقق حسابات الشركة؛</p>
          <p>(و) المحافظة بشكل دائم على حسابات صحيحة وصادقة لجميع المعاملات والصفقات المتعلقة بالشركة والشؤون التابعة لها والمترتبة عليها؛ و/أو</p>
          <p>(ي) من وقت لآخر، حسبما يكون ضرورياً أو مستحباً لحسن تسيير شؤون الشركة، تفويض كل أو بعض الصلاحيات المذكورة أعلاه إلى شخص أو أشخاص بموجب وكالة أو أي تفويض كتابي آخر يفي بالغرض وذلك وفقاً للشروط التي يراها المدير الإداري ملائمة لهذا الشأن.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
