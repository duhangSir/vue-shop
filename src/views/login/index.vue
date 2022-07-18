<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="68%">
        <h1>欢迎光临</h1>
      </el-aside>
      <el-main width="32%">
        <div class="main-form">
          <h2>欢迎回来</h2>
          <el-divider><span class="el-divider">账号密码登录</span></el-divider>
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                v-model="ruleForm.username"
                placeholder="请输入用户名"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                show-password
                placeholder="请输入密码"
                :prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" type="primary" @click="submitForm"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
import router from '@/router'
const loading = ref(false)
const store = useStore()
const ruleForm = reactive({
  username: '',
  password: ''
})
const ruleFormRef = ref()
const submitForm = async () => {
  await ruleFormRef.value.validate(async (val) => {
    if (val) {
      try {
        loading.value = true
        const response = await store.dispatch('user/setToken', ruleForm)
        console.log(response)
        if (response.msg === 'ok') {
          loading.value = false
          ElNotification({
            title: '提示',
            message: '登录成功',
            type: 'success'
          })
          router.push('/')
        }
      } catch (error) {
        loading.value = false
      }
    }
  })
}
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})
</script>
<style scoped lang="scss">
.el-aside {
  background-color: #6366f1;
  height: 100vh;
  position: relative;
  h1 {
    position: absolute;
    font-size: 60px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}
.el-main {
  height: 100vh;
  position: relative;
  background-color: #fdfdfd;
  .main-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    h2 {
      margin-bottom: 10px;
    }
    .el-divider {
      color: #a8abb2;
      font-size: 18px;
    }
    .el-form {
      margin-top: 10px;
      width: 100%;
      .el-input {
        width: 100%;
      }
      .el-button {
        width: 100%;
        border-radius: 20px;
        background-color: #626aef;
      }
    }
  }
  .el-icon {
    display: flex;
  }
}
</style>
