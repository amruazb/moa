// POA Page 2: Continuation of Section 1, Sections 2-4
import { POAContext, poaPageFooter } from '../types'

export function page2(ctx: POAContext, pageNum: number = 2): string {
  const { sections } = ctx

  // Conditional loan text based on banksWithLoan toggle
  const bankLoanTextEn = sections.banksWithLoan
    ? 'and avail vehicle loan facilities, with cash loan from any banks operating in the country'
    : 'and avail vehicle loan facilities, without cash loan from any banks operating in the country'

  const bankLoanTextAr = sections.banksWithLoan
    ? 'بالحصـــول على تسهيلات قروض السيارات وبقروض نقدية من البنـــوك العاملة في الدولة'
    : 'بالحصـــول على تسهيلات قروض السيارات وبدون قروض نقدية من البنـــوك العاملة في الدولة'

  return `
    <div class="page">
      <div class="page-content">

      <!-- Continuation of Section 1 -->
      <div class="article-pair">
        <div class="block">
          <p>Municipality, Courts, Police Stations, General Directorate for Residence and Expatriates Affairs, Federal Authority for Identity and Citizenship, Waste Management, Health Insurance Authority, Procurement Dept, Department of Transport, Traffic and License Department, Seaports, Customs, Posts, Etisalat, Du, Daman, Civil Defense, National Guard Protection Department (NGPD), Water and Electricity Authority, Federal Tax Authority, Airports, Banks, Private and Public Companies, Establishments, Individuals, receive deliver and submit all applications, documents, and transactions, and to sign the same.</p>
        </div>
        <div class="block rtl">
          <p>والبلدية والمحاكم ومراكز الشـــرطة والإقامة والأجانب والهيئة الاتحادية للهوية والجنسيـــة وإدارة النفايات وهيئة التأمين الصحي ودائرة المشتريات ودائر النقل والمرور والترخيص والموانئ والجمـــارك والبريد والاتصالات ودو ودمان والدفاع المدني وجهاز حماية المنشـــآت الحيوية والسواحل وهيئة الماء والكهرباء (شـــركة طاقة للتوزيع) والهيئة الاتحادية للضـــرائب والمطارات والبنوك والشـــركات الخاصة والعامة والمؤسسات والأفراد واستلام وتسـليم وتقديم كافة الطلبات والمستندات والمعاملات والتوقيع عليـــها.</p>
        </div>
      </div>

      <!-- Section 2: Employees -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>2</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Employees:</span></p>
          <p>To appoint employees and workers, terminate their services, sign their contracts, and pay their salaries; to obtain, renew, receive and cancel residence visas, work permits, and labor cards; to apply for issuance of absconding notices against workers, cancel the same and to deport employees.</p>
        </div>
        <div class="block rtl">
          <p><strong>2</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الموظفين :</span></p>
          <p>تعيين الموظفين والعمال وإنهاء خدماتهم والتوقيع على عقودهم ودفع رواتبهم وطلب التأشيرات والبطاقات والأقامات وتجديدها واستلامها والغاءها والتعميم على العمال وفك التعميم وتسفيرهم.</p>
        </div>
      </div>

      <!-- Section 3: Utilities -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>3</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Utilities:</span></p>
          <p>To apply for telephone, fax, internet, water, electricity, (TAQA Distribution company) and other utilities/services; to sign application forms and pay charges, fines and utility bills with the right to have those utilities disconnected and cancelled temporarily or permanently or have them re-connected, and to pay security deposits for the same and receive the same in cash or by cheques, and cash the cheques.</p>
        </div>
        <div class="block rtl">
          <p><strong>3</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الخدمات:</span></p>
          <p>تقــديم وإدخـــال خـــدمات الهـــاتف والفـــاكس والإنترنت والكهرباء والميـاه (شركة طاقة للتوزيع) وغيرهـــا مـــن الخـــدمات والوسائل ؛ على نماذج وطلبات التقديم ودفع الرسوم على فواتير الخـــدمات ولهـم الحق في قطـع وإلغاء تلك الخدمات نهائيا امؤقـــتا واعادتهـــا مـــرة أخـــرى ولتقـــديم الضـــمانات والكفـــالات المتعلقـــة بتلـــك الخـــدمات واستلامها ســواء نقدا أو بشيكات وصرفها.</p>
        </div>
      </div>

      <!-- Section 4: Banks -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>4</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Banks:</span></p>
          <p>To open, operate, manage and close company accounts at banks, and withdraw and deposit</p>
        </div>
        <div class="block rtl">
          <p><strong>4</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">البنوك:</span></p>
          <p>فتح وأدل عل وإدارة الحسابات الموجودة والجديدة والغائها والإيداع</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
