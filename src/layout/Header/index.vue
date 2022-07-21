<template>
  <div class="header">
    <div class="header-img">
      <el-icon><ElemeFilled /></el-icon>
      积云编程
    </div>
    <div class="header-right-container">
      <div class="header-left">
        <el-icon class="collapse" v-if="iscollapse" @click="setcollapse"
          ><Expand
        /></el-icon>
        <el-icon class="collapse" v-else @click="setcollapse"><Fold /></el-icon>
        <el-tooltip content="刷新">
          <el-icon class="collapse" @click="refresh"><Refresh /></el-icon>
        </el-tooltip>
      </div>

      <el-tooltip content="全屏">
        <el-icon v-if="!screen" @click="fullScreen" class="collapse fullscreen"
          ><FullScreen
        /></el-icon>
        <el-icon v-else @click="fullScreen" class="collapse fullscreen"
          ><Aim
        /></el-icon>
      </el-tooltip>
      <div class="header-right">
        <el-avatar :size="30" :src="menu.avatar" />
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ menu.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="EditPassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
// import svgIcon from '@/components/plugins/svgIcon.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
const screen = ref(false)
const menu = computed(() => {
  return store.getters.userInfo
})
const iscollapse = computed(() => {
  return store.getters.iscollapse
})
const handleCommand = (command) => {
  if (command === 'logout') {
    store.dispatch('user/logout')
    router.push('/login')
  }
}
// 点击图标切换与侧边栏收缩
const setcollapse = () => {
  store.commit('user/setcollapse')
}
// 点击全屏
const fullScreen = () => {
  if (!screen.value) {
    screen.value = true
    document.documentElement.webkitRequestFullscreen()
  } else {
    screen.value = false
    document.webkitExitFullscreen()
  }
}
// 刷新
const refresh = () => {
  location.reload()
}
</script>
<style scoped lang="scss">
.header {
  background-color: #4338ca;
  width: 100%;
  height: 100%;
  color: #fff;
  display: flex;
  .header-right-container {
    display: flex;
    position: relative;
    align-items: center;
    width: calc(100vw - 250px);
    justify-content: space-between;
  }
  .header-img {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.el-dropdown {
  color: #fff;
  margin-top: 4px;
}
.fullscreen {
  position: absolute;
  right: 120px;
  color: rgb(158, 155, 155);
}
.collapse {
  height: 65px;
  width: 40px;
  &:hover {
    background-color: rgba($color: #f3ecec, $alpha: 0.2);
  }
}
.el-avatar {
  margin-right: 10px;
}
</style>
