// receiptParser.js
const nlp = require('compromise');

function parseReceiptText(rawText) {
  const text = rawText.toLowerCase();
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

  // 1. Shop Name: Assume the first non-empty line is the shop name.
  const shop = lines.length ? lines[0] : 'Unknown Shop';

  // 2. Date Extraction: Look for a date pattern (e.g., 12/31/2024 or 12-31-2024)
  let dateMatch = text.match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/);
  const date = dateMatch ? new Date(dateMatch[0]) : new Date();

  // 3. Total Amount: Look for a line that starts with "total" or similar.
  let totalMatch = text.match(/total(?:\s*amount)?\s*[:\-]?\s*\$?([\d,]+\.\d{2})/);
  const totalAmount = totalMatch ? parseFloat(totalMatch[1].replace(/,/g, '')) : 0;

  // 4. Items: Assume that each line containing a price is an item.
  const items = [];
  const itemRegex = /(.+?)\s+\$?([\d,]+\.\d{2})/;
  lines.forEach(line => {
    if (line.includes('total')) return;
    const match = line.match(itemRegex);
    if (match) {
      items.push({
        name: match[1].trim(),
        price: parseFloat(match[2].replace(/,/g, '')),
        quantity: 1,
        category: '',
      });
    }
  });

  return {
    shop,
    date,
    totalAmount,
    items,
  };
}

module.exports = { parseReceiptText };
