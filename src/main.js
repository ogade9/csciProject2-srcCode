import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHouse, faUser, faPlus, faBars, faUsers ,faLessThan,faMagnifyingGlass,faCalendarDays,faUserGroup,faRightFromBracket,faTrash,faXmark} from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
// add icons to library
library.add(faHouse, faUser, faPlus, faBars, faUsers,faLessThan,faMagnifyingGlass,faCircleUser,faCalendarDays,faUserGroup,faRightFromBracket,faTrash,faXmark)
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')
