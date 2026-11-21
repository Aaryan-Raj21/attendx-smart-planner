import fs from "fs";
import cp from "child_process";
import path from "path";

const pptxPath = "C:/Users/Aryan raj/.gemini/antigravity/brain/6526d9a4-fa36-49e3-abae-b992b982f9ee/.user_uploaded/media_1795288171383_d9e0b85c.pptx";
const tempDir = path.join(process.cwd(), "temp_sample_ppt_inspect");
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

try {
  cp.execSync(`tar -xf "${pptxPath}" -C "${tempDir}"`, { stdio: "inherit" });
  const slidesDir = path.join(tempDir, "ppt", "slides");
  if (fs.existsSync(slidesDir)) {
    const files = fs.readdirSync(slidesDir).filter(f => f.endsWith(".xml"));
    console.log("Total slides in sample ppt:", files.length);
    files.sort((a,b) => {
      const numA = parseInt(a.replace(/[^0-9]/g, '')) || 0;
      const numB = parseInt(b.replace(/[^0-9]/g, '')) || 0;
      return numA - numB;
    });
    for (let f of files) {
      const xml = fs.readFileSync(path.join(slidesDir, f), "utf-8");
      const text = xml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      console.log(`--- ${f} ---`);
      console.log(text.substring(0, 300));
    }
  }
} catch (err) {
  console.error("PPT inspection error:", err);
}
