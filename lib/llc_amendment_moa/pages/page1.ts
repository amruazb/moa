import { LLCAmendmentMOAContext, pageFooter } from '../types'

// Header font size configuration
export interface HeaderFontSizes {
  enTitle: number      // English main title (pt)
  enSubtitle: number   // English subtitle (pt)
  enCompany: number    // English company name (pt)
  arTitle: number      // Arabic main title (pt)
  arSubtitle: number   // Arabic subtitle (pt)
  arCompany: number    // Arabic company name (pt)
}

// Default header font sizes
export const defaultHeaderSizes: HeaderFontSizes = {
  enTitle: 16,
  enSubtitle: 14,
  enCompany: 13,
  arTitle: 18,
  arSubtitle: 16,
  arCompany: 14
}

// Function to get header font sizes (can be customized)
export function getHeaderFontSizes(custom?: Partial<HeaderFontSizes>): HeaderFontSizes {
  return { ...defaultHeaderSizes, ...custom }
}

export function page1(ctx: LLCAmendmentMOAContext, pageNum: number = 1, headerSizes?: Partial<HeaderFontSizes>): string {
  const { company } = ctx
  const sizes = getHeaderFontSizes(headerSizes)

  return `
    <div class="page">
      <div class="page-content">
        
        <!-- Document Header -->
        <div class="bilingual-header" style="margin-bottom: 35px;">
          <div class="header-left" style="text-align: left;">
            <h1 style="font-size: ${sizes.enTitle}pt; margin-bottom: 8px; font-weight: bold; line-height: 1.3;">ADDENDUM TO THE</h1>
            <h1 style="font-size: ${sizes.enTitle}pt; margin-bottom: 8px; font-weight: bold; line-height: 1.3;">PARTNERSHIP AGREEMENT</h1>
            <h2 style="font-size: ${sizes.enSubtitle}pt; margin-bottom: 6px; font-weight: bold; line-height: 1.3;">Assignment of Shares</h2>
            <h3 class="edited" style="font-size: ${sizes.enCompany}pt; margin-top: 12px; font-weight: bold; line-height: 1.3;">${company.name}</h3>
          </div>
          <div class="header-right" style="text-align: right; direction: rtl;">
            <h1 style="font-size: ${sizes.arTitle}pt; margin-bottom: 8px; font-weight: bold; line-height: 1.3;">ملحق اتفاقية الشراكة</h1>
            <h2 style="font-size: ${sizes.arSubtitle}pt; margin-bottom: 6px; font-weight: bold; line-height: 1.3;">تنازل عن الأسهم</h2>
            <h3 class="edited" style="font-size: ${sizes.arCompany}pt; margin-top: 12px; font-weight: bold; line-height: 1.3;">${company.nameAr}</h3>
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
            </ul>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">الإطار القانوني</h3>
            <p>يتم تنفيذ هذا الملحق وفقاً لـ:</p>
            <ul>
              <li>القانون الاتحادي الإماراتي رقم 32 لسنة 2021 بشأن الشركات التجارية</li>
            </ul>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
