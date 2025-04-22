<script setup>
import Icons from '../components/Icons.vue';
import {ref,onMounted,watch} from 'vue';
import { usePark } from '../stores/parks';

const nationalPark1=ref([]);
const parks1 = usePark();
const randomParks = ref([]);
const titles = ref([])
let currentStart=ref(0);
let park;
let randoms= ref([]);
/*onMounted(async()=>{
await parks1.fetchCodes();
console.log(parks1.parkCodes)
park = parks1.parkCodes
console.log("Park", park.codes[20]);

generateRandomText();

});*/

/*async function generateRandomText(){
  await parks1.fetchCodes();
  park = parks1.parkCodes
  console.log(park)

  for(let i=0; i<5;i++){
     //randoms.value = Math.floor(Math.random()*474)
     randomParks.value.push(park.codes)
     console.log(randomParks.value[i])
  }

  for(let i=0;i<5;i++){
    const token = localStorage.getItem("token")
    const code = randomParks.value[i];
    const serverUrl = `https://excursions-api-server.azurewebsites.net/multimedia/galleries?parkcode=${code}&limit=5&number=5&start=0`

    const options ={
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await fetch(serverUrl,options)
    const data = await response.json();
    if(response.status==200){
        //console.log(data.data[i].url)
        nationalPark1.value.push(data.data[i].images[0].url)
        //titles.value.push(data.data[i].title)
        //console.log(titles.value)
        //console.log('OKAY')
        console.log(nationalPark1.value)

    }
    else{
      console.log('Uh oh!')
    }

  }
  currentStart.value+=5;
  console.log(nationalPark1.value)
  //console.log(titles.value)
}*/
//onMounted(()=>{generateRandomText()});

</script>

<template>
  <h1 class="homepage">Discover your next adventure


  </h1>
  <h4 class="subheading">Explore National Parks</h4>




  <Icons/>

</template>
<style scoped>
.homepage {
  padding: 60px 20px;
  background: linear-gradient(to right, #e0f7fa, #ffffff);
}


.subheading {
  font-size: 1.25rem;
  color: #555;

}

.icons-wrapper {
  margin-top: 20px;
}
</style >








