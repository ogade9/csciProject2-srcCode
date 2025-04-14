import { defineStore } from "pinia";
import {ref,computed,onMounted}  from 'vue';

export const usePark = defineStore('parks',()=>{

  const parkCodes = ref([]);
  const stateCodes = ref([]);

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

  });

 // const parkCodes = computed(()=>parkCodes.value)

  return{parkCodes,stateCodes}
})
