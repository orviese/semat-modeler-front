<template>
  <b-col class="mt-5" md="6" sm="8" offset-md="3" offset-sm="2">
    <h2 class="text-center">Edit your profile information</h2>
    <b-form @submit.prevent="doUpdate">
      <b-form-group id="yourName" label-for="yourNameI" label="Your name!">
        <b-form-input id="yourNameI" required type="text" placeholder="John Doe"
                      v-model="profile.name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="yourEmail" label-for="yourEmailI" label="Your email">
        <b-form-input id="yourEmailI" required type="email" placeholder="john.doe@mail.com"
                      v-model="profile.email">
        </b-form-input>
      </b-form-group>
      <b-alert
          :show="dismissCountDown"
          dismissible
          variant="danger"
          fade
          @dismiss-count-down="countDownChanged"
      >{{ getErrorMessage }}
      </b-alert>
      <b-button class="mr-3" type="submit" variant="success">
        <b-icon icon="person"></b-icon>
        Save
      </b-button>
    </b-form>
  </b-col>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Profile",
  data(){
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      profile: {
        id: '',
        name: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapGetters('account', ["getAccount", 'getErrorMessage'])
  },
  methods: {
    ...mapActions('account', ['updateProfile']),
    async doUpdate(){
      await this.updateProfile(this.profile);
      if (this.getErrorMessage){
        this.showAlert();
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  },
  mounted() {
    console.log(this.getAccount.id)
    this.profile.id = this.getAccount.id;
    this.profile.name = this.getAccount.name;
    this.profile.email = this.getAccount.email;
  }
}
</script>

<style scoped>

</style>