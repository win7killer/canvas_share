import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

window.vm = vm;