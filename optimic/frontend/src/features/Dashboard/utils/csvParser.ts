export function parseCSV(rawText: string): { headers: string[]; rows: string[][] } {
  const table: string[][] = [];
  let row: string[] = [""];
  let inQuotes = false;

  for (let i = 0; i < rawText.length; i++) {
    const char = rawText[i];
    const nextChar = rawText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        row[row.length - 1] += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push("");
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") i++;
      if (row.some((cell) => cell.trim().length > 0)) {
        table.push(row.map((c) => c.trim().replace(/^["']|["']$/g, "").trim()));
      }
      row = [""];
    } else {
      row[row.length - 1] += char;
    }
  }

  if (row.some((cell) => cell.trim().length > 0)) {
    table.push(row.map((c) => c.trim().replace(/^["']|["']$/g, "").trim()));
  }

  if (table.length === 0) {
    throw new Error("Uploaded CSV file is empty");
  }

  const rawHeaders = table[0];
  const headers = rawHeaders.map((h, idx) => (h && h.trim().length > 0 ? h : `Col ${idx + 1}`));
  const rows = table.slice(1).map((r) => headers.map((_, colIdx) => r[colIdx] ?? ""));

  return { headers, rows };
}