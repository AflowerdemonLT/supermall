<template>
  <div class="commont-info" v-if="Object.keys(commontInfo).length !== 0">
    <div class="tittle">
      <span>用户评价</span>
      <span>更多<img src="~assets/img/detail/moreCommont.svg" alt="" /></span>
    </div>
    <div class="user-info">
      <!-- <span>头像:{{ commontInfo.user.avatar }}</span> -->
      <img :src="commontInfo.user.avatar" alt="" />
      <span class="name">{{ commontInfo.user.uname }}</span>
    </div>

    <div class="user-commont">
      <span>{{ commontInfo.content }}</span>
    </div>
    <div class="commont-infon-infon">
      <span>{{ commontInfo.created | showDate }}</span>
      <span>{{ commontInfo.style }}</span>
      <span class="photos">
        <img
          :src="image"
          alt=""
          v-for="(image, index) in commontInfo.images"
          :key="index"
        />
      </span>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailCommontInfo",
  data() {
    return {};
  },
  props: {
    commontInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    // console.log(this.commontInfo.user.avatar);
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    },
    showDate: function (value) {
      // 1.将时间戳转换成 Date对象
      const date = new Date(value * 1000);

      // 2.将date进行格式化
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>

<style scoped>
.commont-info {
  border-bottom: 5px solid #f2f5f8;
}
.tittle {
  display: flex;
  justify-content: space-between;
  color: #222;
  font-size: 15px;
  padding: 20px 0 20px 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
}
.tittle span {
  text-align: center;
}
.tittle span img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
.user-info {
  position: relative;
  padding: 10px 0 10px 10px;
  height: 46px;
  font-size: 15px;
  margin-bottom: 30px;
}
.user-info img {
  width: 46px;
  height: 46px;
  border-radius: 23px;
}
.user-info .name {
  position: absolute;
  text-align: center;
  top: 50%;
  margin-left: 10px;
  color: #222;
}
.user-commont {
  padding: 0 0 15px 10px;
}
.commont-infon-infon {
  color: #b7b7b7;
  font-size: 14px;
  padding-left: 10px;
}
.commont-infon-infon span {
  padding-right: 5px;
}
.commont-infon-infon img {
  width: 80px;
  height: 80px;
  margin-right: 8px;
}
.commont-infon-infon .photos {
  display: flex;
  margin-top: 10px;
  /* justify-content: space-around; */
}
</style>