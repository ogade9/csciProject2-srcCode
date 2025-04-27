<script setup>
import {ref,onMounted} from 'vue';
const tabs = ['Friends', 'Find People', 'Requests'];
const currentTab = ref('Friends');
const friends = ref([]);
const friendRequests=ref([]);
const friendId = ref("");
localStorage.removeItem("friendIds");
localStorage.removeItem("newfriendIds");
onMounted(async ()=>{

  const token =localStorage.getItem("token");
  const serverUrl= `https://excursions-api-server.azurewebsites.net/friends`;
    const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
    const data = await response.json();
      console.log("here")
        if(response.status==200){
            console.log(data)
            friends.value.push({
              firstName: data.friends.firstName,
              lastName: data.friends.lastName,
              id:data.friends._id
            })
            console.log("got friendList")



        }
        else{
          console.log(response.status)
        }




});
async function deleteFriends(index) {
  const friendIds =JSON.parse(localStorage.getItem("newfriendIds"))
  const token=localStorage.getItem("token");


  console.log("friend ID at index", index, ":", friendIds[index]);
  console.log("here")
    const serverUrl= `https://excursions-api-server.azurewebsites.net/friends/${friendIds[index]}`;
    const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}` },
      };
    const response = await fetch(serverUrl,options);
      console.log("here")
        if(response.status==200){
            console.log("got ID")
            console.log("deleted")
            friends.value.splice(index, 1);
            friendIds.splice(index, 1);
            localStorage.setItem("friendIds", JSON.stringify(friendIds));
            localStorage.setItem("newfriendIds", JSON.stringify(friendIds));


        }
        else{
          console.log(response.status)
        }

}
//"680b106d11b3b93699602d8a"
async function createFriend(){
  const token = localStorage.getItem("token")
    const serverUrl= "https://excursions-api-server.azurewebsites.net/friends/requests"
    const options = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },


    body: JSON.stringify({friendId: friendId.value}),
  };
  console.log(friendId.value)
  console.log("Ok!");
  const response = await fetch(serverUrl,options);
  console.log("Ok!");
  const data = await response.json();

  if(response.status==201){
    console.log(data);
    const id = data.friendRequest.receiver;
    friendRequests.value.push({
      firstName: localStorage.getItem("firstName"),
      lastName: localStorage.getItem("lastName"),
      id: id


    })
    //const firstName = data.friendRequest.firstName
    //const lastName = data.friendRequest.lastName


    //friends.value.push({id,firstName,lastName});

    //const previousFriends = JSON.parse(localStorage.getItem("friendIds"))||[];

    //const updatedFriends = [...previousFriends, id];
    //friends.value = updatedFriends;
    //localStorage.setItem("friendIds", JSON.stringify(updatedFriends));
   // localStorage.setItem("newfriendIds", JSON.stringify(updatedFriends));

    //console.log(friends.value);
    //router.push('/profile');

    }

  else{
    console.log(response.status)
    console.log('not created')
  }

}
</script>
<template>

<h2>Your Friends</h2>
<div class="section-divider">
<div class="friends-page">

  <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>
</div>
</div>


    <div class="friends-list">
      <div class="friend-card" v-for="friend in friends" :key="friend.id">
        <!--<img class="avatar" :src="friend.avatar || defaultAvatar" alt="Profile Picture" />-->
        <div class="friend-name">{{ friend.firstName }} {{ friend.lastName }}</div>
      </div>
    </div>

    <div class="tab-content">
      <div v-if="currentTab === 'Friends'">
        <div class="friends-list">
          <div class="friend-card" v-for="friend in friends" :key="friend.id">
            <!--<img class="avatar" :src="friend.avatar || defaultAvatar" alt="Profile Picture" />-->
            <font-awesome-icon :icon="['fas', 'circle-minus']" @click="deleteFriends(index)"/>
            <div class="friend-name">{{ friend.firstName }} {{ friend.lastName }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="currentTab === 'Find People'">
        <p>Find people feature coming soon!</p>
    <div >

    <form @submit.prevent="createFriend">
      <input type="text"  v-model="friendId" placeholder="Search for friend..." required>

      <input type="submit" value="Search" class="submit"/>


    </form>
    <div class="results" ref="result1"></div>



    </div>
      </div>

      <div v-else-if="currentTab === 'Requests'">
        <p>No requests yet.</p>
        <div class="friends-list">
          <div class="friend-card" v-for="friend in friendRequests" :key="friend.id">
            <!--<img class="avatar" :src="friend.avatar || defaultAvatar" alt="Profile Picture" />-->
            <font-awesome-icon :icon="['fas', 'circle-minus']" @click="deleteFriends(index)"/>
            <div class="friend-name">{{ friend.firstName }} {{ friend.lastName }}</div>
          </div>
        </div>
      </div>
    </div>


  </template>
<style scoped>
.section-divider{
  margin-top: 80px;
  height: 50px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
}
</style>
