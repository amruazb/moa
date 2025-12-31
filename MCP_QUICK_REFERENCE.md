# MOA Document Editor - MCP Quick Reference

## 🚀 Quick Start

### 1. Configure Claude Desktop
Edit `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "moa-document-editor": {
      "command": "node",
      "args": ["d:\\source\\moa\\mcp-server.js"]
    }
  }
}
```

### 2. Restart Claude Desktop
Close and reopen. Select "moa-document-editor" from MCP dropdown.

### 3. Start Using!
```
"Show me the architecture overview"
"Read components/DataExtraction.tsx"
"Search for 'export function' in .tsx files"
```

## 📚 Documentation Resources (Access in Claude)

| Resource | What It Contains | Best For |
|----------|-----------------|----------|
| **moa://architecture/overview** | System design, workflows, tech stack | Understanding overall structure |
| **moa://data-models/types** | All TypeScript interfaces | Understanding data flow |
| **moa://api/documentation** | API endpoints, request/response | Using/extending APIs |
| **moa://components/guide** | React components, props, usage | Building UI |
| **moa://workflows/document-processing** | Upload→Extract→Generate flow | Understanding workflows |
| **moa://development/setup** | Dev environment, workflows | Setting up & developing |
| **moa://project/dependencies** | All libraries & purposes | Understanding dependencies |

## 🛠️ Available Tools

### read_source_file
```
"Read components/DataExtraction.tsx"
"Show me lines 1-50 of lib/documentProcessor.ts"
"View the validation rules in lib/validation.ts"
```

### list_directory
```
"List files in components"
"What's in the lib/moa folder?"
"Show app/api contents"
```

### search_codebase
```
"Search for 'export interface'"
"Find 'parseTradeLicense' function"
"Search for 'handleUpload' in tsx files"
```

### get_file_tree
```
"Show the project structure"
"Generate a file tree"
"Display project organization"
```

### analyze_dependencies
```
"What does DataExtraction.tsx import?"
"Show me imports in documentGenerator.ts"
"List all dependencies in this file"
```

## 📊 Project Structure at a Glance

```
moa/
├── app/                    # Next.js routes & API
│   ├── page.tsx           # Main page
│   └── api/               # API endpoints
├── components/            # React components (8 files)
├── lib/                   # Business logic
│   ├── documentProcessor.ts    # OCR & parsing
│   ├── documentGenerator.ts    # Word generation
│   ├── validation.ts          # Data validation
│   └── moa/                   # MOA-specific
├── store/                 # Zustand state management
└── MCP files             # (mcp-server.js, etc.)
```

## 🔄 Common Workflows

### Learn New Feature Area
1. Request architecture overview
2. Ask about data models
3. Read workflow documentation
4. Browse specific components
5. Read implementation files

### Add New Feature
1. "Show me how [similar feature] works"
2. "Read the relevant component/module"
3. "Search for related code patterns"
4. "Read the data model"
5. "Check the API implementation"

### Debug Issue
1. "Read the component with the issue"
2. "Show me the relevant API"
3. "Search for error handling patterns"
4. "Check the data flow for this feature"

### Understand Workflow
1. "Explain the [workflow]"
2. "Show me the component code"
3. "Read the processing logic"
4. "Check the API route"
5. "Review validation rules"

## 💡 Tips & Tricks

### Effective Searching
```
✅ "Search for 'export function' in .tsx"
❌ "Search for functions"

✅ "Find 'DocumentData' interface"
❌ "Search for types"
```

### File Navigation
```
✅ "Read components/DataExtraction.tsx"
❌ "Read the component file"

✅ "Show lines 1-100 of documentProcessor.ts"
❌ "Read the big file"
```

### Understanding Code
```
✅ "Show me how document generation works end-to-end"
❌ "Explain the code"

✅ "What data flows through this component?"
❌ "What happens here?"
```

## 🔍 Key Files by Purpose

