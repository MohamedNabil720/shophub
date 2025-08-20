import type { Product } from "@/types/Product";

export class ProductUtils {
  static truncateWords(text: string, wordLimit: number): string {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  static formatDate(dateStr: string): string {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB");
    } catch (error) {
      return "";
    }
  }

  static filterProducts(products: Product[], searchText: string): Product[] {
    const search = searchText.toLowerCase();

    if (!search) return products;

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(search) ||
        product.category?.name.toLowerCase().includes(search) ||
        product.price.toString().includes(search)
    );
  }

  static paginateProducts(
    products: Product[],
    startIndex: number,
    pageSize: number
  ): Product[] {
    return products.slice(startIndex, startIndex + pageSize);
  }
}
