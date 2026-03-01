import { ERPPermissionRequest } from './types'

export function generateERPPermissionDocument(context: ERPPermissionRequest): string {
    const {
        employeeName,
        department,
        jobTitle,
        permissionsRequested,
        accessTime,
        reasonForRequest,
        supervisorRecommendation,
        lineManagerName,
        lineManagerJobTitle,
        lineManagerDate,
        date
    } = context

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ERP Permission Request Form - Al Saqiya</title>
    <style>
        @page {
            size: A4;
            margin: 15mm;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.2;
            background: #f0f0f0;
        }
        .container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 15mm;
            background: #fff;
            box-sizing: border-box;
            position: relative;
        }
        .header-logo {
            position: absolute;
            top: 15mm;
            right: 15mm;
            width: 80px;
        }
        .header-text {
            text-align: center;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        .company-name {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-title {
            font-size: 16px;
            font-weight: bold;
            margin-top: 15px;
            border-top: 1px solid #333;
            padding-top: 10px;
            display: inline-block;
            width: 100%;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        td {
            border: 1px solid #000;
            padding: 8px;
            vertical-align: top;
            font-size: 13px;
        }
        .label-cell {
            background-color: #f9f9f9;
            width: 140px;
            text-align: right;
            font-weight: bold;
        }
        .bilingual-label {
            display: flex;
            flex-direction: column;
            text-align: right;
        }
        .bilingual-label span {
            display: block;
        }
        .value-cell {
            text-align: center;
            font-weight: 500;
        }
        .checkbox-group {
            display: flex;
            justify-content: center;
            gap: 40px;
            align-items: center;
        }
        .checkbox-item {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .check-box {
            width: 14px;
            height: 14px;
            border: 1px solid #000;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            line-height: 14px;
            font-size: 12px;
        }
        .signature-section {
            margin-top: 30px;
        }
        .sign-box {
            border: none;
            padding: 0;
        }
        .sign-line {
            width: 200px;
            border-bottom: 1px solid #000;
            margin: 40px auto 5px;
        }
        .inner-table td {
            border: none;
            padding: 4px;
        }
        .recommendation-box {
            height: 80px;
            border: 1px solid #000;
            margin-top: 5px;
            padding: 10px;
            text-align: left;
        }
        .footer {
            position: absolute;
            bottom: 10mm;
            left: 0;
            right: 0;
            font-size: 10px;
            color: #666;
            text-align: center;
        }
        @media print {
            body { background: none; }
            .container { 
                box-shadow: none;
                width: 100%;
                min-height: auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/images/alsaqiya_logo.png" class="header-logo" alt="Logo" onerror="this.style.display='none'">
        
        <div class="header-text">
            <div class="company-name" dir="rtl">الساقية التجارية</div>
            <div class="company-name">Al saqiya Trading</div>
            
            <div class="form-title" dir="rtl">نموذج طلب للوصول الي نظام أو خدمة</div>
            <div class="form-title" style="border:none; margin-top:0; padding-top:0;">Request for Access Permission</div>
        </div>

        <table>
            <tr>
                <td class="value-cell" style="width: 70%;">${date}</td>
                <td class="label-cell">
                    <div class="bilingual-label">
                        <span dir="rtl">التاريخ</span>
                        <span>Date</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="value-cell">${employeeName}</td>
                <td class="label-cell">
                    <div class="bilingual-label">
                        <span dir="rtl">الاسم</span>
                        <span>Name</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="padding: 0; border-top: 1px solid #000; border-bottom: 1px solid #000; border-left: 1px solid #000; border-right: none;">
                    <table style="margin: 0; width: 100%; border-collapse: collapse;">
                        <tr>
                            <td class="value-cell" style="width: 45%; border-top: none; border-bottom: none; border-left: none;">${jobTitle}</td>
                            <td class="label-cell" style="width: 60px; border-top: none; border-bottom: none; text-align: center;">
                                <div class="bilingual-label" style="text-align: center;">
                                    <span dir="rtl">القسم</span>
                                    <span>Dept</span>
                                </div>
                            </td>
                            <td class="value-cell" style="width: 55%; border-top: none; border-bottom: none;">${department}</td>
                        </tr>
                    </table>
                </td>
                <td class="label-cell">
                    <div class="bilingual-label">
                        <span dir="rtl">المسمى الوظيفي</span>
                        <span>Job Title</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="value-cell">${permissionsRequested}</td>
                <td class="label-cell">
                    <div class="bilingual-label">
                        <span dir="rtl">النظام / الخدمة المطلوب الوصول إليها</span>
                        <span>System/Service to be accessed</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="value-cell">
                    <div class="checkbox-group">
                        <div class="checkbox-item">
                            <span class="check-box">${accessTime === 'Temporary' ? '✓' : ''}</span>
                            <span>مؤقتة / Temporary</span>
                        </div>
                        <div class="checkbox-item">
                            <span class="check-box">${accessTime === 'Permanent' ? '✓' : ''}</span>
                            <span>دائمة / Permanent</span>
                        </div>
                    </div>
                </td>
                <td class="label-cell">
                    <div class="bilingual-label">
                        <span dir="rtl">مدة الوصول المطلوبة</span>
                        <span>Required access time</span>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="value-cell" style="min-height: 60px;">${reasonForRequest}</td>
                <td class="label-cell">
                    <div class="bilingual-label">
                        <span dir="rtl">سبب الطلب</span>
                        <span>Reason for request</span>
                    </div>
                </td>
            </tr>
        </table>

        <div class="signature-section" style="text-align: right; margin-bottom: 20px;">
            <div style="font-weight: bold; margin-bottom: 5px; font-size: 13px;" dir="rtl">توقيع الموظف</div>
            <div style="font-weight: bold; margin-bottom: 10px; font-size: 13px;">Employee's Signature</div>
            <div class="sign-line" style="margin-right: 0;"></div>
        </div>

        <div style="border: 1px solid #000; padding: 10px;">
            <div style="font-weight: bold; font-size: 13px; text-align: right;" dir="rtl">توصية المشرف / المدير المباشر</div>
            <div style="font-weight: bold; font-size: 13px; text-align: right; margin-bottom: 5px;">Immediate Supervisor's recommendation</div>
            <div class="recommendation-box">${supervisorRecommendation}</div>
            
            <table style="border: none; margin-top: 10px; margin-bottom: 0;">
                <tr>
                    <td style="border: none; width: 40%; padding: 0;">
                        <table style="margin: 0; width: 100%; table-layout: fixed;">
                            <tr>
                                <td class="value-cell" style="width: 65%; border-top: 1px solid #000; border-left: 1px solid #000; border-right: none; height: 30px;">${lineManagerName}</td>
                                <td class="label-cell" style="width: 55px; text-align: center; border-top: 1px solid #000; border-right: 1px solid #000;">
                                    <div class="bilingual-label" style="text-align: center;">
                                        <span dir="rtl">الاسم</span>
                                        <span>Name</span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="value-cell" style="border-bottom: 1px solid #000; border-left: 1px solid #000; border-right: none; height: 30px;">${lineManagerJobTitle}</td>
                                <td class="label-cell" style="width: 55px; text-align: center; border-bottom: 1px solid #000; border-right: 1px solid #000;">
                                    <div class="bilingual-label" style="text-align: center;">
                                        <span dir="rtl">المسمى</span>
                                        <span>Job Title</span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="border: none; width: 60%; vertical-align: bottom; text-align: right; padding-right: 0;">
                        <div style="font-weight: bold; font-size: 13px;" dir="rtl">توقيع المشرف / المدير المباشر</div>
                        <div style="font-weight: bold; font-size: 13px;">Line manager's Signature</div>
                        <div style="display: flex; align-items: flex-end; justify-content: flex-end; gap: 20px; margin-top: 15px;">
                             <div style="display: flex; flex-direction: column; align-items: center;">
                                <div style="border-bottom: 1px solid #000; width: 120px; margin-bottom: 5px;">${lineManagerDate}</div>
                                <div style="font-size: 12px;">التاريخ / Date</div>
                             </div>
                             <div style="border-bottom: 1px solid #000; width: 200px; height: 1px; margin-bottom: 25px;"></div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>

        <div class="footer">
            Al Saqiya Trading - Access Permission Form v2.0
        </div>
    </div>
</body>
</html>
    `
}
