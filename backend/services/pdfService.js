const pdfParse = require('pdf-parse');
const fs = require('fs');

async function extractText(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(fileBuffer);
  return data.text;
}

module.exports = { extractText };