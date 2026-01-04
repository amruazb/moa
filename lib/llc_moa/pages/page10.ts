import { LLCMOAContext, pageFooter } from '../types'

export function page10(_ctx: LLCMOAContext, pageNum: number = 10): string {
  return `
    <div class="page">
      <div class="page-content">

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (19)</h3>
          <h3 class="underline center">VOTING</h3>
          <p>Each partner shall have one vote for each share held. A partner may authorize another partner or a third party to represent them at meetings by written proxy.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (19)</h3>
          <h3 class="underline center">التصويت</h3>
          <p>يكون لكل شريك صوت واحد عن كل حصة يملكها. ويجوز للشريك توكيل شريك آخر أو الغير لتمثيله في الاجتماعات بموجب توكيل كتابي.</p>
        </div>
      </div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (20)</h3>
          <h3 class="underline center">RESOLUTIONS</h3>
          <p>Resolutions of the General Assembly shall be passed by a majority of the shares represented at the meeting, unless the law or this Memorandum requires a greater majority. In case of equality of votes, the chairman of the meeting shall have a casting vote.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (20)</h3>
          <h3 class="underline center">القرارات</h3>
          <p>تصدر قرارات الجمعية العمومية بأغلبية الحصص الممثلة في الاجتماع، ما لم ينص القانون أو هذا العقد على أغلبية أكبر. وفي حالة تساوي الأصوات، يكون لرئيس الاجتماع صوت مرجح.</p>
        </div>
      </div>

      <div class="section-bar"><span>CHAPTER SIX: DISSOLUTION & LIQUIDATION</span><span class="rtl">الباب السادس: الانحلال والتصفية</span></div>

      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (21)</h3>
          <h3 class="underline center">DEATH OR BANKRUPTCY OF A PARTNER</h3>
          <p>In the event of death, bankruptcy, or insolvency of a partner, the Company shall not be dissolved but shall continue with the remaining partners and the heirs or legal representatives of the deceased or bankrupt partner. The heirs or legal representatives shall appoint one person to represent them in the Company.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (21)</h3>
          <h3 class="underline center">وفاة أو إفلاس شريك</h3>
          <p>في حالة وفاة أو إفلاس أو إعسار أحد الشركاء، لا تنحل الشركة بل تستمر مع باقي الشركاء وورثة أو الممثلين القانونيين للشريك المتوفى أو المفلس. ويعين الورثة أو الممثلون القانونيون شخصاً واحداً لتمثيلهم في الشركة.</p>
        </div>
      </div>

      </div>
      ${pageFooter(pageNum)}
    </div>`
}
