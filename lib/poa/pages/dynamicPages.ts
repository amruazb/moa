import { POAContext, poaPageFooter, yearsToWords } from '../types'

interface POABlock {
    html: string;
    weight: number;
}

function collectContentBlocks(ctx: POAContext): POABlock[] {
    const { sections, principals, validity } = ctx;
    const blocks: POABlock[] = [];

    let currentSectionNum = sections.executeTransactions ? 2 : 1;

    if (sections.executeTransactions) {
        blocks.push({
            weight: 12,
            html: `
      <!-- Section 1 (cont.): Execute Transactions -->
      <div class="article-pair">
        <div class="block">
          <p>Municipality, Courts, Police Stations, General Directorate for Residence and Expatriates Affairs, Federal Authority for Identity and Citizenship, Waste Management, Health Insurance Authority, Procurement Dept, Department of Transport, Traffic and License Department, Seaports, Customs, Posts, Etisalat, Du, Daman, Civil Defense, National Guard Protection Department (NGPD), Water and Electricity Authority, Federal Tax Authority, Airports, Banks, Private and Public Companies, Establishments, Individuals, receive deliver and submit all applications, documents, and transactions, and to sign the same.</p>
        </div>
        <div class="block rtl">
          <p>والبلدية والمحاكم ومراكز الشـــرطة والإقامة والأجانب والهيئة الاتحادية للهوية والجنسيـــة وإدارة النفايات وهيئة التأمين الصحي ودائرة المشتريات ودائر النقل والمرور والترخيص والموانئ والجمـــارك والبريد والاتصالات ودو ودمان والدفاع المدني وجهاز حماية المنشـــآت الحيوية والسواحل وهيئة الماء والكهرباء (شـــركة طاقة للتوزيع) والهيئة الاتحادية للضـــرائب والمطارات والبنوك والشـــركات الخاصة والعامة والمؤسسات والأفراد واستلام وتسـليم وتقديم كافة الطلبات والمستندات والمعاملات والتوقيع عليـــها.</p>
        </div>
      </div>`
        });
    }

    if (sections.employees) {
        blocks.push({
            weight: 8,
            html: `
      <!-- Section ${currentSectionNum}: Employees -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Employees:</span></p>
          <p>To appoint employees and workers, terminate their services, sign their contracts, and pay their salaries; to obtain, renew, receive and cancel residence visas, work permits, and labor cards; to apply for issuance of absconding notices against workers, cancel the same and to deport employees.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الموظفين :</span></p>
          <p>تعيين الموظفين والعمال وإنهاء خدماتهم والتوقيع على عقودهم ودفع رواتبهم وطلب التأشيرات والبطاقات والأقامات وتجديدها واستلامها والغاءها والتعميم على العمال وفك التعميم وتسفيرهم.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.purchase) {
        blocks.push({
            weight: 8,
            html: `
      <!-- Section ${currentSectionNum}: Purchase Materials & Goods -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To Purchase:</span></p>
          <p>To purchase, and assign all materials, goods, and equipment required for the license; to enter into purchase agreements and sign all related documents on behalf of the license before all concerned authorities and parties.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الشراء:</span></p>
          <p>شراء والتنازل عن جميع المواد والبضائع والمعدات اللازمة للرخصة، وإبرام عقود الشراء والتوقيع على جميع الوثائق ذات الصلة نيابة عن الرخصة أمام جميع الجهات والأطراف المعنية.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.motorVehicles) {
        blocks.push({
            weight: 10,
            html: `
      <!-- Section ${currentSectionNum}: Motor Vehicles -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Motor Vehicles:</span></p>
          <p>To purchase, register, transfer ownership, sell, renew and deregister all types of vehicles before all competent traffic authorities in the UAE, including Abu Dhabi Police (Vehicles and Drivers Licensing Department) and Dubai Roads and Transport Authority (RTA), and to submit, receive, sign and collect all vehicle-related applications, forms, permits, ownership documents and registration cards.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">السيارات:</span></p>
          <p>شراء وتسجيل ونقل الملكية وبيع وتجديد وإسقاط جميع أنواع المركبات أمام جميع الجهات المرورية المختصة في دولة الإمارات، بما في ذلك شرطة أبوظبي (إدارة ترخيص السائقين والمركبات) وهيئة الطرق والمواصلات في دبي، وتقديم واستلام والتوقيع على جميع الطلبات والنماذج والتصاريح ووثائق الملكية وبطاقات تسجيل المركبات.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.utilities) {
        blocks.push({
            weight: 10,
            html: `
      <!-- Section ${currentSectionNum}: Utilities -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Utilities:</span></p>
          <p>To apply for telephone, fax, internet, water, electricity, (TAQA Distribution company) and other utilities/services; to sign application forms and pay charges, fines and utility bills with the right to have those utilities disconnected and cancelled temporarily or permanently or have them re-connected, and to pay security deposits for the same and receive the same in cash or by cheques, and cash the cheques.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">الخدمات:</span></p>
          <p>تقــديم وإدخـــال خـــدمات الهـــاتف والفـــاكس والإنترنت والكهرباء والميـاه (شركة طاقة للتوزيع) وغيرهـــا مـــن الخـــدمات والوسائل ؛ على نماذج وطلبات التقديم ودفع الرسوم على فواتير الخـــدمات ولهـم الحق في قطـع وإلغاء تلك الخدمات نهائيا امؤقـــتا واعادتهـــا مـــرة أخـــرى ولتقـــديم الضـــمانات والكفـــالات المتعلقـــة بتلـــك الخـــدمات واستلامها ســواء نقدا أو بشيكات وصرفها.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.banks) {
        const bankLoanTextEn = sections.banksWithLoan
            ? 'and avail vehicle loan facilities, with cash loan from any banks operating in the country'
            : 'without any loan or credit facilities from any bank in UAE';

        const bankLoanTextAr = sections.banksWithLoan
            ? 'بالحصـــول على تسهيلات قروض السيارات وبقروض نقدية من البنـــوك العاملة في الدولة'
            : 'بدون أي قروض أو تسهيلات ائتمانية من أي بنك في دولة الإمارات العربية المتحدة';

        const chequeEnParts: string[] = [];
        if (!sections.noChequeBooks) chequeEnParts.push('request for cheques books');
        if (!sections.noSignCheques) chequeEnParts.push('sign the cheques');
        const chequeEnText = chequeEnParts.length > 0 ? `, and ${chequeEnParts.join(', ')}` : '';

        const chequeArParts: string[] = [];
        if (!sections.noChequeBooks) chequeArParts.push('طلب دفتر الشيكات ووتسلمها');
        if (!sections.noSignCheques) chequeArParts.push('التوقيع على الشيـــكات واستــلامها وصرفها');
        const chequeArText = chequeArParts.length > 0 ? ` و${chequeArParts.join(' و')}` : '';

        const loanEnText = sections.noLoansFacilities ? '' : ' and avail all types of banks guarantees and facilities on behalf of the license and cash them';
        const loanArText = sections.noLoansFacilities ? '' : ' وطلب ضمـــانات و تسهيلات البنكية بجميع أنواعها نيابة عن الرخصـــة وصرفهـــا';

        blocks.push({
            weight: 14,
            html: `
      <!-- Section ${currentSectionNum}: Banks -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Banks:</span></p>
          <p>To open, operate, manage and close company accounts at banks, and withdraw and deposit cash${chequeEnText}${loanEnText}, electronic banking, fixing and using of electronic cash machines, close and end all kind of transactions and formalities with bank related to the license, ${bankLoanTextEn}.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">البنوك:</span></p>
          <p>فتح وأدل عل وإدارة الحسابات الموجودة والجديدة والغائها والإيداع فهيا${chequeArText}${loanArText}، والإجراءات البنك الالكتروني وتركيـــب واستخدام المـاكينات البنك الالكتروني وإنهاء وإغلـق جميـــع المعـاملات والإجـراءات البنـــكية المتعلقة بالرخصـة، ${bankLoanTextAr}.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.contracts) {
        blocks.push({
            weight: 10,
            html: `
      <!-- Section ${currentSectionNum}: Execute Contracts -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Execute contracts:</span></p>
          <p>To sign all types of contracts and their annex, including MOA and service agent contracts, entering and signing coalition contracts, entering into tenders related submissions, termination of all related procedures, and contracts. The attorney has the right to sign the renewal of tenancy contracts and has the right to cancel them, as well as the right to sign new lease contracts.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">إبرام العقود:</span></p>
          <p>التوقيع علـى كافــة أنـواع العقـود وملاحقهـا ومنهـا عقـود التأسيس وعقود وكيل خدمات، والدخول في عقود الائتلاف والتوقيع عليها، والدخـول فـي المناقصـات المتعلقـة بتقديم عروض المشـاريع وإنهـاء كافـــة الإجـراءات والمتعلقة وفسخ العقود. وللوكيل حق التوقيع لتجديد عقـود الإيجـار ولهم لحـق فـي فسخها كمـا لهم الحق في التوقيع على عقـود الإيجار الجديدة.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.receivables) {
        blocks.push({
            weight: 8,
            html: `
      <!-- Section ${currentSectionNum}: Collect Receivables -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To collect Receivables:</span></p>
          <p>To receive and collect all the amounts due to the above-mentioned license, whether in cash or by cheques, to sign receipt vouchers, to cash cheques from drawee banks, and to receive guarantees and deposits and cash the same.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">استلام المبالغ:</span></p>
          <p>استلام كافة المستحقات والمبالغ لكل الرخصة المذكورة اعلاه سواء نقدا أو بشيكات والتوقيع على إيصلات الاستلام وصرف الشيكات من البنوك المسحوب عليها واستلام الضمانات والكفالات وصرفها.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.licenseTransfer) {
        blocks.push({
            weight: 9,
            html: `
      <!-- Section ${currentSectionNum}: License Transfer -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">License Transfer:</span></p>
          <p>To transfer, assign, or sell the above-mentioned trade license, in whole or in part, to any person or entity, and to sign all documents and agreements related to such transfer before the Department of Economic Development and any other concerned authority, and to complete all necessary procedures and formalities in connection therewith.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">نقل الرخصة:</span></p>
          <p>نقل والتنازل عن الرخصة التجارية المذكورة أعلاه كلياً أو جزئياً إلى أي شخص أو جهة، والتوقيع على جميع المستندات والعقود المتعلقة بهذا النقل أمام دائرة التنمية الاقتصادية وسائر الجهات المختصة، والإتمام كافة الإجراءات والمعاملات اللازمة في هذا الشأن.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.smartHub) {
        blocks.push({
            weight: 8,
            html: `
      <!-- Section ${currentSectionNum}: DMT Smart Hub / TAMM -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">Smart Hub / TAMM (DMT):</span></p>
          <p>To manage the above-mentioned company and represent it before the Department of Municipalities and Transport (DMT) – Abu Dhabi, the Smart Hub platform and the TAMM platform, and to register, open, manage and operate the company's account on DMT Smart Hub / TAMM, and to submit, sign and follow up all applications, transactions and documents related thereto, and to receive their outputs.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">المركز الذكي / تم (دائرة البلديات والنقل):</span></p>
          <p>إدارة الشركة المذكورة أعلاه وتمثيلها أمام دائرة البلديات والنقل – أبوظبي ومنصة المركز الذكي (Smart Hub) ومنصة تم (TAMM)، وتسجيل وفتح وإدارة وتشغيل حساب الشركة على المركز الذكي / تم، وتقديم والتوقيع على ومتابعة كافة الطلبات والمعاملات والمستندات المتعلقة بذلك واستلام مخرجاتها.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    if (sections.approachCourts) {
        blocks.push({
            weight: 15,
            html: `
      <!-- Section ${currentSectionNum}: Approach Courts -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">To approach Courts:</span></p>
          <p>To report to all courts of law with respect to the lawsuits related to the license with the right to lodge complaints with police centers and public prosecution and give up the same; to file lawsuits before courts of all kinds and levels, and public prosecution and give up the same, with the power to compromise, settle, admit, make statements, release, deny, and arbitrate, to accept or refuse taking oath or to administer oath, to abandon legal proceedings, to give up court judgement or challenge the same, to cancel attachment or give up security deposits, to make a claim for forgery or to reject judges or experts in whole or part and to appoint and discharge advocates/ lawyers, and to appoint liquidators and chartered accountants.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;<span class="section-title">مراجعة المحاكم:</span></p>
          <p>مراجعـة كافـة المحـاكم بخصـوص القضـايا المتعلقة بالرخصـة ولهـم الحـق فـي فتـح البلاغات لدى مراكز الشـرطة والنيابة العامة والتنازل عنهـا ورفـع القضـايا لـدى المحـاكم بمختلف أنواعهـا ودرجاتهـا كمـا لدى أمـام النيابة العامة والتنـازل عنهـا كمـا لهـا حـق الصـلح والإقـرار والتسـوية والإبـراء والإنكـار والصلح والتحكيم وقبـول اليميـن توجيههـا أو ردهـا وتـرك الخصومة أو التنازل عن الحكم كليا أو جزئيا أو من طريق الطعن فيه، شـرئ الضمان قيمه أو رفـع الحجـز أو تـرك التأمينات مـع بقـاء الديـن أو الإدعـاء بالتزوير أو القبض أو الحضـر كليا أو جزئيـا كمـا أو رد القضـاء فـي توكيـل المحـامين وعـزلهم وتعيين المصفين والمحاسبين القانونيين.</p>
        </div>
      </div>`
        });
        currentSectionNum++;
    }

    const yearsWord = yearsToWords(validity.years);
    blocks.push({
        weight: 5,
        html: `
      <!-- Section ${currentSectionNum}: Validity Period -->
      <div class="numbered-section">
        <div class="block">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;This power attorney shall be valid up to <span class="edited">${yearsWord.en} years</span> from the date of attestation of the same by the notary public, unless it becomes invalid before that date for any other reason.</p>
        </div>
        <div class="block rtl">
          <p><strong>${currentSectionNum}</strong>&nbsp;&nbsp;&nbsp;يسـري هـذا التوكيـل لمـدة <span class="edited">${yearsWord.ar}</span> من تاريخ تصديقه لدى كاتب العدل مـا لم ينتهي قبـل ذلـك بسـبب أخـر ، وهيـ ة رجـوع اعتمـاد توقيعها لديكم</p>
        </div>
      </div>`
    });

    // All principals' signature cards form ONE block so they always stay together on the last page
    // (2 compact cards per row, centered, for 3+ principals).
    const grid = principals.length >= 3
    const cards = principals.map((principal) => `
      <div class="signature-block-single-wrap" style="${grid ? 'width: calc(50% - 6px);' : ''}">
        <div class="signature-block-single" style="padding: ${grid ? '8px 12px' : '12px 20px'}; margin-bottom: ${grid ? 10 : 12}px;">
          <div class="signature-block-single-content">
            <p class="signature-block-single-title"><strong>The Principal</strong><span class="signature-block-single-sep">|</span><strong dir="rtl">الموكل</strong></p>
            <p><span class="edited">${principal.pronouns.title} ${principal.name}</span></p>
            <p dir="rtl"><span class="edited">${principal.pronouns.titleAr} / ${principal.nameAr}</span></p>
            ${principal.isRepresented && principal.representative ? `
            <p><strong>Represented by</strong><span class="signature-block-single-sep">|</span><strong dir="rtl">ممثل بـ</strong></p>
            <p><span class="edited">${principal.representative.pronouns.title} ${principal.representative.name}</span></p>
            <p dir="rtl"><span class="edited">${principal.representative.pronouns.titleAr} / ${principal.representative.nameAr}</span></p>
            <p>Emirates ID No. / رقم الهوية: <span class="edited" dir="ltr">${principal.representative.eidOrPassport}</span></p>
            <p>POA No. / رقم التوكيل: <span class="edited">${principal.representative.poaNumber}</span> (${principal.representative.poaDate})</p>
            ` : ''}
          </div>
          <div class="signature-line-single" style="margin-top: ${grid ? 36 : 48}px; height: 6px; width: 70%;"></div>
          <p class="signature-block-single-content"><strong>Signature</strong><span class="signature-block-single-sep">|</span><strong dir="rtl">التوقيع</strong></p>
        </div>
      </div>`).join('')
    blocks.push({
        weight: principals.reduce((w, p) => w + (grid ? 9 : 16) + (p.isRepresented ? 6 : 0), 0),
        html: `
      <div class="signature-flow" style="margin-top: 24px;${grid ? ' display: flex; flex-wrap: wrap; justify-content: center; gap: 0 12px;' : ''}">${cards}
      </div>`
    });

    return blocks;
}

export function contentFlowBlocks(ctx: POAContext): string[] {
    return collectContentBlocks(ctx).map((block) => block.html);
}

export function generateDynamicPages(ctx: POAContext, startPageNum: number = 2): string {
    const blocks = collectContentBlocks(ctx);

    // Chunking algorithm
    const pages: string[] = [];
    const maxWeightPerPage = 40; // Reduced from 42 for safer fit
    let currentChunk: string[] = [];
    let currentWeight = 0;
    
    for (const block of blocks) {
        if (currentWeight + block.weight > maxWeightPerPage && currentChunk.length > 0) {
            pages.push(currentChunk.join('\n'));
            currentChunk = [];
            currentWeight = 0;
        }
        currentChunk.push(block.html);
        currentWeight += block.weight;
    }
    
    if (currentChunk.length > 0) {
        pages.push(currentChunk.join('\n'));
    }

    return pages.map((pageHtml, index) => {
        const pageNum = startPageNum + index;
        return `
    <div class="page">
      <div class="page-content">
        ${pageHtml}
      </div>
      ${poaPageFooter(pageNum, index === pages.length - 1)}
    </div>`;
    }).join('\n');
}
