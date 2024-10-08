<template>
    <el-card class="card">
        <template #header>
            <div>考试系统登录</div>
        </template>
        <el-form :model="formData">
            <el-form-item label="班级">

            </el-form-item>
            <el-form-item label="学号">
                
            </el-form-item>
            <el-form-item label="姓名">

            </el-form-item>
            <el-form-item>
                <el-button type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<style lang="scss" scoped>
.card{
    width: 50%;
}
</style>