// POA Page 4: Section 8 (Courts), Section 9 (Validity), Signature Block
import { POAContext, poaPageFooter, yearsToWords } from '../types'

export function page4(ctx: POAContext, pageNum: number = 4): string {
  const { principals, validity } = ctx
  const yearsWord = yearsToWords(validity.years)

  return `
    <div class="page">
      <div class="page-content">

      <!-- Section 8: Approach Courts -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>8</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To approach Courts:</span></p>
          <p>To report to all courts of law with respect to the lawsuits related to the license with the right to lodge complaints with police centers and public prosecution and give up the same; to file lawsuits before courts of all kinds and levels, and public prosecution and give up the same, with the power to compromise, settle, admit, make statements, release, deny, and arbitrate, to accept or refuse taking oath or to administer oath, to abandon legal proceedings, to give up court judgement or challenge the same, to cancel attachment or give up security deposits, to make a claim for forgery or to reject judges or experts in whole or part and to appoint and discharge advocates/ lawyers, and to appoint liquidators and chartered accountants.</p>
        </div>
        <div class="block rtl">
          <p><strong>8</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">مراجعة المحاكم:</span></p>
          <p>مراجعـة كافـة المحـاكم بخصـوص القضـايا المتعلقة بالرخصـة ولهـم الحـق فـي فتـح البلاغات لدى مراكز الشـرطة والنيابة العامة والتنازل عنهـا ورفـع القضـايا لـدى المحـاكم بمختلف أنواعهـا ودرجاتهـا كمـا لدى أمـام النيابة العامة والتنـازل عنهـا كمـا لهـا حـق الصـلح والإقـرار والتسـوية والإبـراء والإنكـار والصلح والتحكيم وقبـول اليميـن توجيههـا أو ردهـا وتـرك الخصومة أو التنازل عن الحكم كليا أو جزئيا أو من طريق الطعن فيه، شـرئ الضمان قيمه أو رفـع الحجـز أو تـرك التأمينات مـع بقـاء الديـن أو الإدعـاء بالتزوير أو القبض أو الحضـر كليا أو جزئيـا كمـا أو رد القضـاء فـي توكيـل المحـامين وعـزلهم وتعيين المصفين والمحاسبين القانونيين.</p>
        </div>
      </div>

      <!-- Section 9: Validity Period -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>9</strong>&nbsp;&nbsp;&nbsp;This power attorney shall be valid up to <span class="edited">${yearsWord.en} years</span> from the date of attestation of the same by the notary public, unless it becomes invalid before that date for any other reason.</p>
        </div>
        <div class="block rtl">
          <p><strong>9</strong>&nbsp;&nbsp;&nbsp;يسـري هـذا التوكيـل لمـدة <span class="edited">${yearsWord.ar}</span> من تاريخ تصديقه لدى كاتب العدل مـا لم ينتهي قبـل ذلـك بسـبب أخـر ، وهيـ ة رجـوع اعتمـاد توقيعها لديكم</p>
        </div>
      </div>

      <!-- Signature Block -->
      <div style="margin-top: 40px;">
        ${principals.map((principal, index) => `
        <div class="signature-block">
          <div class="signature-area">
            <div class="signature-content">
              <p><strong>The Principal:</strong></p>
              <p><span class="edited">${principal.pronouns.title} ${principal.name}</span>,</p>
              ${principal.isRepresented && principal.representative ? `
              <p><strong>Represented by:</strong></p>
              <p><span class="edited">${principal.representative.pronouns.title} ${principal.representative.name}</span>, ${principal.representative.nationality} National,</p>
              <p>Date of Birth: <span class="edited">${principal.representative.dateOfBirth}</span></p>
              <p>Holder of Emirates ID No.: <span class="edited">${principal.representative.eidOrPassport}</span></p>
              <p>By virtue of Power of Attorney attested by Notary Public, ${principal.representative.poaLocation}, under No.: <span class="edited">${principal.representative.poaNumber}</span></p>
              <p>dated <span class="edited">${principal.representative.poaDate}</span>,</p>
              <p>residing at <span class="edited">${principal.representative.address}</span>.</p>
              ` : ''}
              <p><strong>Signature:</strong></p>
            </div>
            <div class="signature-line-block"></div>
          </div>
          <div class="signature-area rtl">
            <div class="signature-content">
              <p><strong>الموكل:</strong></p>
              <p><span class="edited">${principal.pronouns.titleAr} / ${principal.nameAr}</span></p>
              ${principal.isRepresented && principal.representative ? `
              <p><strong>ممثل بـ:</strong></p>
              <p><span class="edited">${principal.representative.pronouns.titleAr} / ${principal.representative.nameAr}</span>، ${principal.representative.nationalityAr} الجنسية،</p>
              <p>تاريخ الميلاد: <span class="edited">${principal.representative.dateOfBirth}</span></p>
              <p>حامل بطاقة الهوية الإماراتية رقم: <span class="edited">${principal.representative.eidOrPassport}</span></p>
              <p>بموجب التوكيل المصدق من كاتب العدل، ${principal.representative.poaLocation}، تحت رقم: <span class="edited">${principal.representative.poaNumber}</span></p>
              <p>بتاريخ <span class="edited">${principal.representative.poaDate}</span>،</p>
              <p>مقيم في <span class="edited">${principal.representative.addressAr}</span>.</p>
              ` : ''}
              <p><strong>التوقيع:</strong></p>
            </div>
            <div class="signature-line-block"></div>
          </div>
        </div>
        `).join('')}
      </div>

      </div>
      ${poaPageFooter(pageNum, true)}
    </div>`
}
