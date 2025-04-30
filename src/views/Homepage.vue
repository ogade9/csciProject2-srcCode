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
  <h1 class="homepage">Plan your next adventure</h1>
  <p class="about"> Create custon trips and unforgettable excursions...</p>
  <h3 class="header">Featured Parks</h3>
  <div class="featuredParks">

    <div class="parkContainer">


      <img src="https://www.nps.gov/common/uploads/structured_data/3C84C3C0-1DD8-B71B-0BFF90B64283C3D8.jpg" class="parkImages">
      <h2 class="parkHeader">Yosemite National Park</h2>
    <div class="wrapper">
       <RouterLink to="/details/yose/CA" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>
    <div class="parkContainer">
      <img src="https://www.nps.gov/common/uploads/structured_data/C20E6CD3-CDF7-B3AB-8448CDCD7FD590FF.jpg" class="parkImages">
    <h2 class="parkHeader">Glacier National Park</h2>
    <div class="wrapper">
       <RouterLink to="/details/glac/MT" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>
    <div class="parkContainer">
        <img src="https://www.nps.gov/common/uploads/structured_data/3C798EAB-1DD8-B71B-0BC4BEFB197F2C90.jpg" class="parkImages">
       <h2 class="parkHeader">Kenai Fjords National Park</h2>
      <div class="wrapper">
       <RouterLink to="/details/kefj/AK" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>

  <div class="parkContainer">
    <img src="https://www.nps.gov/common/uploads/structured_data/3C8397D6-1DD8-B71B-0BEF4C54462A1EB3.jpg" class="parkImages">
    <h2 class="parkHeader">Appalachian National Scenic Trail</h2>
  <div class="wrapper">
      <RouterLink to="/details/appa/CT,GA,MA,MD,ME,NC,NH,NJ,NY,PA,TN,VA,VT,WV" ><h4 class="featuredParkName">View Park</h4></RouterLink></div>
    </div>

  </div>
    <RouterLink to="/search"><div class="explore">Explore More Parks</div></RouterLink>







  </div>


  <Icons />
</div>




</template>
<style scoped>

.body {
  background-image: url("https://i.pinimg.com/736x/8f/49/ec/8f49ec216bb710291efad0443fec67b2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0;
  width: 100vw;
  height:100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family:Arial, Helvetica, sans-serif



}
.overlay{
  background-color: rgba(5, 5, 5, 0.5);
  height: 100vh;
  width: 100vw;
  padding: 10px;
}
.campcontain{
  position: relative;
  margin-top: -150px;
  width:230px;
  background-color: white;
  display: flex;
  margin-bottom: 100px;
}

.explore{
  height: 40px;
  width: 200px;
  background-color: rgba(61, 58, 58, 0.5);
  text-align: center;
  color: aliceblue;
  backdrop-filter: blur(15px);
  justify-self: center;
  position: relative;
  top:10px;
  font-size: large;
  padding-top: 12px;
  box-shadow:rgba(31, 38, 100, 0.1);
  border-radius: 20px;
}
.explore:hover{
  color: cadetblue;
  backdrop-filter: blur(19px);
}
.about{
  position: relative;
  text-align: center;
  font-size: small;
  padding: 10px;
  margin-top: -15px;
  color: white;
}

.featuredCampgrounds{
  position: relative;
  height: 100px;
  margin-bottom:100px;

}
.featuredcampName{
  font-size: 10px;
}
.campcontain{
  height: 50px;
  top:120px;

}
.campHeader{
  text-align: center;
  position: relative;
  top:-30px;
}


/* Text Headings */
.homepage {
  font-size: 30px;
  color:antiquewhite;
}

.header {
  position: relative;
  text-align: center;
  top: 50px;
  font-size: 20px;
  margin-top: 30px;


}

.subheading {
  font-size: 1.55rem;
  color: white;
  margin-top: -10px;
  position: relative;
}

/* Featured Parks Section */
.featuredParks {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  box-shadow: 0 0px 0px rgba(18, 16, 16, 0.1);
  overflow-x: scroll;
  height:300px;
  gap:10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.featuredParks::-webkit-scrollbar {
    display: none;
}
.parkContainer{
  position: relative;
  top:40px;
  height:230px;
  width: 200px;
  border-radius: 30px;
  background-color: rgba(5, 5, 5, 0.5);
  backdrop-filter: blur(10px);
}

.parkHeader {
  margin-left: 0px;
  position: relative;
  font-size: medium;
  color: antiquewhite;
  text-align: center;
  top: 15px;
}

.parkImages {
  width: 120px;
  height: 70px;
  padding: 0px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 20px;
  justify-self:center;
  position: relative;
  justify-content: center;
  justify-items: center;
  display: flex;
  flex-direction: column;
  top:20px;

}

.featuredParkName {
  font-size: 15px;
  text-align: center;
  position: relative;
  bottom: -4px;
}


.wrapper {
  background-color: beige;
  height: 30px;
  border-radius: 30px;
  font-size: small;
  position: relative;
  justify-content: center;
  justify-self: center;
  width: 90px;

}

.wrapper2 {

  width: 160px;
  height: 45px;
  border-radius: 30px;
  margin-left: 40px;
  position: relative;
}




.searchBox {
  width: 150px;
  height: 30px;
  background-color: aliceblue;
  border-radius: 5px;
  text-align: center;
  position: relative;
  top: 10px;
}

.icons-wrapper {
  margin-top: 20px;
}

</style >








