// MOA Articles chunks - Chapter I through VII
// Articles 6-24: Company structure, management, assembly, financial, dissolution and disputes

import { ContentChunk } from '../pageBuilder'
import { LLCToSPCContext } from '../types'
import { numberToWordsEn, numberToWordsAr } from '@/lib/utils/numberToWords'

// ========================================
// CHAPTER II: Capital and Shares
// ========================================

export const chapter2HeaderChunk: ContentChunk = {
  id: 'chapter-2',
  type: 'chapter',
  estimatedHeight: 15,
  keepWithNext: true,
  content: () => `
      <!-- Chapter II: Capital and Shares -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER II</h3>
          <h3 class="center">Capital and Shares</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الثاني</h3>
          <h3 class="center">رأس مال الشركة وحصص الشركاء</h3>
        </div>
      </div>`
}

export const article6Chunk: ContentChunk = {
  id: 'article-6',
  type: 'article',
  estimatedHeight: 55,
  content: (ctx: LLCToSPCContext) => {
    const { newOwner, capitalInfo } = ctx
    const { capital, shareCount, shareValue } = capitalInfo
    const capitalWordsEn = numberToWordsEn(capital)
    const capitalWordsAr = numberToWordsAr(capital)
    return `
      <!-- Article 6: Capital -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (6): Capital</h3>
          <p>The capital of the Company is fixed at AED <span class="edited">${capital.toLocaleString()}</span> (<span class="edited">${capitalWordsEn}</span> Dirhams) divided into (<span class="edited">${shareCount}</span>) shares of a nominal value of AED <span class="edited">${shareValue.toLocaleString()}</span> each. Capital is fully subscribed and paid, and has been distributed among partners as follows:</p>
          <table>
            <tr><th>Partner</th><th>Shares</th><th>Value (AED)</th><th>%</th></tr>
            <tr><td class="edited">${newOwner.pronouns.title} ${newOwner.name}</td><td class="edited">${shareCount}</td><td class="edited">${capital.toLocaleString()}</td><td>100%</td></tr>
            <tr><td><strong>Total</strong></td><td><strong class="edited">${shareCount}</strong></td><td><strong class="edited">${capital.toLocaleString()}</strong></td><td><strong>100%</strong></td></tr>
          </table>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (6): رأس المال</h3>
          <p>رأس مال الشركة <span class="edited">${capital.toLocaleString()}</span> درهم إماراتي (<span class="edited">${capitalWordsAr}</span> درهم) موزع على (<span class="edited">${shareCount}</span>) حصة قيمة كل حصة <span class="edited">${shareValue.toLocaleString()}</span> درهم إماراتي وجميعها حصص نقدية تم سدادها بالكامل وقد توزعت على الشريك كما يلي:</p>
          <table>
            <tr><th>الشريك</th><th>الحصص</th><th>القيمة (درهم)</th><th>%</th></tr>
            <tr><td class="edited">${newOwner.pronouns.titleAr}/ ${newOwner.nameAr}</td><td class="edited">${shareCount}</td><td class="edited">${capital.toLocaleString()}</td><td>100%</td></tr>
            <tr><td><strong>المجموع</strong></td><td><strong class="edited">${shareCount}</strong></td><td><strong class="edited">${capital.toLocaleString()}</strong></td><td><strong>100%</strong></td></tr>
          </table>
        </div>
      </div>`
  }
}

export const article7Chunk: ContentChunk = {
  id: 'article-7',
  type: 'article',
  estimatedHeight: 28,
  content: () => `
      <!-- Article 7: Increase of Capital -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (7): Increase of Capital</h3>
          <p>The capital may be increased in one or more payments either by issuing new shares or by converting the free capital reserve to shares upon resolution of the assembly and in accordance with the provisions stipulated in law and its executive regulations.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (7): زيادة رأس المال</h3>
          <p>يجوز زيادة رأس المال على دفعة واحدة أو أكثر سواء بإصدار حصص جديدة أو بتحويل رأس المال الاحتياطي الحر إلى حصص ويتم ذلك بقرار من قبل الجمعية العمومية وطبقاً لأحكام المنصوص عليها في القانون ولوائحها التنفيذية.</p>
        </div>
      </div>`
}

