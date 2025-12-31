# Complete MCP Integration Guide for MOA Document Editor

## Overview

This guide provides complete instructions for integrating the MOA Document Editor with MCP (Model Context Protocol) servers for AI-assisted development and understanding.

## What You Get

### 📚 Documentation Resources (7 major guides)
1. **Architecture Overview** - Complete system design and data flow
2. **Data Models & Types** - All TypeScript interfaces
3. **API Documentation** - Endpoint specifications
4. **Components Guide** - React component architecture
5. **Document Processing Workflow** - End-to-end workflow
6. **Development Setup** - Environment and workflow
7. **Dependencies** - Library purposes and usage

### 🛠️ Code Exploration Tools (5 tools)
1. **read_source_file** - View any source file or line ranges
2. **list_directory** - Browse project structure
3. **search_codebase** - Find code patterns and functions
4. **get_file_tree** - Generate ASCII project tree
5. **analyze_dependencies** - Examine file imports

## Quick Start

### Step 1: Verify MCP Files Exist
```bash
# From project root (d:\source\moa\)
ls -la | grep -E "mcp|MCP"
# You should see:
# - mcp-server.js (MCP server implementation)
# - mcp.config.json (MCP configuration)
# - MCP_README.md (This documentation)
# - claude_desktop_config.example.json (Example config)
```

### Step 2: Test MCP Server (Optional)
```bash
# Run the MCP server in test mode
node mcp-server.js
# Press Ctrl+C to stop

# Or test with a simple JSON-RPC request
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | node mcp-server.js
```

### Step 3: Configure Claude Desktop

