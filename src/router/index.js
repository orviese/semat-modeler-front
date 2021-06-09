import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from "@/views/Register";
import SignIn from "@/views/SignIn";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";
import NotFound from "@/views/NotFound";
import store from "../store";

import AreaOfConcernView from "@/views/AreaOfConcernView";
import NewHome from "@/views/NewHome";
import AlphaView from "@/views/AlphaView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: NewHome,
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
        path: '/areas-of-concern',
        name: 'AreaOfConcern',
        component: AreaOfConcernView,
        meta: {secure: true}
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {secure: true},
      },
      {
        path: '/alphas',
        name: 'Alpha',
        component: AlphaView,
        meta: {secure: true},
      }
      /*,{
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {secure: true},
        children: [
          {
            path: '/hello',
            name: 'Hello',
            component: HelloWorld,
          },
          {
            path: '/about',
            name: 'About',
            component: About,
          },
          {
            path: '/areas-of-concern',
            name: 'AreaOfConcern',
            component: AreaOfConcernView
          }
        ]
      }*/
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
  //console.log(to);
  if (to.matched.some(value => value.meta.secure) && isLogged){
    next();
  }else if(to.name !== 'SignIn' && to.name !== 'SignUp'){
    next('/signin');
  }else {
    next(); //review a redundant warning
  }
});

export default router
