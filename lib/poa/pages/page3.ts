// POA Page 3: Continuation of Banks, Sections 5-7
import { POAContext, poaPageFooter } from '../types'

export function page3(ctx: POAContext, pageNum: number = 3): string {
  const { sections } = ctx

  // Conditional loan text based on banksWithLoan toggle
  const bankLoanTextEn = sections.banksWithLoan
    ? 'and avail vehicle loan facilities, with cash loan from any banks operating in the country'
    : 'and avail vehicle loan facilities, without cash loan from any banks operating in the country'

  const bankLoanTextAr = sections.banksWithLoan
    ? 'بالحصـــول على تسهيلات قروض السيارات وبقروض نقدية من البنـــوك العاملة في الدولة'
    : 'بالحصـــول على تسهيلات قروض السيارات وبدون قروض نقدية من البنـــوك العاملة في الدولة'

  return `
    <div class="page">
      <div class="page-content">

      <!-- Continuation of Section 4: Banks -->
      <div class="article-pair">
        <div class="block">
          <p>cash, and request for cheques books, sign the cheques, and avail all types of banks guarantees and facilities on behalf of the license and cash them, electronic banking, fixing and using of electronic cash machines, close and end all kind of transactions and formalities with bank related to the license, ${bankLoanTextEn}.</p>
        </div>
        <div class="block rtl">
          <p>فهيا وطلب دفتر الشيكات ووتسلمها و التوقيع على الشيـــكات واستــلامها وصرفها وطلب ضمـــانات و تسهيلات البنكية بجميع أنواعها نيابة عن الرخصـــة وصرفهـــا، والإجراءات البنك الالكتروني وتركيـــب واستخدام المـاكينات البنك الالكتروني وإنهاء وإغلـق جميـــع المعـاملات والإجـراءات البنـــكية المتعلقة بالرخصـة ${bankLoanTextAr}.</p>
        </div>
      </div>

      <!-- Section 5: Execute Contracts -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>5</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Execute contracts:</span></p>
          <p>To sign all types of contracts and their annex, including MOA and service agent contracts, entering and signing coalition contracts, entering into tenders related submissions, termination of all related procedures, and contracts. The attorney has the right to sign the renewal of tenancy contracts and has the right to cancel them, as well as the right to sign new lease contracts.</p>
        </div>
        <div class="block rtl">
          <p><strong>5</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">إبرام العقود:</span></p>
          <p>التوقيع علـى كافــة أنـواع العقـود وملاحقهـا ومنهـا عقـود التأسيس وعقود وكيل خدمات، والدخول في عقود الائتلاف والتوقيع عليها، والدخـول فـي المناقصـات المتعلقـة بتقديم عروض المشـاريع وإنهـاء كافـــة الإجـراءات والمتعلقة وفسخ العقود. وللوكيل حق التوقيع لتجديد عقـود الإيجـار ولهم لحـق فـي فسخها كمـا لهم الحق في التوقيع على عقـود الإيجار الجديدة.</p>
        </div>
      </div>

      <!-- Section 6: Collect Receivables -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>6</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To collect Receivables:</span></p>
          <p>To receive and collect all the amounts due to the above-mentioned license, whether in cash or by cheques, to sign receipt vouchers, to cash cheques from drawee banks, and to receive guarantees and deposits and cash the same.</p>
        </div>
        <div class="block rtl">
          <p><strong>6</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">استلام المبالغ:</span></p>
          <p>استلام كافة المستحقات والمبالغ لكل الرخصة المذكورة اعلاه سواء نقدا أو بشيكات والتوقيع على إيصلات الاستلام وصرف الشيكات من البنوك المسحوب عليها واستلام الضمانات والكفالات وصرفها.</p>
        </div>
      </div>

      <!-- Section 7: Motor Vehicles -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>7</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Motor Vehicles:</span></p>
          <p>To register, renew, buy, sell or assign hire out, all new and registered vehicles owned by the license, to drive and pay fines and offences incurred by vehicles, and to sign all contracts related to the vehicles of the license.</p>
        </div>
        <div class="block rtl">
          <p><strong>7</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">السيارات :</span></p>
          <p>تسجيل وتجديد وبيع أو تنازل إؤتأجير جميع الســـيارات الجديدة والمرقمة للرخصـــة وقيادة السيارات ولهم الحق في دفع الرسـوم والمخالفات المترتبة على السـيارات والتوقيع على كافة العقود المتعلقة بسيارات الرخصة المذكورة اعلاه.</p>
        </div>
      </div>

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
