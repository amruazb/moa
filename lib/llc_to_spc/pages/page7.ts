import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page7(ctx: LLCToSPCContext, pageNum: number = 7): string {
  const { manager } = ctx

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 10: Items 5-12 Continued from page 6 -->
      <div class="article-pair">
        <div class="block">
          <p>5- The Managing Director is authorized jointly to open bank accounts with any bank ${manager.pronouns.subject} deems fit, operate and close the same, manage all the company bank accounts, issue, sign and endorse cheques and documents, withdraw, deposit, issue L/Cs, guarantees, transfers and sign on all applications related to the company activity.</p>
          <p>6- ${manager.pronouns.subject === 'she' ? 'She is' : 'He is'} also empowered to purchase all equipment, vehicles, materials, supplies, goods and movable assets and dispose of or sell them when needed by company name.</p>
          <p>7- To sign all the tenders, contracts, documents or receipts of financial or commercial nature on behalf of the company.</p>
          <p>8- To appoint and dismiss employees and consultants and fix their duties and remuneration as per U.A.E. Labour Laws.</p>
          <p>9- To represent before all the ministries and local authorities for establishing this company and do any other work in connection therewith.</p>
          <p>10- To authorize and sanction all vouchers/books/ledgers of accounts and payments particular with all expenses.</p>
          <p>11- To sub-delegate all or part of such powers to any other person after the approval of General Assembly.</p>
          <p>12- The appointment of the Managing Director cannot be revoked nor the powers stated herein curtailed except by a resolution of the General Meeting representing at least 51% of the share capital of the Company.</p>
        </div>
        <div class="block rtl">
          <p>5- مدير الإدارة مفوض مجتمعين فتح الحسابات المصرفية باسم الشركة لدى أي بنك يراه مناسباً وتشغيلها وإقفالها وإدارة كافة الحسابات المصرفية للشركة وإصدار وتوقيع وتظهير الشيكات والمستندات والسحب والإيداع وإصدار خطابات الاعتماد والكفالات والتحويلات وتوقيع كافة الطلبات المتعلقة بنشاط الشركة.</p>
          <p>6- وله الحق شراء جميع المعدات والمركبات والمواد والمهمات والبضائع والمنقولات والتصرف بها أو بيعها عند الحاجة باسم الشركة.</p>
          <p>7- التوقيع على كافة العطاءات والعقود والمستندات والإيصالات ذات الصفة المالية أو التجارية نيابة عن الشركة.</p>
          <p>8- تعيين أو إنهاء خدمة الموظفين والمستشارين وتحديد واجباتهم ومكافآتهم وفقاً لقوانين العمل في دولة الإمارات العربية المتحدة.</p>
          <p>9- التمثيل أمام كافة الوزارات والسلطات المحلية لتأسيس هذه الشركة والقيام بأي عمل يتعلق بهذا الشأن.</p>
          <p>10- اعتماد وتصديق كافة الفواتير والسندات والدفاتر الحسابية والدفعات الخاصة بكافة المصروفات.</p>
          <p>11- تفويض كل أو أي من هذه السلطات إلى أي شخص آخر بعد موافقة الجمعية العمومية.</p>
          <p>12- لا يجوز إلغاء تعيين المدير أو الحد من سلطاته الواردة في هذا العقد إلا بقرار صادر في الجمعية من قبل ما لا يقل عن 51% من رأسمال الشركة.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