export const article8Chunk: ContentChunk = {
  id: 'article-8',
  type: 'article',
  estimatedHeight: 45,
  content: () => `
      <!-- Article 8: Transfer of Shares -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (8): Transfer of Shares</h3>
          <p>Shares are transferable among partners or between them and third party provided that such transfer or disposal shall be entered in the register prepared for such purpose.</p>
          <p>Anyone, who intends to sell out their share to third party, shall notify the company management via duly registered letter and the management shall, in its turn, notify the partners within the subsequent seven days.</p>
          <p>Within Two months from first notification date, the partners may recover their shares upon same conditions, otherwise such right shall lapse. If the right of purchase is exercised by more than one partner, the shares being sold shall be distributed among them proportionately to their shares in the capital.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (8): انتقال الحصص</h3>
          <p>الحصص قابلة للانتقال بين الشركاء أو بينهم وبين الغير. ويجب أن يثبت هذا الانتقال أو التصرف في الحصص في السجل المعد لذلك الغرض.</p>
          <p>ويجب على كل من يعتزم بيع حصته للغير أن يقوم بإخطار إدارة الشركة بذلك بخطاب موصى عليه وتقوم الإدارة بدورها بإخطار الشركاء بذلك خلال السبعة أيام التالية.</p>
          <p>وللشركاء خلال شهرين من الإخطار الأول استرداد الحصة بالشروط نفسها وإلا سقط هذا الحق وإذا استعمل حق الشراء من قبل أكثر من شريك واحد يتم توزيع الحصص المباعة بينهم بشكل يتناسب مع حصة كل منهم في رأس المال.</p>
        </div>
      </div>`
}

export const article9Chunk: ContentChunk = {
  id: 'article-9',
  type: 'article',
  estimatedHeight: 42,
  content: () => `
      <!-- Article 9: Partners Register -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (9): Partners Register</h3>
          <p>A special register for partners shall be maintained by the company's head office containing the following:-</p>
          <ol class="list">
            <li>Names of the Partners, their nationalities and domiciles</li>
            <li>Number of shares held by each Partner and the amount paid.</li>
            <li>Cases of assignment of shares and transfer of ownership thereof, indicating the date and signature of the assigner and assignee, in case of disposal of the shares between the existing Partners and signature of the Managing Director and the person to whom the shares devolved, in case of transfer by inheritance.</li>
          </ol>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (9): سجل الشركاء</h3>
          <p>يحتفظ بمكتب الشركة الرئيس بسجل خاص للشركاء يتضمن ما يلي:-</p>
          <ol class="list">
            <li>أسماء الشركاء وجنسياتهم ومحال إقامتهم</li>
            <li>عدد الحصص التي يملكها كل شريك ومقدار ما دفعه</li>
            <li>حالات التنازل عن الحصص وانتقال ملكيتها مع بيان تاريخ وتوقيع المتنازل والمتنازل إليه في حالة التصرف بين الأحياء وتوقيع المدير المفوض ومن آلت إليه الحصص في حالة الانتقال بطريق الميراث.</li>
          </ol>
        </div>
      </div>`
}

// ========================================
// CHAPTER III: Company Management
// ========================================

export const chapter3HeaderChunk: ContentChunk = {
  id: 'chapter-3',
  type: 'chapter',
  estimatedHeight: 15,
  keepWithNext: true,
  content: () => `
      <!-- Chapter III: Company Management -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER III</h3>
          <h3 class="center">Company Management</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الثالث</h3>
          <h3 class="center">إدارة الشركة</h3>
        </div>
      </div>`
}

