import Vue from 'vue'
import Router from 'vue-router'
import GMap from '@/components/home/GMap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'

Vue.use(Router)
/**Once we load '/', we want to go to GMap component, imported above.
 Add a route guard on the Map route, by addig a meta property, ro prevent unauthorized access*/
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
   {
    path: '/signup',
    name: 'Signup',
    component: Signup

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile/:id',
    name: 'ViewProfile',
    component: ViewProfile,
    meta: {
      requiresAuth: true
    }
  }
  ]
})

router.beforeEach((to, from, next) => {
  //check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
   //check auth state of user(whether authenticated or not)
   let user = firebase.auth().currentUser
   if(user){
     // user signed in, proceed to route
     next()
   }else {
     //no user signed in, redirect to login
     next({name: 'Login'})
   }
  }else {
    next()
  }
})

export default router