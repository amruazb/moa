import { MOAContext } from '../types'

const defaultActivitiesEn = ['Retail Sale of Coffee', 'Retail Sale of Tea', 'Retail of Sale Juice', 'Importing']
const defaultActivitiesAr = ['بيع البن - بالتجزئة', 'بيع الشاي – بالتجزئة', 'بيع العصائر – بالتجزئة', 'استيراد']

export function page3(ctx: MOAContext): string {
  const { company, activitiesEn, activitiesAr } = ctx
  const actEn = activitiesEn.length ? activitiesEn : defaultActivitiesEn
  const actAr = activitiesAr.length ? activitiesAr : defaultActivitiesAr

  return `
    <div class="page">
      <div class="article-pair">
        <div class="block">
          <h3 class="underline">8- PREFACE:</h3>
          <p>The preamble and definitions mentioned above shall constitute an integral part of memorandum and shall be read and interpreted therewith.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline">8- التمهيد:</h3>
          <p>تعتبر المقدمة والتعريفات المذكورة اعلاه جزء لايتجزأ من هذا العقد ويقرأ ويفسر معه.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (1)</h3>
          <h3 class="underline center">NAME OF THE COMPANY:</h3>
          <p>The name of company will be: <strong class="underline">${company.name}</strong> This name may be amended or changed if necessary.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (1)</h3>
          <h3 class="underline center">اسم الشركة</h3>
          <p>يكون اسم الشركة: <strong class="underline">${company.nameAr}</strong>، ويجوز تعديل هذا الاسم أو تغييره إذا ما اقتضت الضرورة ذلك.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (2)</h3>
          <h3 class="underline center">HEAD OFFICE OF THE COMPANY:</h3>
          <p>The Registered and Head Office of the Company shall be located in the Emirates ${company.emirate}. The Company is entitled to open branches, offices or agencies within the U.A.E. and abroad.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (2)</h3>
          <h3 class="underline center">المقر الرئيسى للشركة</h3>
          <p>يكون مقر الشركة الرئيسى والمسجل في إمارة ${company.emirateAr}، الإمارات العربية المتحدة ويحق للشركة أن تؤسس فروعا او مكاتب لها داخل أو خارج الدولة.</p>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (3)</h3>
          <p><strong>The objective of the company is:</strong></p>
          <ul class="list">${actEn.map(a => '<li>' + a + '</li>').join('')}</ul>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (3)</h3>
          <p><strong>الغرض من تأسيس الشركة هو:</strong></p>
          <ul class="list">${actAr.map(a => '<li>' + a + '</li>').join('')}</ul>
        </div>
      </div>
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (4)</h3>
          <p>Duration of the company shall be twenty five years commencing from the date of registration of the company in the commercial register and is renewable by consent of the general assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (4)</h3>
          <p>تكون مدة الشركة خمسة و عشرون سنة تبدأ من تاريخ قيدها في السجل التجاري وتجدد بموافقة الجمعية العمومية.</p>
        </div>
      </div>
      <div class="page-num">3</div>
    </div>`
}
