<script setup>
/* <font-awesome-icon :icon="['fas', 'magnifying-glass']"
<font-awesome-icon :icon="['fas', 'less-than']" />
 />*/
 import {ref, onMounted} from 'vue';
 import Icons from '@/components/Icons.vue';

const q = ref("");
let parkCodes = ref([]);
let stateCodes = ref([]);

const result1 = ref(null);
const fullNames = ref([]);
const parks = ref([]);
const states = ref([]);
const campgrounds=ref([]);
const currentStart= ref(0);
const currentStart1= ref(0);




onMounted(async () => {
  const token = localStorage.getItem("token")
  const serverUrl= "https://excursions-api-server.azurewebsites.net/national-parks/codes?"
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){
    parkCodes.value=data.parks;
    stateCodes.value= data.states;
    console.log(parkCodes.value);
    console.log(stateCodes.value);
  }
  else{
    console.log(response.status);
  }

})

async function getParks() {
  const token = localStorage.getItem("token")
  const serverUrl= `https://excursions-api-server.azurewebsites.net/national-parks?parkCode=${parkCodes.value}&stateCode=${stateCodes.value}&limit=5&number=5&start=${currentStart.value}&q=${q.value}`
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await fetch(serverUrl,options);
  const data = await response.json();
  if(response.status==200){
    console.log("Ok!", data.data);

    result1.value.style.display = "flex";
    for(let i=0;i<5;i++){
      fullNames.value.push(data.data[i].fullName);
      parks.value.push(data.data[i].parkCode);
      states.value.push(data.data[i].states);
      console.log(states.value);
    }
    currentStart.value+=5;


  }

  else{
    console.log(response.status);
  }


}


async function getCamps() {
  const token = localStorage.getItem("token")
  const serverUrl= `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkCodes.value}&stateCode=${stateCodes.value}&limit=5&number=5&start=${currentStart1.value}&q=${q.value}`
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
      fullNames.value.pop();
      campgrounds.value.pop();

    }
}

  const events = ()=>{
    getParks();
    clearSearch();
  }





</script>
<template>
  <div class="back"><RouterLink to="/homepage"><font-awesome-icon :icon="['fas', 'less-than']" /></RouterLink></div>
<div class=search>

  <form @submit.prevent="events">
  <input type="text" class="searchText" v-model="q">

  <input type="submit" value="Search" class="submit"/>


  </form>



  </div>
  <div class="results" ref="result1">
   <RouterLink v-for="(names,index) in fullNames" class="resultBox1" :key="index" :to="`/details/${parks[index]}/${states[index]}`">{{names}}

    </RouterLink>
</div>
  <Icons/>





</template>

<style scoped>
.searchText{
  right:0px;
  left:0px;
  top:50px;
  height:25px;
  position:fixed;
  background-color:transparent;
  border-radius: 20px;
  backdrop-filter: blur(5px);
}
.search{
  position:fixed;
  margin-top:26px;
  z-index: 3;
  margin-left:280px;
}
.results{
  display: none;
  flex-wrap: wrap;
  margin:0;
  padding: 0;
  margin-top:60px;
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
.back{

  margin-left: 10px;
  margin-top: 10px;
  font-size: 15px;
  color: black;
}
a{
  text-decoration: none;
  color: black;
}


</style>
