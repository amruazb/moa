import { DocumentData } from '@/store/documentStore'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import { saveAs } from 'file-saver'

export async function generateDocx(data: DocumentData) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'MOA Summary',
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({ text: `Company: ${data.company?.name || ''}` }),
          new Paragraph({ text: `New Name: ${data.company?.newName || ''}` }),
          new Paragraph({ text: `License: ${data.company?.licenseNumber || ''}` }),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, 'moa.docx')
}
