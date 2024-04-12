<template>
  <v-app id="app">
    <v-container class="mx-auto">
      <Flash/>
      <Registration/>
    </v-container>
  </v-app>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Registration from './components/Registration.vue'
import Flash from './components/Flash.vue'

export default defineComponent({
  name: 'App',
  components: {
    Flash,
    Registration,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
