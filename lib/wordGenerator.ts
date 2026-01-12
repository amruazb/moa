/**
 * Word Document Generator for LLC MOA
 * Generates a bilingual (English/Arabic) Word document from extracted data
 * Uses two-column table layout to match the HTML/PDF format
 */

import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    BorderStyle,
    Header,
    Footer,
    PageNumber,
    VerticalAlign,
    TableLayoutType,
    ShadingType
} from 'docx'
import { saveAs } from 'file-saver'
import { DocumentData } from '@/store/documentStore'
import { Partner } from './llc_moa/types'

// Create a bilingual row (English left | Arabic right) using a table
function createBilingualTable(englishContent: Paragraph[], arabicContent: Paragraph[]): Table {
    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        borders: {
            top: { style: BorderStyle.NONE },
            bottom: { style: BorderStyle.NONE },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.NONE },
            insideVertical: { style: BorderStyle.NONE }
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.TOP,
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE }
                        },
                        children: englishContent
                    }),
                    new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        verticalAlign: VerticalAlign.TOP,
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE }
                        },
                        children: arabicContent
                    })
                ]
            })
        ]
    })
}

// Create section header bar (shaded background)
function createSectionBar(englishText: string, arabicText: string): Table {
    return new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.FIXED,
        borders: {
            top: { style: BorderStyle.SINGLE, size: 1 },
            bottom: { style: BorderStyle.SINGLE, size: 1 },
            left: { style: BorderStyle.SINGLE, size: 1 },
            right: { style: BorderStyle.SINGLE, size: 1 }
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        shading: { fill: 'E8E8E8', type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [new TextRun({ text: englishText, bold: true, size: 22 })]
                            })
                        ]
                    }),
                    new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        shading: { fill: 'E8E8E8', type: ShadingType.CLEAR },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                bidirectional: true,
                                children: [new TextRun({ text: arabicText, bold: true, size: 22, rightToLeft: true })]
                            })
                        ]
                    })
                ]
            })
        ]
    })
}

// Create article header row
function createArticleHeader(articleNum: number): Table {
    return createBilingualTable(
        [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 100, after: 100 },
                children: [
                    new TextRun({ text: `Article (${articleNum})`, bold: true, underline: {}, size: 22 })
                ]
            })
        ],
        [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                bidirectional: true,
                spacing: { before: 100, after: 100 },
                children: [
                    new TextRun({ text: `المادة (${articleNum})`, bold: true, underline: {}, size: 22, rightToLeft: true })
                ]
            })
        ]
    )
}

// Create a bilingual paragraph row
function createBilingualParagraph(englishText: string, arabicText: string): Table {
    return createBilingualTable(
        [
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 150 },
                children: [new TextRun({ text: englishText, size: 20 })]
            })
        ],
        [
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                bidirectional: true,
                spacing: { after: 150 },
                children: [new TextRun({ text: arabicText, size: 20, rightToLeft: true })]
            })
        ]
    )
}

// Create partner shares table (side by side English and Arabic tables)
function createSharesTable(partners: Partner[], capital: number, totalShares: number, shareValue: number): Table[] {
    // Arabic table (right side in document flow)
    const arabicRows = [
        new TableRow({
            tableHeader: true,
            children: [
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: 'نسبة المشاركة', bold: true, size: 18, rightToLeft: true })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: 'القيمة', bold: true, size: 18, rightToLeft: true })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: 'عدد الحصص', bold: true, size: 18, rightToLeft: true })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, bidirectional: true, children: [new TextRun({ text: 'اسم الشريك', bold: true, size: 18, rightToLeft: true })] })] })
            ]
        }),
        ...partners.map(partner => {
            const value = (partner.shareCount || 0) * shareValue
            return new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${partner.sharePercent || 0}%`, size: 18 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: value.toLocaleString(), size: 18 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(partner.shareCount || 0), size: 18 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, bidirectional: true, children: [new TextRun({ text: partner.nameAr || '', size: 18, rightToLeft: true })] })] })
                ]
            })
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '100%', bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: capital.toLocaleString(), bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(totalShares), bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, bidirectional: true, children: [new TextRun({ text: 'الإجمالي', bold: true, size: 18, rightToLeft: true })] })] })
            ]
        })
    ]

    const arabicTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: arabicRows
    })

    // English table
    const englishRows = [
        new TableRow({
            tableHeader: true,
            children: [
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: 'Name of Partner', bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'No. of Shares', bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Value', bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Percentage', bold: true, size: 18 })] })] })
            ]
        }),
        ...partners.map(partner => {
            const value = (partner.shareCount || 0) * shareValue
            return new TableRow({
                children: [
                    new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: partner.name || '', size: 18 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(partner.shareCount || 0), size: 18 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: value.toLocaleString(), size: 18 })] })] }),
                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${partner.sharePercent || 0}%`, size: 18 })] })] })
                ]
            })
        }),
        new TableRow({
            children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: 'Total', bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: String(totalShares), bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: capital.toLocaleString(), bold: true, size: 18 })] })] }),
                new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '100%', bold: true, size: 18 })] })] })
            ]
        })
    ]

    const englishTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: englishRows
    })

    return [arabicTable, new Paragraph({ spacing: { after: 200 }, children: [] }), englishTable]
}

