<template>
  <div class="category-menu">
    <div class="left">
      <scroll class="left-content" ref="scroll">
        <category-kinds
          v-for="(item, index) in categorise"
          :key="index"
          :titles="item.title"
          class="kinds-item"
          :class="{ active: currentIndex == index }"
          @click.native="kindsClick(index)"
        >
        </category-kinds>
      </scroll>
    </div>
    <div class="right">
      <tab-control
        :titles="['综合', '新品', '销量']"
        ref="tabcontrol1"
        @tabClick="tabClick"
        class="tab-control-top"
        v-show="isFixe"
      ></tab-control>

      <scroll
        ref="scroll1"
        class="right-content"
        @scrollListen="scrollListen"
        :probeType="3"
      >
        <div class="show">
          <div
            class="showSubcategory"
            v-for="(item, index) in mCategoryData.list"
            :key="index"
          >
            <a :href="item.link">
              <img :src="item.image" alt="" @load="imgload" />
              <p>{{ item.title }}</p>
            </a>
          </div>
        </div>
        <div class="tab-control">
          <tab-control
            :titles="['综合', '新品', '销量']"
            ref="tabcontrol"
            @tabClick="tabClick"
          ></tab-control>
        </div>
        <div class="goods">
          <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll.vue";
import TabControl from "../../../components/content/tabControl/TabControl.vue";
import GoodsList from "../../../components/content/goods/GoodsList.vue";

import CategoryKinds from "./CategoryKinds.vue";
import CategoryDetail from "./CategoryDeatil.vue";

export default {
  name: "CategoryMenu",
  data() {
    return {
      currentIndex: 0,
      tabOffSetTop: 0,
      isFixe: false,
    };
  },
  components: {
    CategoryKinds,
    CategoryDetail,
    Scroll,
    TabControl,
    GoodsList,
  },
  props: {
    categorise: {
      typeof: Array,
      default() {
        return [];
      },
    },
    mCategoryData: {
      type: Object,
      default() {
        return {};
      },
    },
    showCategoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    kindsClick(index) {
      this.currentIndex = index;
      this.$emit("kindsClick", index);
    },
    tabClick(index) {
      this.$emit("meunTabClick", index);
      this.$refs.tabcontrol.currentIndex = index;
      this.$refs.tabcontrol1.currentIndex = index;
    },
    imgload() {
      this.tabOffSetTop = 0;
      this.tabOffSetTop = this.$refs.tabcontrol.$el.offsetTop;
    },
    // 监听P滚动
    scrollListen(position) {
      this.isFixe = -position.y > this.tabOffSetTop;
    },
  },
  updated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll1.refresh();
  },
};
</script>

<style scoped>
.category-menu {
  height: 100%;
  display: flex;
}
.left {
  width: 100px;
  background-color: #f6f6f6;
}
.left-content {
  height: 100%;
  overflow: hidden;
}

.active {
  background-color: #fff;
  color: var(--color-high-text);
  font-weight: 700;
  border-left: 5px solid var(--color-high-text);
}
.right {
  position: relative;
  flex: 1;
}
.show {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.right-content {
  height: 100%;
}
.showSubcategory {
  display: inline-block;
  width: 80px;
  padding: 10px;
}
.showSubcategory img {
  width: 100%;
}
.showSubcategory p {
  text-align: center;
}
.tab-control-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>