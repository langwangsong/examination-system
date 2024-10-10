<template>
    <el-container>
        <el-header>
            <el-space spacer="|">
                <div>八年级1班</div>
                <div>张三</div>
                <div>1号</div>
            </el-space>
                <div>
                    <div>分数：{{ score }}</div>
                    <div>时间：{{ Math.floor(time/60) }} : {{ time % 60 }}</div>
                </div>
            
        </el-header>
        <el-divider />
        <el-main>
            <div>一、单选题(共20题， 每题2分)</div>
            <div v-for="n in 20" :key="n">
                <div>
                {{ n }}：{{ chooseQuestion[0].desc }}
                </div>
                <el-radio-group v-model="chooseQuestion[0].reply" :disabled="canAnswer">
                    <el-radio :value="'A'">A: {{ chooseQuestion[0].a }}</el-radio>
                    <el-radio :value="'B'">B: {{ chooseQuestion[0].b }}</el-radio>
                    <el-radio :value="'C'">C: {{ chooseQuestion[0].c }}</el-radio>
                    <el-radio :value="'D'">D: {{ chooseQuestion[0].d }}</el-radio>
                </el-radio-group>
                <div v-show="answerShow" :style="{color: chooseQuestion[0].color}">答案：{{ chooseQuestion[0].ans }}</div>
            </div>
            <div>二、判断题(共10题， 每题2分)</div>
            <div v-for="n in 10" :key="n">
                {{ n }} ：{{ judgeQuestion[0].desc }}
                <el-radio-group v-model="judgeQuestion[0].reply" :disabled="canAnswer">
                    <el-radio :value="'A'">A: {{ judgeQuestion[0].a }}</el-radio>
                    <el-radio :value="'B'">B: {{ judgeQuestion[0].b }}</el-radio>
                </el-radio-group>
                <div v-show="answerShow" :style="{color: judgeQuestion[0].color}">答案：{{ judgeQuestion[0].ans }}</div>
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
import {ref} from 'vue'
const time = ref(12)
const canSubmit = ref(false)
const chooseQuestion = ref<questions>([{desc:'题目描述', a:'A选项', b:'B选项', c:'C选项', d:'D选项', ans:'A', reply:'0', color:'black'}])
const judgeQuestion = ref<questions>([{desc:'题目描述', a:'对', b:'错', c:'', d:'', ans:'B', reply:'0', color:'black'}])
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
let intervalId = setInterval(() => {
    time.value --
}, 1000);
let timeoutId = setTimeout(() => {
    clearInterval(intervalId)
    canSubmit.value = true
    onSubmit()
}, 12 * 1000);
const onSubmit = ()=>{
    console.log('交卷了！')
    for(let item of chooseQuestion.value){
        if(item.ans == item.reply){
            score.value += 2
        }else{
            item.color = 'red'
        }
    }
    for(let item of judgeQuestion.value){
        if(item.ans == item.reply){
            score.value += 2
        }else{
            item.color = 'red'
        }
    }
    console.log(chooseQuestion.value)
    console.log(judgeQuestion.value)
    canAnswer.value = true
    canSubmit.value = true
    answerShow.value = true
    clearInterval(intervalId)
    clearTimeout(timeoutId)
}
</script>