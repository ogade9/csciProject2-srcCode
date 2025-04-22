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
const campName = ref('');
const campDescription = ref('');
const operatingHours = ref('');
const latLong = ref('');
const contacts = ref('');
console.log("here1")
const parkcode1=route.params.parks;
const campcode1= route.params.camps;
console.log(campcode1)
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

  }
  else{
    console.log(response.status);
  }
});
async function getCamps(){
  const token = localStorage.getItem("token")
  console.log('Bug')

  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkcode1}&limit=5&start=0&q=${campcode1}`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){
    console.log("Full API response:", data);
    console.log("Okayy!", data.data);
    campName.value=data.data[0].name;
    campDescription.value=data.data[0].description;
    operatingHours.value=data.data[0].operatingHours[0].description;
    latLong.value=data.data[0].latitude
    contacts.value=data.data[0].contacts.emailAddresses[0].emailAddress;
    //result1.value.style.display = "flex";



   // currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


};

getCamps();






</script>
<template>



  <div class="allCamps">

    <div class="campVideo"></div>
    <h4 class="campName">{{campName }}</h4>
    <div class="campDescription"><h3>Description</h3>{{ campDescription }}</div>
    <h5 class="section-title">Operating hours</h5>{{operatingHours}}
    <h5 class="section-title">LatLong</h5>{{ latLong }}
    <h5 class="section-title"></h5>
        <h5 class="section-title">Contacts</h5>{{ contacts }}






    <div class="result"></div>
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


