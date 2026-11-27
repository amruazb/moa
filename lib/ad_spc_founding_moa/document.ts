import { AdSpcFoundingMoaData } from './types'

export interface ClauseBlock {
  id: string
  html: string
  /** Keep this block on the same page as the signature card. */
  withSignature?: boolean
}

function money(n: number): string {
  return n.toLocaleString('en-US')
}

function pair(enTitle: string, arTitle: string, enBody: string, arBody: string): string {
  return `
    <div class="article-pair">
      <div class="block">
        ${enTitle ? `<h3>${enTitle}</h3>` : ''}
        ${enBody}
      </div>
      <div class="block rtl">
        ${arTitle ? `<h3>${arTitle}</h3>` : ''}
        ${arBody}
      </div>
    </div>`
}

function signatureCard(data: AdSpcFoundingMoaData): string {
  const { owner } = data
  return `
    <div class="signature-wrap">
      <div class="signature-card">
        <p class="sig-role"><strong>Owner of the Capital</strong><span class="sep">|</span><strong dir="rtl">مالك رأس المال</strong></p>
        <p class="sig-name">${owner.nameEn}</p>
        <p class="sig-name" dir="rtl">السيد ${owner.nameAr}</p>
        <p class="sig-meta nowrap">Emirates ID: ${owner.emiratesId} · DOB: ${owner.dateOfBirth}</p>
        <p class="sig-meta nowrap" dir="rtl">هوية: ${owner.emiratesId} · تاريخ الميلاد: ${owner.dateOfBirth}</p>
        <div class="sign-space"></div>
        <div class="sign-line"></div>
        <p class="sig-role"><strong>Signature</strong><span class="sep">|</span><strong dir="rtl">التوقيع</strong></p>
      </div>
    </div>`
}

