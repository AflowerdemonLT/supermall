<template>
  <div v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        alt=""
        :key="index"
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imageLoad() {
      this.$emit("imageLoad");
    },
  },
};
</script>

<style scoped>
</style>