export const article10Part1Chunk: ContentChunk = {
  id: 'article-10-part1',
  type: 'article',
  estimatedHeight: 140,
  keepWithNext: true,
  content: (ctx: LLCToSPCContext) => {
    const { manager } = ctx
    return `
      <!-- Article 10: Company Management - Part 1 -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (10): Company Management</h3>
          <p>The sole owner has agreed that the management of the Company shall be governed by the <strong>Managing Director <span class="edited">${manager.pronouns.title} ${manager.name}</span></strong> holding Emirates ID number <span class="edited">${manager.eidOrPassport}</span>, for an unlimited period. The Managing Director shall have the widest powers and authorities to manage and represent the Company and to carry out all acts required by its objects, including but not limited to the following:</p>
          <p>1- Carrying out all administrative, technical and financial aspects without limitation to the powers entrusted in ${manager.pronouns.object}, being without limitation.</p>
          <p>2- Carrying out the works required to achieve the company's goals and purpose.</p>
          <p>3- Concluding commercial contracts in the name of the Company, contracts covered by the Company activity and related thereto.</p>
          <p>4- The Managing Director shall represent the Company before all government, local and federal departments and private companies and establishments such as Department of Economic Development, Municipalities, UAE Chambers, Seaports, Customs, Airports, Traffic and Licensing Department, Police Departments, Ruler's Offices, Ministry of Human Resources and Emiratization, Higher Corporation for Specialized Economic Zones, Critical National Infrastructure Authority, Federal Tax Authority, all companies and commercial and professional entities, and to sign all documents, papers and contracts with/before them and/or do any other acts, deeds or things that may be related to the affairs of the company and sign jointly or singly on all papers and transactions.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (10): إدارة الشركة</h3>
          <p>اتفق المالك الوحيد على أن يتولى إدارة الشركة <strong>المدير العام <span class="edited">${manager.pronouns.titleAr}/ ${manager.nameAr}</span></strong> يحمل بطاقة هوية رقم <span class="edited">${manager.eidOrPassport}</span>، لفترة غير محدودة. وتكون للمدير العام أوسع السلطات في إدارة وتمثيل الشركة والقيام بجميع الأعمال التي تقتضيها أغراضها ويشمل ذلك دون حصر:</p>
          <p>1- القيام بجميع الأعمال الإدارية والفنية والمالية وبدون الحد من شمولية السلطات والصلاحيات المعطاة له بدون حصر.</p>
          <p>2- القيام بكافة الأعمال اللازمة لتحقيق أغراض الشركة وأهدافها.</p>
          <p>3- إبرام العقود التجارية باسم الشركة وهي العقود التي يكون ضمن نشاط الشركة والمتصلة به.</p>
          <p>4- يقوم مدير الإدارة بتمثيل الشركة لدى كافة المؤسسات الحكومية وشبه الحكومية والمحلية والاتحادية والمؤسسات الخاصة والشركات مثل دائرة التنمية الاقتصادية والبلديات وغرف الدولة، والموانئ والجمارك والمطارات وإدارة المرور والترخيص ودوائر الشرطة ومكاتب سمو الحاكم ووزارة الموارد البشرية والتوطين والمؤسسة العليا للمناطق الاقتصادية المتخصصة وجهاز حماية المنشآت والمرافق الحيوية والهيئة الاتحادية للضرائب وكافة الشركات والجهات التجارية والمهنية، والتوقيع على كافة المستندات والأوراق والعقود معهم أو أمامهم و/أو القيام بأي أعمال أو تصرفات أخرى تتعلق بشؤون الشركة والتوقيع مجتمعين أو منفردين على كافة الأوراق والمعاملات.</p>
        </div>
      </div>`
  }
}

