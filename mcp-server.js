#!/usr/bin/env node

/**
 * MOA Document Editor - Model Context Protocol Server
 * Comprehensive MCP server for the complete MOA Document Editor project
 * Exposes architecture, code structure, data models, APIs, and workflows
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Initialize stdio for MCP communication
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Helper to send JSON-RPC responses
function sendResponse(id, result, error = null) {
  const response = {
    jsonrpc: '2.0',
    id,
    ...(error ? { error } : { result })
  };
  console.log(JSON.stringify(response));
}

// Helper to send notifications
function sendNotification(method, params) {
  const notification = {
    jsonrpc: '2.0',
    method,
    params
  };
  console.log(JSON.stringify(notification));
}

// Comprehensive Resource Documentation
const resources = {
  'moa://architecture/overview': {
    uri: 'moa://architecture/overview',
    name: 'Project Architecture Overview',
    description: 'Complete architecture and design of MOA Document Editor',
    mimeType: 'text/markdown',
    content: `# MOA Document Editor - Architecture Overview

## Project Vision
A comprehensive Next.js application for processing and generating Memorandum of Association (MOA) amendments, specifically designed for LLC to SPC conversions and related corporate transformations in the UAE.

## High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Client Layer (React)                  │
│  - DocumentUpload (Drag & Drop)                          │
│  - DataExtraction (User Input)                           │
│  - DocumentPreview (Live Preview)                        │
│  - LanguageToggle (EN/AR)                                │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              State Management (Zustand)                  │
│  - documentStore.ts (Global state)                       │
│  - Document, Company, Party, Shares data                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            Business Logic Layer (/lib)                   │
│  - documentProcessor.ts (OCR & Extraction)              │
│  - documentGenerator.ts (Word Generation)               │
│  - validation.ts (Data Validation)                      │
│  - moa/moaGenerator.ts (MOA-specific Logic)             │
│  - moa/types.ts (TypeScript Interfaces)                 │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│            API Layer (/app/api)                          │
│  - /api/process-document (OCR & Extraction)             │
│  - /api/generate-document (Word Generation)             │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│          External Services & Libraries                   │
│  - Tesseract.js (OCR)                                   │
│  - pdf-parse (PDF Extraction)                           │
│  - mammoth (DOCX Extraction)                            │
│  - docx (Word Generation)                               │
│  - file-saver (Download)                                │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Core Workflows

### 1. Document Upload & OCR Processing
\`\`\`
User uploads document
    ↓
File validation (type, size)
    ↓
OCR Processing (Tesseract.js)
    ↓
Text extraction (PDF, DOCX, Images)
    ↓
Parsing based on document type
    ↓
Data structure population
    ↓
Store update via Zustand
\`\`\`

### 2. Data Extraction & Validation
\`\`\`
Raw extracted text
    ↓
Pattern matching (License #, EID, Names)
    ↓
Parse company information
    ↓
Parse party/member information
    ↓
Extract share allocations
    ↓
Type validation
    ↓
Store update
\`\`\`

### 3. Manual Data Override
\`\`\`
Display extracted data
    ↓
User edits fields
    ↓
Validation on change
    ↓
Store update
    ↓
Live preview update
\`\`\`

### 4. Document Generation
\`\`\`
User selects conversion type
    ↓
Selects language (EN/AR)
    ↓
Validates all required data
    ↓
Generates Word document
    ↓
Applies formatting (tables, sections)
    ↓
Downloads DOCX file
\`\`\`

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS + PostCSS
- **State**: Zustand (lightweight state management)
- **Forms**: react-hook-form
- **Icons**: Lucide React
- **Animation**: Framer Motion

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **OCR**: Tesseract.js (Client-side + API)

### Document Processing
- **PDF**: pdf-parse
- **DOCX**: mammoth (read), docx (write)
- **Images/OCR**: Tesseract.js
- **File Download**: file-saver

### Development
- **Language**: TypeScript
- **Bundler**: Next.js with Webpack
- **Linting**: ESLint
- **Package Manager**: pnpm

## Project Structure

\`\`\`
moa/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main application page
│   ├── layout.tsx               # Root layout
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading state
│   ├── not-found.tsx            # 404 page
│   ├── globals.css              # Global styles
│   └── api/
│       ├── generate-document/   # Word generation endpoint
│       └── process-document/    # OCR processing endpoint
│
├── components/                   # React Components
│   ├── ConversionTypeSelector.tsx    # Amendment type selection
│   ├── DataExtraction.tsx           # Extracted data display/edit
│   ├── DocumentPreview.tsx          # Preview pane
│   ├── DocumentUpload.tsx           # Upload interface
│   ├── DocumentUploadButton.tsx      # Reusable upload button
│   ├── LanguageToggle.tsx           # EN/AR switch
│   ├── LivePreviewPane.tsx          # Real-time preview
│   └── MOADocument.tsx              # Document container
│
├── lib/                          # Business Logic
│   ├── documentProcessor.ts      # OCR & text extraction
│   ├── documentGenerator.ts      # Word document generation
│   ├── validation.ts             # Data validation rules
│   └── moa/
│       ├── moaGenerator.ts       # MOA-specific generation
│       └── types.ts              # TypeScript interfaces
│
├── store/                        # State Management
│   └── documentStore.ts          # Zustand store (global state)
│
├── public/                       # Static assets
│
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
└── mcp-server.js                # This MCP server
\`\`\`

## Data Flow Diagram

\`\`\`
┌──────────────┐
│ User Upload  │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ documentProcessor.ts │ ◄─── Tesseract.js (OCR)
│ - extractText()      │ ◄─── pdf-parse
│ - parseTradeLicense()│ ◄─── mammoth
│ - parsePartyDoc()    │
└──────┬───────────────┘
       │
       ▼
┌──────────────────┐
│ validation.ts    │
│ - validateData() │
│ - validateType() │
└──────┬───────────┘
       │
       ▼
┌──────────────────────┐
│ documentStore.ts     │ ◄─── Zustand
│ (Global State)       │
└──────┬───────────────┘
       │
       ├─────────────────────────────┐
       │                             │
       ▼                             ▼
┌─────────────────────┐  ┌──────────────────────┐
│ UI Components       │  │ documentGenerator.ts │
│ (Display Data)      │  │ - generateDocument() │
└─────────────────────┘  └──────┬───────────────┘
                                 │ (docx library)
                                 ▼
                          ┌──────────────────┐
                          │ .docx File       │
                          │ (Download)       │
                          └──────────────────┘
\`\`\`

## Key Features

### 1. Multi-Document Support
- Old MOA documents (PDF/DOCX)
- Trade licenses
- EID cards
- Passport documents
- Custom amendment documents

### 2. Intelligent Data Extraction
- OCR with Tesseract.js (English + Arabic)
- Pattern-based field extraction
- Multiple document format support
- Automatic data validation

### 3. Bilingual Support
- English and Arabic interfaces
- RTL layout for Arabic
- Bilingual document generation
- Automatic language detection in OCR

### 4. Amendment Types
- LLC to SPC conversion
- Share transfers
- Partner addition/removal
- Custom amendments

### 5. Real-Time Preview
- Live document preview
- WYSIWYG editing
- Instant validation feedback

### 6. Professional Output
- Word document generation
- Custom formatting
- Tables and structured data
- Bilingual output support

## Scalability Considerations

### Current Limitations
- Client-side OCR processing (can be slow for large images)
- In-memory state management

### Future Improvements
- Server-side OCR processing
- Database integration
- Batch document processing
- Advanced analytics
- Document templating system
\`\``
  },

  'moa://data-models/types': {
    uri: 'moa://data-models/types',
    name: 'Data Models & TypeScript Types',
    description: 'Complete TypeScript interfaces and data structures',
    mimeType: 'text/markdown',
    content: `# Data Models & TypeScript Types

## Core Interfaces

### Company Data
\`\`\`typescript
interface CompanyData {
  name: string                    // Current company name (English)
  nameAr?: string                 // Company name (Arabic)
  newName: string                 // New company name (for conversions)
  licenseNumber: string           // Trade license number (CN-XXXXX or TN-XXXXX)
  moaDate: string                 // MOA effective date (YYYY-MM-DD)
}
\`\`\`

### Party/Member Data
\`\`\`typescript
interface PartyData {
  name: string                    // Full name (English)
  nameAr?: string                 // Full name (Arabic)
  eidNumber: string               // UAE EID or Passport number
  dob: string                     // Date of birth (YYYY-MM-DD)
  nationality: string             // Nationality (English)
  nationalityAr?: string          // Nationality (Arabic)
  documentType?: 'eid' | 'passport' // Type of ID document
  expiryDate?: string             // Document expiry date
}
\`\`\`

### Old MOA Data
\`\`\`typescript
interface OldMoaData {
  notarizationNumber: string      // MOA notarization number
  notarizationDate: string        // MOA notarization date (YYYY-MM-DD)
  originalShares: number[]        // Original share counts for each party
}
\`\`\`

### Share Distribution
\`\`\`typescript
interface ShareDistribution {
  source: number[]                // Share percentages from source entity
  destination: number[]           // Share percentages to destination entity
}
\`\`\`

### Complete Document Data
\`\`\`typescript
interface DocumentData {
  company: CompanyData
  sourceParties: PartyData[]      // Parties transferring shares
  destinationParties: PartyData[] // Parties receiving shares
  oldMoa: OldMoaData
  shares: ShareDistribution
}
\`\`\`

### MOA Data (Detailed)
\`\`\`typescript
interface Company {
  nameEn: string                  // English name
  nameAr: string                  // Arabic name
  licenseNumber: string           // Trade license
  addressEn?: string              // English address
  addressAr?: string              // Arabic address
}

interface Representative {
  nameEn: string
  nameAr: string
  nationalityEn: string
  nationalityAr: string
  dob: string                     // YYYY-MM-DD
  idNumber: string
  addressEn?: string
  addressAr?: string
  capacityEn: string              // e.g., "by virtue of Power of Attorney"
  capacityAr: string
}

interface Party {
  nameEn: string
  nameAr: string
  nationalityEn: string
  nationalityAr: string
  idNumber: string
  dob: string                     // YYYY-MM-DD
  addressEn?: string
  addressAr?: string
  representative?: Representative // For corporate parties
  documentType?: 'eid' | 'passport'
  expiryDate?: string
}

interface ShareAllocation {
  partyIndex: number              // Index in parties array
  shareCount: number
  shareValue: number
  percentage: number
}

interface MOAData {
  company: Company
  parties: Party[]
  totalShares: number
  totalCapital: number
  shareAllocations: ShareAllocation[]
  effectiveDate?: string
  locationEn?: string
  locationAr?: string
}
\`\`\`

## Conversion Types
\`\`\`typescript
type ConversionType = 
  | 'LLC_TO_SPC'               // LLC to SPC Conversion
  | 'SHARE_TRANSFER'           // Share Transfer
  | 'PARTNER_ADDITION'         // Add New Partner
  | 'PARTNER_REMOVAL'          // Remove Partner
  | 'OWNERSHIP_CHANGE'         // Change Ownership
  | 'CUSTOM_AMENDMENT'         // Custom Amendment

interface ConversionTypeInfo {
  label: {
    en: string
    ar: string
  }
  description: {
    en: string
    ar: string
  }
}
\`\`\`

## Store Interface (Zustand)
\`\`\`typescript
interface DocumentStore {
  // State
  language: 'en' | 'ar'
  conversionType: ConversionType
  documentData: DocumentData
  validationErrors: ValidationError[]
  isProcessing: boolean
  
  // Language
  setLanguage: (lang: 'en' | 'ar') => void
  
  // Conversion Type
  setConversionType: (type: ConversionType) => void
  
  // Document Data
  updateCompany: (data: Partial<CompanyData>) => void
  addSourceParty: (party: PartyData) => void
  updateSourceParty: (index: number, data: Partial<PartyData>) => void
  removeSourceParty: (index: number) => void
  
  addDestinationParty: (party: PartyData) => void
  updateDestinationParty: (index: number, data: Partial<PartyData>) => void
  removeDestinationParty: (index: number) => void
  
  updateShares: (distribution: ShareDistribution) => void
  updateOldMoa: (data: Partial<OldMoaData>) => void
  
  // Validation
  validateAll: () => boolean
  validateField: (field: string, value: any) => ValidationError[]
  
  // Document Generation
  generateDocument: (language: 'en' | 'ar') => Promise<void>
  
  // Reset
  reset: () => void
}
\`\`\`

## Validation Errors
\`\`\`typescript
interface ValidationError {
  field: string                   // Field name
  message: string                 // Error message
  type: 'required' | 'format' | 'range' | 'invalid'
}
\`\`\`
`
  },

  'moa://api/documentation': {
    uri: 'moa://api/documentation',
    name: 'API Endpoints Documentation',
    description: 'Complete API routes documentation and usage',
    mimeType: 'text/markdown',
    content: `# API Endpoints Documentation

## POST /api/process-document

### Purpose
Extract and parse data from uploaded documents (PDF, DOCX, or images)

### Request Body
\`\`\`
Content-Type: multipart/form-data

- file: File (required)
- type: 'companyLicense' | 'partyDocument' (required)
- partyIndex?: number (optional, for partyDocument)
\`\`\`

### Request Parameters
- **file**: The document file to process
- **type**: Document type to determine parsing strategy
  - \`companyLicense\`: Trade license document
  - \`partyDocument\`: Party/Member ID document
- **partyIndex**: Index of party (for multi-party scenarios)

### Response Format
\`\`\`typescript
{
  success: boolean
  data?: Partial<DocumentData>
  error?: string
  extractedText?: string
}
\`\`\`

### Response Fields
- **success**: Operation result
- **data**: Extracted structured data
- **error**: Error message if failed
- **extractedText**: Raw OCR text (for debugging)

### Processing Steps
1. File validation
2. File type detection
3. Text extraction (PDF, DOCX, or OCR for images)
4. Text parsing based on document type
5. Data structure population
6. Return structured data

### Technologies Used
- **Tesseract.js**: OCR for images
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX text extraction

### Example Usage
\`\`\`bash
curl -X POST http://localhost:3000/api/process-document \\
  -F "file=@license.pdf" \\
  -F "type=companyLicense"

curl -X POST http://localhost:3000/api/process-document \\
  -F "file=@eid.jpg" \\
  -F "type=partyDocument" \\
  -F "partyIndex=0"
\`\`\`

---

## POST /api/generate-document

### Purpose
Generate a professional Word document (DOCX) with MOA amendment details

### Request Body
\`\`\`json
{
  "documentData": {
    "company": { /* CompanyData */ },
    "sourceParties": [ /* PartyData[] */ ],
    "destinationParties": [ /* PartyData[] */ ],
    "oldMoa": { /* OldMoaData */ },
    "shares": { /* ShareDistribution */ }
  },
  "language": "en" | "ar",
  "conversionType": "LLC_TO_SPC" | "SHARE_TRANSFER" | ...
}
\`\`\`

### Request Parameters
- **documentData**: Complete document data object
- **language**: Output language ('en' or 'ar')
- **conversionType**: Type of amendment/conversion

### Response Format
\`\`\`
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document
Content-Disposition: attachment; filename="MOA_Amendment_YYYYMMDD.docx"

[Binary Word Document Content]
\`\`\`

### Generation Steps
1. Validate all required data
2. Initialize Word document
3. Add header and title
4. Add company information section
5. Add source parties section
6. Add destination parties section
7. Add share allocation section
8. Add old MOA reference
9. Apply formatting and styling
10. Return binary DOCX file

### Document Contents
- **Header**: Amendment title (EN/AR)
- **Company Info**: Name, license, address
- **Source Parties**: Current members transferring shares
- **Destination Parties**: New entity members
- **Shares**: Allocation table with percentages
- **Amendment Details**: Specific to conversion type

### Libraries Used
- **docx**: Word document generation and formatting

### Example Usage
\`\`\`bash
curl -X POST http://localhost:3000/api/generate-document \\
  -H "Content-Type: application/json" \\
  -d '{
    "documentData": { /* ... */ },
    "language": "en",
    "conversionType": "LLC_TO_SPC"
  }' \\
  -o MOA_Amendment.docx
\`\`\`

---

## Error Handling

### Common Error Codes
- **400**: Invalid request parameters
- **413**: File too large
- **415**: Unsupported file type
- **500**: Server processing error
- **503**: Service unavailable

### Error Response Format
\`\`\`json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error information"
}
\`\`\`

---

## Performance Considerations

### Process Document
- OCR processing: 10-30 seconds per image
- PDF parsing: 2-5 seconds
- DOCX parsing: 1-3 seconds

### Generate Document
- Document generation: 1-2 seconds
- File download: Depends on network

### Optimization Tips
- Use PDF/DOCX when possible (faster than OCR)
- Optimize image size before upload
- Use compression for large documents

---

## Security Considerations

### File Validation
- Maximum file size: 50MB
- Allowed types: PDF, DOCX, PNG, JPG, JPEG
- Virus scanning (if configured)

### Data Privacy
- No persistent storage of sensitive data
- Files deleted after processing
- Complies with UAE data protection regulations
`
  },

  'moa://components/guide': {
    uri: 'moa://components/guide',
    name: 'React Components Guide',
    description: 'Complete guide to all React components and their usage',
    mimeType: 'text/markdown',
    content: `# React Components Guide

## Component Hierarchy

\`\`\`
App (page.tsx)
├── Header
│   ├── Title & Description
│   └── LanguageToggle
├── Main Content (3-Column Layout)
│   ├── Left Sidebar (3 cols)
│   │   └── DocumentUpload
│   │       ├── ConversionTypeSelector
│   │       └── DocumentUploadButton
│   ├── Center (6 cols)
│   │   └── DataExtraction
│   │       └── Party Input Forms
│   └── Right Sidebar (3 cols)
│       └── LivePreviewPane
│           └── DocumentPreview
└── Footer (if any)
\`\`\`

## Component Descriptions

### 1. DocumentUpload.tsx
\`\`\`typescript
// Purpose: Main upload interface
// Features:
//   - Drag & drop zone
//   - File input
//   - Type-specific upload buttons

// Props: None (uses Zustand store)

// State:
//   - selectedFile: File | null
//   - uploadStatus: 'idle' | 'uploading' | 'success' | 'error'
//   - progress: number

// Handles:
//   - File drop
//   - File selection
//   - API call to /api/process-document
//   - State update via store
\`\`\`

### 2. ConversionTypeSelector.tsx
\`\`\`typescript
// Purpose: Select amendment type
// Options:
//   - LLC to SPC
//   - Share Transfer
//   - Partner Addition
//   - Partner Removal
//   - Ownership Change
//   - Custom Amendment

// Props: None (uses Zustand store)

// Behavior:
//   - Displays radio buttons or select dropdown
//   - Updates conversionType in store
//   - May show/hide specific form fields
\`\`\`

### 3. DataExtraction.tsx
\`\`\`typescript
// Purpose: Display and edit extracted data
// Sections:
//   - Company Information
//   - Source Parties
//   - Destination Parties
//   - Share Distribution
//   - Old MOA Details

// Features:
//   - Edit extracted data
//   - Add/remove parties
//   - Inline validation
//   - Real-time store updates

// Props: None (uses Zustand store)
\`\`\`

### 4. DocumentPreview.tsx
\`\`\`typescript
// Purpose: Preview generated document
// Features:
//   - Display formatted document
//   - Language selection
//   - Conversion type specific content
//   - Real-time updates on data change

// Props:
//   - data?: DocumentData (optional, from store)
//   - language?: 'en' | 'ar'

// Behaviors:
//   - Renders document structure
//   - Shows all sections with data
//   - Updates on store changes
\`\`\`

### 5. DocumentUploadButton.tsx
\`\`\`typescript
// Purpose: Reusable upload button
// Props:
//   - documentType: 'companyLicense' | 'partyDocument'
//   - partyIndex?: number
//   - label?: string
//   - onUpload?: (file: File) => void

// Features:
//   - File input trigger
//   - Loading state
//   - Error display
\`\`\`

### 6. LanguageToggle.tsx
\`\`\`typescript
// Purpose: Switch between English and Arabic
// Features:
//   - Toggle button
//   - Updates store language
//   - Applies RTL styles
//   - Updates all UI text

// Props: None (uses Zustand store)
\`\`\`

### 7. LivePreviewPane.tsx
\`\`\`typescript
// Purpose: Real-time document preview container
// Features:
//   - Displays DocumentPreview
//   - Generate Document button
//   - Language selector
//   - Validation status

// Props: None (uses Zustand store)

// Actions:
//   - Generate Document (calls /api/generate-document)
//   - Download DOCX
//   - View validation errors
\`\`\`

### 8. MOADocument.tsx
\`\`\`typescript
// Purpose: Document container component
// Features:
//   - Structure for document layout
//   - Section rendering
//   - Bilingual content support

// Props:
//   - data: DocumentData
//   - language: 'en' | 'ar'
\`\`\`

## Styling Approach

### Tailwind CSS Classes
\`\`\`typescript
// Layout
- grid-cols-1 lg:grid-cols-12 (3-column layout)
- gap-4 (spacing)

// Colors
- Primary: primary-500, primary-600
- Gray: gray-100, gray-800
- Status: green, red, yellow

// Typography
- text-3xl (headings)
- text-lg (section titles)
- text-sm (labels)

// Components
- rounded-lg (border radius)
- shadow-md (box shadow)
- border border-gray-200 (borders)
\`\`\`

### RTL Support
\`\`\`typescript
// Root element
<div className={language === 'ar' ? 'rtl' : ''}>

// Individual components can use:
- ml-4 lg:ml-0 (margin left becomes right in RTL)
- text-right (auto-reverses)
- flex-row-reverse (for RTL)
\`\`\`

## State Management Integration

### Zustand Store Usage
\`\`\`typescript
// In any component:
import { useDocumentStore } from '@/store/documentStore'

const MyComponent = () => {
  const { 
    language,
    documentData,
    conversionType,
    setLanguage,
    updateCompany,
    generateDocument
  } = useDocumentStore()
  
  // Component logic...
}
\`\`\`

## Form Handling

### React Hook Form Integration
- Used in DataExtraction component
- Field-level validation
- Error display
- Real-time updates to store

### Form Fields
- Text inputs (names, license numbers)
- Date inputs (DOB, dates)
- Select dropdowns (nationalities, types)
- Number inputs (shares, percentages)

## Accessibility Considerations

- Semantic HTML (form, label, input)
- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance
- Language-aware UI text
`
  },

  'moa://workflows/document-processing': {
    uri: 'moa://workflows/document-processing',
    name: 'Document Processing Workflow',
    description: 'Step-by-step document upload and processing workflow',
    mimeType: 'text/markdown',
    content: `# Document Processing Workflow

## Complete Upload & Processing Flow

\`\`\`
1. USER ACTIONS
   ├── Opens application
   ├── Selects conversion type
   ├── Uploads documents (drag & drop or file input)
   └── Manually edits extracted data

2. UPLOAD PROCESSING
   ├── File validation
   │   ├── Check file type (PDF, DOCX, IMG)
   │   ├── Check file size (<50MB)
   │   └── Validate MIME type
   ├── Send to /api/process-document
   │   ├── Receive FormData: {file, type, partyIndex?}
   │   └── Server processes request
   └── Await response

3. TEXT EXTRACTION
   ├── Detect file type
   ├── Extract text based on type:
   │   ├── PDF: pdf-parse library
   │   ├── DOCX: mammoth library
   │   └── Images: Tesseract.js (OCR)
   ├── Handle multi-language (EN/AR)
   └── Return raw text

4. TEXT PARSING
   ├── Normalize text (trim, clean whitespace)
   ├── Parse based on document type:
   │
   │   A. Trade License Parsing:
   │      ├── Extract license number (CN-XXXXX or TN-XXXXX)
   │      ├── Extract company name
   │      ├── Extract business type
   │      ├── Extract establishment date
   │      └── Extract license date
   │
   │   B. EID/Party Document Parsing:
   │      ├── Extract ID number
   │      ├── Extract name (EN + AR)
   │      ├── Extract nationality (EN + AR)
   │      ├── Extract date of birth
   │      ├── Extract gender (if visible)
   │      ├── Extract expiry date
   │      └── Detect document type (EID/Passport)
   │
   │   C. MOA Document Parsing:
   │      ├── Extract company name
   │      ├── Extract notarization number
   │      ├── Extract members list
   │      ├── Extract share allocations
   │      └── Extract signing date
   │
   └── Return structured data

5. DATA VALIDATION
   ├── Type checking
   ├── Format validation
   │   ├── EID: 15 digits
   │   ├── Passport: 6-9 characters
   │   ├── License: CN-XXXXX format
   │   ├── Date: YYYY-MM-DD format
   │   └── Numbers: Valid percentages
   ├── Required field checks
   └── Flag missing or invalid data

6. STORE UPDATE
   ├── Update Zustand store with:
   │   ├── Extracted company data
   │   ├── Extracted party data
   │   ├── Extracted shares
   │   └── Processing status
   └── Trigger UI re-render

7. USER REVIEW & EDIT
   ├── Display extracted data in DataExtraction component
   ├── Allow inline editing
   ├── Update validation on each field change
   ├── Real-time store updates
   └── Preview updates automatically

8. FINAL REVIEW
   ├── Review in LivePreviewPane
   ├── Check all sections
   ├── Verify bilingual content (if applicable)
   ├── Validate all required fields
   └── Resolve any errors
\`\`\`

## Document Type Specific Parsing

### Trade License Parsing
\`\`\`typescript
parseTradeLicense(text: string): Partial<DocumentData> {
  // 1. License number extraction
  //    Pattern: /\\b((?:CN|TN)-[\\d]+)\\b/i
  //    Priority: Specific CN/TN prefix
  
  // 2. Company name extraction
  //    Keywords: "Trade License", "Company Name", "Establishment"
  //    Extract text between markers
  
  // 3. Business type (if present)
  //    Extract activity/business description
  
  // 4. Dates
  //    License date, establishment date
  //    Format: DD/MM/YYYY or similar
  
  // 5. Return CompanyData structure
  return {
    company: {
      name: extractedName,
      licenseNumber: extractedNumber,
      moaDate: extractedDate
    }
  }
}
\`\`\`

### Party Document Parsing
\`\`\`typescript
parsePartyDocument(text: string, partyIndex?: number): Partial<DocumentData> {
  // 1. Determine document type
  //    Check for EID vs Passport markers
  
  // 2. Extract ID number
  //    EID: 15 digits
  //    Passport: 6-9 alphanumeric
  
  // 3. Extract name
  //    Usually in top section
  //    English and Arabic versions
  
  // 4. Extract nationality
  //    Usually abbreviated (e.g., UAE, US)
  //    Extract both EN and AR if present
  
  // 5. Extract date of birth
  //    Format: DD/MM/YYYY
  //    Convert to YYYY-MM-DD
  
  // 6. Extract expiry date
  //    For validity checking
  
  // 7. Return PartyData structure
  return {
    sourceParties: [{
      eidNumber: extractedID,
      name: extractedName,
      nationality: extractedNationality,
      dob: extractedDOB
    }]
  }
}
\`\`\`

## Error Handling

### At Each Stage

1. **File Upload**
   - Invalid file type → Show error message
   - File too large → Show size limit
   - Network error → Retry option

2. **Text Extraction**
   - OCR failure → Show raw text for manual entry
   - Empty document → User notification
   - Unsupported language → Attempt fallback

3. **Parsing**
   - Missing expected fields → Flag as warnings
   - Invalid formats → Validation errors
   - Ambiguous data → Allow user override

4. **Validation**
   - Required fields missing → Prevent export
   - Format errors → Show specific error
   - Logic errors → Suggest corrections

## Performance Optimization

### Client-Side OCR
- Process images asynchronously
- Show progress indicator
- Cache results when possible
- Limit file size before OCR

### API Calls
- Debounce validation checks
- Cancel previous requests if new one starts
- Show loading states

## Data Persistence

### Session-Only
- Data stored in Zustand (in-memory)
- Lost on page refresh
- No database persistence (current design)

### Future Considerations
- IndexedDB for offline support
- Session storage for multi-page workflows
- API persistence with backend database
`
  },

  'moa://development/setup': {
    uri: 'moa://development/setup',
    name: 'Development Setup Guide',
    description: 'Complete development environment setup and workflow',
    mimeType: 'text/markdown',
    content: `# Development Setup Guide

## Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager
- Git (for version control)
- A text editor (VS Code recommended)

## Installation

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd moa
\`\`\`

### 2. Install Dependencies
\`\`\`bash
pnpm install
# or
npm install
# or
yarn install
\`\`\`

### 3. Environment Configuration
Create a \`.env.local\` file (if needed for APIs):
\`\`\`
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

## Development Server

### Start Development Server
\`\`\`bash
pnpm dev
# or
npm run dev
\`\`\`

Server runs at: \`http://localhost:3000\`

### Features
- Hot module reloading (HMR)
- Fast refresh for React components
- TypeScript type checking
- ESLint integration

## Project Scripts

\`\`\`bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
\`\`\`

## Development Workflow

### 1. Creating New Components
\`\`\`bash
# Create component file in /components
touch components/MyComponent.tsx
\`\`\`

Template:
\`\`\`typescript
'use client'

import { useState } from 'react'
import { useDocumentStore } from '@/store/documentStore'

interface MyComponentProps {
  // Define props here
}

export const MyComponent: React.FC<MyComponentProps> = () => {
  const { language } = useDocumentStore()
  
  return (
    <div className={language === 'ar' ? 'rtl' : ''}>
      {/* Component content */}
    </div>
  )
}
\`\`\`

### 2. Adding Store Actions
Edit \`store/documentStore.ts\`:
\`\`\`typescript
// Add new state
interface DocumentStore {
  myNewField: string
  setMyNewField: (value: string) => void
}

// Implement action
setMyNewField: (value: string) => set({ myNewField: value })
\`\`\`

### 3. Creating API Routes
\`\`\`bash
# Create route handler in /app/api
touch app/api/my-endpoint/route.ts
\`\`\`

Template:
\`\`\`typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Process request
    
    return NextResponse.json({
      success: true,
      data: processedData
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
\`\`\`

## Debugging

### Browser DevTools
- Open DevTools (F12 or Ctrl+Shift+I)
- React DevTools extension recommended
- Use Console for debugging

### VS Code Debugging
Create \`.vscode/launch.json\`:
\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
\`\`\`

## TypeScript

### Type Checking
\`\`\`bash
# Run type check
tsc --noEmit
\`\`\`

### IDE Configuration
- Use VS Code for best experience
- Install TypeScript Vue Plugin
- IntelliSense works automatically

## Testing

### Unit Tests (Not yet configured)
Future testing setup:
- Jest for unit tests
- React Testing Library for components
- Vitest as alternative

### Manual Testing Checklist
- [ ] Upload documents (PDF, DOCX, images)
- [ ] OCR processing
- [ ] Data extraction
- [ ] Form validation
- [ ] Document generation
- [ ] English interface
- [ ] Arabic interface and RTL
- [ ] Responsive design (mobile, tablet, desktop)

## Code Style

### ESLint Configuration
\`\`\`bash
# Check for issues
pnpm lint

# Fix issues automatically
pnpm lint --fix
\`\`\`

### Formatting
- Use consistent indentation (2 spaces)
- Use TypeScript strict mode
- Follow React/Next.js conventions

## Common Tasks

### Add a New Document Type
1. Update \`ConversionType\` in \`lib/validation.ts\`
2. Add parsing logic in \`lib/documentProcessor.ts\`
3. Update conversion info in \`CONVERSION_TYPES\`
4. Add UI options in \`ConversionTypeSelector.tsx\`

### Support New Language
1. Update language type: \`'en' | 'ar' | 'new'\`
2. Add translations in components
3. Update Tesseract language: \`eng+ara\`
4. Test OCR with new language

### Add New Extraction Field
1. Update \`PartyData\` or \`CompanyData\` interface
2. Add parsing logic in documentProcessor.ts
3. Add form field in \`DataExtraction.tsx\`
4. Include in document generation

## Production Build

### Build for Production
\`\`\`bash
pnpm build
\`\`\`

### Run Production Server
\`\`\`bash
pnpm start
\`\`\`

### Environment Variables
Set production environment variables in hosting platform

### Deployment Platforms
- Vercel (recommended for Next.js)
- AWS Amplify
- Google Cloud Run
- Self-hosted server

## Troubleshooting

### OCR Not Working
- Check Tesseract.js library
- Verify image quality
- Check console for errors
- Try different image format

### State Not Updating
- Check Zustand store hooks
- Verify component uses store correctly
- Check for missing store actions
- Review store initialization

### Build Errors
- Clear \`.next\` folder: \`rm -rf .next\`
- Delete node_modules and reinstall
- Check TypeScript errors
- Verify all imports are correct

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
`
  },

  'moa://project/dependencies': {
    uri: 'moa://project/dependencies',
    name: 'Project Dependencies & Libraries',
    description: 'Complete list of dependencies with purposes',
    mimeType: 'text/markdown',
    content: `# Project Dependencies & Libraries

## Production Dependencies

### Core Framework
- **next** (16.0.10)
  - React framework with SSR/SSG
  - API routes support
  - File-based routing
  - Auto-optimization

- **react** (19.2.3)
  - UI library
  - Component framework
  - Hooks API

- **react-dom** (19.2.3)
  - DOM rendering for React

### TypeScript
- **typescript** (5.x)
  - Static type checking
  - IDE support
  - Type safety

### Styling
- **tailwindcss** (3.3.0)
  - Utility-first CSS framework
  - Responsive design
  - RTL support for Arabic

- **autoprefixer** (10.0.1)
  - Vendor prefix auto-addition

- **postcss** (8)
  - CSS transformation
  - Plugin system

### State Management
- **zustand** (4.4.7)
  - Lightweight state management
  - React hooks-based
  - Zero boilerplate
  - Replaces Redux/Context for this project

### Form Handling
- **react-hook-form** (7.48.2)
  - Efficient form validation
  - Low re-render overhead
  - Built-in error handling

### File Upload
- **react-dropzone** (14.2.3)
  - Drag & drop zone component
  - File input handling
  - Multiple file support

### Document Processing
- **tesseract.js** (4.1.4)
  - OCR (Optical Character Recognition)
  - Client-side processing
  - Supports multiple languages
  - Uses WebWorkers for performance

- **pdf-parse** (1.1.1)
  - PDF text extraction
  - Supports embedded text

- **mammoth** (1.6.0)
  - DOCX file parsing
  - Extracts text from Word documents

- **docx** (8.5.0)
  - Word document generation
  - Creates DOCX files programmatically
  - Supports complex formatting
  - Tables, sections, styles

### File Download
- **file-saver** (2.0.5)
  - Browser file download support
  - Cross-browser compatibility

### UI Enhancements
- **lucide-react** (0.294.0)
  - SVG icon library
  - Tree-shakeable
  - Large icon collection

- **framer-motion** (10.16.16)
  - Animation library
  - React component animation
  - Gesture support

- **class-variance-authority** (0.7.0)
  - CSS class composition
  - Type-safe styling

- **clsx** (2.0.0)
  - Conditional className helper
  - Utility for className construction

### Notifications
- **react-hot-toast** (2.4.1)
  - Toast notifications
  - Lightweight
  - Customizable

### Type Definitions
- **@types/node** (20)
  - Node.js type definitions

- **@types/react** (19.2.7)
  - React type definitions

- **@types/react-dom** (19.2.3)
  - React DOM type definitions

- **@types/file-saver** (2.0.7)
  - file-saver type definitions

## Development Dependencies

### Linting & Code Quality
- **eslint** (8)
  - JavaScript linter
  - Code quality enforcement

- **eslint-config-next** (16.0.10)
  - Next.js ESLint configuration
  - Pre-configured rules

## Library Purposes Summary

| Library | Purpose | Version |
|---------|---------|---------|
| next | Framework & routing | 16.0.10 |
| react | UI library | 19.2.3 |
| typescript | Type safety | 5.x |
| zustand | State management | 4.4.7 |
| react-hook-form | Forms & validation | 7.48.2 |
| tailwindcss | Styling | 3.3.0 |
| tesseract.js | OCR | 4.1.4 |
| pdf-parse | PDF extraction | 1.1.1 |
| mammoth | DOCX parsing | 1.6.0 |
| docx | DOCX generation | 8.5.0 |
| react-dropzone | File upload UI | 14.2.3 |
| lucide-react | Icons | 0.294.0 |
| file-saver | Download files | 2.0.5 |

## Dependency Analysis

### Bundle Impact (Approximate)
- **Large**: tesseract.js (~6.8MB with models), docx (~200KB)
- **Medium**: pdf-parse, mammoth
- **Small**: zustand, clsx, lucide-react

### Performance Considerations
- Tesseract.js can be slow for large images
- PDF parsing is relatively fast
- DOCX generation is quick
- All document processing is client-side

### Security Considerations
- File uploads validated on server
- No sensitive data persistence
- All data processing in-memory

## Version Management

### Current Versions
- Next.js: 16.0.10 (latest as of Dec 2025)
- React: 19.2.3 (latest)
- TypeScript: 5.x (latest)

### Compatibility
- All dependencies are compatible
- No known conflicts
- Uses pnpm for lock-file reliability

## Future Dependency Considerations

### Potential Additions
- Database client (PostgreSQL, MongoDB)
- Authentication library (NextAuth.js, Auth0)
- API client (Axios, TanStack Query)
- Testing framework (Jest, Vitest)
- E2E testing (Cypress, Playwright)

### Potential Replacements
- Alternative OCR (Google Cloud Vision, AWS Textract)
- Database alternatives (Supabase, Firebase)
- State management already optimal
`
  }
};

