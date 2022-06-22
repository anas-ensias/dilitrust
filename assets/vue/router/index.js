import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/Home';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import Files from '../views/Files';
import Users from '../views/Users';

Vue.use(VueRouter);

let router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: Login },
    { path: '/signup', component: SignUp },
    { path: '/files', component: Files, meta: { requiresAuth: true } },
    { path: '/users', component: Users, meta: { requiresAuth: true } },
    { path: '*', redirect: '/home' }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters['security/isAuthenticated']) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;