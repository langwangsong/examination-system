import { defineStore } from "pinia"
interface user {
    username: string
    classData: string
    numberData: string
}
export const useUserStore = defineStore('userStore', {
    state: () => ({
        username: '',
        classData: '',
        numberData: '',
        isLoginedIn: false
    }),
    persist: {
        key: "userinfo",
        storage: sessionStorage
    },
    actions: {
        login(userInfo: user) {
            this.username = userInfo.username
            this.classData = userInfo.classData
            this.numberData = userInfo.numberData
            this.isLoginedIn = true
        },
        logout() {
            this.username = ''
            this.classData = ''
            this.numberData = ''
            this.isLoginedIn = false
            sessionStorage.clear()
        }
    }
})