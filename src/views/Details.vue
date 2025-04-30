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
const campGallery = ref([]);

//const currentStart1 = ref(0);
const route = useRoute();
const parkName = ref('');
const parkDescription = ref('');
console.log("here1")
const parkcode1= route.params.parks;
const statecode1 = route.params.states;
const parkImage = ref('');
const parkStates=ref('');
const parkGallery = ref([]);
const thingsImages = ref([]);
const campgroundsImages = ref('');

async function generateRandomText(){


    const token = localStorage.getItem("token")
    const serverUrl = `https://excursions-api-server.azurewebsites.net/multimedia/galleries?parkcode=${parkcode1}&limit=21&number=21&start=0`

    const options ={
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await fetch(serverUrl,options)
    const data = await response.json();
    if(response.status==200){
        //console.log(data.data[i].url)

        //console.log(data)
        parkImage.value= data.data[0].images[0].url

        //titles.value.push(data.data[i].title)
        //console.log(titles.value)
        //console.log('OKAY')
        //console.log(nationalPark1.value)

    }
    else{
      console.log('Uh oh!')
    }



}
async function generateParkGallery(){


 const token = localStorage.getItem("token")
 const serverUrl = `https://excursions-api-server.azurewebsites.net/multimedia/galleries?parkcode=${parkcode1}&limit=100`

 const options ={
   method: 'GET',
   headers: {Authorization: `Bearer ${token}`},
 };
 const response = await fetch(serverUrl,options)
 const data = await response.json();
 if(response.status==200){
     //console.log(data.data[i].url)

     console.log(data)
     for(let i=0;i<data.data.length;i++){
       parkGallery.value.push(data.data[i].images[0].url)
      //console.log('Gallery',parkGallery.value)
     //titles.value.push(data.data[i].title)
     //console.log(titles.value)
     //console.log('OKAY')
     //console.log(nationalPark1.value)
    }
 }
 else{
   console.log('Uh oh!')
 }



}
//onMounted(()=>{generateRandomText()});



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
    parkStates.value=data.data[0].states
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
  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkcode1}&stateCode=${statecode1}&limit=100&start=0`;
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){
   // console.log("Full API response:", data);
    //console.log("Okayy!", data.data);
    //result1.value.style.display = "flex";
    console.log(data)

    for(let i=0;i<data.data.length;i++){
      campgrounds.value.push({
        name:data.data[i].name,
        images:data.data[i].images[0].url


      });
      //console.log('Camps:',campgrounds.value);

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
  const serverUrl= `https://excursions-api-server.azurewebsites.net/things-to-do?parkCode=${parkcode1}&stateCode=${statecode1}&limit=100&start=0`;
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
     // thingsImages.value.push(data.data[i].images[0].url)
      thingsTodo.value.push({
        name:(data.data[i].activities[0].name),
        images:(data.data[i].images[0].url)
      });
      console.log('Things:',thingsTodo.value);
    }
   // currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


};

getThingsToDo();
generateRandomText();
generateParkGallery();


</script>
<template>
  <div class="body">
  <div class="background">
  <div class="imageContainer">

    <div class="imageText">
      <RouterLink to="/search"><div class="back"><font-awesome-icon :icon="['fas', 'arrow-left']" class="previous" /></div></RouterLink>
      <font-awesome-icon :icon="['fas', 'location-dot']" class="location"/>
     <h5 class="parkname">{{parkName }}, {{ parkStates }}
      </h5>
    </div>
</div>
  <div class="parkname2">{{ parkName }}</div>
  <h3 class="section-title"> Description</h3>

    <div class="park-Description">{{ parkDescription }}</div>
    <h3 class="sectiontitle">Gallery</h3>
    <div class="parkGallery2">

      <div v-for="(item,index) in parkGallery" :key="index" class="parkGalleryContainer">
        <img :src="item" class="parkGallery">
      </div>

      </div>

      <h5 class="sectiontitle">Campgrounds</h5>
    <div class="result2">


      <RouterLink v-for="(names,index) in campgrounds"  :to="`/campgrounds/${parkcode1}/${names.name}`" class="resultBox2" :key="index" >

        <img :src="names.images" class="campImages">{{names.name}}</RouterLink>

    </div>

      <div v-if="campgrounds.length === 0" class="resultBox1">
      No campgrounds found.
      </div>

  <h5 class="sectiontitle">Things To Do</h5>
    <div class="thingsResult">

    <RouterLink v-for="(names,index) in thingsTodo"  :to="`/campgrounds/${parkcode1}/${thingsTodo[index]}`" class="resultBox" :key="index" >
      <img :src="names.images" class="thingsTodoImages">
     <div class="thingsName">{{names.name}}</div></RouterLink></div>
    <div v-if="thingsTodo.length === 0" class="resultBox2">
      No activities here.
    </div>
    <RouterLink :to= "`/trips/${parkName}/${parkState}`" ><div class="createTrips">Add</div></RouterLink>
  </div>
  </div>
