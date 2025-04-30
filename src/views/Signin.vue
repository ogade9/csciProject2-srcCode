<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user"
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const router = useRouter();
let vals;
/*async function signin(e){
  e.preventDefault();
  const userData = {
    email: email.value,
    password: password.value,
  };
  const serverUrl = "https://excursions-api-server.azurewebsites.net/user/sign-in"
  const options={
    method: "POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  };
  let response = await fetch(serverUrl,options);
  if(response.status==200){
    vals= await response.json();
    console.log(vals)
    localStorage.setItem("token", vals.token);
    localStorage.setItem("email",vals.user.email)
    localStorage.setItem("userId",vals.user._id)
    router.push('/homepage')
  }
  else {
    console.log(response.status);
    return;
  }
}*/

</script>
<template>
  <div class="body">
   <div class="create">
    <h1 class="signinheader">WELCOME.</h1>
    <div class="formcontainer">
      <form @submit.prevent="userStore.signin">
        <div style="display:inline-block;">
          <legend class="formlegend">Email</legend>
          <input class="forminput1" type="email" v-model=userStore.email pattern="[^@\s]+@[^@\s]+" required>
        </div>
        <div>
          <legend  class="formlegend">Password</legend>
          <input  class="forminput1" type="password"  v-model=userStore.password minlength="8" required>
        </div>
        <input class="btn-create" type="submit" value="Log In" />
        <span style="float:left;">Don't have an account? <RouterLink class="signinlink" to="/create" style="float:right">Create Account</RouterLink></span>
      </form>
    </div>
  </div>
  </div>

</template>
<style scoped>
.body{
  width:100%;
  height:100%;
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: -2px;
  padding: 0px;
}


</style>
