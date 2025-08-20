<template lang="pug">
div.user-info
  div.user-icon {{ productInitial }}
  div.user-name
    div {{ truncatedTitle }}
    div # {{ product.id }}
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ProductUtils } from "@/utility/productUtils";
import type { Product } from "@/types/Product";

interface Props {
  product: Product;
  titleWordLimit?: number;
}

const props = withDefaults(defineProps<Props>(), {
  titleWordLimit: 3,
});

const productInitial = computed(
  () => props.product.category?.name?.charAt(0) || "P"
);

const truncatedTitle = computed(() =>
  ProductUtils.truncateWords(props.product.title, props.titleWordLimit)
);
</script>

<style scoped lang="scss">
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.user-name {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}
</style>
