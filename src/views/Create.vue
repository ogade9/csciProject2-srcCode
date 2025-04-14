<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";



const firstName = ref("");
const lastName = ref("");
const userName = ref("");
const email = ref("");
const password = ref("");
const router = useRouter();
let vals;
async function create(e){
  e.preventDefault();
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
  };
  const serverUrl = "https://excursions-api-server.azurewebsites.net/user"
  const options={
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  let response = await fetch(serverUrl,options);
  if(response.status==201){
    vals= await response.json();
    localStorage.setItem("token", vals.token);
    localStorage.setItem("firstName", firstName.value);
    localStorage.setItem("lastName", lastName.value);

    router.push('/Signin')
  }
  else {
    console.log(response.status);
    return;
  }
}

</script>

<template>

  <div class="create">
    <h1 class="signinheader">HELLO</h1>
    <div class="formcontainer">
      <form @submit.prevent="create">
        <div style="display:inline-block;">
          <legend class="formlegend">First Name</legend>
          <input class="forminput" type="text" v-model=firstName required>
        </div>
        <div style="float:right;">
          <legend  class="formlegend">Last Name</legend>
          <input  class="forminput" type="text" v-model=lastName  required>
        </div>

        <div style="float:left;">
          <legend class="formlegend">Username</legend>
          <input class="forminput" type="text" v-model=userName required>
        </div>
        <div style="float:right;">
          <legend  class="formlegend">Email</legend>
          <input  class="forminput" type="email" v-model=email pattern="[^@\s]+@[^@\s]+" required>
        </div>
        <div>
          <legend  class="formlegend">Password</legend>
          <input  class="forminput" type="password" v-model=password minlength= "8" required>
          <Profile :abbr="firstName"/>
          <input class="btn-create" type="submit" value="Register" />
        </div>
        <span style="float:left;">Already have an account? <RouterLink class="signinlink" to="/signin" style="float:right">Log in</RouterLink></span>

      </form>


    </div>
  </div>

  </template>
<style>

</style>

