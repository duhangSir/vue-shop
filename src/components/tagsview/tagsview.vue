<template>
  <div>
    <el-tabs
      v-model="tab"
      type="card"
      class="demo-tabs"
      @tab-remove="removetags"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path !== '/'"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
const tab = ref(route.path)
const removetags = (name) => {
  store.dispatch('user/removeTagsView', {
    tags: name,
    Nowpath: route.matched[1].path
  })
}
watch(
  () => router.currentRoute.value,
  (newValue, oldValue) => {
    const obj = {
      path: newValue.fullPath,
      title: newValue.meta.title
    }
    store.dispatch('user/SetTagsView', obj)
  },
  { immediate: true }
)
const changeTab = (path) => {
  tab.value = path
  router.push(path)
}
const editableTabs = computed(() => {
  return store.getters.tagsview
})
onBeforeRouteUpdate((to, from) => {
  tab.value = to.path
})
</script>
<style scoped lang="scss">
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
::v-deep .el-tabs__item {
  // padding: 0 20px;
  height: 32px;

  line-height: 32px;
  //color: #000000;
  background-color: #ffffff;
  //margin-right: 15px;
  margin-left: 15px;
  border-radius: 5px;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  transition: all var(--el-transition-duration)
    var(--el-transition-function-ease-in-out-bezier);
  border: 1px solid transparent;
  margin-top: -1px;
  //color: #000000;
}
.el-tabs--border-card {
  border: 0;
}
::v-deep .el-tabs--border-card > .el-tabs__header {
  border: 0;
}
</style>
