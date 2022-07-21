<template>
  <div class="shopCall">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tableList">
      <el-tab-pane
        v-for="(item, index) in activeList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <div class="shopCall-container">
          <div class="shopCall-container-search">
            <el-form
              :inline="true"
              ref="resetForm"
              :model="formInline"
              class="demo-form-inline"
            >
              <el-form-item label="关键词" prop="name">
                <el-input v-model="formInline.name" placeholder="商品名称" />
              </el-form-item>
              <el-form-item v-if="!shopShow" label="商品分类" prop="type">
                <el-select
                  v-model="formInline.type"
                  placeholder="请选择商品分类"
                >
                  <el-option
                    v-for="(item, index) in cateList"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
            <div class="flex justify-space-between mb-4 flex-wrap gap-4">
              <el-button
                type="primary"
                text
                v-if="shopShow"
                @click="shopShowAsync"
                >展开<el-icon class="el-icon--right"><ArrowDown /></el-icon
              ></el-button>
            </div>
            <div class="flex justify-space-between mb-4 flex-wrap gap-4">
              <el-button
                type="primary"
                text
                v-if="!shopShow"
                @click="shopShowAsync"
                >收起<el-icon class="el-icon--right"><ArrowUp /></el-icon
              ></el-button>
            </div>
          </div>
          <div>
          111
            <el-table
              :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }"
              :data="tableData"
              stripe
              style="width: 100%"
            >
              <el-table-column type="selection" width="55" />
              <el-table-column prop="title" label="商品" width="200px">
                <template #default="scope">
                  <div class="scopeTitle">
                    <div>
                      <span v-if="!scope.row.cover">图片未加载</span>
                      <img
                        v-else
                        class="scopeImg"
                        :src="scope.row.cover"
                        alt=""
                      />
                    </div>
                    <div class="scopename">
                      <p>{{ scope.row.title }}</p>
                      <span style="color: red"
                        >￥{{ scope.row.min_stock }}.00 |
                      </span>
                      <span>￥{{ scope.row.stock }}.00</span>
                      <p style="color: #000">
                        分类{{
                          scope.row.category
                            ? scope.row.category.name
                            : '未分类'
                        }}
                      </p>
                      <p style="color: #000">
                        创建时间: {{ scope.row.create_time }}
                      </p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="discount" label="实际销量" />
              <el-table-column prop="status" label="商品状态">
                <template #default="scope">
                  <el-tag
                    class="ml-2"
                    type="danger"
                    v-if="scope.row.status === 0"
                    >仓库</el-tag
                  >
                  <el-tag class="ml-2" type="success" v-else>上架</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="ischeck" label="审核状态">
                <template #default="scope">
                  <span v-if="scope.row.ischeck === 1">通过</span>
                  <span v-if="scope.row.ischeck === 2">失败</span>
                  <div v-if="scope.row.ischeck === 0">
                    <p>
                      <el-button type="success" plain size="small"
                        >审核通过</el-button
                      >
                    </p>
                    <p>
                      <el-button type="danger" plain size="small"
                        >审核拒绝</el-button
                      >
                    </p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="stock" label="总库存" />
              <el-table-column label="操作" width="400px">
                <template #default="scope">
                  <el-button link type="primary" size="small">修改</el-button>
                  <el-button
                    link
                    :type="
                      scope.row.goods_skus.length > 0 || scope.row.sku_value
                        ? 'primary'
                        : 'danger'
                    "
                    size="small"
                    >商品规格</el-button
                  >
                  <el-button
                    link
                    :type="
                      scope.row.goods_banner.length > 0 ? 'primary' : 'danger'
                    "
                    size="small"
                    >设置轮播图</el-button
                  >
                  <el-button
                    link
                    :type="scope.row.content ? 'primary' : 'danger'"
                    size="small"
                    >商品详细</el-button
                  >
                  <el-button link type="primary" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-left: 50%; padding: 30px 0"
              background
              layout="prev, pager, next"
              :total="total"
              class="mt-4"
              :current-page="currentPage.value"
              @current-change="currentPageSize"
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import category from '@/api/category'
const cateList = ref()
const shopShow = ref('false')
const activeName = ref('all')
const currentPage = ref('1')
const total = ref()
const currentPageSize = (page) => {
  currentPage.value = page
  getTableList()
}
const activeList = ref([
  {
    label: '全部',
    name: 'all'
  },
  {
    label: '审核中',
    name: 'checking'
  },
  {
    label: '出售中',
    name: 'saling'
  },
  {
    label: '已下架',
    name: 'off'
  },
  {
    label: '库存预警',
    name: 'min_stock'
  },
  {
    label: '回收站',
    name: 'delete'
  }
])
const formInline = ref({
  name: '',
  type: ''
})
const handleSearch = () => {
  console.log(formInline.value)
  getTableList()
}
const resetForm = ref()
const handleReset = () => {
  resetForm.value[0].resetFields()
  currentPage.value = 1
  activeName.value = 'all'
  formInline.value.type = ''
  formInline.value.name = ''
  getTableList()
}
const tableData = ref([])
onMounted(() => {
  getCateList()
  getTableList('all')
})
const tableList = (name) => {
  activeName.value = name
  console.log(name)
  getTableList(name)
}
const shopShowAsync = () => {
  shopShow.value = !shopShow.value
}
const getCateList = async () => {
  const response = await category.getCategory()
  console.log(response)
  cateList.value = response.data
}
const getTableList = async () => {
  const obj = {
    tab: activeName.value,
    category_id: formInline.value.type,
    title: formInline.value.name
  }
  if (obj.category_id.length === 0) {
    delete obj.category_id
  }
  if (obj.title.length === 0) {
    delete obj.title
  }
  const response = await category.getGoods(currentPage.value, obj)
  tableData.value = response.data.list
  total.value = response.data.totalCount
}
</script>
<style scoped lang="scss">
.shopCall {
  padding: 0 20px;
  .shopCall-container {
    background-color: #fff;
    padding: 0 20px;
    overflow: hidden;
    .shopCall-container-search {
      margin-top: 10px;
      display: flex;
      .el-button {
        margin-right: 10px;
      }
      .el-button:nth-child(3) {
        margin-right: 0px;
      }
    }
    .demo-form-inline {
      margin-right: auto;
    }
    .scopeImg {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 5px;
    }
    .scopeTitle {
      display: flex;
    }
    .scopename {
      line-height: 16px;
      font-size: 12px;
      text-align: left;
    }
  }
}
</style>
