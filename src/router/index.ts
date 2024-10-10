import { createWebHistory, createRouter } from 'vue-router'
import Login from '../components/Login.vue'
import Examination from '../components/Examination.vue'

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/examination',
        component: Examination
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router