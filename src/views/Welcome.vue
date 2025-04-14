<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>

<body >

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
<style>

</style>