/** Ordered bilingual clauses. Pagination is applied by the caller. */
export function buildClauses(data: AdSpcFoundingMoaData): ClauseBlock[] {
  const { owner, reservation } = data
  const activitiesEn = data.activities
    .map((a) => `<li><span class="edited">${a.code}</span> ${a.en}</li>`)
    .join('')
  const activitiesAr = data.activities
    .map((a) => `<li><span class="edited">${a.code}</span> ${a.ar}</li>`)
    .join('')

  const idLineEn = `Passport No. ${owner.passportNo}, Emirates ID No. ${owner.emiratesId}, date of birth ${owner.dateOfBirth}`
  const idLineAr = `جواز سفر رقم ${owner.passportNo}، وبطاقة هوية إماراتية رقم ${owner.emiratesId}، تاريخ الميلاد ${owner.dateOfBirth}`

  const clauses: ClauseBlock[] = []

  clauses.push({
    id: 'header',
    html: pair(
      '',
      '',
      `<p class="doc-kicker">Memorandum of Association</p>
       <p class="doc-title">Limited Liability Company – Sole Proprietorship Company</p>
       <p class="flush"><strong>Legal form:</strong> <span class="edited">${data.legalFormEn}</span></p>
       <p class="flush"><strong>Trade name:</strong> <span class="edited">${data.tradeNameEn}</span></p>
       <p class="flush"><strong>Trade name reservation:</strong> Transaction No. <span class="edited">${reservation.transactionNo}</span>, Economic Registry No. <span class="edited">${reservation.economicRegistryNo}</span>, issued on <span class="edited">${reservation.issueDate}</span> by ${reservation.authorityEn}.</p>
       <p>This contract has been concluded on <span class="edited nowrap">${data.contractDate}</span> by the sole owner:</p>
       <p>Mr. <span class="edited">${owner.nameEn}</span>, ${owner.nationalityEn} national, holder of ${idLineEn}, resident in ${owner.residenceEn}.</p>`,
      `<p class="doc-kicker">عقد تأسيس</p>
       <p class="doc-title">شركة ذات مسؤولية محدودة – شركة الشخص الواحد</p>
       <p class="flush"><strong>الشكل القانوني:</strong> <span class="edited">${data.legalFormAr}</span></p>
       <p class="flush"><strong>الاسم التجاري:</strong> <span class="edited">${data.tradeNameAr}</span></p>
       <p class="flush"><strong>حجز الاسم التجاري:</strong> رقم المعاملة <span class="edited">${reservation.transactionNo}</span>، رقم السجل الاقتصادي <span class="edited">${reservation.economicRegistryNo}</span>، الصادر بتاريخ <span class="edited">${reservation.issueDate}</span> عن ${reservation.authorityAr}.</p>
       <p>حُرر هذا العقد بتاريخ <span class="edited nowrap">${data.contractDate}</span> من قبل المالك الوحيد:</p>
       <p>السيد <span class="edited">${owner.nameAr}</span>، الجنسية: ${owner.nationalityAr}، ويحمل ${idLineAr}، مقيم في ${owner.residenceAr}.</p>`
    ),
  })

  clauses.push({
    id: 'art1',
    html: pair(
      'ARTICLE (1): PREAMBLE',
      'المادة (1): مقدمة العقد',
      `<p>The sole owner, being in full legal capacity to contract, has agreed to establish a limited liability company (sole proprietorship company) in the Emirate of Abu Dhabi, in accordance with the provisions of the Commercial Companies Federal Decree-Law number (32) of 2021 and the legislation regulating economic activities in the Emirate of Abu Dhabi administered by the Department of Economic Development - Abu Dhabi (Abu Dhabi Registration and Licensing Authority – ADRA), and the laws issued in amendment thereof.</p>`,
      `<p>اتفق المالك الوحيد، وهو بكامل الأهلية القانونية للتعاقد، على تأسيس شركة ذات مسؤولية محدودة (شركة الشخص الواحد) في إمارة أبوظبي، وفقاً لأحكام المرسوم بقانون اتحادي رقم (32) لسنة 2021 بشأن الشركات التجارية والتشريعات المنظمة للأنشطة الاقتصادية في إمارة أبوظبي الصادرة عن دائرة التنمية الاقتصادية - أبوظبي (هيئة تسجيل وترخيص أبوظبي – ADRA) والقوانين الصادرة تعديلاً لها.</p>`
    ),
  })

  clauses.push({
    id: 'art2',
    html: pair(
      'ARTICLE (2): THE OWNER / FOUNDER',
      'المادة (2): المالك / المؤسس',
      `<p>The founder and sole owner of the share capital of the Company is:</p>
       <p>Mr. <span class="edited">${owner.nameEn}</span>, ${owner.nationalityEn} national, holder of ${idLineEn}, resident in ${owner.residenceEn}, who owns the entire share capital of the Company.</p>`,
      `<p>المؤسس ومالك رأس مال الشركة الوحيد هو:</p>
       <p>السيد <span class="edited">${owner.nameAr}</span>، الجنسية: ${owner.nationalityAr}، ويحمل ${idLineAr}، مقيم في ${owner.residenceAr}، وهو يملك كامل حصص رأس مال الشركة.</p>`
    ),
  })

  clauses.push({
    id: 'art3',
    html: pair(
      'ARTICLE (3): NAME OF THE COMPANY',
      'المادة (3): اسم الشركة',
      `<p>The name of the Company shall be <span class="edited">${data.tradeNameEn}</span>.</p>`,
      `<p>اسم الشركة هو <span class="edited">${data.tradeNameAr}</span>.</p>`
    ),
  })

  clauses.push({
    id: 'art4',
    html: pair(
      'ARTICLE (4): OBJECT OF THE COMPANY',
      'المادة (4): أغراض الشركة',
      `<p>Objects of the Company are:</p>
       <ul>${activitiesEn}</ul>
       <p>which shall include carrying on all activities as are related or ancillary thereto upon approval of ${data.licensingAuthorityEn}.</p>`,
      `<p>أغراض الشركة هي:</p>
       <ul>${activitiesAr}</ul>
       <p>وتشمل مزاولة كافة الأنشطة المتعلقة بهذه الأغراض أو المتصلة بها وذلك بعد الحصول على موافقة ${data.licensingAuthorityAr}.</p>`
    ),
  })

  clauses.push({
    id: 'art5',
    html: pair(
      'ARTICLE (5): THE COMPANY ADDRESS &amp; THE HEAD OFFICE',
      'المادة (5): عنوان الشركة ومركزها الرئيسي',
      `<p>The company address and the head office shall be in ${data.headOfficeEn}.</p>
       <p>Address: <span class="edited">${data.addressEn}</span></p>
       <p>It shall be permissible for the Company to establish branches, offices and/or agencies in the United Arab Emirates and abroad.</p>`,
      `<p>يكون عنوان الشركة ومركزها الرئيسي في ${data.headOfficeAr}.</p>
       <p>العنوان: <span class="edited">${data.addressAr}</span></p>
       <p>ويجوز للشركة أن تنشئ لها فروعاً أو مكاتب أو توكيلات داخل الدولة وخارجها.</p>`
    ),
  })

  clauses.push({
    id: 'art6',
    html: pair(
      'ARTICLE (6): DURATION OF THE COMPANY',
      'المادة (6): مدة الشركة',
      `<p>The duration of the company shall be (${data.durationYears}) Ten year(s), commencing on the date of the registration of the Company in the Commercial Register, and shall be automatically renewed for a similar period thereafter unless the owner of the company share capital determines otherwise.</p>`,
      `<p>تكون مدة الشركة (${data.durationYears}) عشر سنوات ميلادية تبدأ من تاريخ قيد الشركة في السجل التجاري، وتجدد تلقائياً لفترات مماثلة فيما بعد ما لم يقرر مالك رأس مال الشركة خلاف ذلك.</p>`
    ),
  })

  clauses.push({
    id: 'art7',
    html: pair(
      'ARTICLE (7): THE SHARE CAPITAL OF THE COMPANY',
      'المادة (7): رأس المال',
      `<p>The capital of the Company amounts to Dirhams (AED ${money(data.capitalAed)}) ${data.capitalWordsEn} only, divided into (${data.shareCount}) shares in cash, the value of each share being Dirhams (AED ${money(data.shareValueAed)}) ${data.shareValueWordsEn} Dirhams, and all shares are in cash, held by the Company Capital Owner as follows:</p>
       <ul><li>Mr. <span class="edited">${owner.nameEn}</span>, (${data.shareCount}) shares, amounting to (AED ${money(data.capitalAed)}), which represent (100%) of the share capital.</li></ul>
       <p>The value of the shares has been fully paid up in cash, and has been deposited in the bank account of the Company.</p>`,
      `<p>حُدد رأس مال الشركة بمبلغ (${money(data.capitalAed)}) ${data.capitalWordsAr}، موزعة على (${data.shareCount}) حصة نقدية، قيمة كل حصة (${money(data.shareValueAed)}) ${data.shareValueWordsAr}، وجميعها حصص نقدية مملوكة لمالك رأس المال على النحو التالي:</p>
       <ul><li>السيد <span class="edited">${owner.nameAr}</span>، (${data.shareCount}) حصة بقيمة (${money(data.capitalAed)}) درهم بنسبة (100%) من رأس المال.</li></ul>
       <p>إن قيمة الحصص النقدية قد دُفعت بالكامل وقد تم إيداعها في حساب الشركة لدى المصرف.</p>`
    ),
  })

  clauses.push({
    id: 'art8',
    html: pair(
      'ARTICLE (8): MANAGEMENT OF THE COMPANY',
      'المادة (8): إدارة الشركة',
      `<p>The management of the company shall be entrusted to:</p>
       <ul><li>Mr. <span class="edited">${owner.nameEn}</span></li></ul>
       <p><strong>The Director’s Powers Related to Banking Transactions:</strong></p>
       <p>To:</p>
       <ul><li><span class="edited">${owner.nameEn}</span> (Manager)</li></ul>
       <p>individually can open and close bank accounts in the name of the company and to operate such bank accounts and sign cheques.</p>
       <p>To:</p>
       <ul><li><span class="edited">${owner.nameEn}</span> (Manager)</li></ul>
       <p>individually borrow on behalf of the Company and to sign withdrawal instruments, credit instruments, guarantees and any required documents in relation to bank facilities under the Company’s guarantee.</p>`,
      `<p>يتولى إدارة الشركة:</p>
       <ul><li>السيد <span class="edited">${owner.nameAr}</span></li></ul>
       <p><strong>الصلاحيات البنكية:</strong></p>
       <p>أن يقوم:</p>
       <ul><li><span class="edited">${owner.nameAr}</span> (مدير)</li></ul>
       <p>منفرداً بفتح وإقفال الحسابات البنكية باسم الشركة وأن يقوم بتشغيل وإدارة هذه الحسابات وتوقيع الشيكات.</p>
       <p>أن يقوم:</p>
       <ul><li><span class="edited">${owner.nameAr}</span> (مدير)</li></ul>
       <p>منفرداً بالاقتراض نيابة عن الشركة والتوقيع على محررات السحب أو محررات الائتمان والضمانات والمستندات الأخرى المطلوبة بشأن التسهيلات البنكية بضمان الشركة.</p>`
    ),
  })

  clauses.push({
    id: 'art9',
    html: pair(
      'ARTICLE (9): FINANCIAL MANAGEMENT',
      'المادة (9): الإدارة المالية',
      `<p>The company's director(s) shall prepare the company's balance sheet and the profit and loss account. They shall also prepare an annual report of the company's activities, its financial position and shall submit the distribution of profits proposals to the general assembly. All the above should be completed within three months from the end of the company's financial year.</p>
       <p>The balance sheet and the profit and loss account shall be submitted to the annual general assembly for approval.</p>`,
      `<p>يتولى مديرو الشركة إعداد الميزانية السنوية وحساب الأرباح والخسائر. كما يقومون بإعداد تقرير سنوي عن نشاط الشركة ووضعها المالي ويقدمون اقتراحاتهم بشأن توزيع الأرباح للجمعية العمومية، وذلك خلال ثلاثة أشهر من تاريخ انتهاء السنة المالية.</p>
       <p>يجب تقديم الميزانية وحساب الأرباح والخسائر إلى الجمعية العمومية السنوية لاعتمادها.</p>`
    ),
  })

  clauses.push({
    id: 'art10',
    html: pair(
      'ARTICLE (10): THE RESOLUTIONS OF THE COMPANY OWNER',
      'المادة (10): قرارات مالك رأس مال الشركة',
      `<p>The company owner shall:</p>
       <ul>
         <li>Review the report of the director(s) on the company's activities and financial position during the past year and the auditors' report.</li>
         <li>Discuss and ratify the balance sheet and profit and loss account.</li>
         <li>Amend the company memorandum of association.</li>
         <li>Dissolve and liquidate the company.</li>
         <li>Amalgamate or transfer the company.</li>
         <li>Increase or decrease the company capital.</li>
         <li>Appoint or dismiss the director(s) / the company board of directors, if any, restrict their powers and determine their remuneration.</li>
         <li>Appoint or dismiss one or more auditors and determine their remuneration.</li>
         <li>Appoint the members of the internal Sharia board of supervision and the Sharia supervisor, if any.</li>
         <li>Any other matter within its competence in accordance with the provisions of the Commercial Companies Law or this Memorandum.</li>
       </ul>`,
      `<p>يختص مالك الشركة بالأمور التالية:</p>
       <ul>
         <li>سماع تقرير المدير عن نشاط الشركة ومركزها المالي خلال السنة المالية المنتهية وتقرير مدقق الحسابات.</li>
         <li>مناقشة الميزانية العمومية وحساب الأرباح والخسائر والتصديق عليهما.</li>
         <li>تعديل عقد تأسيس الشركة.</li>
         <li>حل الشركة وتصفيتها.</li>
         <li>اندماج الشركة أو تحويلها.</li>
         <li>زيادة رأس مال الشركة أو تخفيضه.</li>
         <li>تعيين أو عزل المدير / مجلس مديري الشركة (إن وجد)، أو تقييد سلطاتهم وتحديد مكافآتهم.</li>
         <li>تعيين مدقق حسابات أو أكثر أو عزلهم وتحديد مكافآتهم.</li>
         <li>تعيين أعضاء لجنة الرقابة الشرعية الداخلية والمراقب الشرعي (إن وجد).</li>
         <li>أية مسائل أخرى تدخل ضمن اختصاصه بموجب أحكام قانون الشركات التجارية أو هذا العقد.</li>
       </ul>`
    ),
  })

  clauses.push({
    id: 'art11',
    html: pair(
      'ARTICLE (11): THE FINANCIAL YEAR',
      'المادة (11): السنة المالية',
      `<p>The financial year of the company shall commence on 1st January and shall end on 31st December each year, with the exception of the first financial year, which shall commence on the date of the registration of the company in the Commercial Register and end on 31st December of the same year. Each financial year may not exceed (18) eighteen months and should not be less than six months.</p>`,
      `<p>تبدأ السنة المالية للشركة في اليوم الأول من شهر يناير وتنتهي في 31 ديسمبر من كل سنة، ما عدا السنة المالية الأولى والتي تبدأ من تاريخ تسجيل الشركة في السجل التجاري وتنتهي في الحادي والثلاثين من ديسمبر من السنة ذاتها، على ألا تتجاوز السنة المالية الأولى للشركة (18) ثمانية عشر شهراً وألا تقل عن (6) ستة أشهر.</p>`
    ),
  })

  clauses.push({
    id: 'art12',
    html: pair(
      'ARTICLE (12): PROFITS AND LOSSES',
      'المادة (12): الأرباح والخسائر',
      `<p>The Company shall allocate (10%) of its net profits each year to create a statutory reserve. The company owner may resolve to discontinue the allocation when the reserve reaches half of the capital. The company owner may allocate additional reserves as it is seen fit.</p>
       <p>The company owner shall be entitled to the profits and the losses.</p>
       <p>The company owner shall only be liable to the extent of his share in the company capital.</p>`,
      `<p>يتم تخصيص نسبة (10%) من صافي أرباح الشركة كل سنة لتكوين احتياطي قانوني. ويجوز لمالك الشركة أن يقرر وقف هذا التخصيص إذا بلغ الاحتياطي نصف رأس المال. كما يجوز لمالك الشركة تخصيص احتياطيات إضافية حسب ما يراه مناسباً.</p>
       <p>يحق لمالك الشركة الحصول على الأرباح والخسائر.</p>
       <p>لا يسأل مالك الشركة عن التزامات الشركة إلا بمقدار حصته في رأس مال الشركة.</p>`
    ),
  })

  clauses.push({
    id: 'art13',
    html: pair(
      'ARTICLE (13): THE COMPANY AUDITOR',
      'المادة (13): مدقق حسابات الشركة',
      `<p>The Company shall have one or more auditors licensed to practise in the Emirate of Abu Dhabi, to be selected by the company owner every year. The auditor(s) shall be subject to the same provisions concerning auditors of public joint stock companies.</p>`,
      `<p>يكون للشركة مدقق حسابات أو أكثر من المرخص لهم بالعمل في إمارة أبوظبي، يعينهم مالك الشركة كل سنة. وتسري في شأنهم الأحكام الخاصة بمدققي الحسابات في شركات المساهمة العامة.</p>`
    ),
  })

  clauses.push({
    id: 'art14',
    html: pair(
      'ARTICLE (14): DISSOLUTION, LIQUIDATION OR DEACTIVATING OF THE COMPANY',
      'المادة (14): حل الشركة أو تصفيتها أو وقف نشاطها',
      `<p>The company shall be dissolved for any of the following reasons:</p>
       <ul>
         <li>Expiry of the period specified in this memorandum unless this period is renewed in accordance with the rules set out herein.</li>
         <li>Fulfillment of the objects for which the company was established.</li>
         <li>Amalgamation of the company in accordance with the Commercial Companies Law.</li>
         <li>Resolution of the company capital owner to terminate the duration of the company.</li>
         <li>The depletion of all or most of the assets of the company, making beneficial investment of the remainder of the assets, if any, impracticable.</li>
         <li>Rendering a decision from the Court to dissolve the company.</li>
         <li>Death of the natural person; however, the heirs may wish to maintain the company after adjusting its status in alignment with the provisions of the Commercial Companies Law within six months from the date of death.</li>
         <li>Expiry of the legal entity that established the company.</li>
       </ul>`,
      `<p>تحل الشركة لأي من الأسباب التالية:</p>
       <ul>
         <li>انتهاء المدة المحددة في هذا العقد ما لم تجدد المدة طبقاً للقواعد الواردة فيه.</li>
         <li>انتهاء الغرض الذي أُسست الشركة من أجله.</li>
         <li>الاندماج وفقاً لأحكام قانون الشركات التجارية.</li>
         <li>قرار من المالك لرأس مال الشركة بإنهاء مدتها.</li>
         <li>هلاك جميع أموال الشركة أو معظمها بحيث يتعذر استثمار الباقي استثماراً مجدياً.</li>
         <li>صدور حكم قضائي بحل الشركة.</li>
         <li>وفاة الشخص الطبيعي، إلا إذا رغب الورثة في استمرارها مع توفيق وضعها وفقاً لأحكام قانون الشركات التجارية وذلك خلال ستة أشهر على الأكثر من تاريخ الوفاة.</li>
         <li>انقضاء الشخص الاعتباري المؤسس لها.</li>
       </ul>`
    ),
  })

  clauses.push({
    id: 'art15',
    html: pair(
      'ARTICLE (15): LIQUIDATION OF THE COMPANY',
      'المادة (15): تصفية الشركة',
      `<p>One or more liquidators shall be appointed by the company owner, and the liquidation of the company shall follow the provisions of the Commercial Companies Law. A liquidator shall not be acting as the company accounts auditor at present or have audited its accounts within the past five years prior to his appointment.</p>`,
      `<p>يقوم مالك الشركة بتعيين مصفٍ أو أكثر، ويُتبع في تصفية الشركة الأحكام الواردة في قانون الشركات التجارية، على ألا يكون المصفي مدققاً حالياً لحسابات الشركة أو سبق له تدقيق حساباتها خلال السنوات الخمس السابقة على التعيين.</p>`
    ),
  })

  clauses.push({
    id: 'art16',
    html: pair(
      'ARTICLE (16): NOTICES',
      'المادة (16): الإخطارات',
      `<p>Notices from the company to the company owner shall be made by registered letters to the address of the company owner as indicated in this contract.</p>`,
      `<p>تكون الإخطارات الموجهة من الشركة إلى مالك الشركة بواسطة خطابات مسجلة على عنوان مالك رأس مال الشركة كما هو مبين في هذا العقد.</p>`
    ),
  })

  clauses.push({
    id: 'art17',
    html: pair(
      'ARTICLE (17): MISCELLANEOUS',
      'المادة (17): أحكام متفرقة',
      `<p>The company shall not have a corporate personality and shall not be allowed to perform its business until it is registered in the commercial register at the competent authority.</p>
       <p>Matters not provided for in this Memorandum shall be subject to the provisions of ${data.governingLawEn} and its amendments and the ministerial decisions made in implementation thereof.</p>
       <p>This Memorandum and any amendments thereto shall be written in the Arabic language and notarized by the competent authority, otherwise this Memorandum or the amendment shall be void. Should there be any amendments made to this document, such amendments must be annexed hereto.</p>`,
      `<p>لا يكون للشركة شخصية اعتبارية ولا يجوز لها أن تبدأ أعمالها إلا بعد قيدها في السجل التجاري لدى السلطة المختصة.</p>
       <p>تكون المسائل غير المنصوص عليها في هذا العقد خاضعة لأحكام ${data.governingLawAr} وتعديلاته والقرارات الوزارية المنفذة له.</p>
       <p>يجب أن يكون هذا العقد وكل تعديل يطرأ عليه مكتوباً باللغة العربية وموثقاً من قبل الجهة الرسمية المختصة وإلا كان العقد أو التعديل باطلاً. كما يجب إرفاق كل التعديلات بهذا العقد.</p>`
    ),
  })

  clauses.push({
    id: 'art18',
    html: pair(
      'ARTICLE (18): DISPUTES',
      'المادة (18): المنازعات',
      `<p>In the event that any dispute arises in respect of the company, it shall be resolved by ${data.courtsEn} in accordance with their laws and procedures.</p>`,
      `<p>تختص ${data.courtsAr}، طبقاً لقوانينها وإجراءاتها، بأي نزاع قد ينشأ عن هذه الشركة.</p>`
    ),
    withSignature: true,
  })

  return clauses
}

