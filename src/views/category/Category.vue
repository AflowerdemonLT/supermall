<template >
  <div class="category">
    <nav-bar class="navbar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <category-menu
      :categorise="categorise"
      @kindsClick="kindsClick"
      :mCategoryData="showSubcategory"
      class="content"
      @meunTabClick="meunTabClick"
      :showCategoryDetail="showCategoryDetail"
    ></category-menu>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar.vue";
import Scroll from "../../components/common/scroll/Scroll.vue";

import CategoryMenu from "./childComponents/CategoryMenu.vue";

import {
  getCategoryData,
  getSubCategory,
  getCategoryDetail,
} from "../../network/category";

export default {
  components: {
    NavBar,
    CategoryMenu,
    Scroll,
  },
  name: "Catetory",
  data() {
    return {
      categoryKindsInfo: [],
      KindsInfoTitles: [],
      categorise: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
    };
  },

  created() {
    // 获取总的数据
    // getCategoryData().then((res) => {
    //   console.log(res.data);
    //   this.categoryKindsInfo = res.data.category.list;
    //   for (let item of this.categoryKindsInfo) {
    //     this.KindsInfoTitles.push(item.title);
    //   }
    // });
    // 左侧分类数据
    // 根据maitKey值获取不同类型的数据
    // getSubCategory(598).then((res) => {
    //   console.log(res);
    // });
    // // 分类顶部导航栏的请求 miniWallkey值 加上type
    // getCategoryDetail(50532, "pop").then((res) => {
    //   console.log(res);
    // });

    // 1.初始化数据
    this.getCategory();
  },
  methods: {
    // 1.获取分类数据
    getCategory() {
      getCategoryData().then((res) => {
        // 1.获取分类数据
        this.categorise = res.data.category.list;

        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categorise.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类数据
        this.getSubCategories(0);
      });
    },
    // 获取右边有图片的那个数据
    getSubCategories(index) {
      this.currentIndex = index;
      const maitKey = this.categorise[index].maitKey;
      // console.log(maitKey);
      getSubCategory(maitKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        // 这里解构的原因是 初始化的时候是个数组，但是定义的categoryData是个对象
        // 所以要将数组解构后 再将数据放入这个对象中
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetails("pop");
        this.getCategoryDetails("sell");
        this.getCategoryDetails("new");
      });
    },
    getCategoryDetails(type) {
      // 1.通过currentIndex 获取请求的 miniWallkey
      const miniWallkey = this.categorise[this.currentIndex].miniWallkey;
      //  2.发送请求，传入miniWallkey 和 type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取到的导航栏下数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    kindsClick(index) {
      this.getSubCategories(index);
    },
    meunTabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "sell";
          break;
        case 2:
          this.currentType = "new";
          break;
      }
    },
  },
  computed: {
    // 导航栏上方的数据
    showSubcategory() {
      if (this.currentIndex == -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    // 导航栏下方的数据
    showCategoryDetail() {
      if (this.currentIndex == -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
};
</script>

<style scoped>
.category {
  position: relative;
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>