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
  <div class="icon">
  <div>
    <font-awesome-icon :icon="['fas', 'house']" />
  </div>
  <div>
   <RouterLink to="/search"> <font-awesome-icon :icon="['fas', 'plus']" /></RouterLink>

  </div>

  <div>
    <RouterLink to="/profile"><font-awesome-icon :icon="['fas', 'user']" /></RouterLink>
  </div>
</div>
</template>
<style scoped>
.icon{
  color:black;
  position: fixed;
  bottom: 0px;
  left:0px;
  right: 0px;
  display: flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  justify-content: space-around ;
  background-color: azure;
  height: 45px;
}
a{
  text-decoration: none;
  color: black;

}
</style>
