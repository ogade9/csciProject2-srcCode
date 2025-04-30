
<script setup>
import {ref,onMounted} from 'vue';
import {usePark} from '@/stores/parks';
import { useRoute,useRouter } from 'vue-router';

const parks = usePark();
const name=ref('');
const description=ref('');
const startDate=ref('');
const endDate =ref('');
const campground=ref('');
const park=ref('');

const newname = ref("");
const newdescription = ref("");
const newstartDate = ref("");
const newendDate = ref("");
const newCampground = ref("");
const newparkID = ref("");
const newthingstodo = ref([]);
const thingstodo=ref([]);

const parkcodes = parks.parkCodes;
const statecodes = parks.stateCodes;
const campgrounds=ref([]);
const thingsTodo=ref([]);
const campgroundsID = ref([]);
const parkID = ref('');
const route = useRoute();
const router= useRouter();
const tripName = route.params.tripName
const tripId = route.params.tripId
console.log(tripId)


const userTrips = ref([]);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage.");
    return;
  }

  const serverUrl = `https://excursions-api-server.azurewebsites.net/trip/${tripId}`;
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
    name.value=data.trip.name
    description.value=data.trip.name
    startDate.value=data.trip.startDate
    endDate.value=data.trip.endDate




  }
});
async function editTrip(){

let newData = {
  name: newname.value ||name.value,
  description: newdescription.value || description.value,
  startDate: newstartDate.value || startDate.value,
  endDate: newendDate.value || endDate.value,
  campground: newCampground.value || campground.value,
  park:newparkID.value||parkID.value,
  thingstodo:newthingstodo.value||thingstodo.value
};
console.log("bug here")
const token = localStorage.getItem("token");
const serverUrl = `https://excursions-api-server.azurewebsites.net/trip/${tripId}`
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
  //localStorage.setItem("firstName",data.firstName);
  //localStorage.setItem("lastName",data.lastName);

  console.log("edit complete");
  router.push("/profile")
}
else{
  console.log(response.status)
}



}

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
    //console.log("Full API response:", data);
    //console.log("Okayy!", data.data);
    //result1.value.style.display = "flex";


    for(let i=0;i<data.data.length;i++){
      campgrounds.value.push(data.data[i].name);
      campgroundsID.value.push(data.data[i].id)
      //console.log('Camps:',campgrounds.value);
      //console.log('Camps:',campgroundsID.value);
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
  const serverUrl= `https://excursions-api-server.azurewebsites.net/things-to-do?parkCode=${parkcodes}&stateCode=${statecodes}&limit=20&start=0`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  console.log('Bug')
  if(response.status==200){
    console.log("Full API response:", data);
    console.log("Okayy!", data.data);


    for(let i=0;i<data.data.length;i++){
      thingsTodo.value.push({
        name: data.data[i].activities[0].name,
         id: data.data[i].id
    });
    console.log("things",thingsTodo.value)


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


    userTrips.value.push(id);

    const previousTrips = JSON.parse(localStorage.getItem("tripIds"))||[];

    const updatedTrips = [...previousTrips, id];
    userTrips.value = updatedTrips;
    localStorage.setItem("tripIds", JSON.stringify(updatedTrips));
    localStorage.setItem("newtripIds", JSON.stringify(updatedTrips));

    console.log(userTrips.value);
    route.push('/profile');

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
  <div class="body">

  <h1>Edit Trip</h1>

  <div class="exit"><RouterLink to="/profile"><font-awesome-icon :icon="['fas', 'xmark']" /></RouterLink></div>

  <form @submit.prevent="editTrip" >
    <legend class="tripName">Trip Name</legend>
    <input type="text" placeholder="Trip Name" class="input" v-model="name" min="1" max="128">
    <legend class="tripName">Description</legend>
    <input type="text" placeholder="Explore the glacier park for a week.." class="input2" v-model="description">
      <div style="float: left;">
      <legend class="tripName" >Start Date</legend>
      <input type ="datetime-local" class="dates" v-model="startDate"/>
      </div>
      <div style="float: left;">
      <legend class="tripName">End Date</legend>
      <input type="datetime-local"  class="dates" v-model="endDate"/>
      </div>
      <div style="float: left;">
        <legend class="tripName">Search Park</legend>
        <input type="text" class="input1" v-model="park"/>
        <button type="button" @click.prevent="events"><font-awesome-icon :icon="['fas', 'magnifying-glass']" class="searchPark" /></button>

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

      <input type="submit" value="+ Update Trip" class="submitTrip" >

  </form>
  </div>
  </template>
<style scoped>
.body{
  background-image: url("https://i.pinimg.com/736x/8f/49/ec/8f49ec216bb710291efad0443fec67b2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0;
  width: 100%;
  height:100%;
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: -2px;
  overflow-x: hidden;
  font-family:Arial, Helvetica, sans-serif
}
.input1{
  width:250px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
  margin-bottom: 5px;

}
.input{
  width:250px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
  margin-bottom: 5px;

}
.searchPark{
  position: relative;
  top: 47px;
  left: 50px;
}

h1{
  justify-content: center;
  text-align: center;
}
.tripName{
  margin-bottom: 5px;
  background-color: transparent;
  color: aliceblue;
}
.input1{
  width:280px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 5px;
}
.input2{
  width:250px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
  margin-bottom: 5px;
}
.dates{
  width:100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
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
  background-color: rgb(103, 149, 189);
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
