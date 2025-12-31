#!/bin/bash

# MCP Server Installation Guide for MOA Document Editor

echo "MOA Document Editor - MCP Server Setup"
echo "======================================"
echo ""

# Check if on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "macOS detected"
    echo ""
    echo "1. Open Claude Desktop application"
    echo "2. Click on 'Settings' (gear icon)"
    echo "3. Select 'Developer' tab"
    echo "4. Click 'Edit Config' button"
    echo ""
    echo "5. Add the following to claude_desktop_config.json:"
    echo ""
    echo '  "mcpServers": {'
    echo '    "moa-document-editor": {'
    echo '      "command": "node",'
    echo '      "args": ["'$(pwd)'/mcp-server.js"],'
    echo '      "env": {'
    echo '        "NODE_ENV": "production"'
    echo '      }'
    echo '    }'
    echo '  }'
    echo ""
    echo "6. Save and restart Claude Desktop"
    echo "7. You should now see 'moa-document-editor' in the MCP selector"
    echo ""
    CONFIG_FILE="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
    
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || "$OSTYPE" == "win32" ]]; then
    echo "Windows detected"
    echo ""
    echo "1. Open Claude Desktop application"
    echo "2. Click on 'Settings' (gear icon)"
    echo "3. Select 'Developer' tab"
    echo "4. Click 'Edit Config' button"
    echo ""
    echo "5. Add the following to claude_desktop_config.json:"
    echo ""
    echo '  "mcpServers": {'
    echo '    "moa-document-editor": {'
    echo '      "command": "node",'
    echo '      "args": ["'$(pwd)'/mcp-server.js"],'
    echo '      "env": {'
    echo '        "NODE_ENV": "production"'
    echo '      }'
    echo '    }'
    echo '  }'
    echo ""
    echo "6. Save and restart Claude Desktop"
    echo "7. You should now see 'moa-document-editor' in the MCP selector"
    echo ""
    CONFIG_FILE="$APPDATA\\Claude\\claude_desktop_config.json"
    
else
    echo "Linux detected"
    echo ""
    echo "1. Open Claude Desktop application"
    echo "2. Click on 'Settings' (gear icon)"
    echo "3. Select 'Developer' tab"
    echo "4. Click 'Edit Config' button"
    echo ""
    echo "5. Add the following to claude_desktop_config.json:"
    echo ""
    echo '  "mcpServers": {'
    echo '    "moa-document-editor": {'
    echo '      "command": "node",'
    echo '      "args": ["'$(pwd)'/mcp-server.js"],'
    echo '      "env": {'
    echo '        "NODE_ENV": "production"'
    echo '      }'
    echo '    }'
    echo '  }'
    echo ""
    echo "6. Save and restart Claude Desktop"
    echo "7. You should now see 'moa-document-editor' in the MCP selector"
    echo ""
    CONFIG_FILE="$HOME/.config/Claude/claude_desktop_config.json"
fi

echo ""
echo "Config file location: $CONFIG_FILE"
echo ""
echo "For more information, see MCP_README.md"
