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
    VerticalAlign,
} from 'docx'
import { saveAs } from 'file-saver'
import { ERPPermissionRequest } from './types'

export async function generateERPPermissionDocx(ctx: ERPPermissionRequest): Promise<void> {
    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: { top: 720, right: 720, bottom: 720, left: 720 }
                    }
                },
                children: [
                    // Header
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 200 },
                        children: [
                            new TextRun({ text: 'الساقية التجارية', bold: true, size: 32 }),
                            new TextRun({ break: 1, text: 'Al saqiya Trading', bold: true, size: 32 }),
                            new TextRun({ break: 2, text: 'نموذج طلب للوصول الي نظام أو خدمة', bold: true, size: 28 }),
                            new TextRun({ break: 1, text: 'Request for Access Permission', bold: true, size: 28 })
                        ]
                    }),

                    // Horizontal Line
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.SINGLE, size: 2, color: "000000" },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                            insideHorizontal: { style: BorderStyle.NONE },
                            insideVertical: { style: BorderStyle.NONE }
                        },
                        rows: [new TableRow({ children: [new TableCell({ children: [] })] })]
                    }),

                    // Data Table
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            // Date
                            new TableRow({
                                children: [
                                    new TableCell({ width: { size: 70, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.date })] })] }),
                                    new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'التاريخ / Date', bold: true })] })] })
                                ]
                            }),
                            // Name
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.employeeName })] })] }),
                                    new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'الاسم / Name', bold: true })] })] })
                                ]
                            }),
                            // Job Title / Dept
                            new TableRow({
                                children: [
                                    new TableCell({
                                        children: [
                                            new Table({
                                                width: { size: 100, type: WidthType.PERCENTAGE },
                                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.SINGLE, size: 1 } },
                                                rows: [
                                                    new TableRow({
                                                        children: [
                                                            new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.department })] })] }),
                                                            new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'القسم / Dept', bold: true, size: 18 })] })] }),
                                                            new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.jobTitle })] })] })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'المسمى الوظيفي / Job Title', bold: true })] })] })
                                ]
                            }),
                            // System
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.permissionsRequested })] })] }),
                                    new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'النظام / الخدمة / System', bold: true })] })] })
                                ]
                            }),
                            // Access Time
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.accessTime === 'Permanent' ? '[✓] Permanent / دائمة   [ ] Temporary / مؤقتة' : '[ ] Permanent / دائمة   [✓] Temporary / مؤقتة' })] })] }),
                                    new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'مدة الوصول / Access Time', bold: true })] })] })
                                ]
                            }),
                            // Reason
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.reasonForRequest })] })] }),
                                    new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'سبب الطلب / Reason', bold: true })] })] })
                                ]
                            })
                        ]
                    }),

                    // Employee Signature
                    new Paragraph({ spacing: { before: 400 }, alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'توقيع الموظف / Employee\'s Signature', bold: true })] }),
                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: '__________________________', bold: true })] }),

                    // Supervisor Section
                    new Paragraph({ spacing: { before: 400 }, children: [] }),
                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        margins: { top: 200, bottom: 200, left: 200, right: 200 },
                                        children: [
                                            new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'توصية المشرف / Immediate Supervisor\'s recommendation', bold: true })] }),
                                            new Paragraph({ spacing: { before: 100 }, children: [new TextRun({ text: ctx.supervisorRecommendation })] }),
                                            new Table({
                                                width: { size: 100, type: WidthType.PERCENTAGE },
                                                borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                                                rows: [
                                                    new TableRow({
                                                        children: [
                                                            new TableCell({
                                                                width: { size: 50, type: WidthType.PERCENTAGE },
                                                                children: [
                                                                    new Table({
                                                                        width: { size: 100, type: WidthType.PERCENTAGE },
                                                                        rows: [
                                                                            new TableRow({ children: [new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.lineManagerName })] })] }), new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Name / الاسم', size: 18 })] })] })] }),
                                                                            new TableRow({ children: [new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.lineManagerJobTitle })] })] }), new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Job Title / المسمى', size: 18 })] })] })] }),
                                                                            new TableRow({ children: [new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ctx.lineManagerDate })] })] }), new TableCell({ shading: { fill: "F9F9F9" }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Date / التاريخ', size: 18 })] })] })] })
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            new TableCell({
                                                                width: { size: 50, type: WidthType.PERCENTAGE },
                                                                verticalAlign: VerticalAlign.BOTTOM,
                                                                children: [
                                                                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'توقيع المشرف / Signature', bold: true })] }),
                                                                    new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: '____________________  Date: ________', size: 20 })] })
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
                    }),

                    // Footer
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: { before: 400 },
                        children: [new TextRun({ text: 'Al Saqiya Trading - Access Permission Form v2.0', size: 16, color: '666666' })]
                    })
                ]
            }
        ]
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `Al_Saqiya_ERP_Permission_${ctx.employeeName.replace(/ /g, '_')}.docx`)
}
