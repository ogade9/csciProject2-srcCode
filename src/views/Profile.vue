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
library.add(faBars, faUsers,faPen);

const name = localStorage.getItem("firstName");
const name2 = localStorage.getItem("lastName");

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

async function editProfile(){

}


</script>

<template>
  <div class="icons">
    <div class="icons1"><font-awesome-icon :icon="['fas', 'bars']" /></div>
    <div class="icons2"><font-awesome-icon :icon="['fas', 'users']" /></div>
  </div>
  <h1 class="welcome">Hi, {{name}}

  </h1>
  <div class="welcomeprofile">{{ abbr1}}{{ abbr2 }}

  </div>
  <RouterLink to="/Edit"><div class="pen"><font-awesome-icon
        :icon="['fas', 'pen']"

      /></div></RouterLink>
  <div class="trips">
    <div class="line1"></div>
    <div class="line2"></div>
    <div class="line3"></div>
</div>
<h2 class="profileTrips">Your Trips</h2>
  <Icons></Icons>
</template>
<style>

</style>
