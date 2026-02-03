export interface MaterialItem {
  id: string;
  name: string;
  image: string;
  madeOf: string;
  strength: number; // %
  finish: number;   // %
  waterproof: "Yes" | "No";
  cost: string;
}

export const materials: MaterialItem[] = [
  {
    id: "MDF",
    name: "MDF",
    image: "/materials/mdf-board.jpg",
    madeOf: "Wood fibers, resin & wax",
    strength: 30,
    finish: 50,
    waterproof: "No",
    cost: "...",
  },
  {
    id: "HDHMR",
    name: "HDHMR",
    image: "/materials/hdhmr.jpg",
    madeOf: "Wood",
    strength: 90,
    finish: 90,
    waterproof: "Yes",
    cost: "...",
  },
  {
    id: "WPVC",
    name: "WPC/PVC",
    image: "/materials/wpc-and-pvc-board.jpg",
    madeOf: "Wood & plastic",
    strength: 90,
    finish: 90,
    waterproof: "Yes",
    cost: "...",
  },
  {
    id: "AS",
    name: "Acrylic Sheet",
    image: "/materials/acrylic-sheet.jpg",
    madeOf: "Synthetic polymers",
    strength: 70,
    finish: 90,
    waterproof: "Yes",
    cost: "...",
  },
  {
    id: "MARBLE",
    name: "Marble",
    image: "/materials/marble.jpg",
    madeOf: "Stone",
    strength: 50,
    finish: 50,
    waterproof: "Yes",
    cost: "...",
  },
  {
    id: "WOODP",
    name: "Wood Panel",
    image: "/materials/wood-panel.jpg",
    madeOf: "Wood",
    strength: 80,
    finish: 80,
    waterproof: "No",
    cost: "...",
  },
  {
    id: "FG",
    name: "Fiber Glass",
    image: "/materials/fiber.jpg",
    madeOf: "Glass fibers and resin",
    strength: 90,
    finish: 60,
    waterproof: "Yes",
    cost: "...",
  },
];
