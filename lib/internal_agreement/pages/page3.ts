import { InternalAgreementContext, pageFooter } from '../types'

export function page3(ctx: InternalAgreementContext, pageNum: number, totalPages: number): string {
  return `
    <div class="page">
      <div class="page-content">
        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (3) — PROFITS AND LOSSES</h3>
            <p>
              Net profits and losses of the Company shall be shared among the Parties
              in the same percentages set out in Article (2). Any distribution shall be
              made in accordance with those percentages.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (3) — الأرباح والخسائر</h3>
            <p>
              توزع الأرباح والخسائر الصافية للشركة بين الأطراف وفق النسب المبينة في المادة (2)،
              ويتم أي توزيع وفقاً لتلك النسب.
            </p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (4) — MANAGEMENT</h3>
            <p>
              The Second Party shall continue to manage the day-to-day affairs of the Company
              as Manager and authorised signatory. Any decision affecting the shareholding
              set out in this Agreement, the sale of the Company, or any amendment of this
              Agreement shall require the prior written consent of all Parties.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (4) — الإدارة</h3>
            <p>
              يستمر الطرف الثاني في إدارة الأعمال اليومية للشركة بصفته المدير والمفوض بالتوقيع.
              وأي قرار يمس الحصص المبينة في هذه الاتفاقية أو بيع الشركة أو تعديل هذه الاتفاقية
              يستلزم الموافقة الخطية المسبقة من جميع الأطراف.
            </p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (5) — CONFIDENTIALITY</h3>
            <p>
              The Parties shall keep the contents of this Agreement confidential and shall
              use it only as their private written record of the shareholding set out herein.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (5) — السرية</h3>
            <p>
              يحافظ الأطراف على سرية مضمون هذه الاتفاقية ويستخدمونها فقط كسجل كتابي خاص
              بالحصص المبينة فيها.
            </p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (6) — TRANSFER OF INTEREST</h3>
            <p>
              No Party may assign or transfer his internal shareholding except with the
              prior written consent of the other Parties.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (6) — نقل الحصة</h3>
            <p>
              لا يجوز لأي طرف التنازل عن حصته الداخلية أو نقلها إلا بموافقة خطية مسبقة من بقية الأطراف.
            </p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (7) — BINDING PROOF</h3>
            <p>
              This Agreement constitutes the Parties' written record and proof of the
              internal shareholding set out herein. Each Party acknowledges and accepts
              the percentages stated, and this Agreement shall be binding among the Parties.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (7) — الدليل الملزم</h3>
            <p>
              تشكل هذه الاتفاقية السجل والدليل الكتابي بين الأطراف على الحصص الداخلية المبينة فيها.
              ويقر كل طرف بالنسب الواردة ويقبلها، وتكون هذه الاتفاقية ملزمة فيما بين الأطراف.
            </p>
          </div>
        </div>

        <div class="article-pair tight">
          <div class="block">
            <h3 class="bold underline">ARTICLE (8) — GOVERNING LAW</h3>
            <p>
              This Agreement shall be governed by the laws of the United Arab Emirates.
              The courts of the Emirate of <span class="edited">${ctx.emirate}</span> shall have
              jurisdiction over any dispute arising from this Agreement.
            </p>
          </div>
          <div class="block rtl">
            <h3 class="bold underline">المادة (8) — القانون الواجب التطبيق</h3>
            <p>
              تخضع هذه الاتفاقية لقوانين دولة الإمارات العربية المتحدة، وتكون محاكم إمارة
              <span class="edited">${ctx.emirateAr}</span> مختصة بأي نزاع ينشأ عنها.
            </p>
          </div>
        </div>

      </div>
      ${pageFooter(pageNum, totalPages)}
    </div>`
}
