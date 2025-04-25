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

onMounted(()=>{
  const tripIds =JSON.parse(localStorage.getItem("newtripIds")) || [];
  trips.value.push(...tripIds)

})

async function createExcursion(e) {
  const excursionData = {
    name:name.value,
    description:description.value,
    trips:trip.value
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
const data = await response.json();

if(response.status==201){
  console.log("here");
  console.log("Ok!", data);
  id.value = data.excursion[0]._id;
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
getExcursionId();
</script>

<template>
    <div class="exit"><RouterLink to="/profile"><font-awesome-icon :icon="['fas', 'xmark']" /></RouterLink></div>
  <h1>Create An Excursion</h1>
  <form @submit.prevent="createExcursion" >
    <legend class="tripName">Excursion Name</legend>
    <input type="text" placeholder="Trip Name" class="input" v-model="name" min="1" max="128" required>
    <legend class="tripName">Description</legend>
    <input type="text" placeholder="Explore the glacier park for a week.." class="input2" v-model="description" required>
    <legend class="tripName">Trip Id</legend>
    <select multiple  v-model="trip" style="width: 350px"
    size="8">Trips

      <option v-for="(item,index) in trips" :key="index"   :value="item">{{ item }}</option>
    </select>
    <input type="submit" value="+ Create Excursion" class="submitTrip" >
  </form>
</template>
<style>
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

</style>
