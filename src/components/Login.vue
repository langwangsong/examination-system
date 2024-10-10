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
                    :value="'八年级'+n + '班'"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="学号:">
                <el-select v-model="formData.numberData" placeholder="请选择学号">
                    <el-option  
                    v-for="n in 60"
                    :key="n"
                    :label="n"
                    :value="n"
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
import {ref} from 'vue'
const formData = ref({classData:'', numberData:'', username:''})
const onSubmit = ()=>{
    console.log(formData.value)
}
</script>
<style lang="scss" scoped>
.card{
    width: 50%;
}
</style>