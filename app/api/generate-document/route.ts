import { NextRequest, NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'

export async function POST(request: NextRequest) {
  try {
    const { data, language } = await request.json()

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header
            new Paragraph({
              text: language === 'ar' ? 'مذكرة تعديل مذكرة التأسيس' : 'MEMORANDUM OF ASSOCIATION AMENDMENT',
              heading: HeadingLevel.TITLE,
              alignment: 'center',
            }),
            
            new Paragraph({
              text: language === 'ar' ? 'تحويل من شركة ذات مسؤولية محدودة إلى شركة مساهمة خاصة' : 'LLC to SPC Conversion',
              heading: HeadingLevel.HEADING_1,
              alignment: 'center',
            }),
            
            new Paragraph({ text: '' }), // Empty line
            
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
    return new NextResponse(buffer, {
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