// Comprehensive tools for exploring the codebase
const tools = [
  {
    name: 'read_source_file',
    description: 'Read and view the contents of any source file in the MOA project',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Relative path to file (e.g., "components/DataExtraction.tsx", "lib/documentProcessor.ts")'
        },
        startLine: {
          type: 'number',
          description: 'Optional: starting line number (1-based)'
        },
        endLine: {
          type: 'number',
          description: 'Optional: ending line number (1-based)'
        }
      },
      required: ['path']
    }
  },
  {
    name: 'list_directory',
    description: 'List all files and directories in a specific folder',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Relative path to directory (e.g., "components", "lib", "app/api")'
        }
      },
      required: ['path']
    }
  },
  {
    name: 'search_codebase',
    description: 'Search for text patterns, function names, or identifiers in the codebase',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: {
          type: 'string',
          description: 'Text or regex pattern to search for (e.g., "export function", "interface Party")'
        },
        fileType: {
          type: 'string',
          description: 'Optional: filter by file extension (e.g., "tsx", "ts", "json")'
        }
      },
      required: ['pattern']
    }
  },
  {
    name: 'get_file_tree',
    description: 'Get a complete tree view of the project structure',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Root path for tree (default: project root)'
        },
        maxDepth: {
          type: 'number',
          description: 'Maximum directory depth to show (default: 4)'
        }
      },
      required: []
    }
  },
  {
    name: 'analyze_dependencies',
    description: 'Analyze imports and dependencies in a file',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Path to file to analyze'
        }
      },
      required: ['path']
    }
  }
];