<Icons/>
</template>
<style scoped>
.body{
  width:100%;
  height:100%;
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: -2px;
}

.createTrips{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #81b7cd;
  border-radius: 10px;
  height:30px;
  width:50px;
  text-align: center;
  justify-self: end;
  margin-right: 30px;
  font-size: 20px;
  top:5%;
  left:70%;
  position: fixed;



}
.background{
  background-image: url("");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  margin-bottom: 100px;
  position: relative;



}
.thingsResult{
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  justify-items: center;
  padding: 10px;
  gap: 10px;
  box-shadow: 0 8px 8px 3px rgba(18, 16, 16, 0.1);
}
.parkname{
  color:aliceblue;
  margin-left: 30px;


}
.parkname2{
  color:aliceblue;
  margin-left: 10px;
  font-size: 50px;
  text-align: center;


}
.resultBox{
  width: 90%;
  background-color:transparent;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  display:flex;
  box-shadow: 0 8px 8px 3px rgba(18, 16, 16, 0.1);
  border: 1px solid aliceblue;
  color:aliceblue



}
.thingsName{
  margin-top: 20px;
  margin-left: 10px;
}
.parkImage{
width:100%;
height: 300px;
top: 0px;
border-top-left-radius: 20px;
border-top-right-radius: 20px;

}

.park-Description{

  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 8px 8px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  background-color:transparent;
  color: aliceblue;


}
.parkGallery{
  background-color: rgb(42, 47, 47);
  border: 1px solid white;


}
.section-title {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-left: 10px;
  background-color: transparent;
  color:aliceblue;
  backdrop-filter: blur(0px);
  margin-top: 150px;


}
.sectiontitle {
  font-size: 1.5rem;
  margin: 2rem 0 1rem;
  padding-left: 10px;
  background-color: transparent;
  color:aliceblue;
  backdrop-filter: blur(0px);
  margin-top: 30px;


}
.result2{

  display: flex;
  gap: 10px;
  overflow-x: scroll;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 10px;
  backdrop-filter: blur(10px);
  -ms-overflow-style: none;
  scrollbar-width: none;

}
.resultBox2:hover{
  transform: scale(1.05);

}

.resultBox2{
  background-color: rgba(5, 5, 5, 0.5);
  backdrop-filter: blur(20px);
  color: aliceblue;

  height: 190px;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius:20px;
  font-size: large;
  top: 0px;
  margin-left: auto;
  margin-right: auto;
  bottom: 25px;
  box-shadow: 0 8px 4px rgba(18, 16, 16, 0.1);




}
.result2::-webkit-scrollbar {
    display: none;
}

.parkname2{
  margin-top: 10px;
  font-weight: bold;
  font-size: 50px;
  height:50px;
  border-bottom: 1px solid black;
  margin-bottom: 20px;;
}
.previous{
  position: relative;
  margin-top:5px;
  font-size: large;
}
.campImages{
  width:160px;
  height: 150px;
  box-shadow: 0 8px 4px rgba(18, 16, 16, 0.1);
  margin-bottom: 5px;

}

a{
  text-decoration: none;
  color: black;

}
.imageContainer{
  position: relative;
}
.imageText{
  color:aliceblue;
}

.parkGallery{
  width:80px;
  height: 80px;
  border-radius:10px;
  backdrop-filter: blur(10px);
}

.parkGalleryContainer{
  position: relative;



}
.location{
  top:40px;
  position: relative;
  left:10px;
}
.back{
  position: relative;
  top:10px;
  height: 30px;
  background-color: aqua;
  width: 40px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;

}
.parkGallery2{
  height:110px;
  display: flex;
  overflow-x: scroll;
  width: 100%;
  gap: 3px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.parkGallery2::-webkit-scrollbar {
    display: none;
}


.thingsResult{
  display: flex;
  box-shadow: #2a2727;
  width: 93%;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 8px 8px rgba(18, 16, 16, 0.1);
  gap:10px;
  border: 1px solid aliceblue;
}
.thingsTodoImages{
  width:50px;
  border-radius: 5px;
  justify-content: center;
  margin-top: 10px;
  box-shadow: 0 8px 8px 3px rgba(18, 16, 16, 0.1);
}

</style>
