import Vue from 'vue'
import VueRouter from 'vue-router'

import ClientLogInSignUp from '@/views/ClientLogInSignUp';
import RestaurantLogInSignUp from '@/views/RestaurantLogInSignUp';
import RestaurantProfile from '@/views/RestaurantProfile';
import DiscoverPage from '@/views/DiscoverPage.vue';
import CloudpunchPizzeria from '@/views/CloudpunchPizzeria.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: ClientLogInSignUp,
    meta: [
      {
        title: "Sign Up or Log In"
      },
      {
        name: "description",
        content: "Sign Up or Log In to Foodiecloud!"
      },
      {
        name: "keywords",
        content: "log in, sign up, foodiecloud, food to go, food delivery service, local restaurants, fast delivery"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
  {
    path: "/restaurantlogin",
    component: RestaurantLogInSignUp,
    meta: [
      {
        title: "Sign Up or Log In"
      },
      {
        name: "description",
        content: "Sign Up or Log In to Foodiecloud to grow your business today!"
      },
      {
        name: "keywords",
        content: "log in, sign up, foodiecloud, small business, local restaurants, food delivery service, fast delivery, grow your restaurant"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
  {
    path: "/restaurant-profile",
    component: RestaurantProfile,
    meta: [
      {
        title: "Your Profile"
      },
      {
        name: "description",
        content: "Review your Foodiecloud account information, delete your account, change password or other information."
      },
      {
        name: "keywords",
        content: "foodiecloud, food delivery, your profile, local restaurant, fast delivery"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
  {
    path: "/discover",
    component: DiscoverPage,
    meta: [
      {
        title: "Hungry?"
      },
      {
        name: "description",
        content: "Discover amazing restaurants and fast food without leaving where you are!"
      },
      {
        name: "keywords",
        content: "foodiecloud, food to go, food delivery service, local restaurants, fast delivery, take out, take away, food now, discover restaurants, asian food, italian food, mexican food, american food"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
  {
    path: "/cloudpunchpizzeria",
    component: CloudpunchPizzeria,
    meta: [
      {
        title: "Cloudpunch Pizzeria"
      },
      {
        name: "description",
        content: "Cloudpunch Pizzeria makes fresh, authentic Neapolitan pizza in Edmonton, Alberta."
      },
      {
        name: "keywords",
        content: "pizza, pizzeria, cloudpunch pizzeria, italian food, italian restaurant, local restaurant, fast delivery"
      },
      {
        name: "author",
        content: "Siobhan Bonardi"
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  // Get all meta tags 
  let metaTags = document.querySelectorAll('meta');
  // Loop through the tags and remove each
  // for OF is vanilla Javascript so that's what we have to use (vue is for in loops) and this page is PURE JAVASCRIPT
  for (let tag of metaTags){
    tag.remove();
  }
  // to.meta (navigating TO.meta.title)
  let newTags = to.meta;
  document.querySelector('title').innerText = newTags[0].title;

  // i zero is the title obj that we don't need here
  for (let i = 1; i<newTags.length; i++){
    document.querySelector(`head`).insertAdjacentHTML(`afterbegin`,
                                                      `<meta name:"${newTags[i].name}" description="${newTags[i].content}">`);
  }
  document.querySelector(`head`).insertAdjacentHTML(`afterbegin`,
                                                    `<meta charset="utf-8">
                                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                                    <meta name="viewport" content="width=device-width,initial-scale=1.0">`
                                                    );
  next();
  from;
})

export default router
