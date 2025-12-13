# MOA Document Editor Agent

A comprehensive Next.js application for processing Memorandum of Association (MOA) amendments, specifically designed for LLC to SPC conversions in the UAE.

## Features

### 🚀 Core Functionality
- **Document Upload System**: Upload and process various document types (PDF, DOCX, images)
- **Automated Data Extraction**: Extract information from uploaded documents using OCR and document parsing
- **Manual Override Options**: Edit extracted data manually when needed
- **Multi-language Support**: English and Arabic with RTL layout support
- **Real-time Preview**: Live preview of the final document before generation
- **Word Document Export**: Generate professional Word documents with all amendment details

### 📄 Document Types Supported
- Old MOA documents (PDF/DOCX)
- New Trade License (PDF/Images)
- EID cards for both parties (PDF/Images)
- Various amendment types (LLC to SPC, Share Transfer, Partner Addition/Removal)

### 🌐 Language Support
- English interface with Arabic translations
- RTL layout for Arabic content
- Bilingual document generation

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Document Processing**: 
  - `pdf-parse` for PDF text extraction
  - `mammoth` for Word document processing
  - `tesseract.js` for OCR capabilities
  - `docx` for Word document generation
- **File Handling**: `react-dropzone` for drag-and-drop uploads
- **UI Components**: Custom components with Lucide React icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd moa-document-editor
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
moa-document-editor/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── process-document/
│   │   └── generate-document/
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── DocumentUpload.tsx
│   ├── DataExtraction.tsx
│   ├── DocumentPreview.tsx
│   └── LanguageToggle.tsx
├── lib/                   # Utility functions
│   ├── documentProcessor.ts
│   └── documentGenerator.ts
├── store/                 # State management
│   └── documentStore.ts
└── public/               # Static assets
```

## Usage

### 1. Document Upload
- Upload the old MOA document to extract notarization details
- Upload the new trade license for company information
- Upload EID cards for both parties to extract personal details

### 2. Data Extraction
- Review automatically extracted data
- Use manual override fields to correct any errors
- Adjust share distribution percentages

### 3. Document Preview
- Preview the final document structure
- Review all extracted and manual data
- Generate the final Word document

### 4. Export Options
- Export to Word (.docx) format
- Bilingual support (English/Arabic)
- Professional formatting

## API Endpoints

### POST /api/process-document
Process uploaded documents and extract data.

**Request:**
- `file`: File to process
- `type`: Document type (oldMoa, tradeLicense, firstPartyEid, secondPartyEid)

**Response:**
```json
{
  "success": true,
  "data": {
    "company": { ... },
    "firstParty": { ... },
    "secondParty": { ... },
    "oldMoa": { ... }
  }
}
```

### POST /api/generate-document
Generate Word document from processed data.

**Request:**
```json
{
  "data": { ... },
  "language": "en" | "ar"
}
```

**Response:**
Word document file (.docx)

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Add any required environment variables here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Document Processing
The application currently uses mock data for demonstration. To enable real document processing:

1. **PDF Processing**: Uncomment the `pdf-parse` implementation in `lib/documentProcessor.ts`
2. **Word Processing**: Uncomment the `mammoth` implementation
3. **OCR Processing**: Uncomment the `tesseract.js` implementation

## Development

### Adding New Document Types
1. Update the `DocumentData` interface in `store/documentStore.ts`
2. Add processing logic in `lib/documentProcessor.ts`
3. Update the upload component to handle the new type

### Adding New Languages
1. Update the language type in `store/documentStore.ts`
2. Add translations to components
3. Update the document generator for new language support

### Styling
The application uses Tailwind CSS with custom components. Key classes:
- `gradient-bg`: Main gradient background
- `upload-area`: File upload areas
- `party-card`: Party information cards
- `tab`: Navigation tabs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## Roadmap

- [ ] Real OCR integration for document processing
- [ ] Additional document templates
- [ ] Database integration for storing amendments
- [ ] User authentication and authorization
- [ ] Advanced document validation
- [ ] Email integration for document delivery
- [ ] Mobile app development




