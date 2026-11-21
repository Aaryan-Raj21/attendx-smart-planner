import fs from "fs";
import cp from "child_process";
import path from "path";

const docxPath = "C:/Users/Aryan raj/.gemini/antigravity/brain/6526d9a4-fa36-49e3-abae-b992b982f9ee/.user_uploaded/media_1795288112028_203e6cbd.docx";
const pptxPath = "C:/Users/Aryan raj/.gemini/antigravity/brain/6526d9a4-fa36-49e3-abae-b992b982f9ee/.user_uploaded/media_1795288171383_d9e0b85c.pptx";

console.log("Reading sample docx and pptx...");
// Extract word/document.xml from docxPath using tar
const tempDir = path.join(process.cwd(), "temp_sample_inspect");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

try {
  cp.execSync(`tar -xf "${docxPath}" -C "${tempDir}"`, { stdio: "inherit" });
  const docXmlPath = path.join(tempDir, "word", "document.xml");
  if (fs.existsSync(docXmlPath)) {
    const rawXml = fs.readFileSync(docXmlPath, "utf-8");
    // strip tags to extract plain text
    const textOnly = rawXml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    console.log("Document text preview (first 2500 chars):");
    console.log(textOnly.substring(0, 2500));
    console.log("\nDocument text preview (chars 2500-5000):");
    console.log(textOnly.substring(2500, 5000));
  }
} catch (err) {
  console.error("Extraction error:", err);
}
