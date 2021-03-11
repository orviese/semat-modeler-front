<template>
  <b-col class="mt-5" md="6" sm="8" offset-md="3" offset-sm="2">
    <h2 class="text-center">Registration Form</h2>
    <b-form @submit.prevent="doRegister" title="Registration Form">
      <b-form-group id="myName" label-for="yname" label="what's your name?">
        <b-form-input id="yname" required type="text" placeholder="John Doe"
                      v-model="form.name">
        </b-form-input>
      </b-form-group>
      <b-form-group id="myEmail" label-for="yemail" label="what's your email?">
        <b-form-input id="yemail" required type="email" placeholder="john.doe@mail.com"
                      v-model="form.email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="myPass" label-for="ypass" label="what's your password?">
        <b-form-input id="ypass" required type="password"
                      v-model="form.password">
        </b-form-input>
      </b-form-group>
      <b-alert
          :show="dismissCountDown"
          dismissible
          variant="danger"
          fade
          @dismiss-count-down="countDownChanged"
      >{{getErrorMessage}}</b-alert>
      <b-button class="mr-3" type="submit" variant="dark">
        <b-icon icon="person"></b-icon>
        Register</b-button>
    </b-form>
  </b-col>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
name: "Register",
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters('account', ['getErrorMessage'])
  },
  methods: {
    ...mapActions('account', ['register']),
    async doRegister(){
      await this.register(this.form);
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
  }
}
</script>

<style scoped>
  .register-content-page{

  }
</style>