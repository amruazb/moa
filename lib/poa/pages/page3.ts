// POA Page 3: Sections 4–7 (Utilities, Banks, Execute contracts, Collect Receivables)
import { POAContext, poaPageFooter } from '../types'

export function page3(ctx: POAContext, pageNum: number = 3): string {
  const { sections } = ctx

  // Conditional loan text based on banksWithLoan toggle
  const bankLoanTextEn = sections.banksWithLoan
    ? 'and avail vehicle loan facilities, with cash loan from any banks operating in the country'
    : 'without any loan or credit facilities from any bank in UAE'

  const bankLoanTextAr = sections.banksWithLoan
    ? 'بالحصـــول على تسهيلات قروض السيارات وبقروض نقدية من البنـــوك العاملة في الدولة'
    : 'بدون أي قروض أو تسهيلات ائتمانية من أي بنك في دولة الإمارات العربية المتحدة'

  return `
    <div class="page">
      <div class="page-content">

      <!-- Section 4: Utilities (Content) -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>4</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Utilities:</span></p>
          <p>To apply for telephone, fax, internet, water, electricity, (TAQA Distribution company) and other utilities/services; to sign application forms and pay charges, fines and utility bills with the right to have those utilities disconnected and cancelled temporarily or permanently or have them re-connected, and to pay security deposits for the same and receive the same in cash or by cheques, and cash the cheques.</p>
        </div>
        <div class="block rtl">
          <p><strong>4</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الخدمات:</span></p>
          <p>تقــديم وإدخـــال خـــدمات الهـــاتف والفـــاكس والإنترنت والكهرباء والميـاه (شركة طاقة للتوزيع) وغيرهـــا مـــن الخـــدمات والوسائل ؛ على نماذج وطلبات التقديم ودفع الرسوم على فواتير الخـــدمات ولهـم الحق في قطـع وإلغاء تلك الخدمات نهائيا امؤقـــتا واعادتهـــا مـــرة أخـــرى ولتقـــديم الضـــمانات والكفـــالات المتعلقـــة بتلـــك الخـــدمات واستلامها ســواء نقدا أو بشيكات وصرفها.</p>
        </div>
      </div>

      <!-- Section 5: Banks -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>5</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Banks:</span></p>
          <p>To open, operate, manage and close company accounts at banks, and withdraw and deposit cash${(() => {
            const parts: string[] = []
            if (!sections.noChequeBooks) parts.push('request for cheques books')
            if (!sections.noSignCheques) parts.push('sign the cheques')
            return parts.length > 0 ? `, and ${parts.join(', ')}` : ''
          })()}${sections.noLoansFacilities ? '' : ' and avail all types of banks guarantees and facilities on behalf of the license and cash them'}, electronic banking, fixing and using of electronic cash machines, close and end all kind of transactions and formalities with bank related to the license, ${bankLoanTextEn}.</p>
        </div>
        <div class="block rtl">
          <p><strong>5</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">البنوك:</span></p>
          <p>فتح وأدل عل وإدارة الحسابات الموجودة والجديدة والغائها والإيداع فهيا${(() => {
            const parts: string[] = []
            if (!sections.noChequeBooks) parts.push('طلب دفتر الشيكات ووتسلمها')
            if (!sections.noSignCheques) parts.push('التوقيع على الشيـــكات واستــلامها وصرفها')
            return parts.length > 0 ? ` و${parts.join(' و')}` : ''
          })()}${sections.noLoansFacilities ? '' : ' وطلب ضمـــانات و تسهيلات البنكية بجميع أنواعها نيابة عن الرخصـــة وصرفهـــا'}، والإجراءات البنك الالكتروني وتركيـــب واستخدام المـاكينات البنك الالكتروني وإنهاء وإغلـق جميـــع المعـاملات والإجـراءات البنـــكية المتعلقة بالرخصـة، ${bankLoanTextAr}.</p>
        </div>
      </div>

      <!-- Section 6: Execute Contracts -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>6</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Execute contracts:</span></p>
          <p>To sign all types of contracts and their annex, including MOA and service agent contracts, entering and signing coalition contracts, entering into tenders related submissions, termination of all related procedures, and contracts. The attorney has the right to sign the renewal of tenancy contracts and has the right to cancel them, as well as the right to sign new lease contracts.</p>
        </div>
        <div class="block rtl">
          <p><strong>6</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">إبرام العقود:</span></p>
          <p>التوقيع علـى كافــة أنـواع العقـود وملاحقهـا ومنهـا عقـود التأسيس وعقود وكيل خدمات، والدخول في عقود الائتلاف والتوقيع عليها، والدخـول فـي المناقصـات المتعلقـة بتقديم عروض المشـاريع وإنهـاء كافـــة الإجـراءات والمتعلقة وفسخ العقود. وللوكيل حق التوقيع لتجديد عقـود الإيجـار ولهم لحـق فـي فسخها كمـا لهم الحق في التوقيع على عقـود الإيجار الجديدة.</p>
        </div>
      </div>

      <!-- Section 7: Collect Receivables -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>7</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To collect Receivables:</span></p>
          <p>To receive and collect all the amounts due to the above-mentioned license, whether in cash or by cheques, to sign receipt vouchers, to cash cheques from drawee banks, and to receive guarantees and deposits and cash the same.</p>
        </div>
        <div class="block rtl">
          <p><strong>7</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">استلام المبالغ:</span></p>
          <p>استلام كافة المستحقات والمبالغ لكل الرخصة المذكورة اعلاه سواء نقدا أو بشيكات والتوقيع على إيصلات الاستلام وصرف الشيكات من البنوك المسحوب عليها واستلام الضمانات والكفالات وصرفها.</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
