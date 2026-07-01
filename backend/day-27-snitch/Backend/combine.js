import fs from 'fs';
import path from 'path';

const frontendDir = 'c:/Users/siddh/Desktop/cohort 2/backend/day-27-snitch/Frontend';
const backendDir = 'c:/Users/siddh/Desktop/cohort 2/backend/day-27-snitch/Backend';
const outputFile = path.join(backendDir, 'frontend_codebase.txt');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        getFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (['.js', '.jsx', '.ts', '.tsx', '.css', '.html'].includes(ext) || file === 'package.json') {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

try {
  const allFiles = getFiles(frontendDir);
  let combinedContent = '';

  for (const file of allFiles) {
    if (file === outputFile) continue;
    const relativePath = path.relative(frontendDir, file);
    const content = fs.readFileSync(file, 'utf8');
    
    combinedContent += `==================================================\n`;
    combinedContent += `FILE: ${relativePath}\n`;
    combinedContent += `==================================================\n`;
    combinedContent += content;
    combinedContent += `\n\n\n`;
  }

  fs.writeFileSync(outputFile, combinedContent, 'utf8');
  console.log(`Successfully combined ${allFiles.length} frontend files into ${outputFile}`);
} catch (error) {
  console.error('Error combining files:', error);
}
