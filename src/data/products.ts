export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  description: string;
  details: string[];
  sizes: string[];
  images: [string, string]; // two image paths
  monoCode: string;
  isHeroRelated?: boolean;
}

export const products: Product[] = [
  {
    id: "prod-01",
    slug: "platform-jacket",
    name: "Platform Jacket",
    tagline: "Washed charcoal denim with dropped shoulders. Cut for cold platforms.",
    price: 89,
    currency: "EUR",
    description: "Washed charcoal-blue denim jacket with dropped shoulders and a modern boxy cut. Engineered for cold nocturnal transit.",
    details: [
      "14.5oz Japanese selvedge-inspired washed denim",
      "Matte carbon hardware and concealed dual chest pockets",
      "Subtle rear collar rivet stamped with 02:47 coordinates",
      "Pre-shrunk wash with soft hand-feel",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: ["/assets/products/platform-jacket-1.webp", "/assets/products/platform-jacket-2.webp"],
    monoCode: "QH-D01-JKT01",
    isHeroRelated: true,
  },
  {
    id: "prod-02",
    slug: "night-shell-parka",
    name: "Night Shell Parka",
    tagline: "Three-layer matte nylon with taped seams. Built for zero noise.",
    price: 139,
    currency: "EUR",
    description: "Oversized matte black nylon parka with deep storm hood and thermal taped interior seams.",
    details: [
      "Ultra-dense 3-layer matte technical nylon shell",
      "Water-resistant seam-taped inner construction",
      "Two-way heavy duty YKK zipper with storm flap",
      "Concealed magnetic utility pockets",
    ],
    sizes: ["M", "L", "XL"],
    images: ["/assets/products/night-shell-parka-1.webp", "/assets/products/night-shell-parka-2.webp"],
    monoCode: "QH-D01-PRK02",
  },
  {
    id: "prod-03",
    slug: "static-tee",
    name: "Static Tee",
    tagline: "Heavyweight 260 GSM combed cotton. Discrete 02:47 chest print.",
    price: 34,
    currency: "EUR",
    description: "Heavyweight faded black tee with a high rib collar and a discrete '22:47' chest timestamp print.",
    details: [
      "260 GSM combed open-end organic cotton",
      "Pigment dyed for washed charcoal tone",
      "Silk-screened 22:47 tonal graphic print",
      "Reinforced twin-needle shoulder stitching",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/assets/products/static-tee-1.webp", "/assets/products/static-tee-2.webp"],
    monoCode: "QH-D01-TEE03",
    isHeroRelated: true,
  },
  {
    id: "prod-04",
    slug: "hook-hoodie",
    name: "Hook Hoodie",
    tagline: "480 GSM French terry with an internal photocard stash sleeve.",
    price: 69,
    currency: "EUR",
    description: "Full-zip heavyweight fleece hoodie featuring a dedicated interior chest sleeve sized for the Drop 01 photocard.",
    details: [
      "480 GSM diagonal loopback French terry",
      "Concealed photocard stash pocket inside left chest",
      "Double-layered structured hood with no drawstrings",
      "Custom gunmetal zipper pull with debossed QH logo",
    ],
    sizes: ["S", "M", "L", "XL"],
    images: ["/assets/products/hook-hoodie-1.webp", "/assets/products/hook-hoodie-2.webp"],
    monoCode: "QH-D01-HD04",
  },
  {
    id: "prod-05",
    slug: "transit-trousers",
    name: "Transit Trousers",
    tagline: "Crisp cotton-nylon twill with articulated knees and ankle cinches.",
    price: 74,
    currency: "EUR",
    description: "Black wide-leg trousers cut from crisp cotton-nylon twill with articulated knees and elasticated waist adjusters.",
    details: [
      "Cotton-nylon blend with slight technical stretch",
      "Deep pleats and relaxed wide drape",
      "Concealed zippered coin and card stash pocket",
      "Adjustable bungee cinches at interior cuffs",
    ],
    sizes: ["30", "32", "34", "36"],
    images: ["/assets/products/transit-trousers-1.webp", "/assets/products/transit-trousers-2.webp"],
    monoCode: "QH-D01-TRS05",
  },
  {
    id: "prod-06",
    slug: "dusk-cap",
    name: "Dusk Cap",
    tagline: "Unstructured 6-panel washed denim with a matte metal slider.",
    price: 29,
    currency: "EUR",
    description: "Washed gray denim 6-panel cap with an unstructured crown, curved brim, and matte metal slider.",
    details: [
      "100% cotton washed gray denim twill",
      "Unstructured low-profile crown",
      "Tonal embroidered eyelets",
      "Self-fabric strap with antique metal cinch buckle",
    ],
    sizes: ["ONE SIZE"],
    images: ["/assets/products/dusk-cap-1.webp", "/assets/products/dusk-cap-2.webp"],
    monoCode: "QH-D01-CAP06",
    isHeroRelated: true,
  },
  {
    id: "prod-07",
    slug: "pocket-set",
    name: "Pocket Set",
    tagline: "Heavy canvas shoulder pouch, earbud case, and zinc-alloy carabiner.",
    price: 39,
    currency: "EUR",
    description: "Black heavy canvas tote, padded earbud pouch, and laser-engraved solid zinc-alloy carabiner keyring.",
    details: [
      "16oz black dry canvas shoulder tote",
      "Padded neoprene zippered pouch for wired/wireless earbuds",
      "Matte black industrial zinc carabiner with QH laser etch",
      "Packaged in custom matte black foil sleeve",
    ],
    sizes: ["ONE SIZE"],
    images: ["/assets/products/pocket-set-1.webp", "/assets/products/pocket-set-2.webp"],
    monoCode: "QH-D01-ACC07",
    isHeroRelated: true,
  },
];