| Purpose | File | Lines |
|---------|------|-------|
| OCR & Parsing | lib/documentProcessor.ts | 321 |
| Word Generation | lib/documentGenerator.ts | 362 |
| Global State | store/documentStore.ts | 188 |
| Main Page | app/page.tsx | 109 |
| Data Types | lib/moa/types.ts | 80+ |

## 🏗️ Architecture Summary

```
User Interface (React Components)
         ↓
   Zustand Store (Global State)
         ↓
  Business Logic (lib/)
         ↓
API Endpoints (app/api/)
         ↓
External Services (Tesseract, pdf-parse, etc.)
```

## 📖 Tech Stack Quick Check

| Layer | Tech | Version |
|-------|------|---------|
| Framework | Next.js | 16.0.10 |
| UI | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.3.0 |
| State | Zustand | 4.4.7 |
| Forms | react-hook-form | 7.48.2 |
| OCR | Tesseract.js | 4.1.4 |
| PDF | pdf-parse | 1.1.1 |
| DOCX | docx | 8.5.0 |

## 🎯 Use Cases for MCP

| Need | Best Tool | Query Example |
|------|-----------|---------------|
| Understand structure | get_file_tree | "Show project structure" |
| Find something | search_codebase | "Search for X" |
| Read code | read_source_file | "Read component X" |
| Explore folder | list_directory | "List components folder" |
| Check imports | analyze_dependencies | "What imports X?" |
| Learn patterns | Multiple + read | "How does X work?" |

## ⚡ Power Features

### Asking Follow-ups
```
Claude: "Here's the component..."
You: "Where is this value coming from?"
Claude: Uses tools to investigate and answers
```

### Cross-file Analysis
```
"Show me how data flows from DataExtraction to DocumentPreview"
Claude: Reads multiple files and traces flow
```

### Pattern Discovery
```
"How are forms validated in this project?"
Claude: Searches and reads to find patterns
```

### Architecture Review
```
"Is this architecture good for adding feature X?"
Claude: Understands architecture and advises
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MCP not connecting | Restart Claude, check path absolute |
| Tools not appearing | Check config syntax, restart Claude |
| "File not found" | Use correct relative path from project root |
| Search returns nothing | Try different pattern, check file extension |
| Response truncated | Use line ranges instead of whole files |

## 📋 Checklist for New Developers

- [ ] Read architecture overview
- [ ] Understand data models
- [ ] Review components guide
- [ ] Read workflow documentation
- [ ] Explore development setup
- [ ] Read key source files
- [ ] Run project locally
- [ ] Try each workflow
- [ ] Make a small change
- [ ] Read contribution guide

## 🔗 File Links

| Documentation | Type | Size |
|---------------|------|------|
| MCP_README.md | Quick Reference | 4KB |
| MCP_INTEGRATION_GUIDE.md | Complete Guide | 8KB |
| mcp-server.js | Server Code | 30KB |
| mcp.config.json | Configuration | <1KB |

## 🎓 Learning Path

1. **Day 1**: Read architecture overview, understand data models
2. **Day 2**: Review components, understand workflows
3. **Day 3**: Read setup guide, run project
4. **Day 4**: Make small code changes
5. **Day 5+**: Start implementing features

## 💬 Example Prompts

```
"Explain how the OCR processing works"
"What are all the API endpoints?"
"Show me how state flows through components"
"Where would I add a new validation rule?"
"What happens when a user uploads a document?"
"How is bilingual support implemented?"
"What are the main limitations of current design?"
"How would I add a new document type?"
```

## 🚀 Next Steps

1. **Setup**: Configure Claude Desktop with MCP server
2. **Learn**: Start with architecture overview
3. **Explore**: Use tools to navigate codebase
4. **Understand**: Deep dive into relevant modules
5. **Develop**: Make changes with full context
6. **Rebuild**: Restructure as needed with full understanding

---

**Remember**: The MCP server gives Claude complete access to your codebase documentation and tools to explore it. Use it to accelerate learning and development!

**Quick Help**: In Claude, try: "What can you help me with?" to see MCP capabilities.
