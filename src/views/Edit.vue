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
  if(response.status==200){
    const data = await response.json();


    firstName.value = data.firstName;

    lastName.value = data.lastName;
    userName.value = data.userName;
    email.value = data.email;
    password.value= data.password;
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
    localStorage.setItem("firstName",data.firstName);
    localStorage.setItem("lastName",data.lastName);

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
<style>

.editprofile{
  display:flex;
  flex-direction:row;
  position: fixed;
  top:0px;
  left:0px;
  right: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around ;
  background-color: azure;
  height: 45px;
}
.one1{
  color:grey;
  top:15px;
  position:fixed;
  background-color:transparent;
  border-top:none;
  border-bottom:none;
  border-right:none;
  border-left:none;
  margin-left:150px;


}
.one1:hover{
  color:black;
  cursor:pointer;
}
.one{
  color:grey;
}
.editpp{
  height:200px;
  padding-top:30px;
  right:0px;
  left:0px;
  background-color:lightblue;
  margin-top:90px;
}
.two{
  margin-right:120px;
}

</style>

