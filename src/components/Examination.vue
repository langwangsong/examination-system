<template>
    <el-container>
        <el-header>
            <el-space spacer="|">
                <div>八年级{{userStore.classData}}班</div>
                <div>{{ userStore.username }}</div>
                <div>{{ userStore.numberData }}号</div>
                <el-button type="primary" @click="onLogout">退出</el-button>
            </el-space>
                <div>
                    <div>分数：{{ score }}</div>
                    <div>时间：{{ Math.floor(time/60) }} : {{ time % 60 }}</div>
                </div>
            
        </el-header>
        <el-divider />
        <el-main>
            <div>一、单选题(共20题， 每题2分)</div>
            <div v-for="(item, n) in allQuestions.slice(0, 20)" :key="n">
                <div>
                    <p>{{ n + 1 }}：</p>
                    <el-image :src="'http://localhost:8000/chooseQuestions/'+item.desc" lazy/>
                </div>
                <el-radio-group v-model="item.reply" :disabled="canAnswer">
                    <el-radio :value="'A'">A: {{ item.a }}</el-radio>
                    <el-radio :value="'B'">B: {{ item.b }}</el-radio>
                    <el-radio :value="'C'">C: {{ item.c }}</el-radio>
                    <el-radio :value="'D'">D: {{ item.d }}</el-radio>
                </el-radio-group>
                <div v-show="answerShow" :style="{color: item.color}">答案：{{ item.ans }}</div>
            </div>
            <div>二、判断题(共10题， 每题2分)</div>
            <div v-for="(item, n) in allQuestions.slice(20, 30)" :key="n">
                <div>
                    {{ n + 1 }} ：
                    <el-image :src="'http://localhost:8000/judgeQuestions/'+item.desc"/>
                </div>
                <el-radio-group v-model="item.reply" :disabled="canAnswer">
                    <el-radio :value="'A'">A: {{ item.a }}</el-radio>
                    <el-radio :value="'B'">B: {{ item.b }}</el-radio>
                </el-radio-group>
                <div v-show="answerShow" :style="{color: item.color}">答案：{{ item.ans }}</div>
            </div>
        </el-main>
        <el-footer>
            <el-button type="primary" :disabled="canSubmit" @click="onSubmit">
                交卷
            </el-button>
        </el-footer>
    </el-container>
</template>
<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useUserStore} from '../store/user'
import router from '../router';
import axios from 'axios'
const userStore = useUserStore()
const time = ref(20*60)
const canSubmit = ref(false)
const allQuestions = ref<questions[]>([])
const canAnswer = ref(false)
const answerShow = ref(false)
const score = ref(0)
interface questions{
    desc: string
    a: string
    b: string
    c: string
    d: string
    ans: string
    reply:string
    color: string
}
const instance = axios.create({
    baseURL: 'http://localhost:8000', 
    timeout: 1000,
});
onMounted(()=>{
    if(!userStore.isLoginedIn){
        router.push("/login")
    }
    instance.get('/examination').then(res=>{
        allQuestions.value = res.data
    }).catch(error => {
        console.error('Error:', error);
    })
})
let intervalId = setInterval(() => {
    time.value --
}, 1000);
let timeoutId = setTimeout(() => {
    clearInterval(intervalId)
    canSubmit.value = true
    onSubmit()
}, time.value * 1000);
const onSubmit = ()=>{
    for(let item of allQuestions.value){
        if(item.ans == item.reply){
            score.value += 2
        }else{
            item.color = 'red'
        }
    }
    canAnswer.value = true
    canSubmit.value = true
    answerShow.value = true
    clearInterval(intervalId)
    clearTimeout(timeoutId)
}
const onLogout = ()=>{
    userStore.logout()
    router.push("/login")
}
</script>