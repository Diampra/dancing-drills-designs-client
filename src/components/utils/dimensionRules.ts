import { ProductType } from "@/types/quote";

export interface DimensionField {
  key: "length" | "width" | "height" | "depth";
  label: string;
}

export const dimensionRules: Record<ProductType, DimensionField[]> = {
  DT: [
    { key: "length", label: "Length" },
    { key: "width", label: "Width" },
    { key: "height", label: "Height" },
    { key: "depth", label: "Depth" },
  ],
  DOORS: [
    { key: "height", label: "Height" },
    { key: "width", label: "Width" },
  ],
  WP: [
    { key: "length", label: "Length" },
    { key: "height", label: "Height" },
  ],
  CP: [
    { key: "length", label: "Length" },
    { key: "width", label: "Width" },
  ],
  PP: [
    { key: "height", label: "Height" },
    { key: "width", label: "Width" },
  ],
  TL: [
    { key: "height", label: "Height" },
  ],
};
