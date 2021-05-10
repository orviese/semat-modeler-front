<template>
  <div>
    <div class="my-container">
      <b-row>
        <b-col>
          <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
            <b-navbar-brand to="/">SEMAT Modeler</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item v-if="isLogged" to="/dashboard">Home</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-text v-if="isLogged">Welcome!, <em>{{getAccount.name}}</em></b-nav-text>

                <b-nav-item-dropdown right>
                  <template #button-content>
                    <b>Account</b>
                  </template>
                  <b-dropdown-item  v-if="!isLogged" to="/signup">Sign Up</b-dropdown-item>
                  <b-dropdown-item v-if="!isLogged" to="/signin">Sign In</b-dropdown-item>
                  <b-dropdown-item v-if="isLogged" to="/profile">Profile</b-dropdown-item>
                  <b-dropdown-item v-if="isLogged" @click="signOut">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="mt-5">
          <router-view></router-view>
        </b-col>
      </b-row>
    </div>
    <footer class="my-footer">
      <p><strong>SEMAT modeler</strong> </p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  methods:{
    ...mapActions('account', ['signOut'])
  },
  computed: {
    ...mapGetters('account', ['getAccount', 'isLogged'])
  }
}
</script>
<style>
  .my-footer{
    bottom: 0;
    text-align: center;
    min-width: 100%;
  }

  .my-container{

  }
</style>
