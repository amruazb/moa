import { FontSettings } from '@/store/formattingStore'
import { generateMoaStyles } from '@/lib/spc_moa/styles'
import { signatureCards } from '@/lib/utils/signatureCard'
import { YardLeaseContext, formatAed } from './types'

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Isolate a number so Arabic RTL does not mirror it. */
function ltr(value: string): string {
  return `<span class="ltr-num" dir="ltr">${esc(value)}</span>`
}

function edited(value: string): string {
  return `<span class="edited">${esc(value)}</span>`
}

function blankOr(value: string, blank = '________'): string {
  const trimmed = value.trim()
  return ltr(trimmed || blank)
}

function aedFigure(amount: number): string {
  return ltr(formatAed(amount))
}

function moneyOrBlank(raw: string): { en: string; ar: string } {
  const trimmed = raw.trim()
  if (!trimmed) {
    return {
      en: `AED ${ltr('________')} (${ltr('________________________________')} UAE Dirhams)`,
      ar: `${ltr('________')} درهم إماراتي (${ltr('________________________________')} درهم)`,
    }
  }
  const amount = Number(trimmed.replace(/,/g, ''))
  if (!Number.isFinite(amount) || amount < 0) {
    return {
      en: `AED ${ltr(trimmed)}`,
      ar: `${ltr(trimmed)} درهم إماراتي`,
    }
  }
  return {
    en: `AED ${ltr(formatAed(amount))}`,
    ar: `${ltr(formatAed(amount))} درهم إماراتي`,
  }
}

function article(titleEn: string, titleAr: string, bodyEn: string, bodyAr: string): string {
  return `
    <div class="article-pair tight">
      <div class="block">
        <h3 class="bold underline">${titleEn}</h3>
        ${bodyEn}
      </div>
      <div class="block rtl">
        <h3 class="bold underline">${titleAr}</h3>
        ${bodyAr}
      </div>
    </div>`
}

function prose(bodyEn: string, bodyAr: string): string {
  return `
    <div class="article-pair tight">
      <div class="block">${bodyEn}</div>
      <div class="block rtl">${bodyAr}</div>
    </div>`
}

function leaseFooter(pageNum: number, totalPages: number): string {
  return `
    <div class="page-footer">
      <div class="footer-section footer-left">
        <div class="signature-box">
          <span class="signature-line"></span>
          <span class="footer-label">Parties' Initials / الأحرف الأولى للطرفين</span>
        </div>
      </div>
      <div class="footer-section footer-center">
        <span class="footer-label">Yard Lease Agreement / عقد إيجار ساحة</span>
      </div>
      <div class="footer-section footer-right">
        <span class="page-num">${pageNum} / ${totalPages}</span>
      </div>
    </div>`
}

function sheet(inner: string, pageNum: number, totalPages: number, withFooter: boolean): string {
  return `
    <div class="page${withFooter ? '' : ' no-footer'}">
      <div class="page-content">
        ${inner}
      </div>
      ${withFooter ? leaseFooter(pageNum, totalPages) : ''}
    </div>`
}

