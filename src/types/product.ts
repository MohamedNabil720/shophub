export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  creationAt: string;
  updatedAt: string;
  category?: Category;
}

export interface ProductPaginationInfo {
  total: number;
  pageSize: number;
  currentPage: number;
  startIndex: number;
  endIndex: number;
}

export interface DeleteDialogState {
  isVisible: boolean;
  productToDelete: Product | null;
}