#### On Windows/Linux:
1. Open Claude Desktop
2. Click Settings (⚙️) → Developer
3. Click "Edit Config"
4. Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "moa-document-editor": {
      "command": "node",
      "args": ["d:\\source\\moa\\mcp-server.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

#### On macOS:
Same steps, but path format:
```json
"args": ["/Users/yourname/path/to/moa/mcp-server.js"]
```

### Step 4: Restart Claude Desktop
- Close and reopen Claude Desktop
- Look for "moa-document-editor" in the MCP selector

## Using MCP in Claude Desktop

### Accessing Resources

Once connected, you can ask Claude:

```
"Show me the project architecture overview"
# Claude will access moa://architecture/overview

"What are all the TypeScript types in this project?"
# Claude will access moa://data-models/types

"Explain the document processing workflow"
# Claude will access moa://workflows/document-processing
```

### Using Tools

```
"Read the DataExtraction component file"
# Claude will use read_source_file tool with path

"List all files in the components directory"
# Claude will use list_directory tool

"Search for all export functions in the codebase"
# Claude will use search_codebase tool

"Show me the full project structure"
# Claude will use get_file_tree tool

"What are the dependencies in documentProcessor.ts?"
# Claude will use analyze_dependencies tool
```

## MCP Server Architecture

```
┌─────────────────────────────────────┐
│      Claude Desktop / Client        │
└────────────────┬────────────────────┘
                 │ JSON-RPC 2.0
                 ▼
┌─────────────────────────────────────┐
│        MCP Server (Node.js)          │
├─────────────────────────────────────┤
│ Resources (Documentation)            │
│ - Architecture Overview              │
│ - Data Models                        │
│ - API Documentation                  │
│ - Components Guide                   │
│ - Workflows                          │
│ - Development Setup                  │
│ - Dependencies                       │
├─────────────────────────────────────┤
│ Tools (Code Exploration)             │
│ - read_source_file                   │
│ - list_directory                     │
│ - search_codebase                    │
│ - get_file_tree                      │
│ - analyze_dependencies               │
├─────────────────────────────────────┤
│ Protocol Implementation              │
│ - initialize                         │
│ - resources/list                     │
│ - resources/read                     │
│ - tools/list                         │
│ - tools/call                         │
└──────────────┬──────────────────────┘
               │
               ▼
        ┌──────────────┐
        │ Filesystem   │
        │ - Source     │
        │ - Config     │
        │ - Docs       │
        └──────────────┘
```

## File Structure

```
moa/
├── mcp-server.js                    # MCP server implementation (600+ lines)
│   ├── Resources (7 comprehensive guides)
│   ├── Tools (5 code exploration tools)
│   └── MCP Protocol Implementation
│
├── mcp.config.json                  # MCP configuration
├── MCP_README.md                    # Quick reference guide
├── claude_desktop_config.example.json # Example configuration
├── setup-mcp.sh                     # Setup helper script
└── MCP_INTEGRATION_GUIDE.md          # This file

Plus all project source files...
```

## Available Resources (Detailed)

### 1. moa://architecture/overview
- **Size**: ~3000 lines of documentation
- **Contains**:
  - Project vision and goals
  - High-level architecture diagram
  - Core workflows (4 main flows)
  - Technology stack breakdown
  - Project structure with full paths
  - Data flow diagrams
  - Key features (6 major categories)
  - Scalability considerations

### 2. moa://data-models/types
- **Size**: ~500 lines
- **Contains**:
  - All TypeScript interfaces
  - Core data structures
  - Conversion types
  - Store interface
  - Validation error types

### 3. moa://api/documentation
- **Size**: ~400 lines
- **Contains**:
  - POST /api/process-document
  - POST /api/generate-document
  - Request/response formats
  - Processing steps
  - Error handling
  - Performance considerations
  - Security features

### 4. moa://components/guide
- **Size**: ~500 lines
- **Contains**:
  - Component hierarchy
  - 8 UI components described
  - Component purposes
  - Props and states
  - Styling approach
  - RTL support
  - Zustand integration
  - Form handling
  - Accessibility

### 5. moa://workflows/document-processing
- **Size**: ~600 lines
- **Contains**:
  - Complete upload flow
  - Text extraction process
  - Parsing logic
  - Trade license parsing
  - Party document parsing
  - Error handling at each stage
  - Performance optimization
  - Data persistence

### 6. moa://development/setup
- **Size**: ~400 lines
- **Contains**:
  - Prerequisites
  - Installation steps
  - Development workflow
  - Creating components
  - Adding API routes
  - Debugging techniques
  - Testing checklist
  - Code style
  - Troubleshooting

### 7. moa://project/dependencies
- **Size**: ~400 lines
- **Contains**:
  - All 20+ dependencies listed
  - Purpose of each library
  - Version numbers
  - Dependency analysis
  - Bundle impact
  - Performance considerations
  - Security notes
  - Future additions

## Available Tools (Detailed)

### 1. read_source_file
Read any source file in the project

**Parameters**:
```
path: string (required) - relative path, e.g., "components/DataExtraction.tsx"
startLine: number (optional) - start reading from line
endLine: number (optional) - end reading at line
```

**Returns**:
```json
{
  "success": true,
  "path": "components/DataExtraction.tsx",
  "totalLines": 245,
  "startLine": 1,
  "endLine": 50,
  "content": "..."
}
```

**Examples**:
```
"Read the validation.ts file"
"Show me lines 1-50 of documentProcessor.ts"
"View the DocumentUpload component"
```

### 2. list_directory
List all files in a directory

**Parameters**:
```
path: string (required) - relative path, e.g., "components"
```

**Returns**:
```json
{
  "success": true,
  "directory": "components",
  "files": [
    { "name": "DataExtraction.tsx", "type": "file", "size": 8204 },
    { "name": "DocumentUpload.tsx", "type": "file", "size": 4521 },
    ...
  ]
}
```

**Examples**:
```
"What's in the components folder?"
"List files in lib/moa directory"
"Show me everything in app/api"
```

### 3. search_codebase
Search for text patterns

**Parameters**:
```
pattern: string (required) - text or regex to search for
fileType: string (optional) - filter by extension, e.g., "tsx"
```

**Returns**:
```json
{
  "success": true,
  "pattern": "export function",
  "fileType": "ts",
  "resultCount": 15,
  "results": [
    { "file": "lib/documentProcessor.ts", "matches": 3 },
    ...
  ]
}
```

**Examples**:
```
"Search for all interfaces"
"Find all components with 'export function'"
"Search for validation rules"
```

### 4. get_file_tree
Generate ASCII project tree

**Parameters**:
```
path: string (optional, default: ".") - root for tree
maxDepth: number (optional, default: 4) - how deep to show
```

**Returns**:
```json
{
  "success": true,
  "path": ".",
  "tree": "moa/\n├── app/\n│   ├── page.tsx\n..."
}
```

**Examples**:
```
"Show me the project structure"
"Generate a file tree for the lib folder"
```

### 5. analyze_dependencies
Analyze imports in a file

**Parameters**:
```
path: string (required) - file to analyze
```

**Returns**:
```json
{
  "success": true,
  "path": "lib/documentProcessor.ts",
  "importCount": 8,
  "imports": [
    { "source": "@/store/documentStore", "isRelative": true, "isNodeModule": false },
    { "source": "tesseract.js", "isRelative": false, "isNodeModule": true },
    ...
  ]
}
```

**Examples**:
```
"What does DataExtraction.tsx import?"
"Show me all external dependencies in documentGenerator.ts"
```

## Common Workflows

### Learning the Project
```
1. Start with: "Show me the project architecture overview"
2. Then: "List the main components"
3. Then: "Explain the document processing workflow"
4. Then: "Show the data models"
5. Finally: "Read specific component files"
```

### Adding New Features
```
1. "What is the current data structure?"
2. "Show me how document generation works"
3. "Read the validation.ts file"
4. "Search for similar functionality"
5. "Read the relevant component file"
6. "Analyze its dependencies"
```

### Debugging Issues
```
1. "Read the error-related file"
2. "Search for error handling patterns"
3. "Show me the component that handles this"
4. "List dependencies for debugging context"
5. "Show the API endpoint code"
```

### Understanding Workflows
```
1. "Explain the document processing workflow"
2. "Read the documentProcessor.ts file"
3. "Read the validation.ts file"
4. "Show me how the store works"
5. "Read the relevant API route"
```

## Troubleshooting

### MCP Server Not Connecting
**Problem**: Claude says "Connection failed"

**Solutions**:
1. Verify node is installed: `node --version`
2. Check file path is absolute and correct
3. Restart Claude Desktop after updating config
4. Check mcp-server.js exists in the directory

### Tools Not Available
**Problem**: Tools not showing in Claude

**Solutions**:
1. MCP server may not have initialized
2. Check Claude Console for errors
3. Verify claude_desktop_config.json syntax
4. Try restarting Claude Desktop

### Can't Read Files
**Problem**: "File not found" when reading

**Solutions**:
1. Use relative paths from project root
2. Check file exists: `ls path/to/file`
3. Use Windows paths on Windows: `components\DataExtraction.tsx`
4. Use Unix paths on Mac/Linux: `components/DataExtraction.tsx`

### Search Returning No Results
**Problem**: Can't find expected code

**Solutions**:
1. Try different search pattern
2. Use regex if needed: `export.*function`
3. Verify file extension correct (tsx vs ts)
4. Search broader area first, then narrow down

## Performance Tips

### Faster Searches
```
# Instead of:
"Search for all functions"

# Try:
"Search for 'export function' in .tsx files"
```

### Efficient File Reading
```
# Instead of reading entire large files:
"Read lines 1-50 of documentProcessor.ts"

# Or search first, then read specific lines:
"Search for 'parseTradeLicense' in .ts files"
"Read that function implementation"
```

### Project Navigation
```
# Use the tree view to understand structure:
"Show me the project structure"

# Then dive into specific directories:
"List files in components"
"List files in lib/moa"
```

## Advanced Usage

### Custom Analysis Requests

```
"What is the total size of all TypeScript files?"
# Claude can use list_directory and search to estimate

"Show me the dependency graph"
# Claude can use analyze_dependencies on multiple files

"What are all the API endpoints?"
# Claude can search for 'export' in app/api

"Create a development plan for [feature]"
# Claude can read relevant files and create plan
```

### Integration with Development

```
"I'm adding a new conversion type. Walk me through the changes needed."
# Claude reads architecture, data models, validation, components

"Help me implement [feature]"
# Claude reads existing patterns, suggests implementation

"Review my code for [file]"
# Claude reads the file and existing patterns, provides feedback
```

## Best Practices

### 1. Always Start with Context
```
"Before we begin, show me the architecture overview"
```

### 2. Use Specific Queries
```
# Good:
"Read components/DataExtraction.tsx"

# Less effective:
"Show me a component"
```

### 3. Build Understanding Progressively
```
1. Architecture
2. Data Models
3. Specific Workflows
4. Component Details
5. Implementation Files
```

### 4. Leverage Search Before Reading
```
# Find it first:
"Search for 'parsePartyDocument' function"

# Then read:
"Read that implementation"
```

### 5. Use Tools Effectively
```
# Get tree:
"Show project structure"

# Browse directory:
"List components directory"

# Read file:
"Read [specific component]"

# Search patterns:
"Find all API routes"
```

## Resources

- **MCP_README.md** - Quick reference
- **mcp-server.js** - Full server implementation
- **Project Documentation** - In the MCP Resources

## Summary

You now have:
✅ Complete MCP server with 7 documentation resources
✅ 5 powerful code exploration tools
✅ Integration with Claude Desktop
✅ Comprehensive guides for all aspects
✅ Tools to understand and navigate the codebase
✅ Support for rebuilding and restructuring the project

Use Claude with MCP to:
- Understand the architecture deeply
- Explore the codebase efficiently
- Plan new features systematically
- Implement changes with confidence
- Debug issues more effectively
- Maintain consistent code patterns

---

**Version**: 1.0
**Last Updated**: December 2025
**Project**: MOA Document Editor
