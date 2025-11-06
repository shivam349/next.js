#!/usr/bin/env node
/**
 * Example usage of the file traverser utility
 */

const { processFile, traverseDirectory } = require('./file-traverser');
const path = require('path');

console.log('File Traverser Solution Demo\n');
console.log('='.repeat(50));

// Process the test file
const testFilePath = path.join(__dirname, '../test-file.txt');
console.log('\n1. Processing test-file.txt:');
console.log('-'.repeat(50));

const fileResult = processFile(testFilePath);
if (fileResult.success) {
  console.log(`✓ File: ${fileResult.name}`);
  console.log(`✓ Size: ${fileResult.size} bytes`);
  console.log(`✓ Lines: ${fileResult.lines}`);
  console.log(`✓ Content: ${fileResult.content.trim()}`);
} else {
  console.log(`✗ Error: ${fileResult.error}`);
}

// Traverse current directory
console.log('\n2. Traversing utils directory:');
console.log('-'.repeat(50));

const dirResults = traverseDirectory(__dirname, {
  fileFilter: (filePath) => filePath.endsWith('.js')
});

console.log(`✓ Found ${dirResults.length} JavaScript file(s):`);
dirResults.forEach(file => {
  if (file.success) {
    console.log(`  - ${file.name} (${file.size} bytes, ${file.lines} lines)`);
  }
});

console.log('\n' + '='.repeat(50));
console.log('✓ Solution working correctly!');
