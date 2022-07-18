<template>
  <div>
    <el-menu
      :default-active="$route.path"
      unique-opened
      router
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
    >
      <menuList
        v-for="(item, index) in list"
        :key="index"
        :menu="item"
      ></menuList>
    </el-menu>
  </div>
</template>
<script setup>
import menuList from './menuList'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const list = computed(() => {
  return store.getters.userInfo.menus
})
const isCollapse = computed(() => {
  return store.getters.iscollapse
})
console.log(list)
</script>
<style scoped lang="scss"></style>
