import { MOAContext, pageFooter } from '../types'

export function page1(ctx: MOAContext, pageNum: number = 1): string {
  const { company, primary, eidOrPassport } = ctx

  return `
    <div class="page">
      <div class="page-content">
      <div class="bilingual-header">
        <div class="header-left">
          <h1>Memorandum of Association</h1>
          <h2>of a Limited Liability Company</h2>
          <h3>(${company.name})</h3>
        </div>
        <div class="header-right">
          <h1>عقد تأسيس</h1>
          <h2>شركة ذات مسؤولية محدودة</h2>
          <h3>(${company.nameAr})</h3>
        </div>
      </div>
      
      <div class="law-reference">
        <div class="law-left">(IN ACCORDANCE WITH COMMERCIAL COMPANY'S LAW NO (32) 2021 AND ITS AMENDMENTS AND MINISTERIAL DECREES THEREOF)</div>
        <div class="law-right">(وفقا لاحكام القانون الاتحادى رقم (32) لسنة 2021 م وتعديلاته ولوائحه الوزارية)</div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p>This agreement has been concluded on this day ${company.moaDate} in accordance with the provisions of Federal Companies Law No.32/2021</p>
        </div>
        <div class="block rtl">
          <p>أبرم هذا العقد في هذا اليوم ${company.moaDate} وفقا لأحكام قانون الشركات الإتحادي رقم (32) لسنة 2021</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <h3 class="bold">First Party:</h3>
          <p>Ms. ${primary.name} ${primary.nationality} national, holder of ID: Card No: ${eidOrPassport} and Born On ${primary.dob} having address at ${primary.address || company.emirate + ', U.A.E'}</p>
        </div>
        <div class="block rtl">
          <h3 class="bold">الطرف الاول:</h3>
          <p>السيدة/ ${primary.nameAr}، ${primary.nationalityAr} الجنسية بحمل بطاقة هوية رقم: ${eidOrPassport} والمولود في ${primary.dob} وعنوانه ${primary.addressAr || company.emirateAr + '، ا.ع.م.'}</p>
        </div>
      </div>
      
      <div class="section-bar"><span>PREAMBLE</span><span class="rtl">المقدمة</span></div>
      <div class="article-pair">
        <div class="block">
          <p>The first party, in her lawful sound capacity to contract, have agreed to incorporate a Limited Liability Company .Sole Propretorship Company in the Emirate of ${company.emirate} in accordance with the provisions of the Federal Law No. 32 of 2021, as amended concerning commercial companies (the Commercial Law) and provisions of this contract and as per the following conditions:-</p>
        </div>
        <div class="block rtl">
          <p>اتفق الطرف الأول وهي بكامل أهلية القانونية للتعاقد على تأسيس شركة ذات مسؤولية محدودة ش. ش. و، في إمارة ${company.emirateAr} وفقا لأحكام القانون الاتحادي رقم (32) لسنة 2021 وتعديلاته بشأن الشركات التجارية (القانون التجاري) وأحكام هذا العقد ووفقا للشروط التالية:</p>
        </div>
      </div>
      
      <div class="section-bar"><span>DEFINITIONS</span><span class="rtl">تعريفات</span></div>
      <div class="article-pair">
        <div class="block">
          <p>In applying this memorandum, the following terms shall have the following in meanings, unless the context requires otherwise.</p>
        </div>
        <div class="block rtl">
          <p>يكون للكلمات والعبارات التالية في هذا العقد المعاني والمبينة امام كل منها ما لم يقض سياق النص بغير ذلك.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p><strong><u>1- Company:</u></strong> The Company established under this memorandum and registered in commercial register.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>1-الشركة:</u></strong> الشركة التي تأسست بموجب هذا العقد والمقيدة في السجل التجاري.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p><strong><u>2- Commercial Companies Law:</u></strong> Federal law No (32) of 2021 on Commercial Companies.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>2-قانون الشركات التجارية:</u></strong> القانون الاتحادي رقم :(32) لسنة 2021 في شأن الشركات التجارية.</p>
        </div>
      </div>
      
      <div class="article-pair">
        <div class="block">
          <p><strong><u>3-Director(S):</u></strong> The director or the directors of the company appointed pursuant to this memorandum.</p>
        </div>
        <div class="block rtl">
          <p><strong><u>3- المدير/ المديرون:</u></strong> المدير او المديري الشركة المعينين بموجب هذا العقد.</p>
        </div>
      </div>
      </div>
      ${pageFooter(pageNum)}
    </div>`
}
