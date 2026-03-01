import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    UnderlineType,
} from 'docx'
import { saveAs } from 'file-saver'
import { TerminationLetterContext } from './types'
import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
    return FONT_SIZES.find(s => s.value === size)?.basePt || 10
}

function noticePeriodText(months: number): string {
    if (months === 1) return 'one (1) month'
    if (months === 2) return 'two (2) months'
    if (months === 3) return 'three (3) months'
    return `${months} month${months !== 1 ? 's' : ''}`
}

export async function generateTerminationLetterDocx(ctx: TerminationLetterContext, settings?: FontSettings): Promise<void> {
    const pt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
    const sz = pt * 2
    const noticeText = noticePeriodText(ctx.noticePeriodMonths)

    function para(children: TextRun[], spacing = 200, alignment: (typeof AlignmentType)[keyof typeof AlignmentType] = AlignmentType.LEFT): Paragraph {
        return new Paragraph({ alignment, spacing: { after: spacing }, children })
    }

    function text(t: string, bold = false, underline = false): TextRun {
        return new TextRun({
            text: t,
            size: sz,
            bold,
            underline: underline ? { type: UnderlineType.SINGLE } : undefined,
        })
    }

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
                    },
                },
                children: [
                    // Title
                    para(
                        [text('TERMINATION LETTER', true)],
                        400,
                        AlignmentType.CENTER
                    ),

                    // Date
                    para([text(`Date: ${ctx.date}`)], 300),

                    // To block
                    para([text('To:', true)], 60),
                    para([text(`Mr. ${ctx.employee.name}`, true)], 60),
                    para([text(`Emirates ID No.: ${ctx.employee.emiratesId}`)], 60),
                    para([text(`Date of Birth: ${ctx.employee.dob}`)], 60),
                    para([text(`Nationality: ${ctx.employee.nationality}`)], 60),
                    para([text(`Occupation: ${ctx.employee.occupation}`)], 300),

                    // Salutation
                    para([text(`Dear Mr. ${ctx.employee.name.split(' ')[0]},`)], 300),

                    // Body paragraph 1
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: { after: 200 },
                        children: [
                            text('This letter is to inform you that your employment with '),
                            text(ctx.companyName, true),
                            text(' is hereby terminated effective from '),
                            text(ctx.terminationDate, true),
                            text('.'),
                        ],
                    }),

                    // Body paragraph 2 - notice period
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: { after: 200 },
                        children: [
                            text('In accordance with UAE Labour Law, you are hereby given a notice period of '),
                            text(noticeText, true),
                            text(' prior to the effective termination date. During this notice period, you are expected to continue fulfilling your duties and responsibilities in a professional manner.'),
                        ],
                    }),

                    // Body paragraph 3
                    para(
                        [text('You are requested to complete all necessary clearance procedures and hand over any company property, documents, or assets in your possession before or on your last working day.')],
                        200,
                        AlignmentType.JUSTIFIED
                    ),

                    // Body paragraph 4
                    para(
                        [text('All your dues and entitlements, if any, will be settled in accordance with the UAE Labour Law and company policy.')],
                        200,
                        AlignmentType.JUSTIFIED
                    ),

                    // Body paragraph 5
                    para(
                        [text('We thank you for your services and wish you success in your future endeavors.')],
                        400,
                        AlignmentType.JUSTIFIED
                    ),

                    // Closing
                    para([text('Sincerely,')], 800),

                    // Signature line
                    para([text('_______________________________')], 60),
                    para([text('Authorized Signatory', true)], 60),
                    para([text(ctx.companyName, true)], 0),
                ],
            },
        ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `Termination_Letter_${ctx.employee.name.replace(/ /g, '_')}.docx`)
}
