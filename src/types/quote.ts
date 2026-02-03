export type ProductType = "DT" | "DOORS" | "WP" | "CP" | "PP" | "TL";

export interface QuoteData {
  phone: string;
  product?: ProductType;
  design?: string;
  material?: string;
  length?: number;
  width?: number;
  height?: number;
  depth?: number;
  image?: File | null;
}
