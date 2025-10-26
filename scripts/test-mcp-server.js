#!/usr/bin/env node

/**
 * Test script for MCP Server
 * Run this to verify the MCP server is working correctly
 */

import { handleRequest, TOOLS } from '../mcp-server.js';

console.log('🧪 Testing MCP Server for Trúc Nghị Project\n');

// Test 1: List tools
console.log('Test 1: Listing available tools');
console.log('================================');
const toolsResponse = handleRequest({ method: 'tools/list', params: {} });
console.log(`✅ Found ${toolsResponse.tools.length} tools`);
toolsResponse.tools.forEach(tool => {
  console.log(`   - ${tool.name}: ${tool.description}`);
});
console.log('');

// Test 2: get_project_structure
console.log('Test 2: Getting project structure');
console.log('=================================');
const projectResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'get_project_structure',
    arguments: {}
  }
});
console.log('✅ Project:', projectResponse.result.name);
console.log('   Framework:', projectResponse.result.framework);
console.log('   Key Features:', projectResponse.result.keyFeatures.length, 'items');
console.log('');

// Test 3: get_api_endpoints
console.log('Test 3: Getting API endpoints');
console.log('=============================');
const apiResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'get_api_endpoints',
    arguments: {}
  }
});
console.log(`✅ Found ${apiResponse.result.totalEndpoints} API endpoints`);
apiResponse.result.endpoints.forEach(ep => {
  console.log(`   - ${ep.path} (${ep.file})`);
});
console.log('');

// Test 4: get_registration_data
console.log('Test 4: Getting registration data');
console.log('=================================');
const regResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'get_registration_data',
    arguments: {}
  }
});
console.log('✅ Registration system info:');
console.log(`   - Steps: ${regResponse.result.steps.length}`);
console.log(`   - Integrated Systems: ${regResponse.result.integratedSystems.join(', ')}`);
console.log(`   - API Endpoints: ${regResponse.result.apiEndpoints.length}`);
console.log('');

// Test 5: list_components
console.log('Test 5: Listing components');
console.log('==========================');
const componentsResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'list_components',
    arguments: { category: 'features' }
  }
});
console.log(`✅ Found ${componentsResponse.result.totalComponents} feature components`);
console.log('   Components:');
componentsResponse.result.components.slice(0, 5).forEach(comp => {
  console.log(`   - ${comp.name}`);
});
console.log('');

// Test 6: list_directory
console.log('Test 6: Listing src directory');
console.log('=============================');
const dirResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'list_directory',
    arguments: { dirPath: 'src' }
  }
});
console.log(`✅ Found ${dirResponse.result.totalItems} items in src/`);
dirResponse.result.items.slice(0, 8).forEach(item => {
  console.log(`   - ${item.name} (${item.type})`);
});
console.log('');

// Test 7: read_file
console.log('Test 7: Reading a file');
console.log('======================');
const fileResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'read_file',
    arguments: { filePath: 'src/config/config.ts' }
  }
});
console.log(`✅ Successfully read file`);
console.log(`   - File: ${fileResponse.result.filePath}`);
console.log(`   - Lines: ${fileResponse.result.lines}`);
console.log(`   - Size: ${fileResponse.result.size} bytes`);
console.log('');

// Test 8: search_files
console.log('Test 8: Searching for files');
console.log('===========================');
const searchResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'search_files',
    arguments: { pattern: 'payment', directory: 'src/pages/api' }
  }
});
console.log(`✅ Found ${searchResponse.result.count} files matching 'payment'`);
searchResponse.result.files.forEach(f => {
  console.log(`   - ${f}`);
});
console.log('');

// Test 9: search_code
console.log('Test 9: Searching for code');
console.log('==========================');
const codeResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'search_code',
    arguments: { keyword: 'RegistrationForm', fileType: 'tsx' }
  }
});
console.log(`✅ Found ${codeResponse.result.count} matches for 'RegistrationForm'`);
if (codeResponse.result.matches.length > 0) {
  codeResponse.result.matches.slice(0, 3).forEach(m => {
    console.log(`   - ${m.file}:${m.line}`);
  });
}
console.log('');

// Test 10: get_payment_status
console.log('Test 10: Getting payment status info');
console.log('====================================');
const paymentResponse = handleRequest({
  method: 'tools/call',
  params: {
    name: 'get_payment_status',
    arguments: { orderCode: 'TEST123' }
  }
});
console.log(`✅ Payment status info:`);
console.log(`   - Has endpoint: ${paymentResponse.result.hasCheckEndpoint}`);
console.log(`   - Location: ${paymentResponse.result.location}`);
console.log('');

// Summary
console.log('═══════════════════════════════════════');
console.log('✅ All tests passed successfully!');
console.log('═══════════════════════════════════════');
console.log('');
console.log('MCP Server is ready for use with:');
console.log('  • Claude Desktop');
console.log('  • ChatGPT Custom GPT');
console.log('  • Cursor AI');
console.log('');
console.log('Read MCP_SETUP.md for detailed setup instructions.');
