import { AdSpcFoundingMoaData } from './types'
import { adSpcFoundingStyles } from './styles'

function aed(n: number): string {
  return n.toLocaleString('en-US')
}

/** Keep passport numbers, dates and Latin names in order inside Arabic text. */
function L(value: string): string {
  return `<bdi class="ltr">${value}</bdi>`
}

function pair(en: string, ar: string): string {
  return `
      <div class="article-pair">
        <div class="block">${en}</div>
        <div class="block rtl">${ar}</div>
      </div>`
}

function page(num: number, total: number, inner: string, last = false): string {
  return `
    <div class="page${last ? ' last' : ''}">
      <div class="page-content">
        ${inner}
      </div>
      <div class="page-footer">${num} / ${total}</div>
    </div>`
}

function signatureCard(d: AdSpcFoundingMoaData): string {
  const o = d.owner
  return `
      <div class="signature-card-wrap">
        <div class="signature-card">
          <p><strong>Sole Owner and Manager</strong> <span style="color:#64748b;margin:0 6px;">|</span> <strong class="ar">المالك الوحيد والمدير</strong></p>
          <p><span class="edited">Mr. ${o.nameEn}</span></p>
          <p class="ar"><span class="edited">السيد ${o.nameAr}</span></p>
          <p>Emirates ID: <span class="edited">${L(o.eid)}</span> &nbsp;&nbsp; DOB: <span class="edited">${L(o.dob)}</span></p>
          <p class="ar">الهوية الإماراتية: <span class="edited">${L(o.eid)}</span> &nbsp;&nbsp; تاريخ الميلاد: <span class="edited">${L(o.dob)}</span></p>
          <div class="sign-space"></div>
          <div class="sign-line"></div>
          <p><strong>Signature</strong> <span style="color:#64748b;margin:0 6px;">|</span> <strong class="ar">التوقيع</strong></p>
        </div>
      </div>`
}

