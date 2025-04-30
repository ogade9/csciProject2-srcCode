<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user"
const userStore = useUserStore();


</script>

<template>
<div class="body">
  <div class="create">
    <h1 class="signinheader">HELLO</h1>
    <div class="formcontainer">
      <form @submit.prevent="userStore.create">
        <div style="display:inline-block;">
          <legend class="formlegend">First Name</legend>
          <input class="forminput" type="text" v-model=userStore.firstName required>
        </div>
        <div style="float:right;">
          <legend  class="formlegend">Last Name</legend>
          <input  class="forminput" type="text" v-model=userStore.lastName  required>
        </div>

        <div style="float:left;">
          <legend class="formlegend">Username</legend>
          <input class="forminput" type="text" v-model=userStore.userName required>
        </div>
        <div style="float:right;">
          <legend  class="formlegend">Email</legend>
          <input  class="forminput" type="email" v-model=userStore.email pattern="[^@\s]+@[^@\s]+" required>
        </div>
        <div>
          <legend  class="formlegend">Password</legend>
          <input  class="forminput" type="password" v-model=userStore.password minlength= "8" required>
          <Profile :abbr="firstName"/>
          <input class="btn-create" type="submit" value="Register" />
        </div>
        <span style="float:left;">Already have an account? <RouterLink class="signinlink" to="/signin" style="float:right">Log in</RouterLink></span>

      </form>


    </div>
  </div>
  </div>


  </template>
<style scoped>
.body{
  height:100vh;
  width:100vw;
  position: fixed;
}


</style>

