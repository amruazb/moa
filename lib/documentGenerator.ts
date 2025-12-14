import { DocumentData } from '@/store/documentStore'
import { CONVERSION_TYPES, ConversionType } from '@/lib/validation'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'

export async function generateDocument(
  data: DocumentData,
  language: 'en' | 'ar',
  conversionType: ConversionType = 'LLC_TO_SPC'
): Promise<void> {
  try {
    const conversionInfo = CONVERSION_TYPES[conversionType]
    const sourceParties = data.sourceParties || []
    const destParties = data.destinationParties || []

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header
            new Paragraph({
              text: language === 'ar' ? 'مذكرة تعديل مذكرة التأسيس' : 'MEMORANDUM OF ASSOCIATION AMENDMENT',
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 }
            }),

            new Paragraph({
              text: language === 'ar' ? conversionInfo.label.ar : conversionInfo.label.en,
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 }
            }),

            // Company Information
            new Paragraph({
              text: language === 'ar' ? 'معلومات الشركة:' : 'Company Information:',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 200 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'اسم الشركة الحالي: ' : 'Current Company Name: ', bold: true }),
                new TextRun({ text: data.company.name || '-' })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'نوع الكيان الحالي: ' : 'Current Entity Type: ', bold: true }),
                new TextRun({ text: conversionInfo.from })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'الاسم الجديد: ' : 'New Company Name: ', bold: true }),
                new TextRun({ text: data.company.newName || '-' })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'نوع الكيان الجديد: ' : 'New Entity Type: ', bold: true }),
                new TextRun({ text: conversionInfo.to })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'رقم الترخيص: ' : 'License Number: ', bold: true }),
                new TextRun({ text: data.company.licenseNumber || '-' })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'تاريخ إعداد المذكرة: ' : 'MOA Preparation Date: ', bold: true }),
                new TextRun({ text: data.company.moaDate || '-' })
              ],
              spacing: { after: 200 }
            }),

            // Source Parties Information
            new Paragraph({
              text: language === 'ar' ? 'معلومات الأطراف المحولة (من):' : 'Source Parties (From):',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),

            // Generate source party sections
            ...sourceParties.flatMap((party, index) => [
              new Paragraph({
                text: language === 'ar' ? `الطرف ${index + 1}:` : `Party ${index + 1}:`,
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 200, after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'الاسم: ' : 'Name: ', bold: true }),
                  new TextRun({ text: party.name || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'رقم الهوية: ' : 'EID Number: ', bold: true }),
                  new TextRun({ text: party.eidNumber || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'تاريخ الميلاد: ' : 'Date of Birth: ', bold: true }),
                  new TextRun({ text: party.dob || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'الجنسية: ' : 'Nationality: ', bold: true }),
                  new TextRun({ text: party.nationality || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'الحصة: ' : 'Shares: ', bold: true }),
                  new TextRun({ text: `${data.shares.source[index] || 0}%` })
                ],
                spacing: { after: 200 }
              })
            ]),

            // Destination Parties Information
            new Paragraph({
              text: language === 'ar' ? 'معلومات الأطراف المستقبلة (إلى):' : 'Destination Parties (To):',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),

            // Generate destination party sections
            ...destParties.flatMap((party, index) => [
              new Paragraph({
                text: language === 'ar' ? `الطرف ${index + 1}:` : `Party ${index + 1}:`,
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 200, after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'الاسم: ' : 'Name: ', bold: true }),
                  new TextRun({ text: party.name || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'رقم الهوية: ' : 'EID Number: ', bold: true }),
                  new TextRun({ text: party.eidNumber || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'تاريخ الميلاد: ' : 'Date of Birth: ', bold: true }),
                  new TextRun({ text: party.dob || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'الجنسية: ' : 'Nationality: ', bold: true }),
                  new TextRun({ text: party.nationality || '-' })
                ],
                spacing: { after: 100 }
              }),

              new Paragraph({
                children: [
                  new TextRun({ text: language === 'ar' ? 'الحصة: ' : 'Shares: ', bold: true }),
                  new TextRun({ text: `${data.shares.destination[index] || 0}%` })
                ],
                spacing: { after: 200 }
              })
            ]),

            // Preamble
            new Paragraph({
              text: language === 'ar' ? 'المقدمة:' : 'Preamble:',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),

            new Paragraph({
              text: generatePreamble(data, language, conversionType),
              spacing: { after: 400 }
            }),

            // Old MOA Details
            new Paragraph({
              text: language === 'ar' ? 'تفاصيل مذكرة التأسيس القديمة:' : 'Old MOA Details:',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'رقم التوثيق: ' : 'Notarization Number: ', bold: true }),
                new TextRun({ text: data.oldMoa.notarizationNumber || '-' })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'تاريخ التوثيق: ' : 'Notarization Date: ', bold: true }),
                new TextRun({ text: data.oldMoa.notarizationDate || '-' })
              ],
              spacing: { after: 100 }
            }),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'الحصص الأصلية: ' : 'Original Shares: ', bold: true }),
                new TextRun({
                  text: data.oldMoa.originalShares.map((share, i) => `Party ${i + 1}: ${share}%`).join(' / ')
                })
              ],
              spacing: { after: 400 }
            }),

            // Signature Section
            new Paragraph({
              text: language === 'ar' ? 'التوقيعات:' : 'Signatures:',
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 600, after: 200 }
            }),

            // Source party signatures
            ...sourceParties.map((party, index) => new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar'
                    ? `الطرف ${index + 1} (${party.name || ''}): _______________`
                    : `Source Party ${index + 1} (${party.name || ''}): _______________`,
                  bold: false
                })
              ],
              spacing: { after: 200 }
            })),

            // Destination party signatures
            ...destParties.map((party, index) => new Paragraph({
              children: [
                new TextRun({
                  text: language === 'ar'
                    ? `المستلم ${index + 1} (${party.name || ''}): _______________`
                    : `Destination Party ${index + 1} (${party.name || ''}): _______________`,
                  bold: false
                })
              ],
              spacing: { after: 200 }
            })),

            new Paragraph({
              children: [
                new TextRun({ text: language === 'ar' ? 'التاريخ: _______________' : 'Date: _______________', bold: false })
              ],
              spacing: { after: 100 }
            })
          ]
        }
      ]
    })

    // Generate and download the document
    const buffer = await Packer.toBuffer(doc)
    const blob = new Blob([buffer as any], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    const fileName = `MOA_Amendment_${conversionInfo.from}_to_${conversionInfo.to}_${data.company.name || 'Document'}_${new Date().toISOString().split('T')[0]}.docx`
    saveAs(blob, fileName)

  } catch (error) {
    console.error('Error generating document:', error)
    throw new Error('Failed to generate document')
  }
}

