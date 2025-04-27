<script setup>
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import Icons from '../components/icons.vue';

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


const router = useRouter();
const userName = ref("");
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");

const newuserName = ref("");
const newfirstName = ref("");
const newlastName = ref("");
const newemail = ref("");
const newpassword = ref("");

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage.");
    return;
  }

  const serverUrl = "https://excursions-api-server.azurewebsites.net/user";
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(serverUrl, options);
  const data = await response.json();
  console.log(data)
  if(response.status==200){



    firstName.value = data.user.firstName;

    lastName.value = data.user.lastName;
    userName.value = data.user.userName;
    email.value = data.user.email;
    password.value= data.user.password;
  }
});

async function editProfile(){

  let newData = {
    email: newemail.value ||email.value,
    password: newpassword.value || password.value,
    lastName: newlastName.value || lastName.value,
    firstName: newfirstName.value || firstName.value,
    userName: newuserName.value || userName.value,
  };
  const token = localStorage.getItem("token");
  const serverUrl = "https://excursions-api-server.azurewebsites.net/user"
  const options ={
    method: "PATCH",
    headers:{
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  };

  const response = await fetch(serverUrl, options);
  const data = await response.json();
  if(response.status==200){
    localStorage.setItem("firstName",data.user.firstName);
    localStorage.setItem("lastName",data.user.lastName);

    console.log("edit complete");
    router.push("/Profile")
  }
  else{
    console.log(response.status)
  }



}
nthselector();





</script>
<template>
  <div class="editprofile">
    <RouterLink to="/Profile"><div class="one">Cancel</div></RouterLink>
    <div class="two" >Edit Profile</div>


  </div>
  <div class="editpp">

    <div class="welcomeprofile">{{ abbr1}}{{ abbr2 }}</div>

  </div>
  <div class="editcontainer">
      <form @submit.prevent="editProfile">
        <div>
          <legend class="formlegend1">First Name</legend>
          <input class="forminput2" type="text" v-model=firstName>
        </div>
        <div>
          <legend  class="formlegend1">Last Name</legend>
          <input  class="forminput2" type="text" v-model=lastName>
        </div>

        <div>
          <legend class="formlegend1">Username</legend>
          <input class="forminput2" type="text" v-model=userName>
        </div>
        <div>
          <legend  class="formlegend1">Email</legend>
          <input  class="forminput2" type="email" v-model=email pattern="[^@\s]+@[^@\s]+" >
        </div>
        <div>
          <legend  class="formlegend1">Password</legend>
          <input  class="forminput2" type="password" v-model=password minlength= "8" >
        </div>
        <input type="submit" class="one1" value=Save>
      </form>

      <Icons/>
    </div>




</template>
<style scoped>
body {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to right, #74ebd5, #ACB6E5); /* Subtle gradient background */
  color: #333;
  padding: 0;
  margin: 0;
}

.editprofile{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #7e9eaf;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  color: white;
}
.one1{
  background-color: #4c8eaf;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s;


}
.one1:hover{
  background-color: #4574a0;
}
.one{
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;
}
.editpp{
  background-color: #e0f7fa;
  padding: 30px;
  text-align: center;
  margin-top: 70px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  font-size: 40px;
  height: 50px;
  border-radius: 10px;
}
.two{
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
}

</style>

