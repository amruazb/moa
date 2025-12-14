import { NextRequest, NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, UnderlineType } from 'docx'

export async function POST(request: NextRequest) {
  try {
    const { data, language } = await request.json()

    // Helper for side-by-side bilingual text (English Left, Arabic Right)
    const createBilingualRow = (enText: string | Paragraph, arText: string | Paragraph) => {
      return new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: typeof enText === 'string' ? [new Paragraph({ text: enText, alignment: AlignmentType.LEFT })] : [enText],
            // Should be 'borders' in newer docx versions, but for layout we just want no borders usually? 
            // Actually, usually managing borders is done on the Table level. 
            // We want a layout table with NO borders.
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "auto" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
              left: { style: BorderStyle.NONE, size: 0, color: "auto" },
              right: { style: BorderStyle.NONE, size: 0, color: "auto" },
            }
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: typeof arText === 'string' ? [new Paragraph({ text: arText, alignment: AlignmentType.RIGHT })] : [arText],
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: "auto" },
              bottom: { style: BorderStyle.NONE, size: 0, color: "auto" },
              left: { style: BorderStyle.NONE, size: 0, color: "auto" },
              right: { style: BorderStyle.NONE, size: 0, color: "auto" },
            }
          }),
        ],
      })
    }

    // Party Processing
    const sourceParties = data.sourceParties || []
    const destParties = data.destinationParties || []

    // Combine Source and Destination Parties to match the "Assignment" flow:
    // First Party (Assignor/Source) -> Second Party (Assignee/Dest)

    // We map them to ensure we populate Arabic fields if available
    const allPartiesData = [...sourceParties, ...destParties];

    const parties = allPartiesData.map((p: any) => ({
      ...p,
      role: sourceParties.includes(p) ? 'Source' : 'Destination',
      nameAr: p.nameAr || p.name, // Fallback if nameAr missing
      nationalityAr: p.nationalityAr || p.nationality
    }));

    const partySections = parties.map((party: any, index: number) => {
      const ordinalsEn = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']
      const ordinalsAr = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس']

      const eth = ordinalsEn[index] || `${index + 1}th`
      const ath = ordinalsAr[index] || `${index + 1}`

      return [
        createBilingualRow(
          new Paragraph({
            children: [new TextRun({ text: `${eth} Party:`, bold: true, underline: { type: UnderlineType.SINGLE } })]
          }),
          new Paragraph({
            children: [new TextRun({ text: `الطرف ${ath}:`, bold: true, underline: { type: UnderlineType.SINGLE } })],
            alignment: AlignmentType.RIGHT
          })
        ),
        createBilingualRow(
          `MR.${(party.name || '').toUpperCase()},\nNationality: ${party.nationality || ''}\nID Card No: ${party.eidNumber || ''}\nDate of Birth: ${party.dob || ''}`,
          `السيد / ${party.nameAr}\nالجنسية: ${party.nationalityAr}\nبطاقة هوية رقم: ${party.eidNumber || ''}\nتاريخ الميلاد: ${party.dob || ''}`
        ),
        // Spacer row
        new TableRow({ children: [new TableCell({ children: [new Paragraph({})], columnSpan: 2, borders: { top: { style: BorderStyle.NONE, size: 0, color: "auto" }, bottom: { style: BorderStyle.NONE, size: 0, color: "auto" }, left: { style: BorderStyle.NONE, size: 0, color: "auto" }, right: { style: BorderStyle.NONE, size: 0, color: "auto" } } })] })
      ]
    }).flat()

    // Shares Table Logic
    // Construct Rows for Arabic Table
    const arHeader = new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "نسبة المشاركة", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "القيمة", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "عدد الحصص", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "أسماء الشركاء", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
      ]
    })

    // We need to map shares. assumed share data structure
    // shares.destination array corresponds to destParties
    const shareRows = (data.shares?.destination || []).map((share: number, i: number) => {
      const party = destParties[i] || { name: 'Unknown' }
      const shareCount = Math.floor(share)
      const val = share * 1000

      return { percent: `${share}%`, val: val.toLocaleString(), count: `${shareCount}`, nameAr: party.name, nameEn: party.name }
    })

    const arTableRows = shareRows.map((r: any) => new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ text: r.percent, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: r.val, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: r.count, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: `السيد / ${r.nameAr}`, alignment: AlignmentType.RIGHT })] }),
      ]
    }))

    // Construct Rows for English Table
    const enHeader = new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Name of Partners", bold: true })], alignment: AlignmentType.LEFT })], shading: { fill: "f2f2f2" } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Number of shares", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Value", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Percentage of Participation", bold: true })], alignment: AlignmentType.CENTER })], shading: { fill: "f2f2f2" } }),
      ]
    })

    const enTableRows = shareRows.map((r: any) => new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ text: `Mr.${r.nameEn}`, alignment: AlignmentType.LEFT })] }),
        new TableCell({ children: [new Paragraph({ text: r.count, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: r.val, alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ text: r.percent, alignment: AlignmentType.CENTER })] }),
      ]
    }))


    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [

            // Company Information
            new Paragraph({
              text: language === 'ar' ? 'معلومات الشركة:' : 'Company Information:',
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'اسم الشركة: ' : 'Company Name: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.company.name || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'الاسم الجديد: ' : 'New Name: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.company.newName || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'رقم الترخيص: ' : 'License Number: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.company.licenseNumber || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'تاريخ إعداد المذكرة: ' : 'MOA Preparation Date: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.company.moaDate || '-',
                }),
              ],
            }),

            new Paragraph({ text: '' }), // Empty line

            // Parties Information
            new Paragraph({
              text: language === 'ar' ? 'معلومات الأطراف:' : 'Parties Information:',
              heading: HeadingLevel.HEADING_2,
            }),

            // First Party
            new Paragraph({
              text: language === 'ar' ? 'الطرف الأول:' : 'First Party:',
              heading: HeadingLevel.HEADING_3,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'الاسم: ' : 'Name: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.firstParty.name || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'رقم الهوية: ' : 'EID Number: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.firstParty.eidNumber || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'تاريخ الميلاد: ' : 'Date of Birth: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.firstParty.dob || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'الجنسية: ' : 'Nationality: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.firstParty.nationality || '-',
                }),
              ],
            }),

            new Paragraph({ text: '' }), // Empty line

            // Second Party
            new Paragraph({
              text: language === 'ar' ? 'الطرف الثاني:' : 'Second Party:',
              heading: HeadingLevel.HEADING_3,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'الاسم: ' : 'Name: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.secondParty.name || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'رقم الهوية: ' : 'EID Number: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.secondParty.eidNumber || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'تاريخ الميلاد: ' : 'Date of Birth: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.secondParty.dob || '-',
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'الجنسية: ' : 'Nationality: ',
                  bold: true,
                }),
                new TextRun({
                  text: data.secondParty.nationality || '-',
                }),
              ],
            }),

            new Paragraph({ text: '' }), // Empty line

            // Share Transfer Information
            new Paragraph({
              text: language === 'ar' ? 'معلومات نقل الأسهم:' : 'Share Transfer Information:',
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'نسبة الطرف الأول: ' : 'First Party Shares: ',
                  bold: true,
                }),
                new TextRun({
                  text: `${data.shares.firstParty}%`,
                }),
              ],
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar' ? 'نسبة الطرف الثاني: ' : 'Second Party Shares: ',
                  bold: true,
                }),
                new TextRun({
                  text: `${data.shares.secondParty}%`,
                }),
              ],
            }),

            new Paragraph({ text: '' }), // Empty line

            // Preamble
            new Paragraph({
              text: language === 'ar' ? 'المقدمة:' : 'Preamble:',
              heading: HeadingLevel.HEADING_2,
            }),

            new Paragraph({
              text: generatePreamble(data, language),
            }),
          ],
        },
      ],
    })

    // Generate the document buffer
    const buffer = await Packer.toBuffer(doc)

    // Return the document as a response
    return new NextResponse(buffer as any, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="MOA_Amendment_${data.company.name || 'Document'}_${new Date().toISOString().split('T')[0]}.docx"`,
      },
    })
  } catch (error) {
    console.error('Document generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    )
  }
}

function generatePreamble(data: any, language: 'en' | 'ar'): string {
  const firstPartyName = data.firstParty.name || 'First Party'
  const secondPartyName = data.secondParty.name || 'Second Party'
  const companyName = data.company.name || 'Company'

  if (data.shares.secondParty === 100) {
    return language === 'ar'
      ? `الطرف الأول، ${firstPartyName}، ينقل جميع أسهمه (${data.oldMoa.originalShares?.firstParty || data.shares.firstParty}%) في ${companyName} إلى الطرف الثاني، ${secondPartyName}، مجاناً. هذا النقل يحول الشركة من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة.`
      : `The First Party, ${firstPartyName}, hereby transfers all of their shares (${data.oldMoa.originalShares?.firstParty || data.shares.firstParty}%) in ${companyName} to the Second Party, ${secondPartyName}, free of cost. This transfer converts the company from LLC to SPC structure.`
  } else {
    return language === 'ar'
      ? `اتفاقية نقل الأسهم بين ${firstPartyName} و ${secondPartyName} لتحويل ${companyName} من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة.`
      : `Share transfer agreement between ${firstPartyName} and ${secondPartyName} for the conversion of ${companyName} from LLC to SPC structure.`
  }
}