function buildPages(ctx: YardLeaseContext): string[] {
  const deposit = moneyOrBlank(ctx.securityDeposit)
  const liability = moneyOrBlank(ctx.liabilityLimit)
  const date = blankOr(ctx.agreementDate)
  const areaEn = `${blankOr(ctx.areaSqm)} sq. m`
  const areaAr = `${blankOr(ctx.areaSqm)} متراً مربعاً`
  const chequeNo = blankOr(ctx.chequeNo)
  const chequeBank = ctx.chequeBank.trim() ? edited(ctx.chequeBank) : ltr('________________')
  const chequeDate = blankOr(ctx.chequeDate)

  const intro = prose(
    `<p>This Yard Lease Agreement (the "<strong>Agreement</strong>") is made on ${date} at ${edited(ctx.place)}, by and between the following parties:</p>`,
    `<p>أُبرم عقد إيجار الساحة هذا ("<strong>العقد</strong>") بتاريخ ${date} في ${edited(ctx.placeAr)}، بين الطرفين الآتيين:</p>`,
  )

  const lessor = prose(
    `<h3 class="bold underline">The Lessor:</h3>
     <p><strong>Mr.</strong> ${edited(ctx.lessor.name)}, ${edited(ctx.lessor.nationality)} national, holder of Emirates ID No. ${ltr(ctx.lessor.eid)} (hereinafter the "<strong>Lessor</strong>").</p>`,
    `<h3 class="bold underline">المؤجر:</h3>
     <p><strong>السيد/</strong> ${edited(ctx.lessor.nameAr)}، مواطن ${edited(ctx.lessor.nationalityAr)}، يحمل بطاقة هوية إماراتية رقم ${ltr(ctx.lessor.eid)} (ويُشار إليه فيما بعد بـ "<strong>المؤجر</strong>").</p>`,
  )

  const lessee = prose(
    `<h3 class="bold underline">The Lessee:</h3>
     <p>${edited(ctx.lesseeCompany)}, a ${edited(ctx.legalForm)} licensed by the ${edited(ctx.issuingAuthority)} under Trade Licence No. ${ltr(ctx.licenseNo)}, represented by its authorized attorney <strong>Mr.</strong> ${edited(ctx.attorney.name)}, an ${edited(ctx.attorney.nationality)} national, holder of Emirates ID No. ${ltr(ctx.attorney.eid)}, acting under Special Power of Attorney No. ${ltr(ctx.poaNumber)} duly notarized by the ${edited(ctx.poaAuthority)} (hereinafter the "<strong>Lessee</strong>").</p>`,
    `<h3 class="bold underline">المستأجر:</h3>
     <p>${edited(ctx.lesseeCompanyAr)}، ${edited(ctx.legalFormAr)} مرخّصة من ${edited(ctx.issuingAuthorityAr)} بموجب الرخصة التجارية رقم ${ltr(ctx.licenseNo)}، يمثلها وكيلها المفوض <strong>السيد/</strong> ${edited(ctx.attorney.nameAr)}، ${edited(ctx.attorney.nationalityAr)} الجنسية، يحمل بطاقة هوية إماراتية رقم ${ltr(ctx.attorney.eid)}، ويتصرف بموجب الوكالة الخاصة رقم ${ltr(ctx.poaNumber)} الموثقة أصولاً لدى ${edited(ctx.poaAuthorityAr)} (ويُشار إليها فيما بعد بـ "<strong>المستأجر</strong>").</p>`,
  )

  const parties = prose(
    `<p>The Lessor and the Lessee are together the "<strong>Parties</strong>" and each a "<strong>Party</strong>". The Lessor lets, and the Lessee takes, the yard described below, on the terms of this Agreement.</p>`,
    `<p>يُشار إلى المؤجر والمستأجر مجتمعين بـ "<strong>الطرفين</strong>" ومنفردين بـ "<strong>الطرف</strong>". يؤجر المؤجر الساحة المبينة أدناه ويقبل المستأجر استئجارها، وفق أحكام هذا العقد.</p>`,
  )

  const art1 = article(
    'ARTICLE (1) — THE PROPERTY',
    'المادة (1) — العين المؤجرة',
    `<p>The property is the open yard (plot of land) situated at ${edited(ctx.propertyLocation)}, having an area of ${areaEn} (the "<strong>Property</strong>").</p>
     <p>The area is to be agreed and inserted by the Parties. Until a figure is written in the blank above, the Property is the yard the Parties identify at that location, and no other land is included. No building is included unless it already stands on that yard.</p>`,
    `<p>العين المؤجرة هي الساحة المكشوفة (قطعة الأرض) الواقعة في ${edited(ctx.propertyLocationAr)}، ومساحتها ${areaAr} ("<strong>العين المؤجرة</strong>").</p>
     <p>تُتفق المساحة وتُدرج من الطرفين. وإلى أن يُكتب رقم في الفراغ أعلاه، تكون العين هي الساحة التي يعيّنها الطرفان في ذلك الموقع، ولا يشمل الإيجار أي أرض أخرى. ولا تدخل أي بناية إلا إذا كانت قائمة أصلاً على تلك الساحة.</p>`,
  )

  const art2 = article(
    'ARTICLE (2) — TERM',
    'المادة (2) — المدة',
    `<p>The term is one (1) year commencing on the date of execution of this Agreement and ending on the day before the first anniversary of that date (the "<strong>Term</strong>"), unless ended earlier under this Agreement. The commencement date is the date of execution.</p>`,
    `<p>مدة الإيجار سنة واحدة (1) تبدأ من تاريخ إبرام هذا العقد وتنتهي في اليوم السابق للذكرى السنوية الأولى لذلك التاريخ ("<strong>المدة</strong>")، ما لم تنتهِ قبل ذلك وفق هذا العقد. وتاريخ البدء هو تاريخ الإبرام.</p>`,
  )

  const art3 = article(
    'ARTICLE (3) — PERMITTED USE',
    'المادة (3) — الاستعمال المسموح به',
    `<p>The Lessee shall use the Property strictly and only for the following:</p>
     <p>(a) parking of commercial transport vehicles, heavy trucks and water tankers, including head trucks and water tank trailers;</p>
     <p>(b) mechanical works, routine maintenance and vehicle-related servicing; and</p>
     <p>(c) installation and use of temporary or permanent water storage tanks for fresh-water management in support of operational field services.</p>
     <p>No other use is permitted. Without limiting that restriction, the Lessee shall not use the Property for residence, for retail open to the public, or for the storage or handling of fuel or hazardous material except so far as is incidental to the servicing in paragraph (b) and is lawful. The Lessee shall not change the permitted use without the Lessor's prior written consent.</p>`,
    `<p>يلتزم المستأجر باستعمال العين المؤجرة حصراً وفيما يلي فقط:</p>
     <p>(أ) إيقاف مركبات النقل التجاري والشاحنات الثقيلة وصهاريج المياه، بما في ذلك رؤوس الشاحنات ومقطورات صهاريج المياه؛</p>
     <p>(ب) الأعمال الميكانيكية والصيانة الدورية والخدمات المتعلقة بالمركبات؛ و</p>
     <p>(ج) تركيب خزانات تخزين المياه المؤقتة أو الدائمة واستعمالها لإدارة المياه العذبة دعماً للخدمات الميدانية التشغيلية.</p>
     <p>ولا يُسمح بأي استعمال آخر. ومن غير إخلال بهذا القيد، لا يستعمل المستأجر العين للسكن، ولا للبيع بالتجزئة للجمهور، ولا لتخزين الوقود أو المواد الخطرة أو التعامل بها إلا بالقدر العرضي للخدمة المذكورة في الفقرة (ب) وبما يبيحه القانون. ولا يغيّر المستأجر الاستعمال المسموح به إلا بموافقة خطية مسبقة من المؤجر.</p>`,
  )

  const art4 = article(
    'ARTICLE (4) — RENT AND PAYMENT',
    'المادة (4) — الأجرة والسداد',
    `<p>The rent for the Term is AED ${aedFigure(ctx.rent)} (${ctx.rentWordsEn} UAE Dirhams), payable in two instalments as follows:</p>
     <p>(a) the first instalment of AED ${aedFigure(ctx.firstInstallment)} (${ctx.firstWordsEn} UAE Dirhams) is payable immediately upon signing, by direct bank transfer to the account the Lessor nominates in writing; and</p>
     <p>(b) the second instalment of AED ${aedFigure(ctx.secondInstallment)} (${ctx.secondWordsEn} UAE Dirhams) is payable by a post-dated cheque due six (6) months from the commencement of the Term. The cheque particulars shall be attached to this Agreement when the cheque is issued: Cheque No. ${chequeNo}, drawn on ${chequeBank}, dated ${chequeDate}.</p>
     <p>The rent does not include utilities or governmental charges. Each due date is of the essence.</p>`,
    `<p>أجرة المدة مبلغ ${aedFigure(ctx.rent)} درهم إماراتي (${ctx.rentWordsAr} درهم إماراتي)، تُدفع على قسطين على الوجه الآتي:</p>
     <p>(أ) القسط الأول وقدره ${aedFigure(ctx.firstInstallment)} درهم إماراتي (${ctx.firstWordsAr} درهم إماراتي) يُستحق فوراً عند التوقيع، ويُدفع بالتحويل المصرفي المباشر إلى الحساب الذي يسميه المؤجر كتابةً؛ و</p>
     <p>(ب) القسط الثاني وقدره ${aedFigure(ctx.secondInstallment)} درهم إماراتي (${ctx.secondWordsAr} درهم إماراتي) يُدفع بموجب شيك مؤجل الاستحقاق يحل بعد ستة (6) أشهر من بدء المدة. وتُرفق بيانات الشيك بهذا العقد عند إصداره: رقم الشيك ${chequeNo}، المسحوب على ${chequeBank}، المؤرخ ${chequeDate}.</p>
     <p>ولا تشمل الأجرة المرافق ولا الرسوم الحكومية. ويُعد كل ميعاد استحقاق جوهرياً.</p>`,
  )

  const art5 = article(
    'ARTICLE (5) — SECURITY DEPOSIT',
    'المادة (5) — مبلغ التأمين',
    `<p>On signing, the Lessee shall pay the Lessor a security deposit of ${deposit.en} (the "<strong>Deposit</strong>"). The amount is to be inserted by the Parties. The Deposit is security for the Lessee's obligations. It is not rent and it bears no interest.</p>
     <p>The Lessor may apply the Deposit against unpaid rent, the reasonable cost of remedying a breach, or the reasonable cost of reinstatement. Any balance shall be returned to the Lessee within fourteen (14) days after the Lessee has vacated and returned the Property in accordance with this Agreement.</p>`,
    `<p>يلتزم المستأجر عند التوقيع بأن يدفع للمؤجر مبلغ تأمين قدره ${deposit.ar} ("<strong>التأمين</strong>"). ويُدرج الطرفان هذا المبلغ. والتأمين ضمان لالتزامات المستأجر، وليس أجرة، ولا يُنتج فائدة.</p>
     <p>وللمؤجر أن يخصم من التأمين الأجرة غير المدفوعة أو الكلفة المعقولة لتدارك الإخلال أو الكلفة المعقولة لإعادة العين إلى أصلها. ويُرد الباقي إلى المستأجر خلال أربعة عشر (14) يوماً من إخلائه العين وإعادتها وفق هذا العقد.</p>`,
  )

  const art6 = article(
    'ARTICLE (6) — SITE PREPARATION AND FENCING',
    'المادة (6) — تهيئة الموقع والسياج',
    `<p>The Lessee shall, at its own cost, level and compact the ground with gatch fill within the plot, and shall install the main access gate.</p>
     <p>The Lessor shall, at its own cost, construct and secure the perimeter boundary fencing around the whole of the Property.</p>
     <p>Each Party shall carry out its own works within a reasonable time after commencement, in a proper and workmanlike manner, and shall obtain any permit required for those works. The fencing remains the property of the Lessor. The gate, and the Lessee's tanks and other installations, remain the property of the Lessee, subject to Article (12).</p>`,
    `<p>يلتزم المستأجر، على نفقته الخاصة، بتسوية الأرض ودكّها بردم الجاتش داخل حدود القطعة، وبتركيب بوابة الدخول الرئيسية.</p>
     <p>ويلتزم المؤجر، على نفقته الخاصة، بإنشاء سياج الحدود المحيط بكامل العين المؤجرة وتأمينه.</p>
     <p>وينفّذ كل طرف أعماله خلال مدة معقولة من بدء المدة، وبأصول الصنعة، ويستصدر أي تصريح لازم لتلك الأعمال. ويبقى السياج ملكاً للمؤجر. وتبقى البوابة وخزانات المستأجر ومنشآته الأخرى ملكاً للمستأجر، مع مراعاة المادة (12).</p>`,
  )

  const art7 = article(
    'ARTICLE (7) — UTILITIES AND SERVICE CHARGES',
    'المادة (7) — المرافق ورسوم الخدمات',
    `<p>The Lessee shall contract for, and pay when due, all electricity, water, sewage, telecommunications and other utilities consumed at the Property, and any service charge relating to its occupation. Where the supplier requires the account to be in the occupier's name, the Lessee shall take it in its own name.</p>
     <p>The Lessor is not liable for a supply interruption caused by the supplier. Any connection deposit paid by the Lessee belongs to the Lessee and shall be recovered by the Lessee from the supplier.</p>`,
    `<p>يلتزم المستأجر بالتعاقد على الكهرباء والماء والصرف الصحي والاتصالات وسائر المرافق المستهلكة في العين المؤجرة، وبسدادها في مواعيدها، وكذلك أي رسم خدمات متعلق بإشغاله. وإذا اشترط المزود أن يكون الحساب باسم الشاغل، فيُفتح باسم المستأجر.</p>
     <p>ولا يُسأل المؤجر عن انقطاع التزويد الراجع إلى المزود. وأي تأمين توصيل يدفعه المستأجر يكون ملكاً له، ويسترده المستأجر من المزود.</p>`,
  )

  const art8 = article(
    'ARTICLE (8) — MAINTENANCE AND REPAIR',
    'المادة (8) — الصيانة والإصلاح',
    `<p>The Lessee shall keep the Property, the gate it installs, the yard surface, and its own tanks, vehicles and installations in good and clean condition, fair wear and tear excepted, and shall repair damage caused by the Lessee or by its employees, contractors or visitors.</p>
     <p>The Lessor shall maintain the perimeter fencing which the Lessor constructs, except where the damage is caused by the Lessee. The Lessor is not obliged to provide any structure or service other than that fencing. Neither Party is responsible for a defect or for damage caused by the other Party's works.</p>`,
    `<p>يحافظ المستأجر على العين المؤجرة وعلى البوابة التي يركّبها وعلى سطح الساحة وعلى خزاناته ومركباته ومنشآته بحالة جيدة ونظيفة، باستثناء البلى الاستعمالي العادي، ويصلح الضرر الذي يسببه المستأجر أو تابعوه أو مقاولوه أو زواره.</p>
     <p>ويلتزم المؤجر بصيانة سياج الحدود الذي ينشئه، إلا إذا كان الضرر بفعل المستأجر. ولا يلتزم المؤجر بتقديم أي منشأة أو خدمة غير ذلك السياج. ولا يُسأل أي طرف عن عيب أو ضرر ناشئ عن أعمال الطرف الآخر.</p>`,
  )

  const art9 = article(
    'ARTICLE (9) — LAWS, PERMITS AND HSE',
    'المادة (9) — القوانين والتصاريح والصحة والسلامة والبيئة',
    `<p>The Lessee shall comply with the laws of the United Arab Emirates and of the Emirate of Abu Dhabi, and with the requirements of the municipality, Abu Dhabi Civil Defence, the environment and transport authorities, and any other competent authority. This includes permits for the permitted use, for water tanks, and for any workshop activity.</p>
     <p>The Lessee shall keep a safe workplace and shall keep emergency access clear. The Lessee shall store and handle fuel and any hazardous material only to the extent incidental to the permitted servicing, in suitable labelled containers, without discharge onto the ground, and in accordance with Civil Defence and environmental requirements. The Lessee shall not bring onto the Property any waste which applicable law prohibits.</p>
     <p>Obtaining the Lessee's operational permits is the Lessee's responsibility. The Lessor does not warrant that any particular permit will be granted. The Lessor shall not unreasonably refuse a signature which the authority requires from the landowner for a permit application limited to the permitted use.</p>`,
    `<p>يلتزم المستأجر بالتقيد بقوانين دولة الإمارات العربية المتحدة وقوانين إمارة أبوظبي، وبمتطلبات البلدية والدفاع المدني في أبوظبي وجهات البيئة والنقل وأي جهة مختصة أخرى. ويشمل ذلك التصاريح اللازمة للاستعمال المسموح به ولخزانات المياه ولأي نشاط ورشة.</p>
     <p>ويلتزم المستأجر بالمحافظة على موقع عمل آمن وبإبقاء مداخل الطوارئ سالكة. ولا يخزّن الوقود أو أي مادة خطرة ولا يتعامل بها إلا بالقدر العرضي للخدمة المسموح بها، وفي أوعية مناسبة معلَّمة، ومن دون تصريف إلى الأرض، ووفقاً لمتطلبات الدفاع المدني والبيئة. ولا يُدخل إلى العين المؤجرة أي نفاية يحظرها القانون الواجب التطبيق.</p>
     <p>واستصدار التصاريح التشغيلية للمستأجر مسؤولية المستأجر. ولا يضمن المؤجر منح أي تصريح بعينه. ولا يرفض المؤجر، من غير سبب معقول، التوقيع الذي تطلبه الجهة من مالك الأرض لطلب تصريح مقصور على الاستعمال المسموح به.</p>`,
  )

  const art10 = article(
    'ARTICLE (10) — NO ASSIGNMENT OR SUBLETTING',
    'المادة (10) — حظر التنازل والتأجير من الباطن',
    `<p>The Lessee shall not assign this Agreement, sublet the Property or any part of it, or part with possession of it, without the Lessor's prior written consent. Consent to one dealing is not consent to any later dealing. The Lessee remains liable for the obligations of this Agreement notwithstanding any permitted dealing. A dealing in breach of this Article has no effect against the Lessor.</p>`,
    `<p>لا يجوز للمستأجر التنازل عن هذا العقد، ولا التأجير من الباطن للعين المؤجرة أو أي جزء منها، ولا التخلي عن حيازتها، إلا بموافقة خطية مسبقة من المؤجر. والموافقة على تصرف واحد ليست موافقة على أي تصرف لاحق. ويبقى المستأجر مسؤولاً عن التزامات هذا العقد ولو أُذِن بالتصرف. وكل تصرف يقع خلافاً لهذه المادة لا يُعتد به في مواجهة المؤجر.</p>`,
  )

  const art11 = article(
    'ARTICLE (11) — INSURANCE, LIABILITY AND INDEMNITY',
    'المادة (11) — التأمين والمسؤولية والتعويض',
    `<p>Throughout the Term the Lessee shall maintain, at its own cost:</p>
     <p>(a) public liability insurance with a limit of not less than ${liability.en} for any one occurrence, the amount to be inserted by the Parties; and</p>
     <p>(b) insurance of the Lessee's vehicles, tanks, plant and other property on the Property.</p>
     <p>The Lessee shall indemnify the Lessor against claims, losses, damages and reasonable costs arising out of the Lessee's occupation or use of the Property, the Lessee's works, the Lessee's breach, or death, personal injury or damage to property caused by the Lessee or by its employees, contractors or visitors, except to the extent caused by the Lessor's wilful misconduct or negligence.</p>
     <p>The Lessor is not liable for theft of, or damage to, the Lessee's vehicles, tanks or goods, except to the extent caused by the Lessor's wilful misconduct or negligence. Nothing in this Agreement limits liability for death or personal injury caused by negligence, or for fraud.</p>`,
    `<p>يلتزم المستأجر طوال المدة بأن يُبقي على نفقته الخاصة:</p>
     <p>(أ) تأميناً من المسؤولية تجاه الغير بحد لا يقل عن ${liability.ar} عن الواقعة الواحدة، ويُدرج الطرفان هذا المبلغ؛ و</p>
     <p>(ب) تأميناً على مركبات المستأجر وخزاناته ومعداته وأمواله الأخرى الموجودة في العين المؤجرة.</p>
     <p>ويلتزم المستأجر بتعويض المؤجر عن المطالبات والخسائر والأضرار والتكاليف المعقولة الناشئة عن إشغال المستأجر للعين أو استعماله لها أو عن أعماله أو إخلاله، أو عن الوفاة أو الإصابة البدنية أو الضرر بالمال الذي يسببه المستأجر أو تابعوه أو مقاولوه أو زواره، إلا بالقدر الناشئ عن الخطأ العمدي أو الإهمال من جانب المؤجر.</p>
     <p>ولا يُسأل المؤجر عن سرقة مركبات المستأجر أو خزاناته أو بضائعه أو عن تلفها، إلا بالقدر الناشئ عن الخطأ العمدي أو الإهمال من جانب المؤجر. ولا يحدّ شيء في هذا العقد من المسؤولية عن الوفاة أو الإصابة البدنية الناشئة عن الإهمال، ولا عن الغش.</p>`,
  )

  const art12 = article(
    'ARTICLE (12) — RETURN OF THE PROPERTY',
    'المادة (12) — إعادة العين المؤجرة',
    `<p>On expiry or earlier ending of the Term, the Lessee shall quietly vacate and return the Property to the Lessor in its original condition, fair wear and tear excepted. The Lessee shall remove its tanks, installations, vehicles, plant and waste, and shall remove the gate if the Lessor so requires in writing, and shall make good damage caused by that removal.</p>
     <p>Anything of the Lessee's not removed within fourteen (14) days after vacation may be removed by the Lessor at the Lessee's reasonable cost. The Lessor's fencing stays in place.</p>`,
    `<p>عند انتهاء المدة أو انتهائها قبل أوانها، يُخلي المستأجر العين المؤجرة بهدوء ويعيدها إلى المؤجر بحالتها الأصلية، باستثناء البلى الاستعمالي العادي. ويزيل المستأجر خزاناته ومنشآته ومركباته ومعداته ونفاياته، ويزيل البوابة إذا طلب المؤجر ذلك كتابةً، ويصلح الضرر الناشئ عن الإزالة.</p>
     <p>وما لا يزيله المستأجر خلال أربعة عشر (14) يوماً من الإخلاء، يجوز للمؤجر إزالته على نفقة المستأجر المعقولة. ويبقى سياج المؤجر في مكانه.</p>`,
  )

  const art13 = article(
    'ARTICLE (13) — EARLY TERMINATION BY THE LESSOR',
    'المادة (13) — الإنهاء المبكر من المؤجر',
    `<p>If the Lessor requires the Lessee to vacate before the Term expires, for a reason other than the Lessee's breach, the Lessor shall give written notice stating the date on which the Lessee must vacate. The rent for the occupation shall then be calculated strictly pro rata, as the annual rent multiplied by the number of days from commencement up to and including that vacation date, divided by 365.</p>
     <p>The Lessor shall refund to the Lessee, immediately, the balance of rent actually paid which exceeds that pro-rata sum. Any post-dated cheque which is not yet due shall be returned to the Lessee uncashed, and shall not be presented for more than the pro-rata sum then remaining unpaid. The Deposit is dealt with under Article (5). This Article does not apply where the Agreement ends because of the Lessee's breach.</p>`,
    `<p>إذا اقتضى أمر المؤجر أن يُخلي المستأجر العين قبل انتهاء المدة، لسبب غير إخلال المستأجر، وجب على المؤجر أن يوجّه إخطاراً خطياً يبيّن فيه تاريخ الإخلاء. وتُحتسب عندئذٍ أجرة الإشغال بالتناسب الدقيق، وذلك بضرب الأجرة السنوية في عدد الأيام من تاريخ البدء حتى تاريخ الإخلاء دخولاً، وقسمة الحاصل على 365.</p>
     <p>ويرد المؤجر إلى المستأجر فوراً ما زاد من الأجرة المدفوعة فعلاً على ذلك المبلغ المتناسب. ويُعاد إلى المستأجر من غير صرف أي شيك مؤجل الاستحقاق لم يحل أجله، ولا يُقدَّم للشيك إلا في حدود ما بقي غير مدفوع من المبلغ المتناسب. ويُعامل التأمين وفق المادة (5). ولا تسري هذه المادة إذا انتهى العقد بسبب إخلال المستأجر.</p>`,
  )

  const art14 = article(
    'ARTICLE (14) — TERMINATION FOR BREACH',
    'المادة (14) — الإنهاء للإخلال',
    `<p>If a Party commits a material breach of this Agreement and does not remedy it within thirty (30) days after receiving written notice which specifies the breach and requires it to be remedied, the other Party may end this Agreement by a further written notice. Failure to pay an instalment of rent when due is a material breach.</p>
     <p>Ending the Agreement does not affect rights which have already accrued, including rent accrued to the date of ending and any indemnity. Where the Lessor ends the Agreement for the Lessee's breach, Article (13) does not apply. Rent paid for any period after that ending may be retained only to the extent of loss actually suffered, and any excess shall be refunded.</p>`,
    `<p>إذا أخل أحد الطرفين بهذا العقد إخلالاً جوهرياً ولم يتداركه خلال ثلاثين (30) يوماً من تسلمه إخطاراً خطياً يبيّن الإخلال ويطلب تداركه، جاز للطرف الآخر إنهاء العقد بإخطار خطي لاحق. ويُعد عدم سداد أي قسط من الأجرة في ميعاده إخلالاً جوهرياً.</p>
     <p>ولا يخل الإنهاء بالحقوق التي استحقت، بما في ذلك الأجرة المستحقة حتى تاريخ الإنهاء وأي تعويض. وإذا أنهى المؤجر العقد لإخلال المستأجر، فلا تسري المادة (13). ولا يجوز الاحتفاظ بالأجرة المدفوعة عن أي مدة لاحقة لذلك الإنهاء إلا في حدود الضرر المتحقق فعلاً، ويُرد ما زاد على ذلك.</p>`,
  )

  const art15 = article(
    'ARTICLE (15) — RENEWAL',
    'المادة (15) — التجديد',
    `<p>This Agreement may be renewed for a further term, or for further terms, only by written agreement of both Parties, on the rent and the other terms they then agree. There is no right of renewal and no renewal by silence or by holding over.</p>`,
    `<p>لا يُجدد هذا العقد لمدة لاحقة أو لمدد لاحقة إلا باتفاق خطي من الطرفين على الأجرة وسائر الشروط التي يتفقان عليها عندئذٍ. ولا ينشأ حق في التجديد، ولا يقع التجديد بالسكوت ولا بمجرد البقاء في العين.</p>`,
  )

  const art16 = article(
    'ARTICLE (16) — NOTICES',
    'المادة (16) — الإخطارات',
    `<p>A notice under this Agreement shall be in writing, in Arabic or in English, and shall be delivered by hand against acknowledgement, or by a recognised courier, or by email, to the address which the receiving Party has notified. Until a Party notifies a change, notices to the Lessor may be sent to the address on the Lessor's Emirates ID, and notices to the Lessee may be sent to its registered address in Abu Dhabi for the attention of Mr. ${esc(ctx.attorney.name)}.</p>
     <p>A notice is received on the day it is signed for, or on the next business day after dispatch by courier within the United Arab Emirates, or on the day of the email if sent on a business day before 5:00 p.m. UAE time (and otherwise on the next business day).</p>`,
    `<p>يكون كل إخطار بموجب هذا العقد مكتوباً بالعربية أو بالإنجليزية، ويُسلَّم باليد مقابل إقرار بالاستلام، أو بواسطة بريد معتمد، أو بالبريد الإلكتروني، إلى العنوان الذي بلّغه الطرف المرسل إليه. وإلى أن يبلّغ الطرف تغييراً لعنوانه، يجوز توجيه الإخطار إلى المؤجر على العنوان الثابت في بطاقة هويته الإماراتية، وإلى المستأجر على عنوانه المسجّل في أبوظبي لعناية السيد/ ${esc(ctx.attorney.nameAr)}.</p>
     <p>ويُعد الإخطار متسلَّماً في يوم التوقيع باستلامه، أو في يوم العمل التالي لإرساله بالبريد داخل دولة الإمارات العربية المتحدة، أو في يوم رسالة البريد الإلكتروني إذا أُرسلت في يوم عمل قبل الساعة الخامسة مساءً بتوقيت الدولة (وإلا ففي يوم العمل التالي).</p>`,
  )

  const art17 = article(
    'ARTICLE (17) — FORCE MAJEURE',
    'المادة (17) — القوة القاهرة',
    `<p>Neither Party is liable for a failure or delay caused by an event beyond its reasonable control, including natural disaster, war, epidemic, or an act of a public authority, provided that it notifies the other Party as soon as practicable and uses reasonable efforts to limit the effect.</p>
     <p>Rent is reduced only where, by reason of such an event, the Property is wholly unusable for more than fourteen (14) consecutive days, and only pro rata for the days of that unusability. Force majeure does not excuse payment of a sum already due, and it does not excuse the refund required by Article (13).</p>`,
    `<p>لا يُسأل أي طرف عن تخلف أو تأخر سببه حادث خارج عن سيطرته المعقولة، بما في ذلك الكارثة الطبيعية أو الحرب أو الوباء أو فعل السلطة العامة، بشرط أن يخطر الطرف الآخر في أقرب وقت ممكن عملياً وأن يبذل جهداً معقولاً للحد من الأثر.</p>
     <p>ولا تُخفَّض الأجرة إلا إذا أصبحت العين، بسبب ذلك الحادث، غير صالحة للاستعمال كلياً لأكثر من أربعة عشر (14) يوماً متتالية، ولا تُخفَّض إلا بالتناسب عن أيام عدم الصلاحية. ولا تُعفي القوة القاهرة من سداد مبلغ استحق، ولا من الرد الذي توجبه المادة (13).</p>`,
  )

  const art18 = article(
    'ARTICLE (18) — ENTIRE AGREEMENT AND AMENDMENTS',
    'المادة (18) — كامل الاتفاق والتعديل',
    `<p>This Agreement, together with any schedule of cheque particulars attached when the cheque is issued, is the entire agreement between the Parties on its subject and replaces all earlier negotiations and representations on that subject. An amendment is valid only if it is in writing and signed by both Parties. A failure or delay in enforcing a right is not a waiver of it. If any provision is held to be unenforceable, the remaining provisions continue in force.</p>`,
    `<p>يشكّل هذا العقد، مع أي ملحق ببيانات الشيك يُرفق عند إصدار الشيك، كامل الاتفاق بين الطرفين في موضوعه، ويحل محل جميع المفاوضات والإقرارات السابقة في ذلك الموضوع. ولا يصح أي تعديل إلا إذا كان مكتوباً وموقعاً من الطرفين. ولا يُعد التخلف عن استعمال حق أو التأخر فيه تنازلاً عنه. وإذا قُضي بعدم نفاذ نص، بقيت النصوص الأخرى نافذة.</p>`,
  )

  const art19 = article(
    'ARTICLE (19) — GOVERNING LAW AND JURISDICTION',
    'المادة (19) — القانون الواجب التطبيق والاختصاص',
    `<p>This Agreement is governed by the laws of the United Arab Emirates and by the laws of the Emirate of Abu Dhabi. The courts of the Emirate of Abu Dhabi have jurisdiction over any dispute arising out of or in connection with this Agreement. This does not exclude any mandatory rule of law.</p>`,
    `<p>يخضع هذا العقد لقوانين دولة الإمارات العربية المتحدة ولقوانين إمارة أبوظبي. وتختص محاكم إمارة أبوظبي بنظر أي نزاع ينشأ عن هذا العقد أو يتصل به. ولا يُستبعد بذلك أي قاعدة آمرة.</p>`,
  )

  const art20 = article(
    'ARTICLE (20) — REGISTRATION',
    'المادة (20) — التسجيل',
    `<p>Where the applicable law or the competent authority so requires, the Parties shall register this Agreement with Tawtheeq or with the other authority competent in the Emirate of Abu Dhabi. Each Party shall sign the documents reasonably required for that registration. Unless the authority directs otherwise, the official registration fees shall be borne equally by the Parties.</p>`,
    `<p>متى أوجب القانون الواجب التطبيق أو الجهة المختصة تسجيل هذا العقد، التزم الطرفان بتسجيله لدى نظام توثيق أو لدى الجهة الأخرى المختصة في إمارة أبوظبي. ويوقّع كل طرف المستندات المطلوبة بصورة معقولة لذلك التسجيل. وما لم توجّه الجهة خلاف ذلك، يتحمل الطرفان رسوم التسجيل الرسمية مناصفة.</p>`,
  )

  const art21 = article(
    'ARTICLE (21) — ORIGINALS',
    'المادة (21) — النسخ الأصلية',
    `<p>This Agreement is executed in two (2) original counterparts, one for the Lessor and one for the Lessee, and each counterpart is equally authentic. The English text and the Arabic text are of equal authority and shall be read together.</p>`,
    `<p>حُرر هذا العقد من نسختين (2) أصليتين، نسخة للمؤجر ونسخة للمستأجر، ولكل نسخة الحجية ذاتها. وللنص الإنجليزي والنص العربي الحجية ذاتها، ويُقرآن معاً.</p>`,
  )

  const witness = prose(
    `<p>IN WITNESS WHEREOF the Parties have signed this Agreement on the date first written above.</p>`,
    `<p>وإثباتاً لما تقدم، وقّع الطرفان هذا العقد في التاريخ المبيّن في صدره.</p>`,
  )

  const signatures = `
    <div class="lease-signatures">
      ${signatureCards([
        {
          roleEn: 'The Lessor',
          roleAr: 'المؤجر',
          nameEn: `Mr. ${ctx.lessor.name}`,
          nameAr: `السيد/ ${ctx.lessor.nameAr}`,
          extraLines: [
            {
              en: `Emirates ID No. <span class="ltr-num" dir="ltr">${esc(ctx.lessor.eid)}</span>`,
              ar: `بطاقة هوية إماراتية رقم <span class="ltr-num" dir="ltr">${esc(ctx.lessor.eid)}</span>`,
            },
          ],
          dateLabel: true,
        },
        {
          roleEn: 'The Lessee',
          roleAr: 'المستأجر',
          nameEn: ctx.lesseeCompany,
          nameAr: ctx.lesseeCompanyAr,
          extraLines: [
            {
              en: `Through its authorized attorney, Mr. ${esc(ctx.attorney.name)}`,
              ar: `بواسطة وكيلها المفوض، السيد/ ${esc(ctx.attorney.nameAr)}`,
            },
            {
              en: `Special Power of Attorney No. <span class="ltr-num" dir="ltr">${esc(ctx.poaNumber)}</span>`,
              ar: `وكالة خاصة رقم <span class="ltr-num" dir="ltr">${esc(ctx.poaNumber)}</span>`,
            },
          ],
          dateLabel: true,
        },
      ])}
    </div>`

  const header = `
    <div class="bilingual-header">
      <div class="header-left">
        <h1>Yard Lease Agreement</h1>
        <h2>Open Yard — Liwa, Al Dhafra</h2>
        <h3>(<span class="edited">${esc(ctx.lesseeCompany)}</span>)</h3>
      </div>
      <div class="header-right">
        <h1>عقد إيجار ساحة</h1>
        <h2>ساحة مكشوفة — ليوا، الظفرة</h2>
        <h3>(<span class="edited">${esc(ctx.lesseeCompanyAr)}</span>)</h3>
      </div>
    </div>
    <div class="law-reference">
      <div class="law-left">
        (IN ACCORDANCE WITH THE CIVIL TRANSACTIONS LAW OF THE UNITED ARAB EMIRATES AND THE LAWS APPLICABLE IN THE EMIRATE OF ABU DHABI)
      </div>
      <div class="law-right">
        (وفقاً لأحكام قانون المعاملات المدنية لدولة الإمارات العربية المتحدة والقوانين السارية في إمارة أبوظبي)
      </div>
    </div>`

  return [
    header + intro + lessor + lessee + parties,
    art1 + art2 + art3,
    art4 + art5,
    art6 + art7 + art8,
    art9 + art10,
    art11 + art12,
    art13 + art14 + art15,
    art16 + art17,
    art18 + art19 + art20,
    art21 + witness + signatures,
  ]
}