// Tool execution
function executeTool(name, args) {
  const projectRoot = __dirname;
  
  switch (name) {
    case 'read_source_file': {
      const filePath = path.join(projectRoot, args.path);
      try {
        let lines = fs.readFileSync(filePath, 'utf-8').split('\n');
        
        if (args.startLine && args.endLine) {
          lines = lines.slice(args.startLine - 1, args.endLine);
        }
        
        return {
          success: true,
          path: args.path,
          totalLines: fs.readFileSync(filePath, 'utf-8').split('\n').length,
          startLine: args.startLine || 1,
          endLine: args.endLine || fs.readFileSync(filePath, 'utf-8').split('\n').length,
          content: lines.join('\n')
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to read file: ${error.message}`
        };
      }
    }

    case 'list_directory': {
      const dirPath = path.join(projectRoot, args.path);
      try {
        const files = fs.readdirSync(dirPath, { withFileTypes: true });
        const listing = files
          .filter(f => !f.name.startsWith('.'))
          .map(file => ({
            name: file.name,
            type: file.isDirectory() ? 'directory' : 'file',
            size: file.isFile() ? fs.statSync(path.join(dirPath, file.name)).size : null
          }));
        return {
          success: true,
          directory: args.path,
          files: listing
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to list directory: ${error.message}`
        };
      }
    }

    case 'search_codebase': {
      const searchPath = path.join(projectRoot);
      const results = [];
      const MAX_RESULTS = 50;
      
      function searchDir(dir, pattern, fileType) {
        if (results.length >= MAX_RESULTS) return;
        
        try {
          const files = fs.readdirSync(dir, { withFileTypes: true });
          files.forEach(file => {
            if (results.length >= MAX_RESULTS) return;
            
            if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
              searchDir(path.join(dir, file.name), pattern, fileType);
            } else if (file.isFile()) {
              if (!fileType || file.name.endsWith(`.${fileType}`)) {
                const filePath = path.join(dir, file.name);
                try {
                  const content = fs.readFileSync(filePath, 'utf-8');
                  const regex = new RegExp(args.pattern, 'gi');
                  if (regex.test(content)) {
                    const relPath = path.relative(projectRoot, filePath);
                    results.push({
                      file: relPath,
                      matches: (content.match(new RegExp(args.pattern, 'gi')) || []).length
                    });
                  }
                } catch (e) {
                  // Skip read errors
                }
              }
            }
          });
        } catch (e) {
          // Skip directory errors
        }
      }
      
      searchDir(searchPath, args.pattern, args.fileType);
      return {
        success: true,
        pattern: args.pattern,
        fileType: args.fileType || 'all',
        resultCount: results.length,
        results: results.slice(0, 20)
      };
    }

    case 'get_file_tree': {
      const rootPath = path.join(projectRoot, args.path || '.');
      const maxDepth = args.maxDepth || 4;
      
      function buildTree(dir, depth = 0, prefix = '') {
        if (depth > maxDepth) return '';
        
        let output = '';
        try {
          const files = fs.readdirSync(dir, { withFileTypes: true })
            .filter(f => !f.name.startsWith('.') && f.name !== 'node_modules' && f.name !== '.next')
            .sort((a, b) => {
              if (a.isDirectory() !== b.isDirectory()) {
                return a.isDirectory() ? -1 : 1;
              }
              return a.name.localeCompare(b.name);
            });
          
          files.forEach((file, index) => {
            const isLast = index === files.length - 1;
            const marker = isLast ? '└── ' : '├── ';
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');
            
            output += prefix + marker + file.name + (file.isDirectory() ? '/' : '') + '\n';
            
            if (file.isDirectory()) {
              output += buildTree(path.join(dir, file.name), depth + 1, nextPrefix);
            }
          });
        } catch (e) {
          // Skip errors
        }
        return output;
      }
      
      return {
        success: true,
        path: args.path || '.',
        tree: buildTree(rootPath)
      };
    }

    case 'analyze_dependencies': {
      const filePath = path.join(projectRoot, args.path);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Find all imports
        const importRegex = /import\s+(?:{[^}]+}|[^from]+)\s+from\s+['"]([^'"]+)['"]/g;
        const imports = [];
        let match;
        
        while ((match = importRegex.exec(content)) !== null) {
          imports.push({
            source: match[1],
            isRelative: match[1].startsWith('.'),
            isNodeModule: !match[1].startsWith('.')
          });
        }
        
        return {
          success: true,
          path: args.path,
          importCount: imports.length,
          imports: imports.slice(0, 30)
        };
      } catch (error) {
        return {
          success: false,
          error: `Failed to analyze file: ${error.message}`
        };
      }
    }

    default:
      return {
        success: false,
        error: `Unknown tool: ${name}`
      };
  }
}

