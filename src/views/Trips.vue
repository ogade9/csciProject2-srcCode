<script setup>
import {ref,watch,provide} from 'vue';
import {usePark} from '@/stores/parks';
import { useRouter } from 'vue-router';

import { useTripStore } from '@/stores/trips';

const tripStore = useTripStore();
const parks = usePark();
const router = useRouter();

const events = async () => {
  await tripStore.getParks(tripStore.park, parks.parkCodes, parks.stateCodes);
  await tripStore.getCamps(tripStore.park, parks.parkCodes, parks.stateCodes);
  await tripStore.getThingsToDo(parks.parkCodes, parks.stateCodes);
};

const handleCreateTrip = async () => {
  try {
    const id = await tripStore.createTrip();
    console.log('Trip Created:', id);
    router.push('/profile');
  } catch (error) {
    console.error(error);
  }
};

</script>
<template>
  <div class="body">
  <h1>Create Trip</h1>

  <div class="exit"><RouterLink to="/profile"><font-awesome-icon :icon="['fas', 'xmark']" /></RouterLink></div>

  <form @submit.prevent="handleCreateTrip" >
    <legend class="tripName">Trip Name</legend>
    <input type="text" placeholder="Trip Name" class="input" v-model="tripStore.name" min="1" max="128">
    <legend class="tripName">Description</legend>
    <input type="text" placeholder="Explore the glacier park for a week.." class="input2" v-model="tripStore.description">
      <div style="float: left;">
      <legend class="tripName" >Start Date</legend>
      <input type ="datetime-local" class="dates" v-model="tripStore.startDate"/>
      </div>
      <div style="float: left;">
      <legend class="tripName">End Date</legend>
      <input type="datetime-local"  class="dates" v-model="tripStore.endDate"/>
      </div>
      <div style="float: left;">
        <legend class="tripName">Search Park</legend>
        <input type="text" class="input1" v-model="tripStore.park"/>
        <button type="button" @click.prevent="events"><font-awesome-icon :icon="['fas', 'magnifying-glass']"  class="searchPark"/></button>

    </div>
    <div style="float: left;">
        <legend class="tripName">Choose Campground</legend>
        <select class="input1" v-model="tripStore.campground" >
          <option v-for="(item,index) in tripStore.campgrounds" :key="index" :value="tripStore.campgroundsID[index]" class="option">{{ item }}</option>
      </select>
    </div>
    <div style="float: left;">
        <legend class="tripName">Things to Do</legend>
        <div v-for="(things,index) in tripStore.thingsTodo" :key="things.id">
          <input type="checkbox" v-model="tripStore.thingstodo" :value="things.id" class="todo" />{{ things.name }}</div>
    </div>

      <input type="submit" value="+ Create Trip" class="submitTrip" >

  </form>
  </div>
  </template>
<style scoped>
.option{
  color:aliceblue;
  background-color: black;
}
.todo{
  color: aliceblue;
}
.input{
  width:100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid gray;
  gap: 10px;
  margin-bottom: 5px;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
}
.body{
  background-image: url("https://i.pinimg.com/736x/8f/49/ec/8f49ec216bb710291efad0443fec67b2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height:100%;
  position:fixed;
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: -2px;

  overflow-x: hidden;
  font-family:Arial, Helvetica, sans-serif
}
.searchPark{
  position: absolute;
  top: 20px;
  left: 0px;
  color:aliceblue;
}
h1{
  justify-content: center;
  text-align: center;
}
.tripName{
  margin-bottom: 5px;
  background-color: transparent;
  color: aliceblue;

}
.input1{
  width:250px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
  margin-bottom: 5px;
}
.input2{
  width:250px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
  margin-bottom: 5px;
}
.dates{
  width:100%;
  height: 30px;
  border-radius: 5px;
  border: 1px solid aliceblue;
  background-color: transparent;
  color: aliceblue;
  backdrop-filter: blur(5px);
  margin-bottom: 5px;
}
.submitTrip{
  margin-top: 50px;
  height:30px;
  width: 200px;
  justify-self:center;
  align-items: center;
  text-align: center;
  justify-content:center;
  margin-left: 40px;
  background-color: rgb(103, 149, 189);
  border-radius: 10px;
  cursor: pointer;
}
option{
  overflow-y: scroll;
}
button{
  position: absolute;
  right: 50px;
  top: 57%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 16px;
}
button:hover{
  color: rgb(164, 194, 194);

}
h1{
  text-align: center;
  margin-bottom: 20px;
}
.exit{
  position: absolute;
  top: 20px;
  right: 20px;
  color: red;
  font-size: 20px;


}
</style>
