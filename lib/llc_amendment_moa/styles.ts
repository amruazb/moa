export const styles = `
<style>
    @page {
        size: A4;
        margin: 1in;
    }

    body {
        font-family: 'Times New Roman', serif;
        font-size: 12pt;
        line-height: 1.4;
        color: #000;
        margin: 0;
        padding: 0;
        background: white;
    }

    .page {
        width: 8.5in;
        min-height: 11in;
        margin: 0 auto;
        padding: 0.5in;
        background: white;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        position: relative;
        page-break-after: always;
    }

    .page:last-child {
        page-break-after: avoid;
    }

    .page-content {
        min-height: 10in;
        position: relative;
    }

    .page-footer {
        position: absolute;
        bottom: 0.25in;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 10pt;
        color: #666;
    }

    .page-number {
        margin-bottom: 5px;
    }

    .end-mark {
        font-weight: bold;
        color: #000;
    }

    /* Headers */
    h1, h2, h3, h4 {
        margin: 0 0 10px 0;
        font-weight: bold;
    }

    h1 {
        font-size: 16pt;
        text-align: center;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 14pt;
        text-align: center;
        margin-bottom: 15px;
    }

    h3 {
        font-size: 12pt;
        margin-bottom: 10px;
    }

    h4 {
        font-size: 12pt;
        margin-bottom: 8px;
    }

    /* Text formatting */
    .bold {
        font-weight: bold;
    }

    .underline {
        text-decoration: underline;
    }

    .center {
        text-align: center;
    }

    .rtl {
        direction: rtl;
        text-align: right;
        font-family: 'Arial', sans-serif;
    }

    /* Paragraphs */
    p {
        margin: 0 0 8px 0;
        text-align: justify;
    }

    /* Article pairs (English and Arabic side by side) */
    .article-pair {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        align-items: flex-start;
    }

    .block {
        flex: 1;
        padding: 0;
    }

    .block.rtl {
        direction: rtl;
        text-align: right;
        font-family: 'Arial', sans-serif;
    }

    /* Lists */
    ul, ol {
        margin: 0 0 10px 20px;
        padding: 0;
    }

    li {
        margin-bottom: 5px;
    }

    /* Tables */
    table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
    }

    th, td {
        border: 1px solid #000;
        padding: 8px;
        text-align: left;
        vertical-align: top;
    }

    th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    /* Signature blocks */
    .signature-block {
        margin: 30px 0;
        page-break-inside: avoid;
    }

    .signature-block-unified {
        margin: 30px 0;
        page-break-inside: avoid;
    }

    /* Edited content highlighting */
    .edited {
        background-color: #fff3cd;
        padding: 1px 3px;
        border-radius: 2px;
    }

    /* Print styles */
    @media print {
        body {
            font-size: 11pt;
        }
        
        .page {
            box-shadow: none;
            margin-bottom: 0;
            padding: 0;
        }
        
        .edited {
            background-color: transparent;
        }
    }
</style>
`
