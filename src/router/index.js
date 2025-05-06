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
import Excursion from "../views/Excursion.vue";
import EditTrip from "../views/EditTrip.vue";
import EditExcursion from "../views/EditExcursion.vue"
import Invites from "../views/Invites.vue";
function authenticate(){

  return !!localStorage.getItem("token");

}
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
      meta:{
        authRequired:true},
    },

    {
      path:'/profile',
      name:"profile",
      component: Profile,
      meta:{
        authRequired:true},

    },
    {
      path:'/edit',
      name:"edit",
      component: Edit,
      meta:{
        authRequired:true},

    },
    {
      path:'/search',
      name:"search",
      component: Search,
      meta:{
        authRequired:true},

    },

    {
      path:'/details/:parks/:states',
      name:"details",
      component:Details,
      meta:{
        authRequired:true},

    },
    {
      path:'/campgrounds/:parks/:camps',
      name:"campgrounds",
      component:Campgrounds,
      meta:{
        authRequired:true},

    },
    {
      path:'/campgrounds/:parks/:thingstodo',
      name:"thingstodo",
      component:ThingsToDo,
      meta:{
        authRequired:true},

    },
    {
      path:'/trips/:parks/:states',
      name:"trips",
      component:Trips,
      meta:{
        authRequired:true},

    },
    {
      path:'/excursion',
      name:"excursion",
      component:Excursion,
      meta:{
        authRequired:true},
    },
    {
      path:'/friends',
      name:"friends",
      component: Friends,
      meta:{
        authRequired:true},

    },
    {
      path:'/trips',
      name:"trips",
      component: Trips,
      meta:{
        authRequired:true},

    },
    {
      path:'/editTrip/:tripName/:tripId',
      name:"editTrip",
      component: EditTrip,
      meta:{
        authRequired:true},

    },
    {
      path:'/editexcursion/:excursionName/:excursionId',
      name:"editexcursion",
      component: EditExcursion,
      meta:{
        authRequired:true},

    },
    {
      path:'/invites/:excursionId',
      name:"invites",
      component: Invites,
      meta:{
        authRequired:true},

    },

  ],
});
router.beforeEach((to,from,next)=>{
  if(to.meta.authRequired && !authenticate()) {
    next({name:'homepage'})

  }else{
    next();
  }
});
export default router;
