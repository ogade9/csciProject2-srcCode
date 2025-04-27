<script setup>
import {ref,onMounted} from 'vue';
import { useRouter } from 'vue-router';


const name = ref('');
const description = ref('')
//const excursionData = ref([]);
const trips=ref([]);
const trip= ref([]);
const excursions=ref([]);
const router = useRouter();
const id = ref('');

onMounted(async()=>{
  //const tripIds =JSON.parse(localStorage.getItem("newtripIds")) || [];
  getTripByUserId();


})

async function getTripByUserId() {
  const token=localStorage.getItem("token");
//  const tripIds =JSON.parse(localStorage.getItem("newtripIds"))



    const serverUrl= "https://excursions-api-server.azurewebsites.net/trips";
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
    const data = await response.json();

        if(response.status==200){
            console.log("got ID")
            console.log(data)
            if (Array.isArray(data.trips)) {
                trips.value = data.trips.map(trip => ({
                  tripId: trip._id,
                  tripName: trip.name,
                  tripDescription: trip.description,
                  tripStartDate: trip.startDate.replace(/T.*Z/, ""),
                  tripEndDate: trip.endDate.replace(/T.*Z/, ""),
                }));
              }
              else if (data.trip) {
              trips.value.push({
                tripId: data.trip._id,
                tripName: data.trip.name,
                tripDescription: data.trip.description,
                tripStartDate: data.trip.startDate.replace(/T.*Z/, ""),
                tripEndDate: data.trip.endDate.replace(/T.*Z/, ""),
              });

        }
        }

        else{
          console.log(response.status)
        }


}


async function createExcursion(e) {
  const excursionData = {
    name:name.value,
    description:description.value,
    trips:trips.value.tripId
  }
  console.log("here");

  const token = localStorage.getItem("token");
  const serverUrl= `https://excursions-api-server.azurewebsites.net/excursion`
  const options = {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },


  body: JSON.stringify(excursionData),
};
console.log("here");

const response = await fetch(serverUrl,options);
console.log(excursionData)
const data = await response.json();

if(response.status==201){
  console.log("here");
  console.log("Ok!", data);
  id.value = data.excursion[0]._id;
  await getExcursionId();
  console.log(id.value)
  const previousExcursions = JSON.parse(localStorage.getItem("excursionIds"))||[];

  const updatedExcursions = [...previousExcursions, id.value];
  excursions.value = updatedExcursions;
  localStorage.setItem("excursionIds", JSON.stringify(updatedExcursions));
  localStorage.setItem("newexcursionIds", JSON.stringify(updatedExcursions));
  console.log(excursions.value)
  name.value = '';
  description.value = '';
  trip.value = [];

  router.push('/profile');

  }

else{
  console.log(response.status)
  console.log('not created')
}



}
async function getExcursionId() {
  const token = localStorage.getItem("token");
  const serverUrl= `https://excursions-api-server.azurewebsites.net/excursion/${id.value}`
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}`,

    },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();

  if(response.ok){
    console.log(data)
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
    <form @submit.prevent="createExcursion" >
      <legend class="tripName">Excursion Name</legend>
      <input type="text" placeholder="Trip Name" class="input" v-model="name" min="1" max="128" required>
      <legend class="tripName">Description</legend>
      <input type="text" placeholder="Explore the glacier park for a week.." class="input2" v-model="description" required>
      <legend class="tripName">Trip Id</legend>
      <select multiple  v-model="trip" style="width: 250px"
      size="5" class="tripbox">

      <option v-for="(item,index) in trips" :key="index"   :value="item">{{ item.tripId }}</option>
    </select>
    <input type="submit" value="+ Create Excursion" class="submitTrip" >
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
