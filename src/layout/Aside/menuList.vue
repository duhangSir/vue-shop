<template>
  <template v-if="props.menu.child.length > 0">
    <el-sub-menu :index="props.menu.child[0].frontpath">
      <template #title>
        <el-icon>
          <svg-icon :icon-class="props.menu.icon"></svg-icon>
        </el-icon>
        <span>{{ props.menu.name }}</span>
      </template>
      <menuList
        v-for="(childItem, index) in props.menu.child"
        :key="index"
        :menu="childItem"
      ></menuList>
    </el-sub-menu>
  </template>
  <template v-if="props.menu.child.length <= 0">
    <el-menu-item :index="props.menu.frontpath">
      <el-icon>
        <svg-icon :icon-class="props.menu.icon"></svg-icon>
      </el-icon>
      {{ props.menu.name }}</el-menu-item
    >
  </template>
</template>
<script setup>
import { defineProps } from 'vue'
import svgIcon from '@/components/plugins/svgIcon.vue'
const props = defineProps({
  menu: {
    type: Object,
    default: () => {}
  }
})
</script>
<style scoped lang="scss"></style>
