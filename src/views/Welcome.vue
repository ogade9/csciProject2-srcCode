<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>


  <div class="body">
  <img class="logo" src="/public/Your paragraph text (3).svg">
  <div class="welcomecontainer">
  <h2 class="welcometext">Welcome to MILES</h2>

  <p class="abouttext">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum nisl et nulla commodo.
  </p>

  <div class="btns"><RouterLink class="links" to="/create">Get Started</RouterLink></div>

  <div class="btns"><RouterLink class="links" to="/signin">I already have an account</RouterLink></div>
</div>
</div>


</template>
<style scoped>
.logo{
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: center;
  position: fixed;
  color: aliceblue;

}
.welcomecontainer{
  background-color: black;
}
.body{
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>
