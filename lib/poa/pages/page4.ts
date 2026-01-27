// POA Page 4: Section 8 (Courts), Section 9 (Validity), Signature Block
import { POAContext, poaPageFooter, yearsToWords } from '../types'

export function page4(ctx: POAContext, pageNum: number = 4): string {
  const { validity, sections } = ctx
  const yearsWord = yearsToWords(validity.years)

  return `
    <div class="page">
      <div class="page-content">

      <!-- Section 7: Motor Vehicles -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>7</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Motor Vehicles:</span></p>
          <p>To register, renew, buy${sections.noSaleVehiclesAssets ? ', without any right to sale' : ', sell'} or assign hire out, all new and registered vehicles owned by the license, to drive and pay fines and offences incurred by vehicles, and to sign all contracts related to the vehicles of the license.</p>
        </div>
        <div class="block rtl">
          <p><strong>7</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">السيارات :</span></p>
          <p>تسجيل وتجديد${sections.noSaleVehiclesAssets ? '، بدون أي حق في البيع' : ' وبيع'} أو تنازل إؤتأجير جميع الســـيارات الجديدة والمرقمة للرخصـــة وقيادة السيارات ولهم الحق في دفع الرسـوم والمخالفات المترتبة على السـيارات والتوقيع على كافة العقود المتعلقة بسيارات الرخصة المذكورة اعلاه.</p>
        </div>
      </div>

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

      </div>
      ${poaPageFooter(pageNum)}
    </div>`
}
