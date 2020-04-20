import Vue from 'vue'
import VueRouter from 'vue-router'
import landingPage from '../components/landing/landing_page.vue'
import containerPage from '../components/main/container.vue'
import slogan from '../components/landing/branch/slogan.vue'
import login from '../components/landing/branch/login.vue'
import register from '../components/landing/branch/register.vue'
import schedule from '../components/main/branch/schedule/schedule.vue'
import calendar from '../components/main/branch/calendar/calendar.vue'
import taskManagement from '../components/main/branch/task_management/task_management.vue'
import setting from '../components/main/branch/setting/setting.vue'
import timetable from '../components/main/branch/calendar/branch/timetable.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: landingPage,
    meta: { requiresAuth : false },
    children:[
      {
        path:'/',
        name:'slogan',
        component:slogan,
        meta: { requiresAuth : false },
      },
      {
        path:'login',
        name:'login',
        component:login,
        meta: { requiresAuth : false },
      },
      {
        path:'register',
        name:'register',
        component:register,
        meta: { requiresAuth : false },
      }
    ]
  },
  {
    path:'/home',
    name:'home',
    component:containerPage,
    meta: { requiresAuth : true },
    children:[
      {
        path:'/',
        name:'schedule',
        component:schedule,
        meta: { requiresAuth : true },
      },
      {
        path:'calendar',
        name:'calendar',
        component:calendar,
        meta: { requiresAuth : true },
      },
      {
        path:'timetable/:year/:month/:day',
        name:'timetable',
        component:timetable,
        meta: { requiresAuth : true },

      },
      {
        path:'taskManagement',
        name:'taskManagement',
        component:taskManagement,
        meta: { requiresAuth : true },
      },
      {
        path:'setting',
        name:'setting',
        component:setting,
        meta: { requiresAuth : true },
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})
/*
router.beforeEach((to, from, next) => {

  
})
*/
export default router
