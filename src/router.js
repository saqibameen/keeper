import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Todos from './views/Todos.vue'
import Done from './views/Done.vue'
import Error404 from './views/Error404.vue'
import Todo from './views/Todo.vue'
import Category from './views/Category.vue'
import DoneCategory from './views/DoneCategory.vue'
import { auth } from './firebaseConfig'

// Use the router.
Vue.use(Router)

// Routing.
let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
      meta: { requiresAuth: true }
    },
    {
      path: '/done',
      name: 'done',
      component: Done,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      name: '404',
      component: Error404
    },
    {
      path: '/todo/:id',
      name: 'Todo',
      component: Todo,
      meta: { requiresAuth: true }
    },
    {
      path: '/todos/:category',
      name: 'category',
      component: Category,
      meta: { requiresAuth: true }
    },
    {
      path: '/done/:category',
      name: 'doneCategory',
      component: DoneCategory,
      meta: { requiresAuth: true }
    },
  ],

})

// To check and redirect routes.
router.beforeEach((to, from, next) => {
  // Grab meta value of route.
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Redirection.
  auth.onAuthStateChanged(user => {
    if (user && to.name == 'home') {
      return next('/todos')
    }
    if (requiresAuth && !user) next('/')
    else next()
  });

})

export default router
