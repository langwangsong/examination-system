<template>
    <el-card class="card">
        <template #header>
            <div>信息技术学业水平模拟系统</div>
        </template>
        <el-form :model="formData">
            <el-form-item label="班级:">
                <el-select v-model="formData.classData" placeholder="请选择班级">
                    <el-option  
                    v-for="n in 8"
                    :key="n"
                    :label="'八年级'+n + '班'"
                    :value="n.toString()"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="学号:">
                <el-select v-model="formData.numberData" placeholder="请选择学号">
                    <el-option  
                    v-for="n in 60"
                    :key="n"
                    :label="n"
                    :value="n.toString()"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="姓名:">
                <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios'
import router from '../router'
import {useUserStore} from '../store/user'
const userStore = useUserStore()
onMounted(()=>{
    if(userStore.isLoginedIn){
        router.push("/examination")
    }
})
const instance = axios.create({
    baseURL: 'http://localhost:8000', 
    timeout: 1000,
});
const formData = ref({classData:'', numberData:'', username:''})
const onSubmit = ()=>{
    instance.post('/login',formData.value).then(res=>{
        if(res.data.code == 200){
            userStore.login(res.data.user)
            router.push("/examination")
        }else{
            console.log("学号班级姓名有误！")
        }
    }).catch(error => {
        console.error('Error:', error);
    })
    
}
</script>
<style lang="scss" scoped>
.card{
    width: 50%;
}
</style>