export function generateAdSpcFoundingMoaHtml(data: AdSpcFoundingMoaData): string {
  const o = data.owner
  const actsEn = data.activities.map((a) => `<li><span class="edited">${L(a.code)}</span> ${a.en}</li>`).join('')
  const actsAr = data.activities.map((a) => `<li><span class="edited">${L(a.code)}</span> ${a.ar}</li>`).join('')
  const total = 8

  const header = `
      <div class="bilingual-header">
        <div class="header-left">
          <h1>Memorandum of Association</h1>
          <h2>${data.legalFormEn}</h2>
          <h3>(<span class="edited">${data.tradeNameEn}</span>)</h3>
        </div>
        <div class="header-right">
          <h1>عقد تأسيس</h1>
          <h2>${data.legalFormAr}</h2>
          <h3>(<span class="edited">${data.tradeNameAr}</span>)</h3>
        </div>
      </div>
      <div class="law-reference">
        <div class="law-left">IN ACCORDANCE WITH FEDERAL DECREE-LAW NO. (32) OF 2021 ON COMMERCIAL COMPANIES AND THE LAWS REGULATING ECONOMIC ACTIVITIES IN THE EMIRATE OF ABU DHABI</div>
        <div class="law-right">وفقاً لأحكام المرسوم بقانون اتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية والقوانين المنظمة للأنشطة الاقتصادية في إمارة أبوظبي</div>
      </div>`

  const p1 = page(1, total, `
      ${header}
      ${pair(
        `<h3>Preamble</h3>
         <p>This Memorandum of Association of a <span class="edited">${data.legalFormEn}</span> has been made on <span class="edited">${L(data.contractDate)}</span> in the Emirate of ${data.emirateEn}.</p>
         <p><strong>Legal form:</strong> <span class="edited">${data.legalFormEn}</span></p>
         <p><strong>Trade name:</strong> <span class="edited">${data.tradeNameEn}</span></p>
         <p><strong>Trade name reservation:</strong> Transaction No. <span class="edited">${L(data.transactionNo)}</span>, Economic Registry No. <span class="edited">${L(data.economicRegistryNo)}</span>, issued on <span class="edited">${L(data.reservationDate)}</span> by the <span class="edited">${data.authorityEn}</span>.</p>
         <p><strong>Sole owner and Manager:</strong> Mr. <span class="edited">${o.nameEn}</span>, <span class="edited">${o.nationalityEn}</span> national, holder of Passport No. <span class="edited">${L(o.passport)}</span>, Emirates ID No. <span class="edited">${L(o.eid)}</span>, date of birth <span class="edited">${L(o.dob)}</span>, resident in <span class="edited">${o.residenceEn}</span>.</p>
         <p><span class="edited">${data.addressEn}</span></p>`,
        `<h3>مقدمة</h3>
         <p>حُرر عقد التأسيس هذا لـ<span class="edited">${data.legalFormAr}</span> في يوم <span class="edited">${L(data.contractDate)}</span> في إمارة ${data.emirateAr}.</p>
         <p><strong>الشكل القانوني:</strong> <span class="edited">${data.legalFormAr}</span></p>
         <p><strong>الاسم التجاري:</strong> <span class="edited">${data.tradeNameAr}</span></p>
         <p><strong>حجز الاسم التجاري:</strong> رقم المعاملة <span class="edited">${L(data.transactionNo)}</span>، رقم السجل الاقتصادي <span class="edited">${L(data.economicRegistryNo)}</span>، الصادر بتاريخ <span class="edited">${L(data.reservationDate)}</span> عن <span class="edited">${data.authorityAr}</span>.</p>
         <p><strong>المالك الوحيد والمدير:</strong> السيد <span class="edited">${o.nameAr}</span>، <span class="edited">${o.nationalityAr}</span> الجنسية، ويحمل جواز سفر رقم <span class="edited">${L(o.passport)}</span>، ورقم الهوية الإماراتية <span class="edited">${L(o.eid)}</span>، تاريخ الميلاد <span class="edited">${L(o.dob)}</span>، مقيم في <span class="edited">${o.residenceAr}</span>.</p>
         <p><span class="edited">${data.addressAr}</span></p>`
      )}
      ${pair(
        `<h3>ARTICLE (1): PREAMBLE</h3>
         <p>The above-named owner, being of full legal capacity to contract, has agreed to establish a <span class="edited">${data.legalFormEn}</span> in the Emirate of ${data.emirateEn}, in accordance with the provisions of the Commercial Companies Federal Decree-Law No. (32) of 2021 and the laws regulating economic activities in the Emirate of ${data.emirateEn} and the laws issued in amendment thereof.</p>`,
        `<h3>المادة (1): مقدمة العقد</h3>
         <p>اتفق المالك المذكور أعلاه، وهو بكامل الأهلية القانونية للتعاقد، على تأسيس <span class="edited">${data.legalFormAr}</span> في إمارة ${data.emirateAr}، وفقاً لأحكام المرسوم بقانون اتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية والقوانين المنظمة للأنشطة الاقتصادية في إمارة ${data.emirateAr} والقوانين الصادرة تعديلاً لها.</p>`
      )}
  `)

  const p2 = page(2, total, `
      ${pair(
        `<h3>ARTICLE (2): THE OWNER / FOUNDER</h3>
         <p>The founder and sole owner of the capital of the Company is:</p>
         <ul>
           <li>Mr. <span class="edited">${o.nameEn}</span>, <span class="edited">${o.nationalityEn}</span> national, holder of Passport No. <span class="edited">${L(o.passport)}</span>, Emirates ID No. <span class="edited">${L(o.eid)}</span>, date of birth <span class="edited">${L(o.dob)}</span>, resident in <span class="edited">${o.residenceEn}</span>.</li>
         </ul>
         <p><span class="edited">${data.addressEn}</span></p>`,
        `<h3>المادة (2): المالك / المؤسس</h3>
         <p>المؤسس والمالك الوحيد لرأس مال الشركة هو:</p>
         <ul>
           <li>السيد <span class="edited">${o.nameAr}</span>، <span class="edited">${o.nationalityAr}</span> الجنسية، ويحمل جواز سفر رقم <span class="edited">${L(o.passport)}</span>، ورقم الهوية الإماراتية <span class="edited">${L(o.eid)}</span>، تاريخ الميلاد <span class="edited">${L(o.dob)}</span>، مقيم في <span class="edited">${o.residenceAr}</span>.</li>
         </ul>
         <p><span class="edited">${data.addressAr}</span></p>`
      )}
      ${pair(
        `<h3>ARTICLE (3): NAME OF THE COMPANY</h3>
         <p>The name of the Company shall be <span class="edited">${data.tradeNameEn}</span>, reserved under Transaction No. <span class="edited">${L(data.transactionNo)}</span>, Economic Registry No. <span class="edited">${L(data.economicRegistryNo)}</span>, issued on <span class="edited">${L(data.reservationDate)}</span> by the <span class="edited">${data.authorityEn}</span>.</p>`,
        `<h3>المادة (3): اسم الشركة</h3>
         <p>اسم الشركة هو <span class="edited">${data.tradeNameAr}</span>، والمحجوز بموجب رقم المعاملة <span class="edited">${L(data.transactionNo)}</span>، ورقم السجل الاقتصادي <span class="edited">${L(data.economicRegistryNo)}</span>، الصادر بتاريخ <span class="edited">${L(data.reservationDate)}</span> عن <span class="edited">${data.authorityAr}</span>.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (4): OBJECT OF THE COMPANY</h3>
         <p>Objects of the Company are:</p>
         <ul>${actsEn}</ul>
         <p>which shall include carrying on all activities as are related or ancillary thereto upon approval of the Department of Economic Development - Abu Dhabi.</p>`,
        `<h3>المادة (4): أغراض الشركة</h3>
         <p>أغراض الشركة هي:</p>
         <ul>${actsAr}</ul>
         <p>وتشمل مزاولة كافة الأنشطة المتعلقة بهذه الأغراض أو المتصلة بها وذلك بعد الحصول على موافقة دائرة التنمية الاقتصادية - أبوظبي.</p>`
      )}
  `)

  const p3 = page(3, total, `
      ${pair(
        `<h3>ARTICLE (5): THE COMPANY ADDRESS &amp; THE HEAD OFFICE</h3>
         <p>The company address and the head office shall be in the Emirate of ${data.emirateEn}.</p>
         <p><span class="edited">${data.addressEn}</span></p>
         <p>It shall be permissible for the Company to establish branches, offices and/or agencies in the United Arab Emirates and abroad.</p>`,
        `<h3>المادة (5): عنوان الشركة ومركزها الرئيسي</h3>
         <p>يكون عنوان الشركة ومركزها الرئيسي في إمارة ${data.emirateAr}.</p>
         <p><span class="edited">${data.addressAr}</span></p>
         <p>ويجوز للشركة أن تنشئ لها فروعاً أو مكاتب أو توكيلات داخل الدولة وخارجها.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (6): DURATION OF THE COMPANY</h3>
         <p>The duration of the company shall be (10) ten years, commencing on the date of the registration of the Company in the Commercial Register, and shall be automatically renewed for a similar period thereafter unless the owner of the company share capital determines otherwise.</p>`,
        `<h3>المادة (6): مدة الشركة</h3>
         <p>تكون مدة الشركة (10) عشر سنوات ميلادية تبدأ من تاريخ قيد الشركة في السجل التجاري، وتجدد تلقائياً لفترات مماثلة فيما بعد ما لم يقرر مالك رأس مال الشركة خلاف ذلك.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (7): THE SHARE CAPITAL OF THE COMPANY</h3>
         <p>The capital of the Company amounts to Dirhams (AED <span class="edited">${L(aed(data.capitalAed))}</span>) (<span class="edited">${data.capitalWordsEn}</span>) only, divided into (<span class="edited">${L(String(data.shareCount))}</span>) shares in cash, the value of each share being Dirhams (AED <span class="edited">${L(aed(data.shareValueAed))}</span>) (<span class="edited">${data.shareValueWordsEn}</span>), and all shares are in cash, held by the Company Capital Owner as follows:</p>
         <ul>
           <li>Mr. <span class="edited">${o.nameEn}</span>, (<span class="edited">${L(String(data.shareCount))}</span>) shares, amounting to (AED <span class="edited">${L(aed(data.capitalAed))}</span>) (<span class="edited">${data.capitalWordsEn}</span>), which represent (100%) of the share capital.</li>
         </ul>
         <p>The value of the shares has been fully paid up in cash, and has been deposited in the bank account of the Company.</p>`,
        `<h3>المادة (7): رأس المال</h3>
         <p>حدد رأس مال الشركة بمبلغ (<span class="edited">${L(aed(data.capitalAed))}</span>) <span class="edited">${data.capitalWordsAr}</span> فقط، موزعة على (<span class="edited">${L(String(data.shareCount))}</span>) حصة نقدية، قيمة كل حصة (<span class="edited">${L(aed(data.shareValueAed))}</span>) <span class="edited">${data.shareValueWordsAr}</span>، وجميعها حصص نقدية مملوكة لمالك رأس المال على النحو التالي:</p>
         <ul>
           <li>السيد <span class="edited">${o.nameAr}</span>، (<span class="edited">${L(String(data.shareCount))}</span>) حصة بقيمة (<span class="edited">${L(aed(data.capitalAed))}</span>) <span class="edited">${data.capitalWordsAr}</span> بنسبة (100%) من رأس المال.</li>
         </ul>
         <p>إن قيمة الحصص النقدية قد دفعت بالكامل وقد تم إيداعها في حساب الشركة لدى المصرف.</p>`
      )}
  `)

  const p4 = page(4, total, `
      ${pair(
        `<h3>ARTICLE (8): MANAGEMENT OF THE COMPANY</h3>
         <p>The management of the company shall be entrusted to:</p>
         <ul><li>Mr. <span class="edited">${o.nameEn}</span></li></ul>
         <p><strong>The Director’s Powers Related to Banking Transactions:</strong></p>
         <p>To:</p>
         <ul><li><span class="edited">${o.nameEn}</span> (Manager)</li></ul>
         <p>individually can open and close bank accounts in the name of the company and to operate such bank accounts and sign cheques.</p>
         <p>To:</p>
         <ul><li><span class="edited">${o.nameEn}</span> (Manager)</li></ul>
         <p>individually borrow on behalf of the Company and to sign withdrawal instruments, credit instruments, guarantees and any required documents in relation to bank facilities under the Company’s guarantee.</p>`,
        `<h3>المادة (8): إدارة الشركة</h3>
         <p>يتولى إدارة الشركة:</p>
         <ul><li>السيد <span class="edited">${o.nameAr}</span></li></ul>
         <p><strong>الصلاحيات البنكية:</strong></p>
         <p>أن يقوم:</p>
         <ul><li><span class="edited">${o.nameAr}</span> (مدير)</li></ul>
         <p>منفرداً بفتح وإقفال الحسابات البنكية باسم الشركة وأن يقوم بتشغيل وإدارة هذه الحسابات وتوقيع الشيكات.</p>
         <p>أن يقوم:</p>
         <ul><li><span class="edited">${o.nameAr}</span> (مدير)</li></ul>
         <p>منفرداً بالاقتراض نيابة عن الشركة والتوقيع على محررات السحب أو محررات الائتمان والضمانات والمستندات الأخرى المطلوبة بشأن التسهيلات البنكية بضمان الشركة.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (9): FINANCIAL MANAGEMENT</h3>
         <p>The company’s director(s) shall prepare the company’s balance sheet and the profit and loss account. They shall also prepare an annual report of the company’s activities, its financial position and shall submit the distribution of profits proposals to the general assembly. All the above should be completed within three months from the end of the company’s financial year.</p>
         <p>The balance sheet and the profit and loss account shall be submitted to the annual general assembly for approval.</p>`,
        `<h3>المادة (9): الإدارة المالية</h3>
         <p>يتولى مدير/مديرو الشركة إعداد الميزانية السنوية وحساب الأرباح والخسائر. كما يقومون بإعداد تقرير سنوي عن نشاط الشركة ووضعها المالي ويقدمون اقتراحاتهم بشأن توزيع الأرباح للجمعية العمومية، وذلك خلال ثلاثة أشهر من تاريخ انتهاء السنة المالية.</p>
         <p>يجب تقديم الميزانية وحساب الأرباح والخسائر إلى الجمعية العمومية السنوية لاعتمادها.</p>`
      )}
  `)

  const p5 = page(5, total, `
      ${pair(
        `<h3>ARTICLE (10): THE RESOLUTIONS OF THE COMPANY OWNER</h3>
         <p>The company owner shall:</p>
         <ul>
           <li>Review the report of the director(s) on the company’s activities and financial position during the past year and the auditors’ report.</li>
           <li>Discuss and ratify the balance sheet and profit and loss account.</li>
           <li>Amend the company memorandum of association.</li>
           <li>Dissolve and liquidate the company.</li>
           <li>Amalgamate or transfer the company.</li>
           <li>Increase or decrease the company share capital.</li>
           <li>Appoint or dismiss the director(s) / the company board of directors, if any, restrict their powers and determine their remuneration.</li>
           <li>Appoint or dismiss one or more auditors and determine their remuneration.</li>
           <li>Appoint the members of the internal Sharia board of supervision and the Sharia supervisor, if any.</li>
           <li>Any other matter within its competence in accordance with the provisions of the Commercial Companies Law or this Memorandum.</li>
         </ul>`,
        `<h3>المادة (10): قرارات مالك رأس مال الشركة</h3>
         <p>يختص مالك الشركة بالأمور التالية:</p>
         <ul>
           <li>سماع تقرير المدير/المديرين عن نشاط الشركة ومركزها المالي خلال السنة المالية المنتهية وتقرير مدقق الحسابات.</li>
           <li>مناقشة الميزانية العمومية وحساب الأرباح والخسائر والتصديق عليهما.</li>
           <li>تعديل عقد تأسيس الشركة.</li>
           <li>حل الشركة وتصفيتها.</li>
           <li>اندماج الشركة أو تحويلها.</li>
           <li>زيادة رأس مال الشركة أو تخفيضه.</li>
           <li>تعيين أو عزل مدير/مجلس مديري الشركة (إن وجد)، أو تقييد سلطاتهم وتحديد مكافآتهم.</li>
           <li>تعيين مدقق حسابات أو أكثر أو عزلهم وتحديد مكافآتهم.</li>
           <li>تعيين أعضاء لجنة الرقابة الشرعية الداخلية والمراقب الشرعي (إن وجد).</li>
           <li>أية مسائل أخرى تدخل ضمن اختصاصه بموجب أحكام قانون الشركات التجارية أو هذا العقد.</li>
         </ul>`
      )}
  `)

  const p6 = page(6, total, `
      ${pair(
        `<h3>ARTICLE (11): THE FINANCIAL YEAR</h3>
         <p>The financial year of the company shall commence on 1st January and shall end on 31st December of each year, with the exception of the first financial year, which shall commence on the date of the registration of the company in the Commercial Register and end on 31st December of the same year. The first financial year of the company may not exceed eighteen (18) months and shall not be less than six (6) months.</p>`,
        `<h3>المادة (11): السنة المالية</h3>
         <p>تبدأ السنة المالية للشركة في اليوم الأول من شهر يناير وتنتهي في 31 ديسمبر من كل سنة، ما عدا السنة المالية الأولى والتي تبدأ من تاريخ تسجيل الشركة في السجل التجاري وتنتهي في الحادي والثلاثين من ديسمبر من نفس السنة، على ألا تجاوز السنة المالية الأولى للشركة (18) ثمانية عشر شهراً وألا تقل عن (6) ستة أشهر.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (12): PROFITS AND LOSSES</h3>
         <p>The Company shall allocate 10% of its net profits each year to create a statutory reserve. The company Partners may resolve to discontinue the allocation of net profits when the reserve reaches half of the capital. The company Partners may allocate additional reserves as it is seen fit.</p>
         <p>The company owner shall be entitled to the profits and the losses.</p>
         <p>The company owner shall only be liable for the Company’s obligations to the extent of the company capital share amount.</p>`,
        `<h3>المادة (12): الأرباح والخسائر</h3>
         <p>يتم تخصيص نسبة 10% من صافي أرباح الشركة كل سنة لتكوين احتياطي قانوني. ويجوز للشركاء أن يقرروا وقف هذا التخصيص إذا بلغ الاحتياطي نصف رأس المال. كما يجوز للشركاء تخصيص احتياطيات إضافية حسب ما يراه مناسباً.</p>
         <p>يحق لمالك الشركة الحصول على الأرباح والخسائر.</p>
         <p>لا يُسأل مالك الشركة عن التزاماتها إلا بمقدار رأس مال الشركة.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (13): THE COMPANY AUDITOR</h3>
         <p>The Company shall have one or more auditors licensed to practise in the Emirate of ${data.emirateEn}, to be selected by the owner at the general assembly every year. The auditor(s) shall be subject to the same provisions concerning auditors of public joint stock companies.</p>`,
        `<h3>المادة (13): مدقق حسابات الشركة</h3>
         <p>يكون للشركة مدقق حسابات أو أكثر من المرخص لهم بالعمل في إمارة ${data.emirateAr}، يعينهم المالك في الجمعية العمومية كل سنة. وتسري في شأنهم الأحكام الخاصة بمدققي الحسابات في شركات المساهمة العامة.</p>`
      )}
  `)

  const p7 = page(7, total, `
      ${pair(
        `<h3>ARTICLE (14): DISSOLUTION OF THE COMPANY</h3>
         <p>The company shall be dissolved for any of the following reasons:</p>
         <ul>
           <li>Expiry of the period specified in this memorandum unless this period is renewed in accordance with the rules set out in the company’s contract.</li>
           <li>Fulfillment of the objects for which the company was established.</li>
           <li>Amalgamation of the company in accordance with the Commercial Companies Law.</li>
           <li>Resolution of the owner of the company share capital to terminate the duration of the company.</li>
           <li>The depletion of all or most of the assets of the company making beneficial investment of the remainder of the assets, if any, impracticable.</li>
           <li>Rendering a decision from the Court to dissolve the company.</li>
           <li>Death of the natural person; however, the heirs may wish to maintain the company after adjusting its status in alignment with the provisions of the Commercial Companies Law within six months from the date of death.</li>
           <li>Expiry of the legal entity that established the company.</li>
         </ul>`,
        `<h3>المادة (14): حل الشركة</h3>
         <p>تحل الشركة لأي من الأسباب التالية:</p>
         <ul>
           <li>انتهاء المدة المحددة في العقد ما لم تُجدد المدة طبقاً للقواعد الواردة بعقد الشركة.</li>
           <li>انتهاء الغرض الذي أُسست الشركة من أجله.</li>
           <li>الاندماج وفقاً لأحكام قانون الشركات التجارية.</li>
           <li>قرار من المالك لرأس مال الشركة بإنهاء مدتها.</li>
           <li>هلاك جميع أموال الشركة أو معظمها بحيث يتعذر استثمار الباقي استثماراً مجدياً.</li>
           <li>صدور حكم قضائي بحل الشركة.</li>
           <li>وفاة الشخص الطبيعي، إلا إذا رغب الورثة في استمرارها مع توفيق وضعها وفقاً لأحكام قانون الشركات التجارية وذلك خلال ستة أشهر على الأكثر من تاريخ الوفاة.</li>
           <li>انقضاء الشخص الاعتباري المؤسس لها.</li>
         </ul>`
      )}
      ${pair(
        `<h3>ARTICLE (15): LIQUIDATION OF THE COMPANY</h3>
         <p>One or more liquidators shall be appointed by the company owner, and the liquidation of the company shall follow the provisions of the Commercial Companies Law. A liquidator shall not be acting as the company accounts auditor at present, or have audited its accounts during the five years preceding the appointment.</p>`,
        `<h3>المادة (15): تصفية الشركة</h3>
         <p>يقوم مالك الشركة بتعيين مصفٍ أو أكثر، ويُتبع في تصفية الشركة الأحكام الواردة في قانون الشركات التجارية، على ألا يكون المصفي مدققاً حالياً لحسابات الشركة، أو سبق له تدقيق حساباتها خلال الخمس سنوات السابقة على التعيين.</p>`
      )}
  `)

  const p8 = page(8, total, `
      ${pair(
        `<h3>ARTICLE (16): NOTICES</h3>
         <p>Notices from the company to the company owner shall be made by registered letters to the address of the company owner as indicated in this contract.</p>
         <p><span class="edited">${data.addressEn}</span></p>`,
        `<h3>المادة (16): الإخطارات</h3>
         <p>تكون الإخطارات الموجهة من الشركة إلى مالك الشركة بواسطة خطابات مسجلة على عنوان مالك رأس مال الشركة كما هو مبين في هذا العقد.</p>
         <p><span class="edited">${data.addressAr}</span></p>`
      )}
      ${pair(
        `<h3>ARTICLE (17): MISCELLANEOUS</h3>
         <p>The company shall not have a corporate personality and shall not be allowed to perform its business until it is registered in the commercial register at the competent authority.</p>
         <p>Matters not provided for in this Memorandum shall be subject to the provisions of Federal Decree-Law No. (32) of 2021 on Commercial Companies and its amendments and the ministerial decisions made in implementation thereof.</p>
         <p>This Memorandum and any amendments thereto shall be written in the Arabic language and notarized by the competent authority, otherwise this Memorandum or the amendments shall be void. Should there be any amendments made to this document, such amendments must be annexed hereto.</p>`,
        `<h3>المادة (17): أحكام متفرقة</h3>
         <p>لا يكون للشركة شخصية اعتبارية ولا يجوز لها أن تبدأ أعمالها إلا بعد قيدها في السجل التجاري لدى السلطة المختصة.</p>
         <p>تكون المسائل غير المنصوص عليها في هذا العقد خاضعة لأحكام المرسوم بقانون اتحادي رقم (32) لسنة 2021 في شأن الشركات التجارية وتعديلاته والقرارات الوزارية المنفذة له.</p>
         <p>يجب أن يكون هذا العقد وكل تعديل يطرأ عليه مكتوباً باللغة العربية وموثقاً من قبل الجهة الرسمية المختصة وإلا كان العقد أو التعديل باطلاً. كما يجب إرفاق كل التعديلات بهذا العقد.</p>`
      )}
      ${pair(
        `<h3>ARTICLE (18): DISPUTES</h3>
         <p>In the event that any dispute arises in respect of the company, it shall be resolved by the Courts of Abu Dhabi as per their rules and procedures.</p>`,
        `<h3>المادة (18): المنازعات</h3>
         <p>تختص محاكم أبوظبي، طبقاً لقوانينها وإجراءاتها، بأي نزاع قد ينشأ عن هذه الشركة.</p>`
      )}
      ${signatureCard(data)}
  `, true)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MOA - ${data.tradeNameEn}</title>
  <style>${adSpcFoundingStyles()}</style>
</head>
<body>
  <div class="doc">
    ${p1}${p2}${p3}${p4}${p5}${p6}${p7}${p8}
  </div>
</body>
</html>`
}
