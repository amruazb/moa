import { MOAContext } from '../types'

export function page1(ctx: MOAContext): string {
  const { company, primary, eidOrPassport } = ctx
  
  return `
    <div class="page">
      <div class="title">
        <h1>Memorandum of Association</h1>
        <h1 class="rtl">عقد تأسيس</h1>
        <h2>of a Limited Liability Company</h2>
        <h2 class="rtl">شركة ذات مسؤولية محدودة</h2>
        <div class="subtitle">(${company.name})</div>
        <div class="subtitle rtl">(${company.nameAr})</div>
      </div>
      
      <div class="article-pair" style="font-size:7.5pt; font-style:italic; margin-bottom:10px;">
        <div class="block">(IN ACCORDANCE WITH COMMERCIAL COMPANY'S LAW NO (32) 2021 AND ITS AMENDMENTS AND MINISTERIAL DECREES THEREOF)</div>
        <div class="block rtl">(وفقا لاحكام القانون الاتحادى رقم (32) لسنة 2021 م وتعديلاته ولوائحه الوزارية)</div>
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
      
      <div class="page-num">1</div>
    </div>`
}
