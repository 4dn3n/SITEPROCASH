// Generates local placeholder JPGs (gradient tile + icon per equipment category) used as a
// fallback for products without a real photo yet. Re-run with
// `node scripts/generate-placeholder-images.mjs` whenever the palette in lib/tileStyles.ts
// changes or a new equipment category is added.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, "..", "public", "images");

// Icons are hand-built as simple filled shapes (no strokes) in a 24x24 space, matching the
// palette already defined in lib/tileStyles.ts.
const ICONS = {
  cuisson: `<path d="M12 2 C8 8 6 10 6 14 A6 6 0 0 0 18 14 C18 10 16 9 15 7 C15 10 13 11 12 9 C11 7 12 4 12 2 Z"/>`,
  froid: `
    <g transform="rotate(0 12 12)"><rect x="11.3" y="2" width="1.4" height="20" rx="0.7"/></g>
    <g transform="rotate(60 12 12)"><rect x="11.3" y="2" width="1.4" height="20" rx="0.7"/></g>
    <g transform="rotate(120 12 12)"><rect x="11.3" y="2" width="1.4" height="20" rx="0.7"/></g>
  `,
  stockage: `
    <rect x="4" y="4" width="16" height="5" rx="1"/>
    <rect x="5" y="9" width="14" height="11" rx="1"/>
    <rect x="10" y="12.8" width="4" height="1.4" rx="0.7" fill-opacity="0.55"/>
  `,
  preparation: `
    <g transform="rotate(-25 12 12)">
      <rect x="11" y="2" width="2" height="20" rx="1"/>
      <polygon points="9.5,2 14.5,2 12,-1.5"/>
    </g>
    <g transform="rotate(25 12 12)">
      <rect x="11" y="6" width="2" height="16" rx="1"/>
      <rect x="9.4" y="1" width="1.1" height="6" rx="0.55"/>
      <rect x="11.45" y="0.3" width="1.1" height="6.5" rx="0.55"/>
      <rect x="13.5" y="1" width="1.1" height="6" rx="0.55"/>
    </g>
  `,
  nettoyage: `<path d="M12 3 C9 8 6 12 6 16 A6 6 0 0 0 18 16 C18 12 15 8 12 3 Z"/>`,
};

const CATEGORIES = [
  { slug: "cuisson", from: "#9a3412", to: "#f97316" },
  { slug: "froid", from: "#0c4a6e", to: "#38bdf8" },
  { slug: "stockage", from: "#334155", to: "#64748b" },
  { slug: "preparation", from: "#065f46", to: "#10b981" },
  { slug: "nettoyage", from: "#155e75", to: "#22d3ee" },
];

const TILE_SIZE = 1200;

function tileSvg({ from, to, icon }) {
  const s = TILE_SIZE;
  const iconScale = 15; // 24 * 15 = 360px icon inside a 1200px tile
  const iconOffset = s / 2 - (24 * iconScale) / 2;

  return `
<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="20%" r="65%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${s}" height="${s}" fill="url(#g)"/>
  <rect width="${s}" height="${s}" fill="url(#glow)"/>
  <g transform="translate(${iconOffset}, ${iconOffset}) scale(${iconScale})" fill="#ffffff" fill-opacity="0.92">
    ${icon}
  </g>
</svg>`;
}

// Note: the hero background is now a real photo (public/images/background-image.png),
// supplied directly — no generated fallback needed for it.

async function main() {
  for (const category of CATEGORIES) {
    const dir = path.join(PUBLIC_DIR, "products", category.slug);
    await mkdir(dir, { recursive: true });
    const svg = tileSvg({ ...category, icon: ICONS[category.slug] });
    const out = path.join(dir, `${category.slug}.jpg`);
    await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
    console.log("Generated", out);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
