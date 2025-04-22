import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Create from "../views/Create.vue";
import Signin from "../views/Signin.vue";
import Homepage from "../views/Homepage.vue";
import Profile from "../views/Profile.vue";
import Edit from "../views/Edit.vue";
import Search from "../views/Search.vue";
import Details from "../views/Details.vue";
import Campgrounds from "../views/Campgrounds.vue";
import ThingsToDo from "../views/ThingsToDo.vue";
import Friends from "../views/Friends.vue";
import Trips from "../views/Trips.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: Welcome,
    },
    {
      path: "/create",
      name: "create",
      component: Create,
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
    },
    {
      path:"/homepage",
      component: Homepage,
      name:"homepage",
    },
    {
      path:'/profile',
      name:"profile",
      component: Profile,
    },
    {
      path:'/edit',
      name:"edit",
      component: Edit,
    },
    {
      path:'/search',
      name:"search",
      component: Search,
    },
    {
      path:'/details/:parks/:states',
      name:"details",
      component:Details,
    },
    {
      path:'/campgrounds/:parks/:camps',
      name:"campgrounds",
      component:Campgrounds,
    },
    {
      path:'/campgrounds/:parks/:thingstodo',
      name:"thingstodo",
      component:ThingsToDo,
    },
    {
      path:'/friends',
      name:"friends",
      component: Friends,
    },
    {
      path:'/trips',
      name:"trips",
      component: Trips,
    },

  ],
});

export default router;
