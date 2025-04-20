<script setup>
/* <font-awesome-icon :icon="['fas', 'bars']" />
  <font-awesome-icon :icon="['fas', 'users']" />*/
import { RouterLink } from 'vue-router';
import {ref,onMounted} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faUsers} from '@fortawesome/free-solid-svg-icons'
import { defineProps } from 'vue';
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Icons from '@/components/icons.vue';
//import router from '@/router';
import { useRouter } from 'vue-router';
library.add(faBars, faUsers,faPen);

const name = localStorage.getItem("firstName");
const name2 = localStorage.getItem("lastName");
const sideNav = ref(null);
const email = localStorage.getItem("email");
const router= useRouter();
const isSideNavOpen = ref(false);

let abbr1;
let abbr2;
 function nthselector(){
  const user = [];
  const user2=[];
  for(let i=0;i<name.length;i++){
    user.push(name.charAt(i));
     console.log("values", user);


  }
  for(let i=0;i<name2.length;i++){
    user2.push(name2.charAt(i));
     console.log("values", user2);


  }
  abbr1 = user[0];
  abbr2 = user2[0];
  console.log(abbr1);
  console.log(abbr2);

}

nthselector();


function openSideNav(){
  isSideNavOpen.value= true;
}
function closeSideNav(){
  isSideNavOpen.value=false;
}
async function signout(event){
  const token= localStorage.getItem("token");
  const serverUrl= "https://excursions-api-server.azurewebsites.net/user/sign-out";
  const options = {
    method: "POST",
    headers: {
       Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  if(response.status==200){
      console.log("signedout")
      localStorage.clear();
      router.push('/signin')

  }

  else{
    console.log(response.status);
  }
}
async function deleteAccount(){
  let result = confirm("Are you sure you want to delete your Account?");
  if(result){
    const token= localStorage.getItem("token");

    const serverUrl= `https://excursions-api-server.azurewebsites.net/user`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}` },
    };

      const response = await fetch(serverUrl,options);
      if(response.status==200){
          console.log("deleted")
          localStorage.clear();
          router.push('/create')

      }
      else{
        console.log(response.status)
      }
    }else{
      console.log("Account Deletion Canceled")
    }



}
</script>

<template>
  <div v-if="isSideNavOpen" class="sidenav" @click.self="closeSideNav">

    <img class="logo" src="/project2 files/Your paragraph text (1).svg"/>
    <div class="profile-abbr2">
    {{ abbr1}}{{ abbr2 }}


  </div>

  <h1 class="profileName">{{ name }} {{ name2 }}

  </h1>
  <h5 class="profileEmail">{{ email }}</h5>
  <div class="section"></div>

  <RouterLink to="/homepage" class="icon-button" :class="{ active: $route.path === '/homepage' }"><font-awesome-icon :icon="['fas', 'house']" />
    Home</RouterLink>
    <RouterLink class="icon-button" to="/homepage"><font-awesome-icon :icon="['fas', 'calendar-days']" />
      My Plans</RouterLink>
    <RouterLink class="icon-button" to="/homepage"><font-awesome-icon :icon="['fas', 'user-group']" />
      Friends</RouterLink>
    <RouterLink class="icon-button" to="/profile"><font-awesome-icon :icon="['far', 'circle-user']" />
      View Profile</RouterLink>

    <h3 class="account">Account</h3>
    <div class="section"></div>

    <div class="logout" @click.prevent="signout"> <font-awesome-icon :icon="['fas', 'right-from-bracket']" />LOG OUT</div>
    <div  class="delete" @click="deleteAccount"><font-awesome-icon :icon="['fas', 'trash']"  />
      Delete Account</div>



  </div>
   <div class="profile-container">
    <div class="header-icons" >
      <div  class="icon-box" @click="openSideNav"><font-awesome-icon :icon="['fas', 'bars']" /></div>
      <div class="icon-box"><font-awesome-icon :icon="['fas', 'users']" /></div>
  </div>
  </div>
  <h1 class="welcome-message">Hi, {{name}}

  </h1>
  <div class="profile-abbr">
    {{ abbr1}}{{ abbr2 }}

  </div>
  <RouterLink to="/Edit"><div class="edit-icon"><font-awesome-icon
        :icon="['fas', 'pen']"

      /></div></RouterLink>
  <div class="header-container">
    <div class="trips-section">
      <div class="trips-line"></div>
      <div class="trips-line"></div>
      <div class="trips-line"></div>
    </div>
  </div>

<h2 class="profileTrips">Your Trips</h2>
  <Icons></Icons>
</template>
<style scoped>
.account{
  margin-left: 20px;
}
.logo{
  color: white;
  width: 150px;
  background-color: white;
  margin-left: 55%;
  margin-top: -90px;
  position: relative;
}
.section{
  border-bottom: 1px solid grey;
}
.profileName{
  text-transform: capitalize;
  margin-left: 20px;
  margin-top: -10px;

}
.profileEmail{
  margin-top: -15px;
  margin-left: 20px;
  color: gray;

}
.sidenav{

  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;



}
.sidenav::backdrop{
  background-color: #333;
}
.sidenav a{
  margin-top: 20px;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color:black;
  display: block;
  border-bottom: 1px solid white;
  transition: 0.3s;
  margin-left: 5px;
}
.sidenav a:hover {
  color: #81b7cd;
}
.profile-container {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}
.header-icons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.icon-box {
  font-size: 30px;
  color: #292a2c;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon-box:hover {
  transform: scale(1.1);
  color: #0056b3;
}
.welcome-message {
  font-size: 38px;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.profile-abbr {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  color: #b7babd;
  margin-bottom: 20px;
  background-color: #212424;
  height: 150px;
  width: 150px;
  justify-self: center;
  border-radius: 50%;
  text-transform: uppercase;


}
.profile-abbr2 {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  color: #b7babd;
  margin-bottom: 20px;
  background-color: #212424;
  height: 60px;
  width: 60px;
  justify-self: center;
  border-radius: 50%;
  text-transform: uppercase;
  justify-self: start;
  margin-top: -90px;
  margin-left: 20px;


}
.edit-icon {
  display: flex;
  align-items: center;
  margin-top: -45px;
  margin-left: 280px;
  position: relative;
  font-size: 24px;
  padding: 10px;
  border-radius: 50%;
  color: rgb(28, 27, 27);
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.edit-icon:hover {
  color: #0056b3;
}
.profileTrips {
  text-align: center;
  font-size: 22px;
  color: #333;
  margin-top: 30px;
}
.trips-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.trips-line {
  width: 20px;
  height: 2px;
  background-color: #007bff;
  margin: 0 5px;
}
.icon-box span {
  font-size: 12px;
  color: #080909;
  display: block;
  text-align: center;
  margin-top: 5px;
}
.logout{
  color: blue;
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  display: block;
  border-bottom: 1px solid white;
  transition: 0.3s;
  margin-left: 5px;
  margin-top: 20px;
}
.logout:hover {
  color: #81b7cd;
  cursor: pointer;
}
.delete{
  font-size: 25px;
  color: red;
  margin-left: 5px;
  padding: 8px 8px 8px 32px;
}
.delete:hover {
  color: #81b7cd;
  cursor: pointer;
}
</style>
