import { LLCMOAContext, pageFooter } from '../types'

export function page9(_ctx: LLCMOAContext, pageNum: number = 9): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <p>7- To sign all the tenders, contracts, documents or receipts of financial or commercial nature on behalf of the company.</p>
          <p>8- To appoint and dismiss employees and consultants and fix their duties and remuneration as per U.A.E. Labour Laws.</p>
          <p>9- To represent before all the ministries and local authorities for establishing this company and do any other work in connection therewith.</p>
          <p>10- To authorize and sanction all vouchers/ books/ ledgers of accounts and payments particular with all expenses.</p>
          <p>11- To sub-delegate all or part of such powers to any other person after the approval of General assembly.</p>
          <p>It is also agreed by the parties that in any case the first party shall not be held responsible for any kind of financial liabilities of the company or the actions of the managing director if he acted beyond the powers conferred by this contract.</p>
          <p>The appointment of the Managing Director cannot be revoked nor the powers stated herein curtailed except by a resolution of the General Meeting representing at least 51% of the share capital of the Company.</p>
        </div>
        <div class="block rtl">
          <p>7- التوقيع على كافة العطاءات والعقود والمستندات والإيصالات ذات الصفة المالية أو التجارية نيابة عن الشركة.</p>
          <p>8- تعيين او إنهاء خدمة الموظفين و المستشارين و تحديد واجباتهم ومكافآتهم وفقا لقوانين العمل في دولة الإمارات العربية المتحدة</p>
          <p>9- التمثيل أمام كافة الوزارات والسلطات المحلية لتأسيس هذه الشركة والقيام باي عمل يتعلق بهذا الشأن.</p>
          <p>10- اعتماد وتصديق كافة القوائم و السندات والدفاتر الحسابية والدفعات الخاصة بكافة المصروفات.</p>
          <p>11- تفويض كل أو أي من هذه السلطات إلى أي شخص آخر بعد موافقة الجمعية العمومية.</p>
          <p>ومن المتفق عليه أيضاً بين الشركاء انه في أي حال من الأحوال لا يكون الطرف الأول مسؤولاً عن أي نوع من الإلتزامات المالية للشركة أو عن المدير الاداري إذا تصرف بما يتجاوز الصلاحيات الممنوحة له في هذا العقد.</p>
          <p>لايجوز الغاء تعيين المدير أو الحد من سلطاته الواردة في هذا العقد إلا بقرار صادر في الجمعية من قبل مالا يقل عن 51% من رأسمال الشركة.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (12): Company Communications</h3>
          <p>The Company communications referred to in this Memorandum whether between the Parties or between the Parties and the Company shall take the form of registered letters.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (12): تبليغات الشركة</h3>
          <p>تكون تبليغات الشركة المشار إليها في هذا العقد سواء كانت بين الشركاء أو بينهم وبين الشركة على هيئة خطابات مسجلة موصى عليها.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
