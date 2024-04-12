<template>
  <v-snackbar v-model="snackbar" absolute top :color="notifications.length ? 'success' : 'error'">
    <v-row class="ml-2" v-for="(error, index) in messages" v-bind:key="index">{{ error }}</v-row>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>

export default {
  name: 'Flash',
  computed: {
    messages() {

      // console.log(this.notifications)
      // console.log(this.errors)

      return this.notifications.concat(this.errors);
    },
    notifications() {
      return this.$store.getters.notifications;
    },
    errors() {
      return this.$store.getters.errors;
    },
    snackbar: {
      get() {
        return this.notifications.length || this.errors.length
      },
      set(state) {
        if (!state) {
          this.$store.dispatch('reset_flash')
        }
      },
    }
  }
}
</script>