export const article10Part2Chunk: ContentChunk = {
  id: 'article-10-part2',
  type: 'article-continuation',
  estimatedHeight: 120,
  keepWithNext: true,
  content: (ctx: LLCToSPCContext) => {
    const { manager } = ctx
    return `
      <!-- Article 10: Company Management - Part 2 -->
      <div class="article-pair">
        <div class="block">
          <p>5- The Managing Director is authorized jointly to open bank accounts with any bank ${manager.pronouns.subject} deems fit, operate and close the same, manage all the company bank accounts, issue, sign and endorse cheques and documents, withdraw, deposit, issue L/Cs, guarantees, transfers and sign on all applications related to the company activity.</p>
          <p>6- ${manager.pronouns.subject === 'she' ? 'She is' : 'He is'} also empowered to purchase all equipment, vehicles, materials, supplies, goods and movable assets and dispose of or sell them when needed by company name.</p>
          <p>7- To sign all the tenders, contracts, documents or receipts of financial or commercial nature on behalf of the company.</p>
          <p>8- To appoint and dismiss employees and consultants and fix their duties and remuneration as per U.A.E. Labour Laws.</p>
        </div>
        <div class="block rtl">
          <p>5- مدير الإدارة مفوض مجتمعين فتح الحسابات المصرفية باسم الشركة لدى أي بنك يراه مناسباً وتشغيلها وإقفالها وإدارة كافة الحسابات المصرفية للشركة وإصدار وتوقيع وتظهير الشيكات والمستندات والسحب والإيداع وإصدار خطابات الاعتماد والكفالات والتحويلات وتوقيع كافة الطلبات المتعلقة بنشاط الشركة.</p>
          <p>6- وله الحق شراء جميع المعدات والمركبات والمواد والمهمات والبضائع والمنقولات والتصرف بها أو بيعها عند الحاجة باسم الشركة.</p>
          <p>7- التوقيع على كافة العطاءات والعقود والمستندات والإيصالات ذات الصفة المالية أو التجارية نيابة عن الشركة.</p>
          <p>8- تعيين أو إنهاء خدمة الموظفين والمستشارين وتحديد واجباتهم ومكافآتهم وفقاً لقوانين العمل في دولة الإمارات العربية المتحدة.</p>
        </div>
      </div>`
  }
}

export const article10Part3Chunk: ContentChunk = {
  id: 'article-10-part3',
  type: 'article-continuation',
  estimatedHeight: 100,
  content: () => `
      <!-- Article 10: Company Management - Part 3 -->
      <div class="article-pair">
        <div class="block">
          <p>9- To represent before all the ministries and local authorities for establishing this company and do any other work in connection therewith.</p>
          <p>10- To authorize and sanction all vouchers/books/ledgers of accounts and payments particular with all expenses.</p>
          <p>11- To sub-delegate all or part of such powers to any other person after the approval of General Assembly.</p>
          <p>12- The appointment of the Managing Director cannot be revoked nor the powers stated herein curtailed except by a resolution of the General Meeting representing at least 51% of the share capital of the Company.</p>
        </div>
        <div class="block rtl">
          <p>9- التمثيل أمام كافة الوزارات والسلطات المحلية لتأسيس هذه الشركة والقيام بأي عمل يتعلق بهذا الشأن.</p>
          <p>10- اعتماد وتصديق كافة الفواتير والسندات والدفاتر الحسابية والدفعات الخاصة بكافة المصروفات.</p>
          <p>11- تفويض كل أو أي من هذه السلطات إلى أي شخص آخر بعد موافقة الجمعية العمومية.</p>
          <p>12- لا يجوز إلغاء تعيين المدير أو الحد من سلطاته الواردة في هذا العقد إلا بقرار صادر في الجمعية من قبل ما لا يقل عن 51% من رأسمال الشركة.</p>
        </div>
      </div>`
}

export const article11Chunk: ContentChunk = {
  id: 'article-11',
  type: 'article',
  estimatedHeight: 45,
  content: () => `
      <!-- Article 11: Company Communications -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (11): Company Communications</h3>
          <p>The Company communications referred to in this Memorandum whether between the Parties or between the Parties and the Company shall take the form of registered letters.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (11): تبليغات الشركة</h3>
          <p>تكون تبليغات الشركة المشار إليها في هذا العقد سواء كانت بين الشركاء أو بينهم وبين الشركة على هيئة خطابات مسجلة موصى عليها.</p>
        </div>
      </div>`
}