export function documentStyles(): string {
  return `
    @page { size: A4 portrait; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body { font-family: 'Noto Sans', 'DejaVu Sans', sans-serif; color: #111; }
    .page {
      width: 210mm;
      height: 297mm;
      padding: 9mm 11mm 14mm;
      position: relative;
      overflow: hidden;
      page-break-after: always;
      background: #fff;
      display: flex;
      flex-direction: column;
    }
    .page:last-child { page-break-after: auto; }
    .article-pair {
      display: flex;
      gap: 8px;
      align-items: stretch;
      margin: 0 0 6px;
      flex: 1 1 auto;
    }
    .block {
      flex: 1 1 50%;
      border: 1px solid #c5cdd6;
      border-radius: 3px;
      padding: 10px 11px;
      background: #fff;
      font-size: 11pt;
      line-height: 1.65;
      text-align: justify;
      text-align-last: start;
      font-family: 'Noto Sans', 'DejaVu Sans', sans-serif;
    }
    .block.rtl {
      direction: rtl;
      font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif;
      font-size: 12pt;
      line-height: 1.75;
      text-align: justify;
      text-align-last: start;
    }
    .block h3 {
      font-size: 12pt;
      line-height: 1.35;
      font-weight: 700;
      margin: 0 0 6px;
      text-align: center;
      color: #1e3a5f;
    }
    .block.rtl h3 { font-size: 13pt; }
    .block p { margin: 0 0 6px; }
    .block p.flush { text-align: start; }
    .block p:last-child { margin-bottom: 0; }
    .block ul { margin: 4px 0 6px; padding-left: 16px; text-align: start; }
    .nowrap { white-space: nowrap; }
    .block.rtl ul { padding-left: 0; padding-right: 16px; }
    .block li { margin: 0 0 3px; }
    .edited { font-weight: 700; }
    .doc-kicker {
      text-align: center;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 2px !important;
      color: #1e3a5f;
    }
    .block.rtl .doc-kicker { text-transform: none; letter-spacing: 0; font-size: 14pt; }
    .doc-title { text-align: center; font-weight: 700; margin-bottom: 8px !important; }
    .page-footer {
      position: absolute;
      left: 12mm;
      right: 12mm;
      bottom: 6mm;
      display: flex;
      justify-content: space-between;
      gap: 10px;
      font-size: 8pt;
      line-height: 1.35;
      color: #475569;
      border-top: 1px solid #e2e8f0;
      padding-top: 3px;
    }
    .page-footer .ar { direction: rtl; font-family: 'Noto Naskh Arabic', 'Noto Sans Arabic', serif; text-align: right; flex: 1; }
    .page-footer .en { flex: 1; }
    .page-no { font-weight: 700; color: #1e3a5f; white-space: nowrap; }
    .signature-wrap { display: flex; justify-content: center; margin-top: 6px; flex: 0 0 auto; }
    .signature-card {
      width: 100%;
      max-width: 520px;
      margin: 0 auto;
      border: 1px solid #94a3b8;
      border-radius: 6px;
      padding: 8px 16px 10px;
      text-align: center;
      background: #fff;
      line-height: 1.45;
    }
    .signature-card p { margin: 2px 0; font-size: 11pt; }
    .sig-role { color: #1e3a5f; }
    .sig-name { font-weight: 700; font-size: 12pt; }
    .sig-meta { font-size: 10.5pt; }
    .sep { color: #64748b; margin: 0 6px; font-weight: 400; }
    .sign-space { height: 92px; }
    .sign-line { border-top: 1px solid #000; width: 72%; margin: 0 auto 6px; height: 0; }
  `
}