function leaseStyles(settings?: FontSettings): string {
  const arabic = settings?.arabicFont || 'Arabic Transparent'
  const english = settings?.englishFont || 'Noto Sans'
  return `
    ${generateMoaStyles(settings)}
    .yard-lease .article-pair > .block:not(.rtl),
    .yard-lease .header-left,
    .yard-lease .law-left {
      font-family: '${english}', 'Liberation Sans', sans-serif;
    }
    .yard-lease .article-pair > .block.rtl,
    .yard-lease .header-right,
    .yard-lease .law-right,
    .yard-lease .page-footer .footer-center,
    .yard-lease .page-footer .footer-right {
      font-family: '${arabic}', 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
    }
    .ltr-num {
      direction: ltr;
      unicode-bidi: isolate;
      white-space: nowrap;
    }
    .article-pair.tight p { margin-bottom: 3px; }
    .lease-signatures { margin-top: 4mm; }
    .page.no-footer .page-content {
      height: calc(297mm - 8mm);
      max-height: calc(297mm - 8mm);
    }
    @media print {
      .page.no-footer .page-content {
        height: calc(297mm - 8mm) !important;
        max-height: calc(297mm - 8mm) !important;
      }
    }
  `
}

export function generateYardLease(ctx: YardLeaseContext, settings?: FontSettings): string {
  const bodies = buildPages(ctx)
  const totalPages = bodies.length
  const last = totalPages - 1
  const pages = bodies
    .map((body, index) => sheet(body, index + 1, totalPages, index !== last))
    .join('\n')

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Yard Lease Agreement - ${esc(ctx.lesseeCompany)}</title>
        <style>${leaseStyles(settings)}</style>
      </head>
      <body>
        <div class="doc yard-lease">
          ${pages}
        </div>
      </body>
    </html>
  `
}
