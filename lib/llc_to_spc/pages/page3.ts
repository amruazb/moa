import { LLCToSPCContext, conversionPageFooter } from '../types'

export function page3(ctx: LLCToSPCContext, pageNum: number = 3): string {
  const { firstParty, secondParty, newOwner, manager, license, activities } = ctx

  // Generate activities list HTML
  const activitiesListEn = activities.map(a => `<li class="edited">${a.nameEn}</li>`).join('\n          ')
  const activitiesListAr = activities.map(a => `<li class="edited">${a.nameAr}</li>`).join('\n          ')

  return `
    <div class="page">
      <div class="page-content">

      <!-- Article 3: Conversion to Sole Proprietorship -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (3): Conversion to Sole Proprietorship LLC</h3>
          <p>Upon execution of this agreement, the company <strong class="edited">${license.oldCompanyName}</strong> shall be converted from a Limited Liability Company to a Sole Proprietorship LLC (LLC-SPC) named <strong class="edited">${license.companyName}</strong>, with <strong class="edited">${newOwner.pronouns.title} ${newOwner.name}</strong> as the sole owner.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (3): التحويل إلى شركة الشخص الواحد</h3>
          <p>عند تنفيذ هذا الاتفاق، يتم تحويل الشركة <strong class="edited">${license.oldCompanyNameAr}</strong> من شركة ذات مسؤولية محدودة إلى شركة الشخص الواحد ذات مسؤولية محدودة (ذ.م.م - ش.ش.و) باسم <strong class="edited">${license.companyNameAr}</strong>، مع <strong class="edited">${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}</strong> كمالك وحيد.</p>
        </div>
      </div>

      <!-- Article 4: Release of Responsibilities -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (4): Release of Responsibilities</h3>
          <p>Upon execution of this agreement and registration with the competent authorities:</p>
          <p>1. The First Party and Second Party shall be released from all responsibilities, liabilities, and obligations related to the company.</p>
          <p>2. The Third Party (New Owner) shall assume all responsibilities, liabilities, and obligations of the company as of the date of registration.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (4): إخلاء المسؤوليات</h3>
          <p>عند تنفيذ هذا الاتفاق والتسجيل لدى الجهات المختصة:</p>
          <p>1. يتم إخلاء مسؤولية الطرف الأول والطرف الثاني من جميع المسؤوليات والالتزامات المتعلقة بالشركة.</p>
          <p>2. يتحمل الطرف الثالث (المالك الجديد) جميع مسؤوليات والتزامات الشركة اعتباراً من تاريخ التسجيل.</p>
        </div>
      </div>

      <!-- Article 5: Management -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (5): Company Management</h3>
          <p><strong class="edited">${manager.pronouns.title} ${manager.name}</strong> shall be the Managing Director of the company with full powers and authorities to manage, represent, and operate the company in accordance with the applicable laws and regulations.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (5): إدارة الشركة</h3>
          <p>يكون <strong class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</strong> المدير العام للشركة مع كامل الصلاحيات والسلطات لإدارة الشركة وتمثيلها وتشغيلها وفقاً للقوانين واللوائح المعمول بها.</p>
        </div>
      </div>

      <!-- Chapter I: General Provisions -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER I</h3>
          <h3 class="center">General Provisions</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الأول</h3>
          <h3 class="center">أحكام عامة</h3>
        </div>
      </div>

      <!-- Article: Objectives of the Company -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Objectives of the Company</h3>
          <p><strong>The objective of the company is:</strong></p>
          <ul class="list">
          ${activitiesListEn}
          </ul>
          <p>The Company may not engage in any activity other than the activities specified above without obtaining the relevant approval from the competent authorities.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">أغراض الشركة</h3>
          <p><strong>الغرض من تأسيس الشركة هو:</strong></p>
          <ul class="list">
          ${activitiesListAr}
          </ul>
          <p>لا يجوز للشركة ممارسة أي نشاط بخلاف الأنشطة المحددة أعلاه دون الحصول على الموافقة ذات الصلة من الجهات المختصة.</p>
        </div>
      </div>

      </div>
      ${conversionPageFooter(pageNum)}
    </div>`
}
