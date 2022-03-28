<template>
  <div class="category-kinds">
    {{ titles }}
  </div>
</template>

<script>
import CategoryKindsItem from "./CategoryKindsItem.vue";
export default {
  name: "CategoryKinds",
  components: {
    CategoryKindsItem,
  },
  props: {
    titles: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.category-kinds {
  width: 100%;
  height: 45px;
  text-align: center;
  font-size: 14px;
  line-height: 45px;
  color: #666;
}
</style>