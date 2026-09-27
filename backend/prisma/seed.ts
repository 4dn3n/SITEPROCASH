import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Local generated tile image per equipment category (see
 * frontend/scripts/generate-placeholder-images.mjs, served from frontend/public) — no
 * per-product photography exists, so every product in a category shares that category's image.
 */
function categoryImage(category: string) {
  const slug = slugify(category);
  return `/images/products/${slug}/${slug}.jpg`;
}

/** Real product photos (see frontend/public/images/products), keyed by exact product name. */
const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  "Plaque de cuisson gaz 4 feux": "/images/products/cuisson/plaque-de-cuisson-gaz.jpg",
  "Friteuse professionnelle 10L": "/images/products/cuisson/friteuse.jpg",
  "Réfrigérateur professionnel 600L": "/images/products/froid/refrigerateur-600l.jpg",
  "Table de travail inox 200cm": "/images/products/stockage/table-travail-inox.jpg",
};

function productImage(p: { name: string; category: string }) {
  return PRODUCT_IMAGE_OVERRIDES[p.name] ?? categoryImage(p.category);
}

const products = [
  // --- Cuisson ---
  {
    name: "Plaque de cuisson gaz 4 feux",
    description:
      "Plaque de cuisson professionnelle 4 feux vifs, brûleurs en fonte, idéale pour cuisines à forte cadence.",
    category: "Cuisson",
    brand: "Bartscher",
    price: 1290,
    dimensions: "80 x 70 x 90 cm",
    weight: 62,
    stock: 14,
    specs: {
      puissance: "4 x 3.5 kW",
      alimentation: "Gaz naturel / propane",
      certifications: ["CE", "NF Gaz"],
      brûleurs: "Fonte, allumage piezo",
    },
  },
  {
    name: "Friteuse professionnelle 10L",
    description:
      "Friteuse double cuve 10L avec thermostat de sécurité et cuve amovible pour un nettoyage rapide.",
    category: "Cuisson",
    brand: "Bartscher",
    price: 890,
    dimensions: "40 x 55 x 35 cm",
    weight: 22,
    stock: 20,
    specs: {
      capacité: "10 litres",
      puissance: "3.2 kW",
      thermostat: "50-190°C",
      certifications: ["CE"],
    },
  },
  {
    name: "Four professionnel convection 10 niveaux",
    description:
      "Four à convection vapeur 10 niveaux GN 1/1, régulation électronique et sonde à cœur intégrée.",
    category: "Cuisson",
    brand: "Rational",
    price: 4590,
    dimensions: "90 x 80 x 105 cm",
    weight: 118,
    stock: 6,
    specs: {
      capacité: "10 x GN 1/1",
      puissance: "10.8 kW",
      sonde: "Sonde à cœur multipoint",
      certifications: ["CE", "ISO 9001"],
    },
  },
  {
    name: "Grill électrique double face",
    description:
      "Grill professionnel double face avec plaques rainurées/lisses interchangeables et thermostat réglable.",
    category: "Cuisson",
    brand: "Muller",
    price: 650,
    dimensions: "60 x 45 x 25 cm",
    weight: 28,
    stock: 17,
    specs: {
      puissance: "3.6 kW",
      surface: "600 cm²",
      plaques: "Rainurées et lisses",
      certifications: ["CE"],
    },
  },

  // --- Froid ---
  {
    name: "Réfrigérateur professionnel 600L",
    description:
      "Armoire réfrigérée 600L à porte pleine, froid ventilé, régulation électronique précise.",
    category: "Froid",
    brand: "Electrolux Professional",
    price: 2190,
    dimensions: "74 x 83 x 201 cm",
    weight: 105,
    stock: 9,
    specs: {
      capacité: "600 litres",
      température: "0°C à +10°C",
      froid: "Ventilé",
      certifications: ["CE", "HACCP"],
    },
  },
  {
    name: "Congélateur armoire 400L",
    description:
      "Congélateur professionnel 400L, isolation renforcée, système de dégivrage automatique.",
    category: "Froid",
    brand: "Electrolux Professional",
    price: 1890,
    dimensions: "70 x 80 x 195 cm",
    weight: 98,
    stock: 8,
    specs: {
      capacité: "400 litres",
      température: "-15°C à -22°C",
      dégivrage: "Automatique",
      certifications: ["CE", "HACCP"],
    },
  },
  {
    name: "Armoire réfrigérée positive 700L",
    description:
      "Armoire réfrigérée grande capacité, 2 portes pleines, idéale pour restauration collective.",
    category: "Froid",
    brand: "FBD",
    price: 2450,
    dimensions: "134 x 83 x 201 cm",
    weight: 145,
    stock: 5,
    specs: {
      capacité: "700 litres",
      température: "0°C à +10°C",
      portes: "2 portes pleines",
      certifications: ["CE", "HACCP"],
    },
  },
  {
    name: "Vitrine réfrigérée à poser",
    description:
      "Vitrine réfrigérée de comptoir pour présentation de desserts et boissons, éclairage LED intégré.",
    category: "Froid",
    brand: "Hoshizaki",
    price: 1590,
    dimensions: "120 x 55 x 65 cm",
    weight: 58,
    stock: 11,
    specs: {
      capacité: "180 litres",
      température: "+2°C à +8°C",
      éclairage: "LED",
      certifications: ["CE"],
    },
  },

  // --- Stockage ---
  {
    name: "Étagère inox murale 120cm",
    description: "Étagère murale en inox 304, charge lourde, parfaite pour zones de préparation.",
    category: "Stockage",
    brand: "Muller",
    price: 189,
    dimensions: "120 x 35 x 30 cm",
    weight: 9,
    stock: 40,
    specs: {
      matériau: "Inox 304",
      chargeMax: "80 kg",
      fixation: "Murale",
      certifications: ["CE"],
    },
  },
  {
    name: "Meuble de rangement inox à portes",
    description: "Meuble bas inox avec portes battantes et étagère intermédiaire réglable.",
    category: "Stockage",
    brand: "FBD",
    price: 650,
    dimensions: "100 x 60 x 85 cm",
    weight: 34,
    stock: 15,
    specs: {
      matériau: "Inox 304",
      portes: "2 portes battantes",
      étagères: "1 réglable",
      certifications: ["CE"],
    },
  },
  {
    name: "Rayonnage mobile 5 niveaux",
    description: "Rayonnage sur roulettes 5 niveaux grillagés, idéal pour chambres froides et réserves.",
    category: "Stockage",
    brand: "Muller",
    price: 420,
    dimensions: "90 x 60 x 180 cm",
    weight: 26,
    stock: 22,
    specs: {
      matériau: "Aluminium/inox",
      niveaux: 5,
      chargeMax: "150 kg par niveau",
      certifications: ["CE", "NSF"],
    },
  },
  {
    name: "Armoire de stockage ventilée",
    description: "Armoire de stockage ventilée pour denrées sèches, portes verrouillables.",
    category: "Stockage",
    brand: "Bartscher",
    price: 790,
    dimensions: "80 x 60 x 195 cm",
    weight: 45,
    stock: 12,
    specs: {
      matériau: "Inox 304",
      ventilation: "Grilles hautes/basses",
      verrouillage: "Serrure à clé",
      certifications: ["CE"],
    },
  },

  // --- Préparation ---
  {
    name: "Table de travail inox 200cm",
    description: "Table de travail inox avec étagère basse, plan de travail renforcé anti-rayures.",
    category: "Préparation",
    brand: "Muller",
    price: 540,
    dimensions: "200 x 70 x 90 cm",
    weight: 38,
    stock: 18,
    specs: {
      matériau: "Inox 304",
      chargeMax: "120 kg",
      étagère: "Basse incluse",
      certifications: ["CE"],
    },
  },
  {
    name: "Robot cutter professionnel 3.7L",
    description: "Cutter professionnel 3.7L, lames en acier trempé, moteur puissant pour usage intensif.",
    category: "Préparation",
    brand: "Bartscher",
    price: 1190,
    dimensions: "35 x 30 x 45 cm",
    weight: 15,
    stock: 10,
    specs: {
      capacité: "3.7 litres",
      puissance: "1.5 kW",
      vitesses: "2 vitesses",
      certifications: ["CE"],
    },
  },
  {
    name: "Mixer plongeant professionnel",
    description: "Mixer plongeant à pied démontable, idéal pour sauces, soupes et purées en grande quantité.",
    category: "Préparation",
    brand: "Bartscher",
    price: 340,
    dimensions: "12 x 12 x 55 cm",
    weight: 3,
    stock: 25,
    specs: {
      puissance: "700 W",
      pied: "Démontable, 40 cm",
      vitesses: "Variateur électronique",
      certifications: ["CE"],
    },
  },
  {
    name: "Trancheuse à jambon électrique",
    description: "Trancheuse électrique lame de 300mm, épaisseur de coupe réglable, socle en aluminium.",
    category: "Préparation",
    brand: "FBD",
    price: 980,
    dimensions: "55 x 50 x 40 cm",
    weight: 24,
    stock: 9,
    specs: {
      lame: "300 mm",
      épaisseur: "0-15 mm réglable",
      puissance: "250 W",
      certifications: ["CE"],
    },
  },

  // --- Nettoyage ---
  {
    name: "Lave-vaisselle professionnel à capot",
    description: "Lave-vaisselle à capot haute cadence, cycle court 90 secondes, adoucisseur intégré.",
    category: "Nettoyage",
    brand: "Electrolux Professional",
    price: 3290,
    dimensions: "60 x 65 x 150 cm",
    weight: 88,
    stock: 7,
    specs: {
      cycle: "90 / 120 / 180 secondes",
      capacité: "Paniers 50x50 cm",
      adoucisseur: "Intégré",
      certifications: ["CE", "NF"],
    },
  },
  {
    name: "Nettoyeur haute pression eau chaude",
    description: "Nettoyeur haute pression eau chaude pour désinfection de cuisines et surfaces grasses.",
    category: "Nettoyage",
    brand: "Bartscher",
    price: 1450,
    dimensions: "50 x 45 x 90 cm",
    weight: 32,
    stock: 8,
    specs: {
      pression: "150 bars",
      température: "Jusqu'à 80°C",
      débit: "600 L/h",
      certifications: ["CE"],
    },
  },
  {
    name: "Bac de plonge inox 2 cuves",
    description: "Bac de plonge double cuve en inox avec égouttoirs, robinetterie mélangeuse incluse.",
    category: "Nettoyage",
    brand: "Muller",
    price: 480,
    dimensions: "160 x 70 x 90 cm",
    weight: 30,
    stock: 16,
    specs: {
      cuves: "2 x 50x40x30 cm",
      matériau: "Inox 304",
      robinetterie: "Mélangeuse incluse",
      certifications: ["CE"],
    },
  },
  {
    name: "Lave-mains automatique inox",
    description: "Lave-mains à détection automatique, dosage de savon intégré, conforme aux normes HACCP.",
    category: "Nettoyage",
    brand: "FBD",
    price: 620,
    dimensions: "40 x 40 x 85 cm",
    weight: 14,
    stock: 19,
    specs: {
      détection: "Capteur infrarouge",
      savon: "Doseur intégré",
      matériau: "Inox 304",
      certifications: ["CE", "HACCP"],
    },
  },
] as const;

async function main() {
  console.log(`Seeding ${products.length} products...`);

  await prisma.product.deleteMany();

  for (const p of products) {
    await prisma.product.create({
      data: {
        ...p,
        image: productImage(p),
        images: [productImage(p)],
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
