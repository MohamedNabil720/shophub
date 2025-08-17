// types/product.ts
export interface ProductForm {
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  plan: string;
  productPrice: string;
  sellingPrice: string;
}

export interface Category {
  label: string;
  value: number;
}

export interface ProductProps {
  mode: "create" | "update";
  id?: string;
}

export interface ProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  plan: string;
  sellingPrice: string;
}
