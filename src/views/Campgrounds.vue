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
const campImage=ref('');
const campState=ref('');
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
async function getCamp(){
  const token = localStorage.getItem("token")
  console.log('Bug')

  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkcode1}&limit=100&start=0&q=${campcode1}`;
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
    campImage.value=data.data[0].images[0].url
    campState.value=data.data[0].parkCode
    //result1.value.style.display = "flex";



   // currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


};

getCamp();






</script>
<template>



  <div class="allCamps">
    <div class="imageContainer">
      <img :src="campImage" class="campImage">
    <div class="imageText">
      <RouterLink to="/details"><div class="back"><font-awesome-icon :icon="['fas', 'arrow-left']" class="previous" /></div></RouterLink>
      <font-awesome-icon :icon="['fas', 'location-dot']" class="location"/>
     <h5 class="parkname">{{campName }},<div style="text-transform: capitalize;"> {{ campState }}</div>
      </h5>
    </div>
</div>

    <h4 class="campName">{{campName }}</h4>
    <div class="campDescription"><h3>Description</h3>{{ campDescription }}</div>
    <h5 class="sectiontitle">Operating hours</h5>{{operatingHours}}
    <h5 class="sectiontitle">LatLong</h5>{{ latLong }}
    <h5 class="sectiontitle"></h5>
    <h5 class="sectiontitle">Contacts</h5>{{ contacts }}






    <div class="result"></div>
  </div>
<Icons/>
</template>
<style>
.allCamps{


  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;

}
.campDescription{

font-size: 1rem;
line-height: 1.5;
margin-bottom: 2rem;
padding: 1rem;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
backdrop-filter: blur(10px);
background-color: rgb(216, 212, 212);

}
.sectiontitle {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-left: 10px;


}
.campImage{
  width:100%;
  height: 300px;
  top: 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.campName{
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  height:50px;
  border-bottom: 1px solid black;




}
.campDescription{

  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  background: #f2f9fa;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);

}
.campGallery{
  background-color: rgb(138, 214, 221);
  border: 1px solid white;

}







a{
  text-decoration: none;
  color: black;

}


</style>


