import Vue from 'vue'
import VueRouter from 'vue-router'

import ClientLogin from '@/views/ClientLogin'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: ClientLogin,
    meta: [
      {
        title: "Sign Up or Log In"
      },
      {
        name: "description",
        content: "Sign Up or Log In to Foodiecloud!"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
