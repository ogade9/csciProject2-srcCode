<script setup>
import { RouterLink } from 'vue-router';
import {ref,onMounted} from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faUser, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faHouse, faUser, faPlus)
/*<font-awesome-icon :icon="['fas', 'house']" />
<font-awesome-icon :icon="['fas', 'user']"
<font-awesome-icon :icon="['fas', 'plus']" />
*/
</script>
<template>
  <div class="main-content">
    </div>
  <div class="icon-bar">
    <RouterLink to="/homepage" class="icon-button" :class="{ active: $route.path === '/homepage' }"><font-awesome-icon :icon="['fas', 'house']" /></RouterLink>
   <RouterLink to="/search" class="plus-button" :class="{active: $route.path==='/search'}"> <font-awesome-icon :icon="['fas', 'plus']" /></RouterLink>
   <RouterLink to="/profile" class="icon-button" :class="{active: $route.path==='/Profile'}"><font-awesome-icon :icon="['fas', 'user']" /></RouterLink>
  </div>
</template>
<style scoped>
.main-content {
  flex-grow: 1;
}
.icon-bar{


  left: 0px;
  right: 0px;
  bottom: 0px;
  position: fixed;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #efeee1; /* Soft blue background */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  border-radius: 30px;

}
a{
  text-decoration: none;
  color: black;

}
.plus-button{
  background-color: #6a7c90;
  color: white;
  font-size: 25px;
  padding: 12px;
  border-radius: 60%;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: transform 0.3s ease;
}
.plus-button:hover {
  transform: translateY(-4px) scale(1.1);
}
.icon-button {
  color: #333;
  font-size: 26px;
  padding: 10px;
  border-radius: 50%;
  transition: background 0.3s ease, transform 0.3s ease;
}

.icon-button:hover {
  background-color: rgba(0, 123, 255, 0.1);
  transform: translateY(-3px);
}
.active{
  background-color: rgba(0, 123, 255, 0.3);
  transform: translateY(-1px) scale(1.1);
}
</style>
