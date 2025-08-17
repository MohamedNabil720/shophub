import { ref, onMounted } from "vue";
import { ProductService } from "@/services/productService";
import { UploadService } from "@/services/uploadService";
import type {
  ProductForm,
  Category,
  ProductProps,
  ProductPayload,
} from "@/types/product";
import router from "@/router";

export function useProductForm(props: ProductProps) {
  const currentStep = ref(1);
  const previewImage = ref<string | null>(null);
  const uploading = ref(false);
  const formKey = ref(0);
  const categories = ref<Category[]>([]);

  const form = ref<ProductForm>({
    title: "",
    slug: "",
    category: "",
    description: "",
    thumbnail: "",
    plan: "",
    productPrice: "",
    sellingPrice: "",
  });

  const loadCategories = async () => {
    try {
      categories.value = await ProductService.getCategories();
    } catch (error) {
      console.error("Failed to load categories");
    }
  };

  const loadProduct = async () => {
    if (props.mode === "update" && props.id) {
      try {
        const productData = await ProductService.getProductById(props.id);
        form.value = productData;
        previewImage.value = productData.thumbnail;
        formKey.value++;
      } catch (error) {
        console.error("Failed to load product");
      }
    }
  };

  const uploadThumbnail = async (e: Event, setFieldValue: any) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    previewImage.value = URL.createObjectURL(file);
    uploading.value = true;

    try {
      const imageUrl = await UploadService.uploadImage(file);
      setFieldValue("thumbnail", imageUrl);
      form.value.thumbnail = imageUrl;
    } catch (error) {
      console.error("Failed to upload image");
    } finally {
      uploading.value = false;
    }
  };

  const goToStep2 = (values: any) => {
    form.value = { ...form.value, ...values };
    currentStep.value = 2;
  };

  const submitProduct = async (values: any) => {
    form.value = { ...form.value, ...values };

    const payload: ProductPayload = {
      title: form.value.title,
      price: Number(form.value.productPrice),
      description: form.value.description,
      categoryId: Number(form.value.category),
      images: [form.value.thumbnail],
      plan: form.value.plan,
      sellingPrice: form.value.sellingPrice,
    };

    try {
      if (props.mode === "create") {
        await ProductService.createProduct(payload);
      } else if (props.mode === "update" && props.id) {
        await ProductService.updateProduct(props.id, payload);
      }
      currentStep.value = 3;
    } catch (error) {
      console.error("Failed to submit product");
    }
  };

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  onMounted(async () => {
    await Promise.all([loadCategories(), loadProduct()]);
  });

  return {
    currentStep,
    previewImage,
    uploading,
    formKey,
    categories,
    form,
    uploadThumbnail,
    goToStep2,
    submitProduct,
    goToDashboard,
  };
}
