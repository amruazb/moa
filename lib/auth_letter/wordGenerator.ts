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
} from 'docx'
import { saveAs } from 'file-saver'
import { AuthLetterContext } from './types'
import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
    return FONT_SIZES.find(s => s.value === size)?.basePt || 10
}

// Create a bilingual row (English left | Arabic right) using a table
function createBilingualTable(englishContent: Paragraph[], arabicContent: Paragraph[], settings?: FontSettings): Table {
    const columnRatio = settings?.columnRatio ?? 0.5
    const englishPercent = Math.round(columnRatio * 100)
    const arabicPercent = 100 - englishPercent

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
                        width: { size: englishPercent, type: WidthType.PERCENTAGE },
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
                        width: { size: arabicPercent, type: WidthType.PERCENTAGE },
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

// Create a bilingual paragraph row
function createBilingualParagraph(englishText: string, arabicText: string, settings?: FontSettings, spacing = 150): Table {
    const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
    const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')

    return createBilingualTable(
        [
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: spacing },
                children: [new TextRun({ text: englishText, size: englishPt * 2 })]
            })
        ],
        [
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                bidirectional: true,
                spacing: { after: spacing },
                children: [new TextRun({ text: arabicText, size: arabicPt * 2, rightToLeft: true })]
            })
        ],
        settings
    )
}

export async function generateAuthLetterDocx(ctx: AuthLetterContext, settings?: FontSettings): Promise<void> {
    const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
    const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 720, right: 720, bottom: 720, left: 720 }
                    }
                },
                footers: {
                    default: new Footer({
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({ text: 'Page ' }),
                                    new TextRun({ children: [PageNumber.CURRENT] }),
                                ]
                            })
                        ]
                    })
                },
                children: [
                    // Title
                    createBilingualTable(
                        [
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                spacing: { after: 300 },
                                children: [new TextRun({ text: 'AUTHORIZATION LETTER', bold: true, size: (englishPt + 4) * 2 })]
                            })
                        ],
                        [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                bidirectional: true,
                                spacing: { after: 300 },
                                children: [new TextRun({ text: 'خطاب تفويض', bold: true, size: (arabicPt + 4) * 2, rightToLeft: true })]
                            })
                        ],
                        settings
                    ),

                    // Date
                    createBilingualParagraph(`Date: ${ctx.date}`, `التاريخ: ${ctx.date}`, settings, 300),

                    // Salutation
                    createBilingualParagraph('To Whom It May Concern,', 'إلى من يهمه الأمر،', settings, 400),

                    // Body 1
                    createBilingualParagraph(
                        `This is to certify that Mr. ${ctx.employee.name}, holding Emirates ID No. ${ctx.employee.eid}, is employed with ${ctx.companyName} as ${ctx.employee.jobTitle}.`,
                        `نشهد بأن السيد/ ${ctx.employee.nameAr}، والذي يحمل بطاقة هوية إماراتية رقم ${ctx.employee.eid}، موظف لدى ${ctx.companyNameAr} بمهنة ${ctx.employee.jobTitleAr}.`,
                        settings,
                        300
                    ),

                    // Body 2
                    createBilingualParagraph(
                        `We hereby authorize him to use and operate the company vehicle bearing Plate No. ${ctx.vehicle.plateNo}, registered in ${ctx.vehicle.registrationCity}, United Arab Emirates. The above-mentioned vehicle has been officially issued by the company for carrying out company-related duties and operational activities.`,
                        `بموجب هذا الكتاب، نفوضه باستخدام وقيادة المركبة المملوكة للشركة والتي تحمل رقم لوحة ${ctx.vehicle.plateNo}، والمقيدة في ${ctx.vehicle.registrationCityAr}، الإمارات العربية المتحدة. تم صرف المركبة المذكورة أعلاه رسمياً من قبل الشركة للقيام بالمهام المتعلقة بالشركة والأنشطة التشغيلية.`,
                        settings,
                        300
                    ),

                    // Body 3
                    createBilingualParagraph(
                        `He is fully authorized to drive, manage, and utilize the said vehicle for official purposes until further notice from the company.`,
                        `وهو مفوض بالكامل لقيادة وإدارة واستخدام المركبة المذكورة للأغراض الرسمية حتى إشعار آخر من الشركة.`,
                        settings,
                        600
                    ),

                    // Closing
                    createBilingualTable(
                        [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: 'Sincerely,', size: englishPt * 2 }),
                                    new TextRun({ break: 1 }),
                                    new TextRun({ text: ctx.companyName, size: englishPt * 2, bold: true })
                                ]
                            })
                        ],
                        [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                bidirectional: true,
                                children: [
                                    new TextRun({ text: 'تفضلوا بقبول فائق الاحترام والتقدير،', size: arabicPt * 2, rightToLeft: true }),
                                    new TextRun({ break: 1, rightToLeft: true }),
                                    new TextRun({ text: ctx.companyNameAr, size: arabicPt * 2, bold: true, rightToLeft: true })
                                ]
                            })
                        ],
                        settings
                    ),

                    // Signatures (Placed Side-by-Side in a single row for space efficiency)
                    new Paragraph({ spacing: { before: 400 }, children: [] }),
                    new Table({
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
                                        children: [
                                            new Table({
                                                width: { size: 90, type: WidthType.PERCENTAGE },
                                                borders: {
                                                    top: { style: BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                                                    left: { style: BorderStyle.SINGLE, size: 1 },
                                                    right: { style: BorderStyle.SINGLE, size: 1 }
                                                },
                                                rows: [
                                                    new TableRow({
                                                        height: { value: 1200, rule: 'exact' },
                                                        children: [
                                                            new TableCell({
                                                                children: [
                                                                    new Paragraph({
                                                                        alignment: AlignmentType.CENTER,
                                                                        spacing: { before: 200 },
                                                                        children: [new TextRun({ text: 'Signature / التوقيع', size: (englishPt - 1) * 2 })]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: { size: 50, type: WidthType.PERCENTAGE },
                                        children: [
                                            new Table({
                                                width: { size: 90, type: WidthType.PERCENTAGE },
                                                alignment: AlignmentType.RIGHT,
                                                borders: {
                                                    top: { style: BorderStyle.SINGLE, size: 1 },
                                                    bottom: { style: BorderStyle.SINGLE, size: 1 },
                                                    left: { style: BorderStyle.SINGLE, size: 1 },
                                                    right: { style: BorderStyle.SINGLE, size: 1 }
                                                },
                                                rows: [
                                                    new TableRow({
                                                        height: { value: 1200, rule: 'exact' },
                                                        children: [
                                                            new TableCell({
                                                                children: [
                                                                    new Paragraph({
                                                                        alignment: AlignmentType.CENTER,
                                                                        spacing: { before: 200 },
                                                                        children: [new TextRun({ text: 'Seal / الختم', size: (arabicPt - 1) * 2 })]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }
        ]
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `Authorization_Letter_${ctx.employee.name.replace(/ /g, '_')}.docx`)
}
