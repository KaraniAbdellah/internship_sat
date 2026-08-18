export function readTextFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.name.toLowerCase().endsWith(".txt") && file.type !== "text/plain") {
      reject(new Error("Only .txt files are supported."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => resolve((e.target?.result as string) || "");
    reader.onerror = () => reject(new Error("Failed to read text file."));
    reader.readAsText(file);
  });
}