// Helper functions for ordinals
function getOrdinal(n: number): string {
    const ordinals = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
    return ordinals[n] || `${n}th`
}

function getOrdinalAr(n: number): string {
    const ordinals = ['', 'الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر']
    return ordinals[n] || `${n}`
}

export async function generateLLCMoaDocx(extractedData: DocumentData): Promise<void> {
    const company = extractedData.company || {}
    const sourceParties = extractedData.sourceParties || []
    const capitalData = extractedData.capital
    const capital = capitalData?.totalCapital || 0
    const companyName = company?.name || 'Company'
    const companyNameAr = company?.nameAr || 'الشركة'
    const licenseNo = company?.licenseNumber || ''
    const emirate = company?.emirate || 'Abu Dhabi'
    const emirateAr = company?.emirateAr || 'أبوظبي'

    const totalShares = capitalData?.shareCount || 100
    const shareValue = capitalData?.shareValue || (capital / totalShares) || 0

    // Convert sourceParties to Partner-like objects for generating tables
    const partners: Partner[] = sourceParties.map((party, index: number) => {
        const shareCount = Math.floor(totalShares / sourceParties.length)
        return {
            name: party.name || '',
            nameAr: party.nameAr || '',
            salutation: (party.salutation || 'ms') as 'mr' | 'ms' | 'mrs',
            pronouns: { title: '', titleAr: '', subject: '', subjectAr: '', object: '', objectAr: '', possessive: '', possessiveAr: '', reflexive: '', reflexiveAr: '' },
            nationality: party.nationality || '',
            nationalityAr: party.nationalityAr || '',
            eid: party.eidNumber || '',
            passport: party.passportNumber || '',
            eidOrPassport: party.eidNumber || party.passportNumber || '',
            documentType: (party.documentType || 'eid') as 'eid' | 'passport',
            dob: party.dob || '',
            address: party.address || '',
            addressAr: party.addressAr || '',
            shareCount,
            sharePercent: totalShares > 0 ? Math.round((shareCount / totalShares) * 100) : 0
        }
    })

    // Generate partner details tables
    const partnerTables: Table[] = []
    partners.forEach((partner: Partner, index: number) => {
        const ordinal = getOrdinal(index + 1)
        const ordinalAr = getOrdinalAr(index + 1)

        partnerTables.push(
            createBilingualTable(
                [
                    new Paragraph({
                        spacing: { before: 100, after: 50 },
                        children: [
                            new TextRun({ text: `${ordinal} Partner: `, bold: true, size: 20 }),
                            new TextRun({ text: partner.name || '', size: 20 })
                        ]
                    }),
                    new Paragraph({
                        spacing: { after: 50 },
                        children: [
                            new TextRun({ text: `Nationality: ${partner.nationality || ''}`, size: 18 })
                        ]
                    }),
                    new Paragraph({
                        spacing: { after: 100 },
                        children: [
                            new TextRun({ text: `EID/Passport: ${partner.eid || ''}`, size: 18 })
                        ]
                    })
                ],
                [
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        bidirectional: true,
                        spacing: { before: 100, after: 50 },
                        children: [
                            new TextRun({ text: `الشريك ${ordinalAr}: `, bold: true, size: 20, rightToLeft: true }),
                            new TextRun({ text: partner.nameAr || '', size: 20, rightToLeft: true })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        bidirectional: true,
                        spacing: { after: 50 },
                        children: [
                            new TextRun({ text: `الجنسية: ${partner.nationalityAr || ''}`, size: 18, rightToLeft: true })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        bidirectional: true,
                        spacing: { after: 100 },
                        children: [
                            new TextRun({ text: `الهوية/الجواز: ${partner.eid || ''}`, size: 18, rightToLeft: true })
                        ]
                    })
                ]
            )
        )
    })

    // Create the document
    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 720, right: 720, bottom: 1440, left: 720 }
                    }
                },
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({ text: 'MEMORANDUM OF ASSOCIATION', bold: true, size: 24, italics: true }),
                                    new TextRun({ text: '   ', size: 24 }),
                                    new TextRun({ text: 'عقد تأسيس', bold: true, size: 24, italics: true, rightToLeft: true })
                                ]
                            })
                        ]
                    })
                },
                footers: {
                    default: new Footer({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({ text: 'Page ' }),
                                    new TextRun({ children: [PageNumber.CURRENT] }),
                                    new TextRun({ text: ' / صفحة' })
                                ]
                            })
                        ]
                    })
                },
                children: [
                    // Document Title
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 100 },
                        children: [
                            new TextRun({ text: 'LIMITED LIABILITY COMPANY', bold: true, size: 28 })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 300 },
                        children: [
                            new TextRun({ text: 'شركة ذات مسؤولية محدودة', bold: true, size: 28, rightToLeft: true })
                        ]
                    }),

                    // Chapter I
                    createSectionBar('CHAPTER I', 'الباب الأول'),
                    createSectionBar('Company Formation', 'تأسيس الشركة'),

                    // Article 1 - Company Name
                    createArticleHeader(1),
                    createBilingualParagraph(
                        `A Limited Liability Company is hereby established under the name: "${companyName}"`,
                        `تأسست بموجب هذا العقد شركة ذات مسؤولية محدودة باسم: "${companyNameAr}"`
                    ),

                    // Article 2 - Partners
                    createArticleHeader(2),
                    createBilingualParagraph(
                        'The partners comprising the Company are:',
                        'الشركاء الذين تتألف منهم الشركة هم:'
                    ),
                    ...partnerTables,

                    // Article 3 - Purpose
                    createArticleHeader(3),
                    createBilingualParagraph(
                        `The purpose of the Company is to conduct business activities as permitted by the Commercial License No. ${licenseNo}.`,
                        `غرض الشركة هو مزاولة الأنشطة التجارية المصرح بها بموجب الرخصة التجارية رقم ${licenseNo}.`
                    ),

                    // Article 4 - Duration
                    createArticleHeader(4),
                    createBilingualParagraph(
                        'The duration of the Company shall be unlimited, commencing from the date of its registration in the Commercial Register.',
                        'مدة الشركة غير محددة تبدأ من تاريخ قيدها بالسجل التجاري.'
                    ),

                    // Article 5 - Head Office
                    createArticleHeader(5),
                    createBilingualParagraph(
                        `The head office of the Company shall be in ${emirate}. The General Assembly of the partners may transfer the head office of the company to another location in the same Emirate or decide to establish branches in the United Arab Emirates.`,
                        `يكون مركز الشركة الرئيسي في ${emirateAr}، ويجوز بقرار من الجمعية العمومية نقل المركز الرئيسي إلى أية جهة أخرى في نفس الإمارة كما يجوز له أن يقرر إنشاء فروع في دولة الإمارات العربية المتحدة.`
                    ),

                    // Chapter II - Capital
                    createSectionBar('CHAPTER II', 'الباب الثاني'),
                    createSectionBar('Capital and Shares', 'رأس المال – الحصص'),

                    // Article 6 - Capital
                    createArticleHeader(6),
                    createBilingualParagraph(
                        `The Capital of the company is determined to be AED ${capital.toLocaleString()}, distributed into ${totalShares} equal shares. The value of each share is AED ${shareValue.toLocaleString()}. These shares are distributed among the partners as follows:`,
                        `حدد رأس مال الشركة بمبلغ ${capital.toLocaleString()} درهم موزعة إلى ${totalShares} حصة متساوية قيمة كل حصة ${shareValue.toLocaleString()} درهم. وهذه الحصص تقسم بين الشركاء على الوجه الآتي:`
                    ),
                    ...createSharesTable(partners, capital, totalShares, shareValue),

                    createBilingualParagraph(
                        'The Partners of the Company Share Capital declare that the value of the cash shares has been paid in full and has been deposited in the company\'s bank account.',
                        'ويقر الشركاء في رأس مال الشركة أن قيمة الحصص النقدية دفعت بالكامل وأودعت في حساب البنك للشركة.'
                    ),

                    // Article 7 - Share Transfer
                    createArticleHeader(7),
                    createBilingualParagraph(
                        'The shares in the Company may not be divided. If two or more persons acquire a single share, they must elect one of them to represent them in exercising the rights pertaining to the share. The partners shall be jointly liable for the obligations resulting from such ownership.',
                        'لا يجوز تجزئة الحصة في هذه الشركة فإذا تملك حصة واحدة شخصان أو أكثر وجب عليهم أن يختاروا أحدهم لينوب عنهم في استعمال الحقوق المتصلة بالحصة ويكون هؤلاء الشركاء مسؤولين بالتضامن عن الالتزامات الناتجة عن تملكهم للحصة.'
                    ),

                    // Article 8 - Transfer of Shares
                    createArticleHeader(8),
                    createBilingualParagraph(
                        'A partner may assign his share in the Company to another partner or to a third party with the approval of the other partner(s). The assignment deed shall be registered in a special register to be kept at the head office of the Company.',
                        'يجوز للشريك التنازل عن حصته في الشركة لشريك آخر أو لشخص أجنبي بشرط موافقة الشريك الآخر/ الشركاء الآخرين. ولا يكون للتنازل أي أثر تجاه الشركة أو الغير إلا من تاريخ قيده في السجل الخاص بذلك الذي يحتفظ به في المركز الرئيسي للشركة.'
                    )
                ]
            }
        ]
    })

    // Generate and save the document
    const blob = await Packer.toBlob(doc)
    saveAs(blob, `LLC_MOA_${companyName}.docx`)
}
