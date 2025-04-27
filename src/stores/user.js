import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'


export const useUserStore = defineStore('user', () => {
  const firstName = ref('')
  const lastName = ref('')
  const userName = ref('')
  const email = ref('')
  const password = ref('')
  const id=ref('')
  const router = useRouter()
  const token = ref('');
  const currentId = ref('')
  

  async function create() {
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      email: email.value,
      password: password.value,
    }
    const serverUrl = "https://excursions-api-server.azurewebsites.net/user"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
    let response = await fetch(serverUrl, options)
    if (response.status == 201) {
      const vals = await response.json()
      localStorage.setItem("token", vals.token)
      localStorage.setItem("firstName", vals.user.firstName)
      localStorage.setItem("lastName", vals.user.lastName)
      localStorage.setItem("email", vals.user.email)
      localStorage.setItem("id", vals.user._id)
      token.value = localStorage.getItem("token")
      firstName.value=localStorage.getItem("firstName");
      lastName.value=localStorage.getItem("lastName");
      email.value=localStorage.getItem("email")
      router.push('/Signin')
    } else {
      console.log(response.status)
      return
    }
  }
  async function signin(e){
    e.preventDefault();
    const userData = {
      email: email.value,
      password: password.value,
    };
    const serverUrl = "https://excursions-api-server.azurewebsites.net/user/sign-in"
    const options={
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    let response = await fetch(serverUrl,options);
    const vals= await response.json();
    if(response.status==200){

      localStorage.setItem("token", vals.token);
      localStorage.setItem("userId", vals.user._id);
      //localStorage.setItem("token", vals.token)
      localStorage.setItem("firstName", vals.user.firstName)
      localStorage.setItem("lastName", vals.user.lastName)
      localStorage.setItem("email", vals.user.email)
      //localStorage.setItem("id", vals.user._id)
      //token.value=localStorage.getItem("token")
      //firstName.value=localStorage.getItem("firstName");
      //lastName.value=localStorage.getItem("lastName");
     // email.value=localStorage.getItem("email")
      //localStorage.setItem("email",vals.user.email)
      console.log(vals)
      console.log(localStorage.getItem("token"))
      console.log(localStorage.getItem("userId"))
      console.log("firstName",localStorage.getItem("firstName"))
      console.log("lastName",localStorage.getItem("lastName"))
      console.log(localStorage.getItem("token"))
      console.log(localStorage.getItem("email"))
      currentId.value=localStorage.getItem("userId")
      console.log(currentId.value)
      router.push('/homepage')
    }
    else {
      console.log(response.status);
      return;
    }
  }
  async function signout() {
    const token = localStorage.getItem("token")
    const serverUrl = "https://excursions-api-server.azurewebsites.net/user/sign-out"
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(serverUrl, options)
    if (response.status == 200) {
      console.log("signed out")
      localStorage.removeItem("token")
      localStorage.removeItem("userId")
      localStorage.removeItem("firstName")
      localStorage.removeItem("email")
      localStorage.removeItem("lastName")

      //localStorage.removeItem("firstName")
      //localStorage.removeItem("lastName")
      //localStorage.clear();
      router.push('/signin')
    } else {
      console.log(response.status)
    }
  }
  async function deleteAccount() {
    let result = confirm("Are you sure you want to delete your Account?");
    if (result) {
      const token = localStorage.getItem("token");
      const serverUrl = "https://excursions-api-server.azurewebsites.net/user";
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(serverUrl, options);
      if (response.status == 200) {
        console.log("Account deleted");
       // localStorage.removeItem("token");
       // localStorage.removeItem("firstName");
       // localStorage.removeItem("lastName");
        resetFields()
        router.push('/create');
      } else {
        console.log(response.status);
      }
    } else {
      console.log("Account Deletion Canceled");
    }
  }

    function resetFields() {
      firstName.value = ''
      lastName.value = ''
      userName.value = ''
      email.value = ''
      password.value = ''
      localStorage.removeItem("token")
      localStorage.removeItem("firstName")
      localStorage.removeItem("lastName")
    }


  return { firstName, lastName,id, userName, email, password, create,signin,signout,deleteAccount,currentId }
})
