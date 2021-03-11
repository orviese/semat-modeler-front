import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "@/views/Register";
import SignIn from "@/views/SignIn";
import Profile from "@/views/Profile";
import Dashboard from "@/views/Dashboard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: Register
      },
      {
        path: '/signin',
        name: 'SingIn',
        component: SignIn
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
