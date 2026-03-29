// POA Page 2: Continuation of Section 1, Sections 2–4 (Employees, Purchase, Motor Vehicles)
import { POAContext, poaPageFooter } from '../types'

export function page2(ctx: POAContext, pageNum: number = 2): string {
  const { sections } = ctx

  // Dynamic section numbering
  let sectionNum = 2
  const empNum = sections.employees ? sectionNum++ : null
  const purchaseNum = sections.purchase ? sectionNum++ : null
  const motorNum = sections.motorVehicles ? sectionNum++ : null

  return `
    <div class="page page-2">
      <div class="page-content">

      <!-- Section 1 (cont.): Execute Transactions -->
      <div class="article-pair">
        <div class="block">
          <p>Municipality, Courts, Police Stations, General Directorate for Residence and Expatriates Affairs, Federal Authority for Identity and Citizenship, Waste Management, Health Insurance Authority, Procurement Dept, Department of Transport, Traffic and License Department, Seaports, Customs, Posts, Etisalat, Du, Daman, Civil Defense, National Guard Protection Department (NGPD), Water and Electricity Authority, Federal Tax Authority, Airports, Banks, Private and Public Companies, Establishments, Individuals, receive deliver and submit all applications, documents, and transactions, and to sign the same.</p>
        </div>
        <div class="block rtl">
          <p>والبلدية والمحاكم ومراكز الشـــرطة والإقامة والأجانب والهيئة الاتحادية للهوية والجنسيـــة وإدارة النفايات وهيئة التأمين الصحي ودائرة المشتريات ودائر النقل والمرور والترخيص والموانئ والجمـــارك والبريد والاتصالات ودو ودمان والدفاع المدني وجهاز حماية المنشـــآت الحيوية والسواحل وهيئة الماء والكهرباء (شـــركة طاقة للتوزيع) والهيئة الاتحادية للضـــرائب والمطارات والبنوك والشـــركات الخاصة والعامة والمؤسسات والأفراد واستلام وتسـليم وتقديم كافة الطلبات والمستندات والمعاملات والتوقيع عليـــها.</p>
        </div>
      </div>

      ${empNum !== null ? `
      <!-- Section ${empNum}: Employees -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${empNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Employees:</span></p>
          <p>To appoint employees and workers, terminate their services, sign their contracts, and pay their salaries; to obtain, renew, receive and cancel residence visas, work permits, and labor cards; to apply for issuance of absconding notices against workers, cancel the same and to deport employees.</p>
        </div>
        <div class="block rtl">
          <p><strong>${empNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الموظفين :</span></p>
          <p>تعيين الموظفين والعمال وإنهاء خدماتهم والتوقيع على عقودهم ودفع رواتبهم وطلب التأشيرات والبطاقات والأقامات وتجديدها واستلامها والغاءها والتعميم على العمال وفك التعميم وتسفيرهم.</p>
        </div>
      </div>
      ` : ''}

      ${purchaseNum !== null ? `
      <!-- Section ${purchaseNum}: Purchase Materials & Goods -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${purchaseNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To Purchase:</span></p>
          <p>To purchase, sell, and assign all materials, goods, and equipment required for the license; to enter into purchase agreements and sign all related documents on behalf of the license before all concerned authorities and parties.</p>
        </div>
        <div class="block rtl">
          <p><strong>${purchaseNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الشراء:</span></p>
          <p>شراء وبيع والتنازل عن جميع المواد والبضائع والمعدات اللازمة للرخصة، وإبرام عقود الشراء والتوقيع على جميع الوثائق ذات الصلة نيابة عن الرخصة أمام جميع الجهات والأطراف المعنية.</p>
        </div>
      </div>
      ` : ''}

      ${motorNum !== null ? `
      <!-- Section ${motorNum}: Motor Vehicles -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${motorNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Motor Vehicles:</span></p>
          <p>To purchase, transfer, register and renew registration of motor vehicles and equipment; to sell or assign licensed vehicles; to pay fines, fees and charges related to vehicles; and to sign all relevant documents before the Traffic and Licensing Department and other concerned authorities.</p>
        </div>
        <div class="block rtl">
          <p><strong>${motorNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">السيارات:</span></p>
          <p>تسجيل وتجديد وبيع أو تنازل أو التأجير جميع السيارات الجديدة والمرقمة للرخصة وقيادة السيارات واستلام المبالغ والمبالغ المستحقة وله الحق في دفع الرسوم والمخالفات المترتبة على السيارات والتوقيع على كافة العقود المتعلقة بسيارات الرخصة المذكورة أعلاه.</p>
        </div>
      </div>
      ` : ''}

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}

/**
 * Returns the next available section number after page2's sections.
 * Used by page3 to continue numbering seamlessly.
 */
export function page2NextSectionNum(sections: { employees: boolean; purchase: boolean; motorVehicles: boolean }): number {
  let n = 2
  if (sections.employees) n++
  if (sections.purchase) n++
  if (sections.motorVehicles) n++
  return n
}
