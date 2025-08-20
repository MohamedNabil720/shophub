import axios from "axios";
import type { User } from "@/types/User";

export class UserService {
  private static readonly API_URL = "https://api.escuelajs.co/api/v1/users/";

  static async fetchUsers(): Promise<User[]> {
    try {
      const { data } = await axios.get<User[]>(this.API_URL);
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}
