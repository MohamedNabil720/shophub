import axios from "axios";
import type { Product } from "@/types/Product";

export class ProductService {
  private static readonly API_URL = "https://api.escuelajs.co/api/v1/products/";

  static async fetchProducts(): Promise<Product[]> {
    try {
      const { data } = await axios.get<Product[]>(this.API_URL);

      if (Array.isArray(data)) {
        return data.filter((product) => product && product.id);
      } else {
        console.error("Invalid data format received");
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async deleteProduct(productId: number): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${productId}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}
