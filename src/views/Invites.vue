<script setup>
import {ref,onMounted} from 'vue';
import {useRoute} from 'vue-router'
import { useInviteStore } from "@/stores/invites";
import { useUserStore } from "@/stores/user";

const inviteStore = useInviteStore();
const userStore = useUserStore();
const route = useRoute();
const currentUser = localStorage.getItem("userId")
const excursionId = route.params.excursionId
const invitations = JSON.parse(localStorage.getItem("invitations"));
const participants = ref(JSON.parse(localStorage.getItem("participants")))
const id = localStorage.getItem("excursionId")

console.log(id)
console.log(excursionId)
//const newId = invitations[0].inviteId
//console.log("invites...", invitations);

const check1 = ref(false);
console.log(currentUser)
console.log(localStorage.getItem("participants"))
onMounted(async ()=>{
console.log(inviteStore.excursionInvite)
console.log(inviteStore.invitations)
})

function check(){
  if(excursionId==id){
    check1.value = true;
  }
}

check();
async function leaveExcursion(excursionId, index) {
    const token = localStorage.getItem("token");
    const serverUrl = `https://excursions-api-server.azurewebsites.net/leave/excursions/${excursionId}`;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(serverUrl, options);

    if (response.ok) {
      console.log("Successfully left the excursion.");
      participants.value.splice(index, 1);
      console.log(participants.value.length)
      localStorage.setItem("participants", JSON.stringify(participants.value));
    } else {
      console.log("Error:", response.status);
    }
  }

</script>
<template>
  <div class="body">
    <RouterLink to="/profile"><div class="back"><font-awesome-icon :icon="['fas', 'arrow-left']" /></div></RouterLink>
<form  @submit.prevent="inviteStore.sendExcursionInvite">
    <input type="text" v-model="inviteStore.friendId" class="search1" placeholder="Search users.."/>
    <input type="submit" value="Send" class="searchValue"/>
  </form>
  <div class="invites">
    <h2>Sent Invitations</h2>
    <div v-show="check1" v-for="(item,index) in invitations" :key="index" class="invitations">


    <p  >{{ item.firstName }}  {{ item.lastName }}</p>
    <div  class="revoke" @click.prevent="inviteStore.deleteExcursionInvite(item.inviteId,index)">Revoke</div>



  </div>

    <h2> Participants</h2>

      <div v-show="check1" v-for="(item,index) in participants" :key="index" class="invitations">

        <p  >{{ item.firstName }}  {{ item.lastName }}</p>
        <font-awesome-icon :icon="['fas', 'xmark']" @click.prevent="leaveExcursion(excursionId,index)"  class="leave" />
    </div>




    </div>
    </div>
</template>
<style scoped>
.body{
  height:100%;
  width: 100%;
  position: fixed;
}
.leave{
  position: relative;
  left:80%;
  top:-20px;
  cursor: pointer;
}
.leave:hover{
  color: red;
}
.search1{
  width: 100%;
  padding: 12px 20px;
  position: relative;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  justify-self: center;
  color: #333;



}
.back{
  padding: 10px;
  color: aqua;
  font-size: large;
}

.searchValue{
  padding: 10px 0px;
  position: relative;
  height: 30px;
  border-radius: 20px;
  background-color: #5d8ad2;
  color: white;
  font-weight: 500;
  cursor:pointer;
  border: none;
  width:50px;

  margin-left: 95%;
  transition: background-color 0.3s ease;
  top: -35px;
}
.searchValue:hover {
  background-color: #2d3036;
  cursor: pointer;
}
h2{
  padding: 20px;
}

.invites p{
  text-transform: capitalize;
  margin-left: 20px;
  position: relative;
  font-weight: bolder;
  top: 15px;
  color: aliceblue;
  background-color: transparent;
  backdrop-filter: blur(10px);
}
.invitations{
  height:50px;
  width: 70%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: aliceblue;
  background-color: transparent;
  backdrop-filter: blur(10px);
  border: 1px solid aliceblue;
  border-radius: 10px;
}
.revoke{
  margin-left: 70%;
  position: relative;
  top:-20px;
  color: #2a61ba;
}
</style>