export function renderPages(clauses: ClauseBlock[], pageGroups: string[][], data: AdSpcFoundingMoaData): string {
  const byId = new Map(clauses.map((c) => [c.id, c]))
  const total = pageGroups.length
  const pages = pageGroups
    .map((ids, index) => {
      const body = ids.map((id) => byId.get(id)?.html || '').join('\n')
      const sign = ids.includes('art18') ? signatureCard(data) : ''
      const n = index + 1
      return `
      <section class="page">
        ${body}
        ${sign}
        <footer class="page-footer">
          <div class="en">Deemed executed and electronically notarized by the Department of Economic Development - Abu Dhabi (ADRA).</div>
          <div class="page-no">${n} / ${total}</div>
          <div class="ar">تعتبر هذه الوثيقة موثقة ومصدقة إلكترونياً من دائرة التنمية الاقتصادية - أبوظبي (هيئة تسجيل وترخيص أبوظبي).</div>
        </footer>
      </section>`
    })
    .join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.tradeNameEn} — Memorandum of Association</title>
  <style>${documentStyles()}</style>
</head>
<body>
  ${pages}
</body>
</html>`
}

/**
 * Initial page grouping. Tuned so each page is filled and the signature
 * shares the last page with Articles 16–18.
 */
export const defaultPageGroups: string[][] = [
  ['header', 'art1'],
  ['art2', 'art3', 'art4', 'art5'],
  ['art6', 'art7'],
  ['art8', 'art9'],
  ['art10', 'art11'],
  ['art12', 'art13'],
  ['art14', 'art15'],
  ['art16', 'art17'],
  ['art18'],
]

export function generateAdSpcFoundingMoaHtml(
  data: AdSpcFoundingMoaData,
  pageGroups: string[][] = defaultPageGroups
): string {
  return renderPages(buildClauses(data), pageGroups, data)
}
