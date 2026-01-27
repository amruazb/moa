// POA Page 5: Signature Block
import { POAContext, poaPageFooter } from '../types'

export function page5(ctx: POAContext, pageNum: number = 5): string {
  const { principals } = ctx

  return `
    <div class="page">
      <div class="page-content">

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
              <p><strong>Signature:</strong></p>
              <div style="height: 60px;"></div>
              ` : `
              <p><strong>Signature:</strong></p>
              `}
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
              <p><strong>التوقيع:</strong></p>
              <div style="height: 60px;"></div>
              ` : `
              <p><strong>التوقيع:</strong></p>
              `}
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
