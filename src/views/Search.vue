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
//const loading = ref(false);
const noResults = ref('');



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
  loading.value= true;
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
    noResults.value.style.display="flex";

  }


}




function clearSearch(){
  for(let i=0;i<5;i++){
      fullNames.value.pop();

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
     <input type="text" class="searchText" v-model="q" placeholder="Search national parks...">

     <input type="submit" value="Search" class="submit"/>


    </form>



  </div>

  <div class="results" ref="result1">

   <RouterLink v-for="(names,index) in fullNames" class="resultBox1" :key="index" :to="`/details/${parks[index]}/${states[index]}`">{{names}}</RouterLink>
  </div>

  <div class="noResults" ref="noResults">No results found...</div>
  <Icons/>





</template>

<style scoped>
body{
  background: linear-gradient(to bottom right, #dbeafe, #fef3c7);

  background-size: cover;
  background-position: center;
  font-family: 'Poppins', sans-serif;
}
.searchText{
  width: 80%;
  padding: 12px 20px;
  margin: auto;
  display: block;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  color: #333;

}
.search{
  position:fixed;
  margin-top:18px;
  z-index: 3;


}
.results{
  display: none;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 100px;
  padding: 10px;
  justify-content: center;
  z-index: 1;

}
.resultBox1{
  flex: 1 1 40%;
  max-width: 300px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  font-weight: 500;
  transition: transform 0.3s ease, box-shadow 0.3s ease;



}
.resultBox1:hover{
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.submit {
  padding: 10px 20px;
  height: 40px;
  border-radius: 20px;
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  margin-left: -90px;
}
.submit:hover {
  background-color: #2563eb;
}
.back{

  width: 24px;
  height: 24px;
  margin-left: 20px;
  color: #333;
}
a{
  text-decoration: none;
  color: black;
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
.noResults{
  display: none;
}
</style>
