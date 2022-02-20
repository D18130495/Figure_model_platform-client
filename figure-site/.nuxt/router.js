import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _65a6a69a = () => interopDefault(import('..\\pages\\people\\index.vue' /* webpackChunkName: "pages/people/index" */))
const _063628c4 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _dd747a2e = () => interopDefault(import('..\\pages\\people\\add.vue' /* webpackChunkName: "pages/people/add" */))
const _60ec0636 = () => interopDefault(import('..\\pages\\people\\show.vue' /* webpackChunkName: "pages/people/show" */))
const _5c766650 = () => interopDefault(import('..\\pages\\company\\detail\\_companyCode.vue' /* webpackChunkName: "pages/company/detail/_companyCode" */))
const _71c9f117 = () => interopDefault(import('..\\pages\\company\\notice\\_companyCode.vue' /* webpackChunkName: "pages/company/notice/_companyCode" */))
const _6c451e82 = () => interopDefault(import('..\\pages\\company\\_companyCode.vue' /* webpackChunkName: "pages/company/_companyCode" */))
const _63eae309 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/people",
    component: _65a6a69a,
    name: "people"
  }, {
    path: "/user",
    component: _063628c4,
    name: "user"
  }, {
    path: "/people/add",
    component: _dd747a2e,
    name: "people-add"
  }, {
    path: "/people/show",
    component: _60ec0636,
    name: "people-show"
  }, {
    path: "/company/detail/:companyCode?",
    component: _5c766650,
    name: "company-detail-companyCode"
  }, {
    path: "/company/notice/:companyCode?",
    component: _71c9f117,
    name: "company-notice-companyCode"
  }, {
    path: "/company/:companyCode?",
    component: _6c451e82,
    name: "company-companyCode"
  }, {
    path: "/",
    component: _63eae309,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
