# MOA Document Editor - MCP (Model Context Protocol) Server

This document describes the complete MCP (Model Context Protocol) server setup for the MOA Document Editor project.

## What is MCP?

MCP (Model Context Protocol) is a protocol for providing AI models and agents with access to tools and resources. It enables:
- **Code exploration**: Browse and search the entire codebase
- **Documentation**: Access comprehensive project documentation
- **Tools**: Execute operations like file reading, searching, and analysis
- **Context**: Provide AI with deep project understanding for better assistance

## MCP Server Setup

### Files Created

#### 1. **mcp.config.json**
Configuration file for the MCP server:
```json
{
  "mcpServers": {
    "moa-document-editor": {
      "command": "node",
      "args": ["mcp-server.js"]
    }
  }
}
```

#### 2. **mcp-server.js**
The actual MCP server implementation that:
- Exposes project documentation as **Resources**
- Provides **Tools** for code exploration
- Implements the MCP 2024-11-05 protocol

## Available Resources

### Architecture & Design
- **moa://architecture/overview** - Complete project architecture with diagrams and workflows

### Data Models
- **moa://data-models/types** - All TypeScript interfaces and data structures

### API Documentation
- **moa://api/documentation** - Complete API endpoints documentation

### Components
- **moa://components/guide** - React components guide with usage examples

### Workflows
- **moa://workflows/document-processing** - Document processing workflow

### Development
- **moa://development/setup** - Development setup and workflow guide

### Dependencies
- **moa://project/dependencies** - Complete dependency list with purposes

## Available Tools

### 1. read_source_file
Read and view source file contents

**Usage:**
```
Tool: read_source_file
Arguments:
  - path: "components/DataExtraction.tsx" (required)
  - startLine: 1 (optional)
  - endLine: 50 (optional)
```

**Returns:**
- File contents
- Line count information
- Specific line range

### 2. list_directory
List all files and directories in a folder

**Usage:**
```
Tool: list_directory
Arguments:
  - path: "components" (required)
```

**Returns:**
- List of files with types
- File sizes
- Directory structure

### 3. search_codebase
Search for text patterns throughout the codebase

**Usage:**
```
Tool: search_codebase
Arguments:
  - pattern: "export function" (required)
  - fileType: "tsx" (optional)
```

**Returns:**
- Matching files
- Match counts
- Up to 20 top results

### 4. get_file_tree
Generate a complete project tree view

**Usage:**
```
Tool: get_file_tree
Arguments:
  - path: "." (optional, default: project root)
  - maxDepth: 4 (optional, default: 4)
```

**Returns:**
- ASCII tree structure
- All files and directories
- Up to specified depth

### 5. analyze_dependencies
Analyze imports and dependencies in a file

**Usage:**
```
Tool: analyze_dependencies
Arguments:
  - path: "lib/documentProcessor.ts" (required)
```

**Returns:**
- List of imports
- Import sources
- Whether imports are relative or external

## Project Structure Overview

