/**
 * Tests for File Traverser Utility
 */

const { processFile, traverseDirectory } = require('./file-traverser');
const path = require('path');

describe('File Traverser', () => {
  const testFilePath = path.join(__dirname, '../test-file.txt');

  describe('processFile', () => {
    test('should successfully process an existing file', () => {
      const result = processFile(testFilePath);
      
      expect(result.success).toBe(true);
      expect(result.name).toBe('test-file.txt');
      expect(result.content).toContain('traverse testing');
      expect(result.size).toBeGreaterThan(0);
      expect(result.lines).toBeGreaterThan(0);
    });

    test('should handle non-existent file', () => {
      const result = processFile('/non/existent/file.txt');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('traverseDirectory', () => {
    test('should return empty array for non-existent directory', () => {
      const results = traverseDirectory('/non/existent/directory');
      
      expect(results).toEqual([]);
    });

    test('should traverse a directory and find files', () => {
      const rootDir = path.join(__dirname, '..');
      const results = traverseDirectory(rootDir, {
        fileFilter: (filePath) => filePath.endsWith('test-file.txt')
      });
      
      expect(results.length).toBeGreaterThan(0);
      const testFile = results.find(r => r.name === 'test-file.txt');
      expect(testFile).toBeDefined();
      expect(testFile.success).toBe(true);
    });

    test('should respect recursive option', () => {
      const rootDir = path.join(__dirname, '..');
      const nonRecursive = traverseDirectory(rootDir, {
        recursive: false,
        fileFilter: (filePath) => filePath.endsWith('.txt')
      });
      
      const recursive = traverseDirectory(rootDir, {
        recursive: true,
        maxDepth: 2,
        fileFilter: (filePath) => filePath.endsWith('.txt')
      });
      
      // Recursive should find more or equal files
      expect(recursive.length).toBeGreaterThanOrEqual(nonRecursive.length);
    });
  });
});
