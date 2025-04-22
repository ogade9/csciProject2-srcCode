<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>

<body >
  <img class="logo" src="/project2 files/Your paragraph text (1).svg">
  <div class="welcomecontainer">
  <h2 class="welcometext">Welcome to MILES</h2>

  <p class="abouttext">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum nisl et nulla commodo.
  </p>

  <div class="btns"><RouterLink class="links" to="/create">Get Started</RouterLink></div>

  <div class="btns"><RouterLink class="links" to="/signin">I already have an account</RouterLink></div>
</div>

</body>

</template>
<style scoped>
.logo{
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: center;
  margin-top: 100px;
}
.welcomecontainer{
  background-color: black;
}

</style>
