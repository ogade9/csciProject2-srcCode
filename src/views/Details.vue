<script setup>
import Icons from '@/components/Icons.vue';
import {usePark} from '@/stores/parks';
import { useRoute } from 'vue-router';
import {ref,onMounted} from 'vue';

const parks = usePark();
const parkcodes = parks.parkCodes;
const statecodes = parks.stateCodes;
const campgrounds=ref([]);
const currentStart1 = ref(0);

const result1=ref(null);

const route = useRoute();
const parkName = ref('');
const parkDescription = ref('');
console.log("here1")
const parkcode1= route.params.parks;
const statecode1 = route.params.states;
const q= ref('')
console.log(parkcode1)
console.log(statecode1)

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
    console.log(parkDescription.value)
  }
  else{
    console.log(response.status);
  }
});
async function getCamps() {
  const token = localStorage.getItem("token")
  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkcode1}&stateCode=${statecode1}&limit=5&number=5&start=${currentStart1.value}&q=${q.value}`
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){

    console.log("Okayy!", data.data);
    result1.value.style.display = "flex";


    for(let i=0;i<5;i++){
      campgrounds.value.push(data.data[i].name);
      console.log(campgrounds.value);
    }
    currentStart1.value+=5;


  }

  else{
    console.log(response.status);
  }


}


function clearSearch(){
  for(let i=0;i<5;i++){

      campgrounds.value.pop();

    }
}
const events = (()=>{
  getCamps();
  clearSearch();
});

</script>
<template>

  <div class="parkVideo">

    <div class=search2>

  <form @submit.prevent="events">
    <div class="filter" ><font-awesome-icon :icon="['fas', 'bars']" /></div>
 <input type="text" class="searchText2" v-model="q" placeholder="Find Campgrounds...">

  <input type="submit" value="Search" class="submit"/>


</form>
</div>
<div class="results" ref="result1">
  <RouterLink v-for="(names,index) in campgrounds" class="resultBox1"  :to="`/campgrounds/${parkcode1}/${campgrounds[index]}`" :key="index" >{{names}}</RouterLink>
</div>
  <div class="allCamps">
   <div></div>
  </div>

  </div>
  <h4 class="parkName">{{parkName }}</h4>

  <div class="parkDescription"><h3>Description</h3>{{ parkDescription }}</div>
  <div class="parkGallery"></div>


<Icons/>
</template>
<style>
.parkVideo{
  height:40vh;
  background-color: rgb(138, 214, 221);
  top: 0px;
  right: 0px;
  left:0px;
  position: absolute;
  border: 2px solid white;


}
.parkName{
  background-color: rgb(138, 214, 221);
  padding: 0px;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  margin-top: 40vh;



}
.parkDescription{
  background-color: rgb(138, 214, 221);
  border: 0px solid white;
  display: flex;
  flex-wrap: wrap;
  margin-top: -21px;
  padding: 10px;


}
.parkGallery{
  height:15vh;
  background-color: rgb(138, 214, 221);
  border: 1px solid white;

}
.searchText2{
  right:0px;
  left:0px;
  width:70%;
  justify-self:center;
  top:50px;
  height:25px;
  position:fixed;
  background-color:transparent;
  border-radius: 20px;

}
.search2{
  position:fixed;
  margin-top:51px;
  margin-left:180px;
}
.results{
  display: none;
  flex-wrap: wrap;
  margin:0;
  padding: 0;
  margin-top:80px;
  position: fixed;

}
.resultBox1{
  background-color: aliceblue;
  border: 2px solid white;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  margin: 0px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;



}
.resultBox1:hover{
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.submit{
  position: relative;
  top:-18px;
  height: 19px;
  border-radius: 10px;
  background-color: aliceblue;
  cursor: pointer;
}
a{
  text-decoration: none;
  color: black;

}
.filter{
  font-size: 16px;
  color: black;
  margin-left:-370%;
  margin-top: -17px;
  cursor: pointer;
}

</style>
