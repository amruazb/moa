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
  Footer,
  PageNumber,
  VerticalAlign,
  TableLayoutType,
} from 'docx'
import { saveAs } from 'file-saver'
import { DamanLetterContext } from './types'
import { FontSettings, FONT_SIZES } from '@/store/formattingStore'

const getBaseFontSize = (size: FontSettings['baseFontSize']) => {
  return FONT_SIZES.find(s => s.value === size)?.basePt || 10
}

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
      insideVertical: { style: BorderStyle.NONE },
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
              right: { style: BorderStyle.NONE },
            },
            children: englishContent,
          }),
          new TableCell({
            width: { size: arabicPercent, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.TOP,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: arabicContent,
          }),
        ],
      }),
    ],
  })
}

function createBilingualParagraph(englishText: string, arabicText: string, settings?: FontSettings, spacing = 150): Table {
  const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
  const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')

  return createBilingualTable(
    [
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        spacing: { after: spacing },
        children: [new TextRun({ text: englishText, size: englishPt * 2 })],
      }),
    ],
    [
      new Paragraph({
        alignment: AlignmentType.JUSTIFIED,
        bidirectional: true,
        spacing: { after: spacing },
        children: [new TextRun({ text: arabicText, size: arabicPt * 2, rightToLeft: true })],
      }),
    ],
    settings
  )
}

function createBilingualMultiline(englishLines: string[], arabicLines: string[], settings?: FontSettings, spacing = 200): Table {
  const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
  const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')

  const englishParagraphs = englishLines.map(
    (line, i) =>
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { after: i === englishLines.length - 1 ? spacing : 60 },
        children: [new TextRun({ text: line, size: englishPt * 2 })],
      })
  )

  const arabicParagraphs = arabicLines.map(
    (line, i) =>
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        bidirectional: true,
        spacing: { after: i === arabicLines.length - 1 ? spacing : 60 },
        children: [new TextRun({ text: line, size: arabicPt * 2, rightToLeft: true })],
      })
  )

  return createBilingualTable(englishParagraphs, arabicParagraphs, settings)
}

export async function generateDamanLetterDocx(ctx: DamanLetterContext, settings?: FontSettings): Promise<void> {
  const englishPt = getBaseFontSize(settings?.englishFontSize || settings?.baseFontSize || 'medium')
  const arabicPt = getBaseFontSize(settings?.arabicFontSize || settings?.baseFontSize || 'medium')
  const { signatory } = ctx

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, right: 720, bottom: 720, left: 720 },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({ text: 'Page ' }),
                  new TextRun({ children: [PageNumber.CURRENT] }),
                ],
              }),
            ],
          }),
        },
        children: [
          createBilingualTable(
            [
              new Paragraph({
                spacing: { after: 300 },
                children: [new TextRun({ text: ctx.companyName, bold: true, size: (englishPt + 1) * 2 })],
              }),
            ],
            [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                spacing: { after: 300 },
                children: [new TextRun({ text: ctx.companyNameAr, bold: true, size: (arabicPt + 1) * 2, rightToLeft: true })],
              }),
            ],
            settings
          ),

          createBilingualParagraph(`Date: ${ctx.date}`, `التاريخ: ${ctx.date}`, settings, 300),

          createBilingualMultiline(
            [
              'Chief Commercial Officer',
              'National health Insurance Company – Daman PJSC',
              'P.O Box 128888',
              'Abu Dhabi',
              'United Arab Emirates',
            ],
            [
              'المدير التنفيذي للشؤون التجارية',
              'الشركة الوطنية للضمان الصحي – ضمان (ش.م.ع)',
              'ص.ب: 128888',
              'أبوظبي / الإمارات العربية المتحدة',
            ],
            settings,
            300
          ),

          createBilingualTable(
            [
              new Paragraph({
                spacing: { after: 300 },
                children: [new TextRun({ text: 'DECLARATION', bold: true, size: (englishPt + 4) * 2 })],
              }),
            ],
            [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                bidirectional: true,
                spacing: { after: 300 },
                children: [new TextRun({ text: 'إقرار', bold: true, size: (arabicPt + 4) * 2, rightToLeft: true })],
              }),
            ],
            settings
          ),

          createBilingualParagraph(
            `I, the undersigned, ${signatory.name}, in my authority as ${signatory.title} of ${ctx.companyName}, hereby declare that all the member(s) to be enrolled/renewed under the respective health insurance policy, as named in the member list sent with this declaration via email, are holding valid passports (or Emirates ID) and residence visas. I hereby undertake to provide Daman with an undertaking letter in regard to any such expired residence visa.`,
            `أنا الموقع أدناه، ${signatory.nameAr}، بصفتي النافذة ك${signatory.titleAr} لشركة ${ctx.companyNameAr}، أقر بأن جميع الأعضاء المذكورة أسماؤهم ضمن قائمة الأعضاء المرسلة عن طريق البريد الإلكتروني والمراد تسجيلهم/التجديد لهم ضمن وثيقة التأمين الصحي المعنية، جميعهم لديهم جوازات سفر (أو هوية الإمارات) وتأشيرات إقامة صالحة المدة، وأتعهد بتزويد ضمان برسالة تعهد فيما يتعلق بتأشيرات الإقامة منتهية الصلاحية.`,
            settings,
            300
          ),

          createBilingualParagraph(
            `The information stated in this document is true and correct in regard to all members as listed on the member list, and I understand that providing false or untrue information shall be considered a violation of the relevant health insurance regulations and that I/Company may be held liable for these untrue statements.`,
            `إن المعلومات المذكورة ضمن هذا الإقرار هي معلومات صحيحة وكاملة بالنسبة لي وكذلك لجميع الأعضاء المدرجين بقائمة الأعضاء، وأنني على إدراك بأن تقديم أي معلومات خاطئة أو غير حقيقية سيُعد انتهاكاً لقوانين وقواعد التأمين الصحي وسيؤدي إلى تحملي/تحمل الشركة المسؤولية عن هذه التصريحات غير الصحيحة.`,
            settings,
            400
          ),

          createBilingualParagraph('Yours Sincerely,', 'تفضلوا بقبول فائق الاحترام،', settings, 300),

          createBilingualMultiline(
            [
              'Signature:',
              '',
              'Name:',
              signatory.name,
              '',
              'Title:',
              signatory.title,
              '',
              '[Company Stamp]',
            ],
            ['التوقيع:', '', 'الاسم:', signatory.nameAr, '', 'الوظيفة:', signatory.titleAr, '', 'ختم الشركة'],
            settings,
            0
          ),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  const safeName = ctx.companyName.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 40)
  saveAs(blob, `Daman_Declaration_${safeName}.docx`)
}
