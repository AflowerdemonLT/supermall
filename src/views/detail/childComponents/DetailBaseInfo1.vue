<template>
  <div class="base-info1" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="new-price" v-show="goods.newPrice !== null">{{
        goods.newPrice
      }}</span>
      <span class="old-price" v-show="goods.oldPrice !== null">{{
        goods.oldPrice
      }}</span>
      <span
        class="discount"
        :style="{ background: discountColor }"
        v-show="goods.discount != ''"
        >{{ goods.discount }}</span
      >
    </div>

    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="services">
      <span
        class="services-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-info1",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    discountColor() {
      return this.goods.discountColor;
    },
    discountStyle() {
      return { backgroundColor: this.discountColor };
    },
  },
};
</script>

<style scoped>
.base-info1 {
  margin-top: 5px;
  padding: 5px;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #222;
}
.info-price {
  margin-top: 8px;
}
.new-price {
  color: #ff5777;
  font-size: 24px;
  padding: 2px;
}
.old-price {
  padding-left: 5px;
  color: #aa999a;
  text-decoration: line-through;
}
.discount {
  color: #fff;
  border-radius: 8px;
  font-size: 12px;
  padding: 2px 5px;
  margin-left: 5px;
  margin-bottom: 5px;
}
.info-other {
  display: flex;
  color: #aa999a;
  font-size: 13px;
  text-align: center;
  justify-content: space-between;
  margin-top: 22px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-bottom: 8px;
}
.services {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 20px 5px;
  line-height: 14px;
}
.services-item img {
  width: 14px;
  height: 14px;
  color: #222;
}
</style>