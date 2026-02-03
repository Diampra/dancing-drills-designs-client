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
  {
    id: "d1",
    name: "Lotus Floral Pattern",
    image: "/designs/lotus.jpg",
    category: ["floral", "artistic"],
  },
  {
    id: "d2",
    name: "Om Devotional Carving",
    image: "/designs/om.jpg",
    category: ["devotional"],
  },
  {
    id: "d3",
    name: "Geometric Lines",
    image: "/designs/geo.jpg",
    category: ["geometric"],
  },
];
