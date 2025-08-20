import axios from "axios";

export class UploadService {
  private static CLOUDINARY_URL =
    "https://api.cloudinary.com/v1_1/drok6e3iu/image/upload";
  private static UPLOAD_PRESET = "my_img";

  static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.UPLOAD_PRESET);

    try {
      const response = await axios.post(this.CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  }
}
