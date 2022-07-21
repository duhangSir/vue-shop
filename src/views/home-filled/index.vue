<template>
  <div class="home-filled">
    <div class="home-el-card">
      <el-card
        v-for="(item, index) in res1"
        :key="index"
        shadow="hover"
        class="box-card"
      >
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>
            <el-tag class="ml-2" :type="item.unitColor">{{ item.unit }}</el-tag>
          </div>
        </template>
        <div class="text">
          <span class="value">{{ item.value }}</span>
          <el-divider border-style="dotted" />
          <div class="subTitle">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="toLIST">
      <el-card
        shadow="hover"
        class="tolist"
        v-for="(item, index) in tolist"
        :key="index"
        @click="routepush(item.path)"
      >
        <el-icon><svgIcon :icon-class="item.icon"></svgIcon></el-icon>
        <p>{{ item.title }}</p>
      </el-card>
    </div>
    <div class="box" style="margin-top: 20px">
      <div style="width: 49.5%">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span class="count">订单统计</span>
              <el-check-tag
                class="button"
                @click="weekdate(item.data)"
                v-for="(item, index) in week"
                :key="index"
                :checked="date === item.data"
                >{{ item.title }}</el-check-tag
              >
            </div>
          </template>
          <div id="main" style="width: 100%; height: 300px"></div>
        </el-card>
      </div>
      <div style="margin-left: 20px; width: 48%">
        <el-card class="box-card" style="width: 100%; margin-bottom: 20px">
          <template #header>
            <div class="card-header">
              <span>店家及商品提示</span>
              <el-tag class="ml-2" type="danger">店铺及商品提示</el-tag>
            </div>
          </template>
          <el-card
            shadow="hover"
            class="stopShop"
            style="width: 22%; text-align: center; display: inline-block"
            v-for="(item, index) in goods"
            :key="index"
          >
            <p>{{ item.value }}</p>
            <span>{{ item.label }}</span>
          </el-card>
        </el-card>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>交易提示</span>
              <el-tag class="ml-2" type="danger">需要立即处理的交易订单</el-tag>
            </div>
          </template>
          <el-card
            shadow="hover"
            class="stopShop"
            style="width: 22%; text-align: center; display: inline-block"
            v-for="(item, index) in orders"
            :key="index"
          >
            <p>{{ item.value }}</p>
            <span>{{ item.label }}</span>
          </el-card>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import svgIcon from '@/components/plugins/svgIcon.vue'
import homeFilled from '@/api/home-filled'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
const date = ref('week')
function init() {
  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.getElementById('main'))
  // 指定图表的配置项和数据
  const option = {
    xAxis: {
      data: res3.value.x
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: res3.value.y
      }
    ]
  }
  myChart.setOption(option)
}
const router = useRouter()
const weekdate = async (data) => {
  const response3 = await homeFilled.statistics3(data)
  res3.value = response3.data
  date.value = data
  init()
}
const routepush = (path) => {
  router.push(path)
}
const week = ref([
  {
    title: '近一个月',
    data: 'month'
  },
  {
    title: '近一周',
    data: 'week'
  },
  {
    title: '近24小时',
    data: 'hour'
  }
])
const tolist = ref([
  {
    title: '用户',
    icon: 'user',
    path: '/user/list'
  },
  {
    title: '商品',
    icon: 'shopping-cart',
    path: '/goods/list'
  },
  {
    title: '订单',
    icon: 'buyShop',
    path: '/order/list'
  },
  {
    title: '评价',
    icon: 'notify',
    path: '/comment/list'
  },
  {
    title: '图库',
    icon: 'pictures',
    path: '/image/list'
  },
  {
    icon: 'proclaim',
    title: '公告',
    path: '/notice/list'
  },
  {
    title: '配置',
    icon: 'set-up',
    path: '/setting/base'
  },
  { title: '优惠券', icon: 'couponColor', path: '/coupon/list' }
])
const res1 = ref()
const res2 = ref()
const res3 = ref()
const goods = ref()
const orders = ref()
onMounted(async () => {
  const response1 = await homeFilled.statistics1()
  res1.value = response1.data.panels
  const response2 = await homeFilled.statistics2()
  res2.value = response2.data
  await homeFilled.statistics3('week')
  goods.value = response2.data.goods
  orders.value = response2.data.order
  weekdate('week')
  console.log(goods)
  console.log(orders)
})
</script>
<style scoped lang="scss">
.home-filled {
  padding: 0 20px;
  .stopShop {
    margin-left: 3%;
    background-color: #f6f6f6;
    span {
      font-size: 14px;
    }
  }
  .stopShop:nth-child(1) {
    margin-left: 0px;
  }
  .box {
    display: flex;
  }
  .toLIST {
    display: flex;
    .tolist {
      cursor: pointer;
      margin-top: 16px;
      text-align: center;
      font-size: 14px;
      width: 184px;
      margin-left: 20px;
      border-radius: 5px;
      background-color: #fff;
    }
    .tolist:nth-child(1) {
      margin-left: 0px;
    }
  }
  .subTitle {
    display: flex;
    justify-content: space-between;
    color: rgb(129, 129, 129);
  }
  .value {
    font-size: 30px;
    color: rgb(129, 129, 129);
  }
  .home-el-card {
    display: flex;
    justify-content: space-between;

    .box-card {
      flex: 1;
      height: 186px;
      margin-left: 20px;
    }
    .box-card:nth-child(1) {
      margin-left: 0px;
    }
    .box-card:nth-child(4) {
      margin-right: 0px;
    }
  }
  ::v-deep .el-card__header {
    padding: calc(var(--el-card-padding) - 10px) var(--el-card-padding) !important;
    background-color: #f9fafb;
  }
  .count {
    margin-right: auto;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
      margin-left: 10px;
    }
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
}
</style>
