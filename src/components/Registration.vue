<template>
  <v-card max-width="500">
    <v-card-title>Registration Form</v-card-title>
    <v-card-text>
      <v-form v-if="countries.length">
        <v-text-field dense outlined label="Full Name" v-model="name"></v-text-field>
        <v-autocomplete dense outlined class="justify-start" label="Country"
          id="countries-autocomplete"
          v-model="country_id"
          :items="countries"
          item-text="name"
          item-value="id"
          autocomplete="null"
          @change="onCountryChange"
        >
          <template v-slot:selection="data">
            <v-avatar left>
              {{ data.item.flag }}
            </v-avatar>
            {{ data.item.name }}
          </template>
          <template v-slot:item="data">
            <template>
              <v-list-item-avatar>
                {{data.item.flag}}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <v-text-field dense outlined label="Phone Number"
          v-model="phone_number"
          :prefix="country_prefix"
          @keyup.stop.prevent="onPhoneNumberChange($event.target.value)"
        ></v-text-field>
        <v-text-field dense outlined label="Email" v-model="email"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="register" color="primary">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'Registration',

  setup() {
    return {
      email: ref(),
      name: ref(),
      country_id: ref(),
      phone_number: ref(''), // +972 53 111-22-33
      country_prefix: ref('')
    }
  },

  async created() {
    await this.$store.dispatch('load_countries')
    this.onCountryChange(this.country_id);
    this.onPhoneNumberChange(this.phone_number);
  },

  methods: {
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        phone_number: this.getPhoneNumber(),
        email: this.email,
        country_id: this.country_id
      })
    },

    getCountryById(country_id){
      const idx = this.countries.findIndex((c) => {
        return c.id === country_id
      });

      return this.countries[idx];
    },

    onCountryChange(country_id) {
      const country = this.getCountryById(country_id);

      if (country) {
        if (this.phone_number) {
          this.phone_number = this.phone_number.replace(country.idd, '')
        }
        this.country_prefix = country.idd;
      }

      return this.phone_number;
    },

    onPhoneNumberChange(phoneNumber){

      if (!phoneNumber) {
        return;
      }

      this.countries.map((c) => {
        if (phoneNumber.startsWith(c.idd)) {
          this.country_id = c.id;
          phoneNumber = this.onCountryChange(c.id);
        }
      });

      this.phone_number = this.formatPhoneNumber(phoneNumber);
    },

    formatPhoneNumber(phoneNumber) {

      if (!phoneNumber.startsWith('+')) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
      }

      if(phoneNumber.length > 9) {
        phoneNumber = phoneNumber.substring(0, phoneNumber.length - 1);
      }

      // Format the phone number according to its length (not unified method and need improvements)
      if (phoneNumber.length > 3 && phoneNumber.length <= 5) {
        return phoneNumber.replace(/(\d{2})(\d{0,3})/, '$1 $2');
      } else if (phoneNumber.length > 5 && phoneNumber.length < 8) {
        return phoneNumber.replace(/(\d{2})(\d{3})(\d{0,2})/, '$1 $2-$3');
      } else if (phoneNumber.length >= 8 && phoneNumber.length <= 12) {
        return phoneNumber.replace(/(\d{2})(\d{3})(\d{2})(\d{0,2})/, '$1 $2-$3-$4');
      } else {
        return phoneNumber;
      }
    },

    getPhoneNumber() {
      return '+' + (this.country_prefix + this.phone_number).replace(/\D/g, '');

    },
  },

  computed: {
    countries() {
      return this.$store.getters.countries
    }
  }
})
</script>

<style>

.v-text-field--outlined .v-text-field__prefix {
  min-width: 60px;
  color: blue;
  margin-right: 2px;
 }

</style>
