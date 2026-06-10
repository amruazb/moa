import { DamanLetterContext } from '../types'

export function page1(ctx: DamanLetterContext, _pageNum: number): string {
  const { signatory } = ctx

  return `
    <div class="page page-1">
      <div class="page-content">
        <div class="company-header">
          <div class="ltr"><span class="edited">${ctx.companyName}</span></div>
          <div class="rtl"><span class="edited">${ctx.companyNameAr}</span></div>
        </div>

        <div class="content-pair date-row">
          <div class="ltr">Date: <span class="edited">${ctx.date}</span></div>
          <div class="rtl">التاريخ: <span class="edited">${ctx.date}</span></div>
        </div>

        <div class="content-pair recipient-block">
          <div class="ltr">
            Chief Commercial Officer<br/>
            National health Insurance Company – Daman PJSC<br/>
            P.O Box 128888<br/>
            Abu Dhabi<br/>
            United Arab Emirates
          </div>
          <div class="rtl">
            المدير التنفيذي للشؤون التجارية<br/>
            الشركة الوطنية للضمان الصحي – ضمان (ش.م.ع)<br/>
            ص.ب: 128888<br/>
            أبوظبي / الإمارات العربية المتحدة
          </div>
        </div>

        <div class="title-pair">
          <div class="title-en">Declaration</div>
          <div class="title-ar">إقرار</div>
        </div>

        <div class="content-pair body-text">
          <div class="ltr">
            I, the undersigned, <span class="edited">${signatory.name}</span>, in my authority as
            <span class="edited">${signatory.title}</span> of
            <span class="edited">${ctx.companyName}</span>, hereby declare that
            all the member(s) to be enrolled/renewed under the respective health insurance policy,
            as named in the member list sent with this declaration via email, are holding valid
            passports (or Emirates ID) and residence visas. I hereby undertake to provide Daman with
            an undertaking letter in regard to any such expired residence visa.
          </div>
          <div class="rtl">
            أنا الموقع أدناه، <span class="edited">${signatory.nameAr}</span>، بصفتي النافذة ك<span class="edited">${signatory.titleAr}</span>
            لشركة <span class="edited">${ctx.companyNameAr}</span>،
            أقر بأن جميع الأعضاء المذكورة أسماؤهم ضمن قائمة الأعضاء
            المرسلة عن طريق البريد الإلكتروني والمراد تسجيلهم/التجديد لهم ضمن
            وثيقة التأمين الصحي المعنية، جميعهم لديهم جوازات سفر (أو هوية الإمارات)
            وتأشيرات إقامة صالحة المدة، وأتعهد بتزويد ضمان برسالة تعهد فيما يتعلق
            بتأشيرات الإقامة منتهية الصلاحية.
          </div>
        </div>

        <div class="content-pair body-text">
          <div class="ltr">
            The information stated in this document is true and correct in regard to all members
            as listed on the member list, and I understand that providing false or untrue
            information shall be considered a violation of the relevant health insurance regulations
            and that I/Company may be held liable for these untrue statements.
          </div>
          <div class="rtl">
            إن المعلومات المذكورة ضمن هذا الإقرار هي معلومات صحيحة وكاملة بالنسبة لي
            وكذلك لجميع الأعضاء المدرجين بقائمة الأعضاء، وأنني على إدراك بأن تقديم أي
            معلومات خاطئة أو غير حقيقية سيُعد انتهاكاً لقوانين وقواعد التأمين الصحي
            وسيؤدي إلى تحملي/تحمل الشركة المسؤولية عن هذه التصريحات غير الصحيحة.
          </div>
        </div>

        <div class="content-pair closing">
          <div class="ltr">Yours Sincerely,</div>
          <div class="rtl">تفضلوا بقبول فائق الاحترام،</div>
        </div>

        <div class="content-pair signature-details">
          <div class="ltr">
            <span class="label">Signature:</span><br/><br/>
            <span class="label">Name:</span><br/>
            <span class="edited">${signatory.name}</span><br/><br/>
            <span class="label">Title:</span><br/>
            <span class="edited">${signatory.title}</span><br/><br/>
            [Company Stamp]
          </div>
          <div class="rtl">
            <span class="label">التوقيع:</span><br/><br/>
            <span class="label">الاسم:</span><br/>
            <span class="edited">${signatory.nameAr}</span><br/><br/>
            <span class="label">الوظيفة:</span><br/>
            <span class="edited">${signatory.titleAr}</span><br/><br/>
            ختم الشركة
          </div>
        </div>
      </div>
      <div class="page-footer"></div>
    </div>
  `
}