// MCP Protocol Handler
function handleJsonRpc(line) {
  try {
    const request = JSON.parse(line);
    const { jsonrpc, id, method, params } = request;

    if (method === 'initialize') {
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          resources: {
            listResources: true,
            readResource: true
          },
          tools: {
            listTools: true,
            callTool: true
          }
        },
        serverInfo: {
          name: 'MOA-Document-Editor-MCP',
          version: '1.0.0'
        }
      });
    } else if (method === 'resources/list') {
      sendResponse(id, {
        resources: Object.values(resources).map(r => ({
          uri: r.uri,
          name: r.name,
          description: r.description,
          mimeType: r.mimeType
        }))
      });
    } else if (method === 'resources/read') {
      const resource = resources[params.uri];
      if (resource) {
        sendResponse(id, {
          contents: [{
            uri: params.uri,
            mimeType: resource.mimeType,
            text: resource.content
          }]
        });
      } else {
        sendResponse(id, null, {
          code: -32601,
          message: `Resource not found: ${params.uri}`
        });
      }
    } else if (method === 'tools/list') {
      sendResponse(id, { tools });
    } else if (method === 'tools/call') {
      const result = executeTool(params.name, params.arguments);
      sendResponse(id, result);
    } else {
      sendResponse(id, null, {
        code: -32601,
        message: `Unknown method: ${method}`
      });
    }
  } catch (error) {
    console.error('Error handling request:', error);
  }
}

// Setup input handling
rl.on('line', (line) => {
  if (line.trim()) {
    handleJsonRpc(line);
  }
});

rl.on('close', () => {
  process.exit(0);
});

// Log startup message to stderr
console.error('MOA Document Editor MCP Server started');
