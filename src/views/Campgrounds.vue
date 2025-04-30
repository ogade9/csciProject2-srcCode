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



  <div class="body">
    <div class="imageContainer">

    <div class="imageText">
      <RouterLink :to="`/details/${campState}`"><div class="back"><font-awesome-icon :icon="['fas', 'arrow-left']" @click="$router.back"  class="previous" /></div></RouterLink>
      <font-awesome-icon :icon="['fas', 'location-dot']" class="location"/>
     <h5 class="parkname">{{campName }},<div style="text-transform: capitalize;"> {{ campState }}</div>
      </h5>
    </div>
</div>

    <h4 class="campName">{{campName }}</h4>
    <div class="campDescription"><h3>Description</h3><p class="operatinghrs">{{ campDescription }}</p></div>
    <h5 class="sectiontitle">Operating hours</h5 ><p class="operatinghrs">{{operatingHours}}</p>
    <h5 class="sectiontitle">LatLong</h5><p class="operatinghrs">{{ latLong }}</p>
    <h5 class="sectiontitle"></h5>
    <h5 class="sectiontitle">Contacts</h5>{{ contacts }}






    <div class="result"></div>
  </div>
<Icons/>
</template>
<style scoped>
.parkname{
  color: aliceblue;
  padding: 20px;
}
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
background-color:transparent;
color:aliceblue;

}
.sectiontitle {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-left: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  backdrop-filter: blur(0px);
  background-color: transparent ;
  color: aliceblue;


}
.operatinghrs{
  color: aliceblue;
  margin-left: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background-color: transparent;
  color: aliceblue;
  text-align: center;
  font-size: 50px;




}
.back{
  position: relative;
  top:15px;
  height: 20px;
  background-color: aqua;
  width: 40px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

}
.back:hover{
  color: rgb(101, 142, 142);
}

.campGallery{
  background-color: rgb(138, 214, 221);
  border: 1px solid white;

}






.location{
  top:56px;
  position: relative;
  left:5px;
  color: aliceblue;


}
a{
  text-decoration: none;
  color: black;

}


</style>


