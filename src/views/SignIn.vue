<template>
  <b-col class="mt-5" md="6" sm="8" offset-md="3" offset-sm="2">
    <b-form @submit.prevent="doSignIn">
      <b-form-group id="myEmail" label-for="yemail" label="Email">
        <b-form-input id="yemail" required type="email" placeholder="john.doe@mail.com"
                      v-model="form.email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="myPass" label-for="ypass" label="Password">
        <b-form-input id="ypass" required type="password"
                      v-model="form.password">
        </b-form-input>
      </b-form-group>
      <b-alert
          :show="showAlert"
          variant="danger"
      >{{ getErrorMessage }}
      </b-alert>
      <b-button class="mr-3" type="submit" variant="dark">
        <b-icon icon="person"></b-icon>
        Sign In
      </b-button>
      {{ getAccount }}
    </b-form>
  </b-col>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "SignIn",
  data() {
    return {
      showAlert: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters('account', ['getErrorMessage', 'getAccount'])
  },
  methods: {
    ...mapActions('account', ['signIn', 'signOut']),
    async doSignIn() {
      await this.signIn(this.form);
      if (this.getErrorMessage !== '') {
        this.showAlert = true;
      } else {
        this.showAlert = false;
      }
    },
    async doSingOut() {
      await this.signOut()
    }
  },
  mounted() {
    this.doSingOut();
    console.log('Mounting')
  }
}
</script>

<style scoped>

</style>