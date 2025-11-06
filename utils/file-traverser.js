/**
 * File Traverser Utility
 * A simple utility to traverse and process files
 * 
 * Note: Uses synchronous file operations for simplicity.
 * For production use with large-scale operations, consider async versions.
 */

const fs = require('fs');
const path = require('path');

/**
 * Reads and processes a file
 * @param {string} filePath - Path to the file
 * @returns {Object} File information
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const stats = fs.statSync(filePath);
    
    return {
      path: filePath,
      name: path.basename(filePath),
      size: stats.size,
      content: content,
      lines: content.split('\n').length,
      success: true
    };
  } catch (error) {
    return {
      path: filePath,
      error: error.message,
      success: false
    };
  }
}

/**
 * Traverses a directory and processes files
 * @param {string} dirPath - Path to directory
 * @param {Object} options - Options for traversal
 * @returns {Array} Array of processed files
 */
function traverseDirectory(dirPath, options = {}) {
  const {
    recursive = false,
    fileFilter = () => true,
    maxDepth = Infinity,
    currentDepth = 0
  } = options;

  const results = [];

  if (!fs.existsSync(dirPath)) {
    return results;
  }

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);

      if (stats.isFile() && fileFilter(fullPath)) {
        results.push(processFile(fullPath));
      } else if (stats.isDirectory() && recursive && currentDepth < maxDepth) {
        const subResults = traverseDirectory(fullPath, {
          ...options,
          currentDepth: currentDepth + 1
        });
        results.push(...subResults);
      }
    }
  } catch (error) {
    console.error(`Error traversing directory ${dirPath}:`, error.message);
  }

  return results;
}

module.exports = {
  processFile,
  traverseDirectory
};
