<script setup>
import Icons from '../components/Icons.vue';
import {ref,onMounted,watch} from 'vue';
import { usePark } from '../stores/parks';

const nationalPark1=ref([]);
const parks1 = usePark();

async function getParkName() {

}

</script>

<template>
  <div class="body">
  <div class="overlay">
  <h1 class="homepage">Discover your next adventure</h1>
  <h3 class="header">Featured Parks</h3>
  <div class="featuredParks">


    <div>
    <h2 class="parkHeader">Yosemite National Park</h2>

    <img src="https://www.nps.gov/common/uploads/structured_data/3C84C3C0-1DD8-B71B-0BFF90B64283C3D8.jpg" class="parkImages">

    <div class="wrapper">
       <RouterLink to="/details/yose/CA" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>
    <div>
    <h2 class="parkHeader">Glacier National Park</h2>

    <img src="https://www.nps.gov/common/uploads/structured_data/C20E6CD3-CDF7-B3AB-8448CDCD7FD590FF.jpg" class="parkImages">

    <div class="wrapper">
       <RouterLink to="/details/yose/CA" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>
    <div>
    <h2 class="parkHeader">Kenai Fjords National Park</h2>

    <img src="https://www.nps.gov/common/uploads/structured_data/3C798EAB-1DD8-B71B-0BC4BEFB197F2C90.jpg" class="parkImages">

    <div class="wrapper">
       <RouterLink to="/search" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>
    <div>
    <h2 class="parkHeader">Appalachian National Scenic Trail</h2>

    <img src="https://www.nps.gov/common/uploads/structured_data/3C8397D6-1DD8-B71B-0BEF4C54462A1EB3.jpg" class="parkImages">

    <div class="wrapper">
       <RouterLink to="/search" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>



    </div>

    <h3 class="header">Campgrounds</h3>
    <div class="featuredCampgrounds">

      <h2 class="campHeader"></h2>
      <img src="">

      <div class="wrapper2">
         <RouterLink to="/search" ><h4 class="featuredParkName">View Campground</h4></RouterLink></div>
      <div>


    </div>
  </div>


  </div>
</div>

  <Icons/>

</template>
<style scoped>
.body{
  background-image: url("/project2 files/homepage.jpg");
  background-repeat: no-repeat;
  background-size: auto;
  padding: 0px;
  border-radius: 0px;
  width: 100%;
  height: 200px;

}
.header{
  position: relative;
  top: 50px;
  font-size: large;
}
.overlay{
  padding: 20px;


}
.parkHeader{
  color: white;
  width: 150px;
  position: relative;
  top:90px;
  margin-left: 10px;
}
.featuredParks{
  margin-top: 40px;
  position: relative;
  bottom: 60px;
  margin-bottom: 40px;
  width: 100%;
  gap: 10px;
  display: flex;
  box-shadow: 0 8px 8px 0px rgba(18, 16, 16, 0.1);
  height: 250px;

}

.featuredParkName{
  font-size: large;
  text-align: start;
  margin-left: 30px;
  position: relative;
  bottom:-10px ;

}
.subheading {
  font-size: 1.55rem;
  color: #555;
  margin-top: -100px;
  position: relative;



}
.wrapper{
  background-color: white;
  height: 45px;
  width: 160px;
  border-radius: 30px;
  position: relative;
  margin-left: 40px;
  bottom: 90px;
}
.searchBox{
  text-align: center;
  top: 10px;
  position: relative;
  height: 30px;
  border-radius: 5px;
  width: 150px;
  background-color: aliceblue;

}
.homepage{
  width: 150px;
  text-transform: capitalize;
}
.parkImages{
  height: 300px;
  width: 250px;
  border-radius: 20px;

}
.icons-wrapper {
  margin-top: 20px;
}
</style >








