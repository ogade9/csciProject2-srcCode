// stores/useExcursionStore.js
import { ref ,computed} from 'vue'
import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'

export const useInviteStore = defineStore('invites', () => {
  const excursions = ref([])
  const friendId = ref('')
  const invitations = ref([])
  const excursionInvite = ref([])
  const participants = ref([]);
  const newParticipants = JSON.parse(localStorage.getItem("newparticipants"));
  console.log(newParticipants)

  const route = useRoute()
  const currentUser = localStorage.getItem("userId")

  const excursionId = route.params.excursionId
  //localStorage.setItem("filteredInvitations", JSON.stringify(filteredInvitations.value));

  async function sendExcursionInvite() {
    const token = localStorage.getItem("token")
   // const excursionIds = JSON.parse(localStorage.getItem("newexcursionIds"))

    const serverUrl = `https://excursions-api-server.azurewebsites.net/share/excursion/${excursionId}`
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ friendId: friendId.value }),
    }

    const response = await fetch(serverUrl, options)
    const data = await response.json()

    if (response.ok) {
      console.log(data)
      localStorage.setItem("excursionId",data.excursionInvite[0].excursion[0]._id)
      localStorage.setItem("destinationId",data.excursionInvite[0].receiver[0]._id)
      console.log(currentUser)

        invitations.value.push({
          firstName: data.excursionInvite[0].receiver[0].firstName,
          lastName: data.excursionInvite[0].receiver[0].lastName,
          inviteId: data.excursionInvite[0]._id,
          senderId: currentUser,
        })

        excursionInvite.value.push({
          firstName: data.excursionInvite[0].sender[0].firstName,
          lastName: data.excursionInvite[0].sender[0].lastName,
          inviteId: data.excursionInvite[0]._id,
          userId: data.excursionInvite[0].sender[0]._id
    })}


     else {
      console.log(response.status)
    }
    localStorage.setItem("friendId",friendId.value)
    localStorage.setItem("invitations",JSON.stringify(invitations.value))


        localStorage.setItem("excursionInvites",JSON.stringify(excursionInvite.value))
        console.log(excursionInvite.value)
        console.log(invitations.value)
  }

  async function deleteExcursionInvite(inviteId,index) {
    const token = localStorage.getItem("token")
    //const invite = JSON.parse(localStorage.getItem("excursionInvites"))
    //console.log(invite[0].firstName)
    //const inviteId = invite[0].inviteId
    const serverUrl = `https://excursions-api-server.azurewebsites.net/share/excursions/${inviteId}`

    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }

    const response = await fetch(serverUrl, options)

    if (response.ok) {
      console.log("deleted")
      invitations.value.splice(index, 1)
      localStorage.setItem("invitations",JSON.stringify(invitations.value))
    } else {
      console.log(response.status)
    }
  }

  async function handleExcursionInvite(inviteId,isAccepted,index) {
    //const invite = JSON.parse(localStorage.getItem("excursionInvites"))
    //const inviteId = invite.inviteId

    const token = localStorage.getItem("token")
   console.log('values',JSON.parse(localStorage.getItem("excursionInvites")))
    const serverUrl = `https://excursions-api-server.azurewebsites.net/share/excursions/${inviteId}`

    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAccepted}),
    }

    const response = await fetch(serverUrl, options)

    if (response.ok) {

      console.log("accepted or declined")
      if(!isAccepted){
        invitations.value.splice(index,1)
        localStorage.setItem("excursionInvites",invitations.value)
       //console.log(JSON.parse(localStorage.getItem("excursionInvites")))
      }
    } else {
      //inviteId.isAccepted= true;
      const oldParticipants = JSON.parse( localStorage.getItem("participants"))
      newParticipants.value= oldParticipants
      newParticipants.value.push({
        firstName:inviteId.receiver[0].firstName,
        lastName:inviteId.receiver[0].lastName,
        id:inviteId.receiver[0]._id

      });
      localStorage.setItem("participants",JSON.stringify(participants.value))
      console.log(response.status)
    }
  }
  async function getExcursionInvites() {
    const token = localStorage.getItem("token")
    const serverUrl = `https://excursions-api-server.azurewebsites.net/share/excursions`

    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }

    const response = await fetch(serverUrl, options)
    const data = await response.json();
    if (response.ok) {
      console.log('dataa',data)
      data.excursionInvites.forEach(invite => {

          participants.value.push({
            firstName: invite.receiver[0].firstName || "",
            lastName: invite.receiver[0].lastName || "",
            id: invite.receiver[0]._id || "",
          });

     } );



        localStorage.setItem("participants",JSON.stringify(participants.value))
        console.log(localStorage.getItem("participants"))
        console.log("deleted")
      }



      //invitations.value.splice(index, 1)
     else {
      console.log(response.status)
    }
  }


  async function deleteParticipant(index) {
    getExcursionInvites();
    const token = localStorage.getItem("token")
    const serverUrl = `https://excursions-api-server.azurewebsites.net/remove/excursions/${excursionId}`

    const options = {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }

    const response = await fetch(serverUrl, options)

    if (response.ok) {
      console.log("deleted")
      participants.value.splice(index, 1)
      localStorage.setItem("participants",participants.value)
    } else {
      console.log(response.status)
    }
  }
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


  function acceptInvite(inviteId) {
    handleExcursionInvite(inviteId,true)
  }

  function declineInvite(invitedId) {
    handleExcursionInvite(invitedId,false)
  }
getExcursionInvites();

  return {
    excursions,
    friendId,
    invitations,
    excursionInvite,
    sendExcursionInvite,
    deleteExcursionInvite,
    acceptInvite,
    declineInvite,
    deleteParticipant,currentUser,getExcursionInvites,leaveExcursion
  }
})
