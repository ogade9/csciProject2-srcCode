<script setup>
import Icons from '@/components/Icons.vue';
import {usePark} from '@/stores/parks';
import { useRoute } from 'vue-router';
import {ref,onMounted} from 'vue';

const parks = usePark();
const parkcodes = parks.parkCodes;
const statecodes = parks.stateCodes;
const campgrounds=ref([]);
const thingsTodo=ref([]);

//const currentStart1 = ref(0);
const route = useRoute();
const parkName = ref('');
const parkDescription = ref('');
console.log("here1")
const parkcode1= route.params.parks;
const statecode1 = route.params.states;



onMounted( async () => {

  const token= localStorage.getItem("token");
  const serverUrl= `https://excursions-api-server.azurewebsites.net/national-parks/summary?parkCode=${parkcode1}&stateCode=${statecode1}&limit=1&number=1&start=0`;
  const options= {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };

  const response= await fetch(serverUrl,options);
  console.log("here")
  const data = await response.json();
  if(response.status==200){
    console.log("Got summaries")
    console.log(data)
    parkName.value= data.data[0].fullName
    parkDescription.value=data.data[0].description

  }
  else{
    console.log(response.status);
  }
});
async function getCamps(){
  const token = localStorage.getItem("token")
  console.log('Bug')
  console.log(parkcode1)
  console.log(statecode1)
  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkcode1}&stateCode=${statecode1}&limit=5&start=0`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){
    console.log("Full API response:", data);
    console.log("Okayy!", data.data);
    //result1.value.style.display = "flex";


    for(let i=0;i<data.data.length;i++){
      campgrounds.value.push(data.data[i].name);
      console.log('Camps:',campgrounds.value);
    }
   // currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


};

getCamps();

async function getThingsToDo(){
  const token = localStorage.getItem("token")
  console.log('Bug')
  console.log(parkcode1)
  console.log(statecode1)
  const serverUrl= `https://excursions-api-server.azurewebsites.net/things-to-do?parkCode=${parkcode1}&stateCode=${statecode1}&limit=5&start=0`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();

  if(response.status==200){
    console.log("Full API response:", data);
    console.log("Okayy!", data.data);
    //result1.value.style.display = "flex";


    for(let i=0;i<data.data.length;i++){
      thingsTodo.value.push(data.data[i].activities[0].name);
      console.log('Things:',thingsTodo.value);
    }
   // currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


};

getThingsToDo();


</script>
<template>



  <div class="allCamps">

    <div class="parkVideo"></div>
    <h4 class="parkName">{{parkName }}</h4>
    <div class="parkDescription"><h3>Description</h3>{{ parkDescription }}</div>
    <h5 class="section-title">Campgrounds</h5>
    <div class="result">

      <RouterLink v-for="(names,index) in campgrounds"  :to="`/campgrounds/${parkcode1}/${campgrounds[index]}`" class="resultBox1" :key="index" >{{names}}</RouterLink></div>
      <div v-if="campgrounds.length === 0" class="resultBox1">
      No campgrounds found.
    </div>
  <h5>Things To Do</h5>
    <div class="result">

    <RouterLink v-for="(names,index) in thingsTodo"  :to="`/campgrounds/${parkcode1}/${thingsTodo[index]}`" class="resultBox1" :key="index" >{{names}}</RouterLink></div>
    <div v-if="thingsTodo.length === 0" class="resultBox1">
      No activities here.
    </div>
    </div>
<Icons/>
</template>
<style>
.allCamps{

  background-color: #8ad6dd;
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;

}

.parkName{
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: #004f59;



}
.parkDescription{

  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  background: #f2f9fa;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

}
.parkGallery{
  background-color: rgb(138, 214, 221);
  border: 1px solid white;

}
.section-title {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  color: #005f69;
  border-left: 4px solid #005f69;
  padding-left: 10px;
}
.result{
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
  width: 100%;
}

.resultBox1{
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-left: 4px solid #60c2c8;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;


}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.8s linear infinite;
  margin: 20px auto;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


a{
  text-decoration: none;
  color: black;

}


</style>
