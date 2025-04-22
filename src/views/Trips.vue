<script setup>
import {ref,watch,provide} from 'vue';
import {usePark} from '@/stores/parks';
import { useRouter } from 'vue-router';

const parks = usePark();
const name=ref('');
const description=ref('');
const startDate=ref('');
const endDate =ref('');
const campground=ref('');
const park=ref('');
const limit= 10;
const thingstodo=ref([]);
const activities=ref(false);
const parkcodes = parks.parkCodes;
const statecodes = parks.stateCodes;
const campgrounds=ref([]);
const thingsTodo=ref([]);
const campgroundsID = ref([]);
const thingsToDoID = ref([]);
const parkID = ref('');
const router = useRouter();
const previousTrips =  localStorage.getItem("tripIds");
const userTrips = ref([]);
provide('userTrips', userTrips);

async function getCamps(){
  const token = localStorage.getItem("token");

  console.log('Bug')
  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkcodes}&stateCode=${statecodes}&limit=10&start=0&q=${park.value}`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  console.log('Bug')
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  console.log('Bug')
  if(response.status==200){
    console.log("Full API response:", data);
    console.log("Okayy!", data.data);
    //result1.value.style.display = "flex";


    for(let i=0;i<data.data.length;i++){
      campgrounds.value.push(data.data[i].name);
      campgroundsID.value.push(data.data[i].id)
      console.log('Camps:',campgrounds.value);
      console.log('Camps:',campgroundsID.value);
    }
   // currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


}
async function getThingsToDo(){
  const token = localStorage.getItem("token")
  console.log('Bug')
  const serverUrl= `https://excursions-api-server.azurewebsites.net/things-to-do?parkCode=${parkcodes}&stateCode=${statecodes}&limit=${limit}&start=0`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();

  if(response.status==200){
    console.log("Full API response:", data);
    console.log("Okayy!", data.data);


    for(let i=0;i<data.data.length;i++){
      thingsTodo.value.push({
        name: data.data[i].activities[0].name,
         id: data.data[i].id
    });

      //console.log('Things:',thingsToDoID.value);
    }



  }

  else{
    console.log(response.status);
  }


}
async function getParks() {
  const token = localStorage.getItem("token")
  const serverUrl= `https://excursions-api-server.azurewebsites.net/national-parks?limit=1&number=1&q=${park.value}`
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){
    console.log("Ok!", data.data);
    parkID.value=data.data[0].id
    console.log("ParkID",parkID.value)


    }

  else{
    console.log(response.status);

  }


}


async function createTrips(e) {
  e.preventDefault();
  const formattedStartDate = new Date(startDate.value).toISOString();
  const formattedEndDate = new Date(endDate.value).toISOString();
  const tripData= {
    name:name.value,
    description:description.value,
    startDate:formattedStartDate,
    endDate:formattedEndDate,
    campground:campground.value,
    park:parkID.value,
    thingstodo:thingstodo.value,


  }
  console.log('tripData:', tripData);


  const token = localStorage.getItem("token")
  const serverUrl= `https://excursions-api-server.azurewebsites.net/trip`
  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
     },


    body: JSON.stringify(tripData),
  };

  const response = await fetch(serverUrl,options);
  const data = await response.json();

  if(response.status==201){
    console.log("Ok!", data.trip._id);
    const id = data.trip._id;
   const previousTrips = JSON.parse(localStorage.getItem("tripIds"))

    userTrips.value.push(id);

    userTrips.value.push(previousTrips);
    console.log(previousTrips)
    //userTrips.value.push(previousTrips)
    //const savedTrip = JSON.stringify(userTrips.value);
    console.log(userTrips.value);
    localStorage.setItem("tripIds",JSON.stringify(userTrips.value));
    //console.log(localStorage.getItem("tripIds"))
    router.push('/profile');

    }

  else{
    console.log(response.status)
    console.log('not created')
  }



}
 const events = ()=>{
  getParks();
  getCamps();
  getThingsToDo();

 }


</script>
<template>

  <h1>Create Trip</h1>

  <div class="exit"><RouterLink to="/profile"><font-awesome-icon :icon="['fas', 'xmark']" /></RouterLink></div>

  <form @submit.prevent="createTrips" >
    <legend class="tripName">Trip Name</legend>
    <input type="text" placeholder="Trip Name" class="input" v-model="name" min="1" max="128">
    <legend class="tripName">Description</legend>
    <input type="text" placeholder="Explore the glacier park for a week.." class="input2" v-model="description">
      <div style="float: left;">
      <legend class="tripName" >Start Date</legend>
      <input type ="date" class="dates" v-model="startDate"/>
      </div>
      <div style="float: right;">
      <legend class="tripName">End Date</legend>
      <input type="date"  class="dates" v-model="endDate"/>
      </div>
      <div style="float: left;">
        <legend class="tripName">Search Park</legend>
        <input type="text" class="input1" v-model="park"/>
        <button type="button" @click.prevent="events"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>

    </div>
    <div style="float: left;">
        <legend class="tripName">Choose Campground</legend>
        <select class="input1" v-model="campground" >
          <option v-for="(item,index) in campgrounds" :key="index" :value="campgroundsID[index]">{{ item }}</option>
      </select>
    </div>
    <div style="float: left;">
        <legend class="tripName">Things to Do</legend>
        <div v-for="(things,index) in thingsTodo" :key="things.id">
          <input type="checkbox" v-model="thingstodo" :value="things.id" />{{ things.name }}</div>
    </div>

      <input type="submit" value="+ Create Trip" class="submitTrip" >

  </form>
  </template>
<style scoped>
.input{
  width:100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  gap: 10px;
  margin-bottom: 5px;
}
h1{
  justify-content: center;
  text-align: center;
}
.tripName{
  margin-bottom: 5px;
}
.input1{
  width:280px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 5px;
}
.input2{
  width:280px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 5px;
}
.dates{
  width:100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 5px;
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
  background-color: rgb(164, 194, 194);
  border-radius: 10px;
  cursor: pointer;
}
option{
  overflow-y: scroll;
}
button{
  position: absolute;
  right: 50px;
  top: 57%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 16px;
}
button:hover{
  color: rgb(164, 194, 194);

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
</style>
