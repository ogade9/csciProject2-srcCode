<script setup>
import {ref,onMounted} from 'vue';
import { useRouter,useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const name=ref('');
const description=ref('');
const excursionId=route.params.excursionId
const trip= ref([]);

const newname = ref("");
const newdescription = ref("");
const newtripIds = ref([]);
const trips = ref([]);

onMounted(async () => {
  const tripIds =JSON.parse(localStorage.getItem("newtripIds")) || [];
  trips.value.push(...tripIds)
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage.");
    return;
  }

  const serverUrl = `https://excursions-api-server.azurewebsites.net/excursion/${excursionId}`;
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
    name.value=data.excursion[0].name
    description.value=data.excursion[0].description
  }
  else{
    console.log(response.status)
  }
});
async function editExcursion(){

  let newData = {
    name: newname.value ||name.value,
    description: newdescription.value || description.value,
    trips: newtripIds.value|| trip.value
  };
  console.log("bug here")
  const token = localStorage.getItem("token");
  const serverUrl = `https://excursions-api-server.azurewebsites.net/excursion/${excursionId}`
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

    console.log("edit complete");
    router.push("/profile");
  }
  else{
    console.log(response.status)
  }



  }

</script>

<template>
  <div class="body">
  <div class="exit"><RouterLink to="/profile"><font-awesome-icon :icon="['fas', 'xmark']" /></RouterLink></div>
<h1>Create An Excursion</h1>
<form @submit.prevent="editExcursion" >
  <legend class="tripName">Excursion Name</legend>
  <input type="text" placeholder="Trip Name" class="input" v-model="name" min="1" max="128" required>
  <legend class="tripName">Description</legend>
  <input type="text" placeholder="Explore the glacier park for a week.." class="input2" v-model="description" required>
  <legend class="tripName">Trip Id</legend>
  <select multiple  v-model="trip" class="tripbox"
  size="5">Trips

    <option v-for="(item,index) in trips" :key="index"   :value="item">{{ item }}</option>
  </select>
  <input type="submit" value="+ Update Excursion" class="submitTrip" >
</form>
</div>
</template>
<style>
.body{
  background-image: url("https://i.pinimg.com/736x/8f/49/ec/8f49ec216bb710291efad0443fec67b2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0;
  width: 100vw;
  height:100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family:Arial, Helvetica, sans-serif
}
h1{
  text-align: center;
  margin-bottom: 20px;
}
.exit{
  position: absolute;
  top: 20px;
  right: 20px;
  color: red;
  font-size: 20px;


}
.tripName{
  margin-bottom: 5px;
  color: aliceblue;
}
.input{
  width:250px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  backdrop-filter: blur(5px);
  color: aliceblue;
  margin-bottom: 5px;
}
.tripbox{
  width:250px;
  background-color: transparent;
  backdrop-filter: blur(5px);
  color: aliceblue;
}
.input2{
  width:230px;
  height: 50px;
  border-radius: 5px;
  margin-bottom: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  backdrop-filter: blur(5px);
  color: aliceblue
}
.submitTrip{
  margin-top: 50px;
  height:30px;
  width: 200px;
  justify-self:center;
  align-items: center;
  text-align: center;
  justify-content:center;
  margin-left: 40px;
  background-color: rgb(88, 116, 188);
  border-radius: 10px;
  cursor: pointer;
}
</style>
