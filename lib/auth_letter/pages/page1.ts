import { AuthLetterContext, authLetterPageFooter } from '../types'

export function page1(ctx: AuthLetterContext, pageNum: number): string {
  return `
    <div class="page page-1">
      <div class="page-content">
        <div class="title-pair">
          <div class="title-en">AUTHORIZATION LETTER</div>
          <div class="title-ar">خطاب تفويض</div>
        </div>

        <div class="content-pair date-row">
          <div class="ltr">Date: <span class="edited">${ctx.date}</span></div>
          <div class="rtl">التاريخ: <span class="edited">${ctx.date}</span></div>
        </div>

        <div class="content-pair salutation">
          <div class="ltr">To Whom It May Concern,</div>
          <div class="rtl">إلى من يهمه الأمر،</div>
        </div>

        <div class="content-pair body-text">
          <div class="ltr">
            This is to certify that Mr. <span class="edited">${ctx.employee.name}</span>, 
            holding Emirates ID No. <span class="edited">${ctx.employee.eid}</span>, 
            is employed with <span class="edited">${ctx.companyName}</span> as 
            <span class="edited">${ctx.employee.jobTitle}</span>.
          </div>
          <div class="rtl">
            نشهد بأن السيد/ <span class="edited">${ctx.employee.nameAr}</span>، 
            والذي يحمل بطاقة هوية إماراتية رقم <span class="edited">${ctx.employee.eid}</span>، 
            موظف لدى <span class="edited">${ctx.companyNameAr}</span> بمهنة 
            <span class="edited">${ctx.employee.jobTitleAr}</span>.
          </div>
        </div>

        <div class="content-pair body-text">
          <div class="ltr">
            We hereby authorize him to use and operate the company vehicle bearing Plate No. 
            <span class="edited">${ctx.vehicle.plateNo}</span>, registered in 
            <span class="edited">${ctx.vehicle.registrationCity}</span>, United Arab Emirates. 
            The above-mentioned vehicle has been officially issued by the company for carrying 
            out company-related duties and operational activities.
          </div>
          <div class="rtl">
            بموجب هذا الكتاب، نفوضه باستخدام وقيادة المركبة المملوكة للشركة والتي تحمل رقم لوحة 
            <span class="edited">${ctx.vehicle.plateNo}</span>، والمقيدة في 
            <span class="edited">${ctx.vehicle.registrationCityAr}</span>، الإمارات العربية المتحدة. 
            تم صرف المركبة المذكورة أعلاه رسمياً من قبل الشركة للقيام بالمهام المتعلقة بالشركة 
            والأنشطة التشغيلية.
          </div>
        </div>

        <div class="content-pair body-text">
          <div class="ltr">
            He is fully authorized to drive, manage, and utilize the said vehicle for official 
            purposes until further notice from the company.
          </div>
          <div class="rtl">
            وهو مفوض بالكامل لقيادة وإدارة واستخدام المركبة المذكورة للأغراض الرسمية حتى إشعار 
            آخر من الشركة.
          </div>
        </div>

        <div class="content-pair closing">
          <div class="ltr">
            Sincerely,<br/>
            <span class="edited">${ctx.companyName}</span>
          </div>
          <div class="rtl">
            تفضلوا بقبول فائق الاحترام والتقدير،<br/>
            <span class="edited">${ctx.companyNameAr}</span>
          </div>
        </div>

        <div style="margin-top: auto; padding-top: 40px;">
            <div class="page-footer" style="height: auto; padding: 0;">
                <div class="footer-section footer-left">
                    <div class="signature-box">
                        <span class="footer-label">Signature / التوقيع</span>
                    </div>
                </div>
                <div class="footer-section footer-center">
                    <div class="signature-box">
                        <span class="footer-label">Seal / الختم</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="page-footer"></div>
    </div>
    `
}