```
moa/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Main page
│   ├── layout.tsx               # Root layout
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading state
│   ├── not-found.tsx            # 404 page
│   └── api/
│       ├── generate-document/   # Word generation
│       └── process-document/    # OCR processing
│
├── components/                   # React Components
│   ├── ConversionTypeSelector.tsx
│   ├── DataExtraction.tsx
│   ├── DocumentPreview.tsx
│   ├── DocumentUpload.tsx
│   ├── DocumentUploadButton.tsx
│   ├── LanguageToggle.tsx
│   ├── LivePreviewPane.tsx
│   └── MOADocument.tsx
│
├── lib/                          # Business Logic
│   ├── documentProcessor.ts
│   ├── documentGenerator.ts
│   ├── validation.ts
│   └── moa/
│       ├── moaGenerator.ts
│       └── types.ts
│
├── store/                        # State Management
│   └── documentStore.ts
│
├── public/                       # Static assets
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
├── mcp.config.json              # MCP config
├── mcp-server.js                # MCP server
└── MCP_README.md                # This file
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16 with TypeScript
- **UI**: React 19 with Tailwind CSS
- **State**: Zustand
- **Forms**: react-hook-form

### Document Processing
- **OCR**: Tesseract.js (client-side)
- **PDF**: pdf-parse
- **DOCX**: mammoth (read), docx (write)
- **Downloads**: file-saver

### Development
- **Linting**: ESLint
- **Package Manager**: pnpm

## Core Features

### 1. Document Upload & OCR
- Drag & drop interface
- Multi-format support (PDF, DOCX, Images)
- Client-side OCR processing
- English + Arabic support

### 2. Data Extraction
- Trade license parsing
- Party/member information extraction
- Automatic field detection
- Manual override options

### 3. Data Management
- Form-based editing
- Real-time validation
- Zustand state management
- Bilingual support

### 4. Document Generation
- Professional Word document output
- Multiple conversion types
- Bilingual templates
- Custom formatting

### 5. Live Preview
- Real-time document preview
- Instant feedback
- WYSIWYG editing

## Data Models

### Core Interfaces
- **DocumentData**: Main document structure
- **CompanyData**: Company information
- **PartyData**: Member/party information
- **OldMoaData**: Historical MOA details
- **ShareDistribution**: Share allocation

### Conversion Types
- LLC to SPC Conversion
- Share Transfer
- Partner Addition/Removal
- Ownership Change
- Custom Amendment

## API Endpoints

### POST /api/process-document
Extract and parse data from uploaded documents
- Input: File (PDF, DOCX, or image)
- Output: Structured document data

### POST /api/generate-document
Generate professional Word document
- Input: Document data + language + conversion type
- Output: DOCX file for download

## Development Workflow

### Getting Started
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint
```

### Creating Components
1. Create file in `/components` folder
2. Import Zustand store if needed
3. Add language support with `language === 'ar'` check
4. Use Tailwind CSS for styling

### Adding API Endpoints
1. Create route in `/app/api/[endpoint]/route.ts`
2. Export POST/GET/PUT/DELETE handlers
3. Return NextResponse with appropriate status codes

### Extending Data Models
1. Update interfaces in `/lib/moa/types.ts`
2. Update store in `/store/documentStore.ts`
3. Add form fields in `/components/DataExtraction.tsx`
4. Update parsing in `/lib/documentProcessor.ts`

## Key Files

### Business Logic
- **lib/documentProcessor.ts** (321 lines)
  - OCR and text extraction
  - Document-type specific parsing
  - Pattern matching for data extraction

- **lib/documentGenerator.ts** (362 lines)
  - Word document creation
  - Bilingual support
  - Custom formatting

- **lib/validation.ts**
  - Data validation rules
  - Conversion type definitions

### State Management
- **store/documentStore.ts** (188+ lines)
  - Zustand store setup
  - Global state actions
  - Document data management

### User Interface
- **app/page.tsx** (109+ lines)
  - 3-column layout
  - Component composition
  - Tab navigation

## Performance Considerations

### Optimizations
- Client-side OCR (no server load)
- Async file processing
- Lazy component loading
- Zustand for lightweight state

### Potential Bottlenecks
- OCR: 10-30 seconds per image
- Large PDF parsing: 5-10 seconds
- Document generation: 1-2 seconds

### Future Improvements
- Server-side OCR processing
- Batch document processing
- Database caching
- Advanced analytics

## Security Features

### Current
- File type validation
- File size limits
- In-memory data processing
- No persistent storage

### Compliance
- UAE data protection regulations
- No sensitive data logging
- Client-side processing only

## Troubleshooting

### OCR Issues
- Check Tesseract.js installation
- Verify image quality
- Try different image format
- Check console logs

### State Not Updating
- Verify Zustand hook usage
- Check component re-render logic
- Review store initialization

### Build Errors
- Clear `.next` folder
- Reinstall node_modules
- Check TypeScript types
- Verify imports

## Using MCP with Claude

### With Claude Desktop
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "moa-document-editor": {
      "command": "node",
      "args": ["/path/to/moa-document-editor/mcp-server.js"]
    }
  }
}
```

### With Claude API
Use the MCP server to provide context when making API calls.

## Resources for Further Development

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [Tesseract.js](https://tesseract.projectnaptha.com/)

## Support & Questions

For questions about the MCP server or project structure:
1. Check the relevant documentation resource
2. Use the search_codebase tool to find implementations
3. Read the specific component or module files
4. Review the development setup guide

---

**Last Updated**: December 2025
**MCP Protocol Version**: 2024-11-05
**Project Version**: 0.1.0