// ========================================
// CHAPTER IV: General Assembly
// ========================================

export const chapter4HeaderChunk: ContentChunk = {
  id: 'chapter-4',
  type: 'chapter',
  estimatedHeight: 25,
  keepWithNext: true,
  content: () => `
      <!-- Chapter IV: General Assembly -->
      <div class="article-pair">
        <div class="block chapter">
          <h3 class="underline center">CHAPTER IV</h3>
          <h3 class="center">General Assembly</h3>
        </div>
        <div class="block rtl chapter">
          <h3 class="underline center">الباب الرابع</h3>
          <h3 class="center">الجمعية العمومية</h3>
        </div>
      </div>`
}

export const article12Chunk: ContentChunk = {
  id: 'article-12',
  type: 'article',
  estimatedHeight: 45,
  content: () => `
      <!-- Article 12: General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (12): General Assembly</h3>
          <p>The General Assembly represents the sole owner and it may be convened only in Abu Dhabi City, Emirate of Abu Dhabi.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (12): الجمعية العمومية</h3>
          <p>تمثل الجمعية العمومية المالك الوحيد ولا يجوز انعقادها إلا في مدينة أبوظبي بإمارة أبوظبي.</p>
        </div>
      </div>`
}

export const article13Chunk: ContentChunk = {
  id: 'article-13',
  type: 'article',
  estimatedHeight: 45,
  content: (ctx: LLCToSPCContext) => {
    const { newOwner } = ctx
    return `
      <!-- Article 13: Attendance of General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (13): Attendance of General Assembly</h3>
          <p>The sole owner shall have the right to attend the General Assembly, whether personally or by proxy to represent ${newOwner.pronouns.object} in the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (13): حضور الجمعية العمومية</h3>
          <p>للمالك الوحيد حق حضور الجمعية العمومية سواء كان ذلك بطريقة شخصية أو بطريقة إنابة شخص آخر لتمثيله في الجمعية.</p>
        </div>
      </div>`
  }
}

export const article14Chunk: ContentChunk = {
  id: 'article-14',
  type: 'article',
  estimatedHeight: 50,
  content: (ctx: LLCToSPCContext) => {
    const { newOwner } = ctx
    return `
      <!-- Article 14: Presiding General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (14): Presiding General Assembly</h3>
          <p>The General Assembly shall be presided by the sole owner or ${newOwner.pronouns.possessive} deputy. The chairman shall appoint one reporter and two reviewers for votes counting, upon approval of the General Assembly.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (14): رئاسة الجمعية العمومية</h3>
          <p>يرأس الجمعية العمومية المالك الوحيد أو من ينوب عنه ويعين الرئيس مقرراً للاجتماع ومراجعين اثنين لفرز الأصوات على أن تقرر الجمعية العمومية تعيينهم.</p>
        </div>
      </div>`
  }
}

export const article15Chunk: ContentChunk = {
  id: 'article-15',
  type: 'article',
  estimatedHeight: 50,
  content: () => `
      <!-- Article 15: Invitation for General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (15): Invitation for General Assembly</h3>
          <p>Invitation for the General Assembly shall be served via registered letters within at least 14 days prior to the scheduled time. Invitation letter shall include the agenda, place and time of the meeting.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (15): الدعوة للجمعية العمومية</h3>
          <p>توجه الدعوة لحضور الجمعيات العمومية بموجب خطابات موصى عليها ترسل قبل موعد انعقادها بأربعة عشر يوم على الأقل. ويجب أن يتضمن خطاب الدعوة بيان جدول الأعمال ومكان الاجتماع وزمانه.</p>
        </div>
      </div>`
}

