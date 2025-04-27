// stores/trips.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTripStore = defineStore('trip', () => {
  const name = ref('');
  const description = ref('');
  const startDate = ref('');
  const endDate = ref('');
  const campground = ref('');
  const park = ref('');
  const limit = 10;
  const thingstodo = ref([]);
  const activities = ref(false);
  const campgrounds = ref([]);
  const thingsTodo = ref([]);
  const campgroundsID = ref([]);
  const parkID = ref('');
  const userTrips = ref([]);

  const getParks = async (query, parkCodes, stateCodes) => {
    const token = localStorage.getItem('token');
    const serverUrl = `https://excursions-api-server.azurewebsites.net/national-parks?limit=1&number=1&q=${query}`;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetch(serverUrl, options);
    const data = await response.json();
    if (response.status === 200) {
      parkID.value = data.data[0].id;
    }
  };

  const getCamps = async (query, parkCodes, stateCodes) => {
    const token = localStorage.getItem('token');
    const serverUrl = `https://excursions-api-server.azurewebsites.net/campgrounds?parkCode=${parkCodes}&stateCode=${stateCodes}&limit=10&start=0&q=${query}`;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetch(serverUrl, options);
    const data = await response.json();

    if (response.status === 200) {
      campgrounds.value = data.data.map(c => c.name);
      campgroundsID.value = data.data.map(c => c.id);
    }
  };

  const getThingsToDo = async (parkCodes, stateCodes) => {
    const token = localStorage.getItem('token');
    const serverUrl = `https://excursions-api-server.azurewebsites.net/things-to-do?parkCode=${parkCodes}&stateCode=${stateCodes}&limit=${limit}&start=0`;
    const options = {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    };

    const response = await fetch(serverUrl, options);
    const data = await response.json();

    if (response.status === 200) {
      thingsTodo.value = data.data.map(item => ({
        name: item.activities[0]?.name || 'Unnamed Activity',
        id: item.id,
      }));
    }
  };

  const createTrip = async () => {
    const token = localStorage.getItem('token');
    const formattedStartDate = new Date(startDate.value).toISOString();
    const formattedEndDate = new Date(endDate.value).toISOString();

    const tripData = {
      name: name.value,
      description: description.value,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      campground: campground.value,
      park: parkID.value,
      thingstodo: thingstodo.value,
    };

    const response = await fetch(`https://excursions-api-server.azurewebsites.net/trip`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    });

    const data = await response.json();

    if (response.status === 201) {
      const id = data.trip._id;
      const previousTrips = JSON.parse(localStorage.getItem('tripIds')) || [];
      const updatedTrips = [...previousTrips, id];

      userTrips.value = updatedTrips;
      localStorage.setItem('tripIds', JSON.stringify(updatedTrips));
      localStorage.setItem('newtripIds', JSON.stringify(updatedTrips));
      return id;
    } else {
      throw new Error('Trip creation failed');
    }
  };

  return {
    name,
    description,
    startDate,
    endDate,
    campground,
    park,
    thingstodo,
    activities,
    campgrounds,
    thingsTodo,
    campgroundsID,
    parkID,
    userTrips,
    getParks,
    getCamps,
    getThingsToDo,
    createTrip,
  };
});
