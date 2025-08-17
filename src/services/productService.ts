import axios from "axios";
import type { ProductPayload, Category } from "@/types/product";

const API_BASE_URL = "https://api.escuelajs.co/api/v1";

export class ProductService {
  static async getCategories(): Promise<Category[]> {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/categories`);
      return data.map((cat: any) => ({
        label: cat.name,
        value: cat.id,
      }));
    } catch (error) {
      console.error("❌ Error loading categories:", error);
      throw error;
    }
  }

  static async getProductById(id: string) {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/products/${id}`);
      return {
        title: data.title,
        slug: data.title.toLowerCase().replace(/\s+/g, "-"),
        category: data.category?.id,
        description: data.description,
        thumbnail: data.images[0],
        plan: "Paid",
        productPrice: data.price,
        sellingPrice: data.price,
      };
    } catch (error) {
      console.error("❌ Error loading product:", error);
      throw error;
    }
  }

  static async createProduct(payload: ProductPayload) {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/products/`, payload);
      console.log("✅ Product Created:", data);
      return data;
    } catch (error) {
      console.error("❌ Error creating product:", error);
      throw error;
    }
  }

  static async updateProduct(id: string, payload: ProductPayload) {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/products/${id}`,
        payload
      );
      console.log("✅ Product Updated:", data);
      return data;
    } catch (error) {
      console.error("❌ Error updating product:", error);
      throw error;
    }
  }
}
