import { LLCAmendmentMOAContext, pageFooter } from '../types'

export function page1(ctx: LLCAmendmentMOAContext, pageNum: number = 1): string {
  const { company } = ctx

  return `
    <div class="page">
      <div class="page-content">
        
        <!-- Document Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 class="bold">ADDENDUM TO THE PARTNERSHIP AGREEMENT</h1>
          <h2 class="bold">ASSIGNMENT OF SHARES</h2>
          <h2 class="bold">OF "${company.name}"</h2>
          <div style="margin-top: 30px;">
            <h3 class="bold rtl">ملحق اتفاقية الشراكة</h3>
            <h3 class="bold rtl">تنازل عن الأسهم</h3>
            <h3 class="bold rtl">لشركة "${company.nameAr}"</h3>
          </div>
        </div>

        <!-- Company Information -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">COMPANY INFORMATION</h3>
            <p><strong>Company Name:</strong> <span class="edited">${company.name}</span></p>
            <p><strong>Commercial License No:</strong> <span class="edited">${company.licenseNo}</span></p>
            <p><strong>Emirate:</strong> <span class="edited">${company.emirate}</span></p>
            <p><strong>Address:</strong> <span class="edited">${company.address}</span></p>
            <p><strong>Amendment Date:</strong> <span class="edited">${company.amendmentDate}</span></p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">معلومات الشركة</h3>
            <p><strong>اسم الشركة:</strong> <span class="edited">${company.nameAr}</span></p>
            <p><strong>رقم الرخصة التجارية:</strong> <span class="edited">${company.licenseNo}</span></p>
            <p><strong>الإمارة:</strong> <span class="edited">${company.emirateAr}</span></p>
            <p><strong>العنوان:</strong> <span class="edited">${company.addressAr}</span></p>
            <p><strong>تاريخ التعديل:</strong> <span class="edited">${company.amendmentDate}</span></p>
          </div>
        </div>

        <!-- Purpose Statement -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">PURPOSE</h3>
            <p>This addendum serves to document the assignment and transfer of shares in the above-mentioned Limited Liability Company, in accordance with the UAE Commercial Companies Law and the original Memorandum of Association.</p>
            <p>The parties hereby agree to the terms and conditions set forth in this addendum, which shall form an integral part of the original partnership agreement.</p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">الغرض</h3>
            <p>يهدف هذا الملحق إلى توثيق تنازل ونقل الأسهم في الشركة ذات المسؤولية المحدودة المذكورة أعلاه، وفقاً لقانون الشركات التجارية الإماراتي وعقد التأسيس الأصلي.</p>
            <p>يوافق الأطراف بموجب هذا على الشروط والأحكام المنصوص عليها في هذا الملحق، والذي يشكل جزءاً لا يتجزأ من اتفاقية الشراكة الأصلية.</p>
          </div>
        </div>

        <!-- Legal Framework -->
        <div class="article-pair">
          <div class="block">
            <h3 class="bold underline">LEGAL FRAMEWORK</h3>
            <p>This addendum is executed in accordance with:</p>
            <ul>
              <li>UAE Federal Law No. 32 of 2021 concerning Commercial Companies</li>
              <li>The original Memorandum of Association of the Company</li>
              <li>The Articles of Association of the Company</li>
              <li>All applicable UAE laws and regulations</li>
            </ul>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">الإطار القانوني</h3>
            <p>يتم تنفيذ هذا الملحق وفقاً لـ:</p>
            <ul>
              <li>القانون الاتحادي الإماراتي رقم 32 لسنة 2021 بشأن الشركات التجارية</li>
              <li>عقد التأسيس الأصلي للشركة</li>
              <li>النظام الأساسي للشركة</li>
              <li>جميع القوانين واللوائح الإماراتية المعمول بها</li>
            </ul>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
