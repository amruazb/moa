import {
  InternalAgreementContext,
  pageFooter,
  ordinalParty,
} from '../types'

export function page1(ctx: InternalAgreementContext, pageNum: number, totalPages: number): string {
  const partyBlocks = ctx.parties
    .map((party, index) => {
      const en = ordinalParty(index, 'en')
      const ar = ordinalParty(index, 'ar')
      return `
      <div class="article-pair tight">
        <div class="block">
          <h3 class="bold underline">${en}:</h3>
          <p>
            <strong>Mr.</strong> <span class="edited">${party.name}</span>,
            <span class="edited">${party.nationality}</span> national,
            holder of Emirates ID Card No.: <span class="edited">${party.eid}</span>,
            Born On: <span class="edited">${party.dob}</span>,
            resident in <span class="edited">${ctx.emirate}, U.A.E.</span>
            (hereinafter referred to as the "${en}").
          </p>
        </div>
        <div class="block rtl">
          <h3 class="bold underline">${ar}:</h3>
          <p>
            <strong>السيد/</strong> <span class="edited">${party.nameAr}</span>،
            <span class="edited">${party.nationalityAr}</span> الجنسية،
            يحمل بطاقة هوية رقم: <span class="edited">${party.eid}</span>،
            تاريخ الميلاد: <span class="edited">${party.dob}</span>،
            العنوان: <span class="edited">${ctx.emirateAr}، الإمارات</span>
            (ويشار إليه فيما بعد بـ "${ar}").
          </p>
        </div>
      </div>`
    })
    .join('\n')

  return `
    <div class="page">
      <div class="page-content">
        <div class="bilingual-header">
          <div class="header-left">
            <h1>Internal Shareholding Agreement</h1>
            <h2>of a Limited Liability Company</h2>
            <h3>(<span class="edited">${ctx.companyName}</span>)</h3>
          </div>
          <div class="header-right">
            <h1>اتفاقية الحصص الداخلية</h1>
            <h2>لشركة ذات مسؤولية محدودة</h2>
            <h3>(<span class="edited">${ctx.companyNameAr}</span>)</h3>
          </div>
        </div>

        <div class="law-reference">
          <div class="law-left">
            (IN ACCORDANCE WITH FEDERAL DECREE-LAW NO. (32) OF 2021 ON COMMERCIAL COMPANIES AND THE CIVIL TRANSACTIONS LAW OF THE UNITED ARAB EMIRATES)
          </div>
          <div class="law-right">
            (وفقاً لأحكام المرسوم بقانون اتحادي رقم (32) لسنة 2021 بشأن الشركات التجارية وقانون المعاملات المدنية لدولة الإمارات العربية المتحدة)
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <p>
              This Internal Shareholding Agreement has been concluded on this day
              <span class="edited">${ctx.agreementDate}</span> in
              <span class="edited">${ctx.place}</span>, by and between:
            </p>
          </div>
          <div class="block rtl">
            <p>
              أبرمت اتفاقية الحصص الداخلية هذه في هذا اليوم
              <span class="edited">${ctx.agreementDate}</span> في
              <span class="edited">${ctx.placeAr}</span>، بين كل من:
            </p>
          </div>
        </div>

        ${partyBlocks}

        <div class="article-pair tight">
          <div class="block">
            <p>
              The First Party, the Second Party and the Third Party are hereinafter
              collectively referred to as the "<strong>Parties</strong>" and individually as a "<strong>Party</strong>".
            </p>
          </div>
          <div class="block rtl">
            <p>
              يشار إلى الطرف الأول والطرف الثاني والطرف الثالث مجتمعين بـ "<strong>الأطراف</strong>"
              ومنفردين بـ "<strong>الطرف</strong>".
            </p>
          </div>
        </div>
      </div>
      ${pageFooter(pageNum, totalPages)}
    </div>`
}
