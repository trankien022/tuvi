#!/usr/bin/env node

/**
 * HTTP MCP Server for Trúc Nghị Project
 * Provides MCP tools via HTTP/REST API
 * 
 * URL: http://localhost:3000/mcp
 * Inspector: http://localhost:3000
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import http from 'http';
import url from 'url';

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PORT = process.env.MCP_PORT || 3000;
const PROJECT_ROOT = __dirname;
const MCP_VERSION = '2024-11-05';

// Import tools implementation
import { TOOLS, toolImplementations } from './mcp-server.js';

// HTML Dashboard
const getDashboardHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🚀 Trúc Nghị MCP Server</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      overflow: hidden;
    }
    
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }
    
    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }
    
    .header p {
      font-size: 1.1em;
      opacity: 0.9;
    }
    
    .content {
      padding: 40px;
    }
    
    .section {
      margin-bottom: 40px;
    }
    
    .section h2 {
      color: #667eea;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #667eea;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .info-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    
    .info-card h3 {
      color: #333;
      margin-bottom: 10px;
      font-size: 1.1em;
    }
    
    .info-card p {
      color: #666;
      font-family: 'Courier New', monospace;
      word-break: break-all;
    }
    
    .tools-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
    }
    
    .tool-item {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
      transition: all 0.3s;
    }
    
    .tool-item:hover {
      border-color: #667eea;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
    }
    
    .tool-item strong {
      color: #667eea;
      display: block;
      margin-bottom: 5px;
    }
    
    .tool-item small {
      color: #999;
      display: block;
      line-height: 1.4;
    }
    
    .endpoint {
      background: #f0f4ff;
      padding: 15px;
      border-radius: 6px;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
      word-break: break-all;
    }
    
    .status {
      background: #10b981;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      display: inline-block;
      margin: 10px 0;
    }
    
    .button {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      margin: 10px 5px 10px 0;
      transition: all 0.3s;
    }
    
    .button:hover {
      background: #764ba2;
      transform: translateY(-2px);
    }
    
    .code-block {
      background: #1e1e1e;
      color: #d4d4d4;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 10px 0;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
      line-height: 1.5;
    }
    
    footer {
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #666;
      border-top: 1px solid #e0e0e0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Trúc Nghị MCP Server</h1>
      <p>HTTP-based Model Context Protocol Server</p>
    </div>
    
    <div class="content">
      <div class="section">
        <h2>✅ Server Status</h2>
        <div class="status">🟢 Server Running</div>
        <div class="info-grid">
          <div class="info-card">
            <h3>API Endpoint</h3>
            <p>http://localhost:${PORT}/mcp</p>
          </div>
          <div class="info-card">
            <h3>Version</h3>
            <p>${MCP_VERSION}</p>
          </div>
          <div class="info-card">
            <h3>Available Tools</h3>
            <p>${TOOLS.length} tools</p>
          </div>
        </div>
      </div>
      
      <div class="section">
        <h2>📋 Configuration for Claude Desktop</h2>
        <p>Add this to your <code>.vscode/mcp.json</code> or Claude Desktop config:</p>
        <div class="code-block">
{
  "servers": {
    "trucnghi-http": {
      "url": "http://localhost:${PORT}/mcp",
      "type": "http"
    }
  }
}
        </div>
      </div>
      
      <div class="section">
        <h2>🛠️ Available Tools (${TOOLS.length})</h2>
        <div class="tools-list">
          ${TOOLS.map(tool => `
            <div class="tool-item">
              <strong>📌 ${tool.name}</strong>
              <small>${tool.description}</small>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="section">
        <h2>📡 API Usage</h2>
        
        <h3>List Tools</h3>
        <div class="endpoint">GET http://localhost:${PORT}/mcp/tools</div>
        
        <h3>Call Tool</h3>
        <div class="endpoint">POST http://localhost:${PORT}/mcp/tools/call</div>
        
        <h3>Example Request</h3>
        <div class="code-block">
curl -X POST http://localhost:${PORT}/mcp/tools/call \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "get_project_structure",
    "arguments": {}
  }'
        </div>
      </div>
      
      <div class="section">
        <h2>🔗 Quick Links</h2>
        <a href="/mcp/tools" class="button">📋 View All Tools</a>
        <a href="/mcp/project-info" class="button">📊 Project Info</a>
        <a href="/health" class="button">💚 Health Check</a>
      </div>
    </div>
    
    <footer>
      <p>Trúc Nghị MCP Server | Version ${MCP_VERSION} | Running on port ${PORT}</p>
    </footer>
  </div>
</body>
</html>
`;

// Parse JSON body
const parseJsonBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
};

// Handle requests
const handleHttpRequest = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Dashboard
    if (pathname === '/' && method === 'GET') {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(getDashboardHTML());
      return;
    }

    // Health check
    if (pathname === '/health' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }));
      return;
    }

    // OpenAPI Schema
    if (pathname === '/openapi.json' && method === 'GET') {
      const openAPISchema = {
        openapi: '3.1.0',
        info: {
          title: 'Trúc Nghị Project MCP API',
          description: 'MCP Server for Trúc Nghị Landing Page project with 9 tools for code analysis and project exploration',
          version: '1.0.0'
        },
        servers: [
          { url: 'https://gayle-hematogenous-enid.ngrok-free.dev' },
          { url: 'http://localhost:3000' }
        ],
        paths: {
          '/mcp/tools/call': {
            post: {
              summary: 'Call an MCP tool',
              description: 'Call any of the 9 available MCP tools',
              operationId: 'callTool',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      required: ['name', 'arguments'],
                      properties: {
                        name: {
                          type: 'string',
                          enum: ['read_file', 'search_files', 'search_code', 'list_directory', 'get_registration_data', 'get_payment_status', 'list_components', 'get_project_structure', 'get_api_endpoints'],
                          description: 'Name of the tool to call'
                        },
                        arguments: {
                          type: 'object',
                          description: 'Arguments for the tool'
                        }
                      }
                    }
                  }
                }
              },
              responses: {
                200: { description: 'Tool executed successfully' },
                400: { description: 'Invalid request' }
              }
            }
          },
          '/mcp/tools': {
            get: {
              summary: 'List all tools',
              operationId: 'listTools',
              responses: {
                200: { description: 'List of tools' }
              }
            }
          }
        }
      };
      res.writeHead(200);
      res.end(JSON.stringify(openAPISchema));
      return;
    }

    // List tools
    if (pathname === '/mcp/tools' && method === 'GET') {
      res.writeHead(200);
      res.end(JSON.stringify({ tools: TOOLS, count: TOOLS.length }));
      return;
    }

    // Project info
    if (pathname === '/mcp/project-info' && method === 'GET') {
      const result = toolImplementations.get_project_structure({});
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    }

    // Call tool
    if (pathname === '/mcp/tools/call' && method === 'POST') {
      const body = await parseJsonBody(req);
      const { name, arguments: args } = body;

      if (!name) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Tool name required' }));
        return;
      }

      if (!toolImplementations[name]) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: `Tool not found: ${name}` }));
        return;
      }

      try {
        const result = toolImplementations[name](args || {});
        res.writeHead(200);
        res.end(JSON.stringify({ success: true, result }));
      } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: error.message }));
      }
      return;
    }

    // MCP endpoint (for tools/list request)
    if (pathname === '/mcp' && method === 'POST') {
      const body = await parseJsonBody(req);
      const { method: mcpMethod, params } = body;

      if (mcpMethod === 'tools/list') {
        res.writeHead(200);
        res.end(JSON.stringify({ tools: TOOLS }));
        return;
      }

      if (mcpMethod === 'tools/call') {
        const { name, arguments: args } = params;
        if (!toolImplementations[name]) {
          res.writeHead(404);
          res.end(JSON.stringify({ error: `Tool not found: ${name}` }));
          return;
        }
        try {
          const result = toolImplementations[name](args || {});
          res.writeHead(200);
          res.end(JSON.stringify({ result }));
        } catch (error) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: error.message }));
        }
        return;
      }
    }

    // 404
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
};

// Serverless function export for Vercel
export default async (req, res) => {
  return handleHttpRequest(req, res);
};

// Create and start server (for local development)
const server = http.createServer(handleHttpRequest);

server.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     🚀 Trúc Nghị MCP Server (HTTP) - STARTED 🚀       ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`📍 Dashboard:       http://localhost:${PORT}`);
  console.log(`📡 MCP API:         http://localhost:${PORT}/mcp`);
  console.log(`📋 Tools List:      http://localhost:${PORT}/mcp/tools`);
  console.log(`💚 Health Check:    http://localhost:${PORT}/health`);
  console.log('');
  console.log('Configuration for Claude Desktop:');
  console.log(`{
  "servers": {
    "trucnghi-http": {
      "url": "http://localhost:${PORT}/mcp",
      "type": "http"
    }
  }
}`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n📛 Shutting down...');
  server.close(() => {
    console.log('✅ Server stopped');
    process.exit(0);
  });
});
