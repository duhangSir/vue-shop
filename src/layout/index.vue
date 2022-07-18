<template>
  <div class="common-layout">
    <el-container>
      <el-header><Header></Header></el-header>
      <el-container>
        <el-aside :width="collapse ? '64px' : '250px'"
          ><Aside></Aside
        ></el-aside>
        <el-main><Main></Main></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Header from '@/layout/Header'
import Aside from '@/layout/Aside'
import Main from '@/layout/Main'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const collapse = computed(() => {
  return store.getters.iscollapse
})
</script>
<style scoped lang="scss">
.el-aside {
  height: calc(100vh - 65px);
}
.el-main {
  height: calc(100vh - 65px);
  background-color: #f3f4f6;
}
.el-header {
  height: 65px;
  padding: 0;
}
</style>
