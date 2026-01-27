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

      <!-- Section 1: Execute Transactions (Content) -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>1</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To Execute Transactions:</span></p>
          <p>To contact all the relevant government and non-government departments, Ministries, local authorities, embassies, committees, councils, semi-government departments, consulates, notary public, Ministry of Human Resources and Emiratization, Department of Economic Development (to open branches, issue all licenses required, change activities and Trade Name), Chamber of Commerce and Industry, Abu Dhabi Tourism and Cultural Authority,</p>
        </div>
        <div class="block rtl">
          <p><strong>1</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">إنهاء المعاملات:</span></p>
          <p>مراجعة كافة الدوائر وكافة الجهات الحكومية حكومية والوزارات والهيئات المحلية والسفــارات واللجان والمجالس والدوائر حكومية والقنصليـــات والكتاب العدل ووزارة الموارد البشـــرية والتوطين ودائرة التنميـــة الاقتصادية لفتح فروعها واصـــدار كل الرخص المطلوبة وتعديل نشـــاطات والاســـم التجاري، وغرفة التجارة والصناعة وهيئة أبوظبي للسياحة والثقافية</p>
        </div>
      </div>

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

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