export const article16Chunk: ContentChunk = {
  id: 'article-16',
  type: 'article',
  estimatedHeight: 45,
  content: () => `
      <!-- Article 16: General Assembly Deliberations -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (16): General Assembly Deliberations</h3>
          <p>The general assembly may not deliberate any matter except those specified in the agenda; resolutions adopted by the general assembly shall be binding.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (16): مداولات الجمعية العمومية</h3>
          <p>لا يجوز للجمعية العمومية العادية أن تتداول في غير المسائل الواردة بجدول الأعمال المبين في خطاب الدعوة وتكون القرارات التي تصدرها الجمعية ملزمة.</p>
        </div>
      </div>`
}

export const article17Chunk: ContentChunk = {
  id: 'article-17',
  type: 'article',
  estimatedHeight: 100,
  content: () => `
      <!-- Article 17: Annual General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (17): Annual General Assembly</h3>
          <p>The general assembly shall be convened on yearly basis by invitation from the Board of Directors within four months following end of the financial year, particularly to hear Managing Director's report on financial position and activity, to approve the balance sheet and loss and profit account, and determine dividends to be distributed. And to appoint directors, determine their remuneration and other matters. Resolutions of the general assembly shall be valid only if they were issued by majority of votes representing not less than the capital. In the event of lack of quorum, the general assembly shall be convened within the following 14 days and the next meeting shall be valid regardless of the number of shares represented therein.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (17): الجمعية العمومية السنوية</h3>
          <p>تنعقد الجمعية العمومية كل سنة بناء على دعوة من مجلس إدارة الشركة خلال الأربعة أشهر التالية لنهاية السنة المالية للشركة وتجتمع على الأخص لسماع تقرير المدير التنفيذي عن نشاط الشركة ومركزها المالي والتصديق على الميزانية العمومية وحساب الأرباح والخسائر وتحديد حصص الأرباح التي توزع وتعيين المديرين وتحديد مكافأتهم وغير ذلك من المسائل. ولا تكون قرارات الجمعية صحيحة إلا إذا صدرت بأغلبية الأصوات التي تمثل رأس المال على الأقل. وفي حالة عدم توفر النصاب لصحة الاجتماع الأول، تعين عقد الجمعية العمومية ثانية خلال 14 يوما التالية ويعتبر اجتماعها الثاني صحيحا مهما كان عدد الحصص الممثلة فيه.</p>
        </div>
      </div>`
}

export const article18Chunk: ContentChunk = {
  id: 'article-18',
  type: 'article',
  estimatedHeight: 50,
  content: () => `
      <!-- Article 18: Extraordinary General Assembly -->
      <div class="article-pair">
        <div class="block">
          <h3 class="underline center">Article (18): Extraordinary General Assembly</h3>
          <p>The extra ordinary general assembly shall have the right to amend the memorandum of association. As for resolutions discharging the director, 51% of the votes shall be sufficient.</p>
        </div>
        <div class="block rtl">
          <h3 class="underline center">المادة (18): الجمعية العمومية غير العادية</h3>
          <p>للجمعية العمومية الغير عادية أن تعدل عقد تأسيس الشركة على أنه في حالة التصويت على القرارات الخاصة بإبراء ذمة المدير، يكتفى بأكثرية أصوات تمثل 51% من رأس المال.</p>
        </div>
      </div>`
}

// Export all MOA chunks in order
export const moaChunks: ContentChunk[] = [
  // Chapter II
  chapter2HeaderChunk,
  article6Chunk,
  article7Chunk,
  article8Chunk,
  article9Chunk,
  // Chapter III
  chapter3HeaderChunk,
  article10Part1Chunk,
  article10Part2Chunk,
  article10Part3Chunk,
  article11Chunk,
  // Chapter IV
  chapter4HeaderChunk,
  article12Chunk,
  article13Chunk,
  article14Chunk,
  article15Chunk,
  article16Chunk,
  article17Chunk,
  article18Chunk
]
