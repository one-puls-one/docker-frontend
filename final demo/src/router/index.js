import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../views/Home.vue'
import Users from '../components/user/Users.vue'
import Food from '../components/food/Food.vue'
import Din from '../components/din/Din.vue'
import AddFood from '../components/food/AddFood.vue'

Vue.use(VueRouter)

const routes = [{
            path: '/',
            redirect: '/login'
        }, {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/din',
            children: [
            {
                path: '/users',
                component: Users
            }, {
                path: '/food',
                component: Food
            }, {
                path: '/addfood',
                component: AddFood
            }, {
                path: '/din',
                component: Din
            }]
        }

    ]
const router = new VueRouter({
    routes
})

// 挂载路由导航守卫(防止没有进行验证后直接跳转到了相关页面)
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next是一个函数，表示放行
    // next() 放行  next('/login')强制性跳转到指定路由
    if (to.path === '/login') return next();
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()

})

export default router