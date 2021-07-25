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
import ActivitySpaceView from "@/views/ActivitySpaceView";
import ModelPractice from "@/views/ModelPractice";
import CompetencyView from "@/views/CompetencyView";
import ConfigPracticeValidation from "@/views/ConfigPracticeValidation";
import PublicPracticeValidation from "@/views/PublicPracticeValidation";

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
      },
      {
        path: '/activity-spaces',
        name: 'ActivitySpaces',
        component: ActivitySpaceView,
        meta: {secure: true},
      },
      {
        path: '/model-practices',
        name: 'ModelPractices',
        component: ModelPractice,
        meta: {secure: true},
      },
      {
        path: '/validate-practices',
        name: 'ValidatePractices',
        component: ConfigPracticeValidation,
        meta: {secure: true},
      },
      {
        path: '/validate-practices/public/:id',
        name: 'PublicPracticeValidation',
        component: PublicPracticeValidation,
        meta: {secure: false},
        props: true
      },
      {
        path: '/competencies',
        name: 'Competency',
        component: CompetencyView,
        meta: {secure: true},
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
  }else if (to.matched.some(value => !value.meta.secure)) {
    next();
  } else if(to.name !== 'SignIn' && to.name !== 'SignUp'){
    console.log('different ')
    next('/signin');
  } else {
    next(); //review a redundant warning
  }
});

export default router
