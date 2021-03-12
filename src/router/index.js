import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "@/views/Register";
import SignIn from "@/views/SignIn";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";
import NotFound from "@/views/NotFound";
import store from "../store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {secure: false},
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {secure: true}
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: Register,
        meta: {secure: false}
      },
      {
        path: '/signin',
        name: 'SignIn',
        component: SignIn,
        meta: {secure: false}
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {secure: true}
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{

  const isLogged = store().state.account.isLogged;

  if (to.matched.some(value => value.meta.secure) && isLogged){
    next();
  }else if(to.name !== 'SignIn' ){
    next('/signin');
  }else {
    next(); //review a redundant warning
  }

});

export default router
