# File Traverser Utility

A simple and efficient utility for traversing directories and processing files.

## Overview

This solution provides utilities to:
- Process individual files and extract metadata
- Traverse directories with configurable options
- Filter files based on custom criteria
- Support recursive directory traversal

## Files

- `file-traverser.js` - Main utility module
- `file-traverser.test.js` - Test suite
- `demo.js` - Example usage demonstration

## Usage

### Processing a Single File

```javascript
const { processFile } = require('./utils/file-traverser');

const result = processFile('/path/to/file.txt');
console.log(result);
// Output: { path, name, size, content, lines, success }
```

### Traversing a Directory

```javascript
const { traverseDirectory } = require('./utils/file-traverser');

const files = traverseDirectory('/path/to/directory', {
  recursive: true,
  maxDepth: 3,
  fileFilter: (filePath) => filePath.endsWith('.js')
});

files.forEach(file => {
  console.log(`${file.name}: ${file.size} bytes`);
});
```

## Running the Demo

```bash
node utils/demo.js
```

## Running Tests

```bash
npm test -- utils/file-traverser.test.js
```

## Features

- ✓ File metadata extraction (size, lines, content)
- ✓ Recursive directory traversal
- ✓ Configurable depth limits
- ✓ Custom file filtering
- ✓ Error handling
- ✓ Comprehensive test coverage

## API

### `processFile(filePath)`

Processes a single file and returns metadata.

**Parameters:**
- `filePath` (string): Path to the file

**Returns:** Object with file information or error

### `traverseDirectory(dirPath, options)`

Traverses a directory and processes matching files.

**Parameters:**
- `dirPath` (string): Path to directory
- `options` (Object):
  - `recursive` (boolean): Enable recursive traversal (default: false)
  - `fileFilter` (function): Filter function for files (default: all files)
  - `maxDepth` (number): Maximum depth for recursion (default: Infinity)

**Returns:** Array of processed file objects
