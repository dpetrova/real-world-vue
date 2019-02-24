<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  data() {
    return {
      events: []
    }
  },
  created() {
    //axios
    // .get('http://localhost:3000/events') // Does a get request
    // .then(response => {
    //   this.events = response.data // <--- set the events when returned
    // })
    // .catch(error => {
    //   console.log('There was an error:', error.response) // Logs out the error
    // })
    EventService.getEvents()
      .then(response => {
        this.events = response.data // <--- set the events when returned
      })
      .catch(error => {
        console.log('There was an error:', error.response) // Logs out the error
      })
  },
  components: {
    EventCard
  }
}
</script>
