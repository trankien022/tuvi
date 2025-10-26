#!/usr/bin/env node

/**
 * MCP Server for Trúc Nghị Project
 * Provides tools for:
 * - Reading and understanding codebase
 * - Searching files and functions
 * - Viewing payment status
 * - Editing components
 * - Managing registration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MCP Protocol version
const MCP_VERSION = '2024-11-05';

// Project root
const PROJECT_ROOT = __dirname;

// Response structure for MCP
class MCPResponse {
  constructor(result = null, error = null) {
    this.result = result;
    this.error = error;
  }
}

// Tools definitions
const TOOLS = [
  {
    name: 'read_file',
    description: 'Read the content of a file in the project',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: {
          type: 'string',
          description: 'Relative path to file (e.g., src/components/Hero.astro)'
        }
      },
      required: ['filePath']
    }
  },
  {
    name: 'search_files',
    description: 'Search for files by pattern or name',
    inputSchema: {
      type: 'object',
      properties: {
        pattern: {
          type: 'string',
          description: 'File name pattern to search (supports wildcards)'
        },
        directory: {
          type: 'string',
          description: 'Directory to search in (default: src)'
        }
      },
      required: ['pattern']
    }
  },
  {
    name: 'search_code',
    description: 'Search for code by keyword or function name',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: {
          type: 'string',
          description: 'Code keyword or function name to search'
        },
        fileType: {
          type: 'string',
          description: 'File type to search (astro, tsx, ts, default: all)'
        }
      },
      required: ['keyword']
    }
  },
  {
    name: 'list_directory',
    description: 'List contents of a directory',
    inputSchema: {
      type: 'object',
      properties: {
        dirPath: {
          type: 'string',
          description: 'Directory path to list'
        }
      },
      required: ['dirPath']
    }
  },
  {
    name: 'get_registration_data',
    description: 'Get registration form structure and configuration',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_payment_status',
    description: 'Get information about payment status checking',
    inputSchema: {
      type: 'object',
      properties: {
        orderCode: {
          type: 'string',
          description: 'Order code to check status'
        }
      }
    }
  },
  {
    name: 'list_components',
    description: 'List all components in the project',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Component category (features, common, ui, icons, layouts)'
        }
      }
    }
  },
  {
    name: 'get_project_structure',
    description: 'Get the overall project structure and architecture',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_api_endpoints',
    description: 'Get all API endpoints in the project',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  }
];

// Tool implementations
const toolImplementations = {
  read_file: ({ filePath }) => {
    try {
      const fullPath = path.join(PROJECT_ROOT, filePath);
      
      // Security: prevent directory traversal
      if (!fullPath.startsWith(PROJECT_ROOT)) {
        throw new Error('Access denied: Cannot access files outside project root');
      }
      
      if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found: ${filePath}`);
      }
      
      const content = fs.readFileSync(fullPath, 'utf-8');
      return {
        filePath,
        content,
        lines: content.split('\n').length,
        size: content.length
      };
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  },

  search_files: ({ pattern, directory = 'src' }) => {
    try {
      const searchDir = path.join(PROJECT_ROOT, directory);
      let cmd;
      
      // Use PowerShell-compatible find command
      if (process.platform === 'win32') {
        cmd = `dir "${searchDir}" /s /b | findstr "${pattern}"`;
      } else {
        cmd = `find "${searchDir}" -type f -name "*${pattern}*" 2>/dev/null`;
      }
      
      const results = execSync(cmd, {
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024 * 10,
        stdio: ['pipe', 'pipe', 'pipe']
      }).split('\n').filter(Boolean);
      
      return {
        pattern,
        directory,
        count: results.length,
        files: results.slice(0, 20).map(f => f.replace(PROJECT_ROOT, '').replace(/\\/g, '/'))
      };
    } catch (error) {
      return {
        pattern,
        directory,
        count: 0,
        files: [],
        error: 'Search returned no results'
      };
    }
  },

  search_code: ({ keyword, fileType = '*' }) => {
    try {
      const srcPath = path.join(PROJECT_ROOT, 'src');
      let cmd;
      
      if (process.platform === 'win32') {
        cmd = `findstr /s /r "${keyword}" "${srcPath}\\*"`;
      } else {
        const pattern = fileType === 'all' ? '*' : `*.${fileType}`;
        cmd = `grep -r "${keyword}" "${srcPath}" --include="${pattern}" 2>/dev/null`;
      }
      
      const results = execSync(cmd, {
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024 * 10,
        stdio: ['pipe', 'pipe', 'pipe']
      }).split('\n').filter(Boolean);
      
      return {
        keyword,
        fileType,
        count: results.length,
        matches: results.slice(0, 15).map(line => {
          const parts = line.split(':');
          return {
            file: parts[0].replace(PROJECT_ROOT, '').replace(/\\/g, '/'),
            line: parts[1] || 'N/A',
            content: parts.slice(2).join(':').trim()
          };
        })
      };
    } catch (error) {
      return {
        keyword,
        fileType,
        count: 0,
        matches: [],
        error: 'No matches found'
      };
    }
  },

  list_directory: ({ dirPath }) => {
    try {
      const fullPath = path.join(PROJECT_ROOT, dirPath);
      
      if (!fullPath.startsWith(PROJECT_ROOT)) {
        throw new Error('Access denied');
      }
      
      if (!fs.existsSync(fullPath)) {
        throw new Error(`Directory not found: ${dirPath}`);
      }
      
      const files = fs.readdirSync(fullPath);
      const structure = files.map(file => {
        const filePath = path.join(fullPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          type: stats.isDirectory() ? 'directory' : 'file',
          size: stats.size
        };
      });
      
      return {
        dirPath,
        totalItems: structure.length,
        items: structure
      };
    } catch (error) {
      throw new Error(`Error listing directory: ${error.message}`);
    }
  },

  get_registration_data: () => {
    try {
      const registrationPath = path.join(PROJECT_ROOT, 'src/types/registration.ts');
      const content = fs.readFileSync(registrationPath, 'utf-8');
      
      return {
        description: 'Registration system with 4-step form and PayOS integration',
        steps: [
          { step: 1, title: 'Thông tin gói', description: 'Xác nhận gói dịch vụ' },
          { step: 2, title: 'Thông tin liên hệ', description: 'Để chúng tôi liên hệ với bạn' },
          { step: 3, title: 'Thông tin sinh', description: 'Để luận giải chính xác' },
          { step: 4, title: 'Xác nhận', description: 'Kiểm tra và thanh toán' }
        ],
        formFields: {
          step1: ['packageId', 'packageName', 'price'],
          step2: ['fullName', 'phone', 'email'],
          step3: ['birthDay', 'birthMonth', 'birthYear', 'birthHour', 'gender'],
          step4: ['address', 'specialQuestion']
        },
        integratedSystems: ['PayOS', 'Google Sheets', 'Webhook handler'],
        apiEndpoints: [
          'POST /api/create-payment-link',
          'POST /api/check-payment-status',
          'POST /api/save-registration',
          'POST /api/payos-webhook'
        ]
      };
    } catch (error) {
      throw new Error(`Error getting registration data: ${error.message}`);
    }
  },

  get_payment_status: ({ orderCode }) => {
    try {
      const paymentCheckPath = path.join(PROJECT_ROOT, 'src/pages/api/check-payment-status.ts');
      
      if (!fs.existsSync(paymentCheckPath)) {
        return {
          status: 'error',
          message: 'Payment check endpoint not found'
        };
      }
      
      const content = fs.readFileSync(paymentCheckPath, 'utf-8');
      
      return {
        hasCheckEndpoint: true,
        location: 'src/pages/api/check-payment-status.ts',
        description: 'Checks payment status with PayOS',
        orderCode: orderCode || 'example',
        expectedResponse: {
          success: true,
          orderCode: orderCode || 'XXXXX',
          status: 'paid|pending|cancelled|expired',
          isPaid: true,
          paymentInfo: {
            status: 'string',
            amount: 'number',
            description: 'string',
            createdAt: 'timestamp',
            updatedAt: 'timestamp'
          }
        }
      };
    } catch (error) {
      throw new Error(`Error getting payment status: ${error.message}`);
    }
  },

  list_components: ({ category }) => {
    try {
      let componentPath = path.join(PROJECT_ROOT, 'src/components');
      
      if (category && category !== 'all') {
        componentPath = path.join(componentPath, category);
      }
      
      const getComponents = (dir) => {
        if (!fs.existsSync(dir)) return [];
        
        return fs.readdirSync(dir).map(file => {
          const fullPath = path.join(dir, file);
          const stats = fs.statSync(fullPath);
          
          if (stats.isDirectory()) {
            const indexFile = fs.readdirSync(fullPath).find(f => f === 'index.ts' || f === 'index.tsx');
            return {
              name: file,
              type: 'directory',
              hasIndex: !!indexFile,
              files: fs.readdirSync(fullPath)
            };
          }
          
          return {
            name: file,
            type: 'file'
          };
        });
      };
      
      const components = getComponents(componentPath);
      
      return {
        category: category || 'all',
        location: componentPath.replace(PROJECT_ROOT, '').replace(/\\/g, '/'),
        totalComponents: components.length,
        components
      };
    } catch (error) {
      throw new Error(`Error listing components: ${error.message}`);
    }
  },

  get_project_structure: () => {
    try {
      const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      
      return {
        name: 'Trúc Nghị Landing Page',
        framework: 'Astro 4.0 + React 18 + TypeScript',
        styling: 'Tailwind CSS',
        version: packageJson.version,
        directories: {
          src: {
            components: 'Reusable UI components (Astro + React)',
            pages: 'Page components and API routes',
            layouts: 'Layout components',
            types: 'TypeScript type definitions',
            config: 'Configuration files',
            lib: 'Utility functions and helpers',
            assets: 'Static assets (images, styles, fonts)'
          },
          public: 'Static files served as-is',
          scripts: 'Utility scripts for testing'
        },
        keyFeatures: [
          'Registration form with 4 steps',
          'PayOS payment integration',
          'Google Sheets data storage',
          'Webhook handling',
          'Responsive design',
          'SEO optimization',
          'Analytics integration'
        ],
        mainPages: [
          '/ - Homepage with hero, benefits, pricing, FAQ',
          '/register - Registration form',
          '/payment-success - Success page',
          '/payment-cancel - Cancel page'
        ]
      };
    } catch (error) {
      throw new Error(`Error getting project structure: ${error.message}`);
    }
  },

  get_api_endpoints: () => {
    try {
      const apiPath = path.join(PROJECT_ROOT, 'src/pages/api');
      const files = fs.readdirSync(apiPath).filter(f => f.endsWith('.ts'));
      
      const endpoints = files.map(file => {
        const content = fs.readFileSync(path.join(apiPath, file), 'utf-8');
        
        // Extract method and description from comments
        const methodMatch = content.match(/export\s+(?:const|async\s+function)\s+(\w+)|method:\s*['"](\w+)['"]/i);
        const descriptionMatch = content.match(/\/\/\s*(.+)[\n\r]/);
        
        return {
          file,
          path: `/api/${file.replace('.ts', '')}`,
          description: descriptionMatch ? descriptionMatch[1] : 'API endpoint',
          type: file.replace('.ts', '').replace(/-/g, '_').toUpperCase()
        };
      });
      
      return {
        basePath: '/api',
        totalEndpoints: endpoints.length,
        endpoints
      };
    } catch (error) {
      throw new Error(`Error getting API endpoints: ${error.message}`);
    }
  }
};

// MCP Request Handler
function handleRequest(request) {
  try {
    const { method, params } = request;

    if (method === 'tools/list') {
      return {
        tools: TOOLS
      };
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;
      
      if (!toolImplementations[name]) {
        return {
          error: `Tool not found: ${name}`
        };
      }

      try {
        const result = toolImplementations[name](args);
        return {
          result
        };
      } catch (error) {
        return {
          error: error.message
        };
      }
    }

    return {
      error: 'Unknown method'
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
}

// Main server setup
console.log('🚀 MCP Server for Trúc Nghị Project');
console.log(`📍 Project root: ${PROJECT_ROOT}`);
console.log(`📋 Available tools: ${TOOLS.length}`);
console.log('');

// Log available tools
TOOLS.forEach(tool => {
  console.log(`  ✓ ${tool.name}`);
});

console.log('');
console.log('Server is ready to handle MCP requests.');
console.log('');

// Export for testing and integration
export { handleRequest, TOOLS, toolImplementations, PROJECT_ROOT };

// If run directly, start a simple stdin/stdout server
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Waiting for MCP requests...\n');
  console.log('Example request:');
  console.log(JSON.stringify({
    method: 'tools/list'
  }, null, 2));
}
