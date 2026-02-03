const fs = require("fs");
const path = require("path");

const designsDir = path.join(__dirname, "../public/design_patterns");
const outputFile = path.join(__dirname, "../src/data/designs.ts");
fs.mkdirSync(path.dirname(outputFile), { recursive: true });

const files = fs.readdirSync(designsDir);

const designs = files
  .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .map((file, index) => {
    const name = file
      .replace(/\.[^/.]+$/, "")
      .replace(/[_-]/g, " ");

    return `  {
    id: "design_${index + 1}",
    name: "${name}",
    image: "/design_patterns/${file}",
    category: ["artistic"]
  }`;
  });

const content = `
export type DesignCategory =
  | "artistic"
  | "devotional"
  | "floral"
  | "geometric";

export interface DesignItem {
  id: string;
  name: string;
  image: string;
  category: DesignCategory[];
}

export const designs: DesignItem[] = [
${designs.join(",\n")}
];
`;

fs.writeFileSync(outputFile, content);

console.log("designs.ts generated from images");