function generatePreamble(data: DocumentData, language: 'en' | 'ar', conversionType: ConversionType): string {
  const companyName = data.company.name || (language === 'ar' ? 'الشركة' : 'Company')
  const conversionInfo = CONVERSION_TYPES[conversionType]
  const sourceParties = data.sourceParties || []
  const destParties = data.destinationParties || []

  // Helper to generate party list
  const generatePartyList = (parties: typeof sourceParties, shares: number[], lang: 'en' | 'ar') => {
    if (parties.length === 0) return ''
    if (parties.length === 1) {
      return `${parties[0].name || (lang === 'ar' ? 'الطرف' : 'Party')} (${shares[0]}%)`
    }

    const partyStrings = parties.map((party, i) =>
      `${party.name || (lang === 'ar' ? `الطرف ${i + 1}` : `Party ${i + 1}`)} (${shares[i]}%)`
    )

    if (lang === 'ar') {
      return partyStrings.join(' و ')
    } else {
      if (partyStrings.length === 2) {
        return `${partyStrings[0]} and ${partyStrings[1]}`
      }
      const lastParty = partyStrings.pop()
      return `${partyStrings.join(', ')}, and ${lastParty}`
    }
  }

  if (language === 'ar') {
    const sourceList = generatePartyList(sourceParties, data.shares.source, 'ar')
    const destList = generatePartyList(destParties, data.shares.destination, 'ar')

    if (destParties.length === 1 && data.shares.destination[0] === 100) {
      // Converting TO single owner (LLC/EST → SPC)
      return `${sourceList} ينقلون جميع أسهمهم في ${companyName} إلى ${destList} مجاناً. هذا النقل يحول الشركة ${conversionInfo.label.ar}.`
    } else if (sourceParties.length === 1 && data.shares.source[0] === 100) {
      // Converting FROM single owner (SPC/EST → LLC)
      return `${sourceList} ينقل جميع أسهمه ((100%) في ${companyName} إلى ${destList} مجاناً. هذا النقل يحول الشركة ${conversionInfo.label.ar}.`
    } else {
      // Other scenarios
      return `اتفاقية تحويل بين ${sourceList} إلى ${destList} لتحويل ${companyName} - ${conversionInfo.label.ar}.`
    }
  } else {
    const sourceList = generatePartyList(sourceParties, data.shares.source, 'en')
    const destList = generatePartyList(destParties, data.shares.destination, 'en')

    if (destParties.length === 1 && data.shares.destination[0] === 100) {
      // Converting TO single owner (LLC/EST → SPC)
      return `${sourceList} hereby transfer all of their shares in ${companyName} to ${destList}, free of cost. This transfer results in conversion ${conversionInfo.label.en}.`
    } else if (sourceParties.length === 1 && data.shares.source[0] === 100) {
      // Converting FROM single owner (SPC/EST → LLC)
      return `${sourceList} hereby transfers all ownership (100%) in ${companyName} to ${destList}, free of cost. This transfer results in conversion ${conversionInfo.label.en}.`
    } else {
      // Other scenarios
      return `Conversion agreement between ${sourceList} and ${destList} for ${companyName} - ${conversionInfo.label.en}.`
    }
  }
}
