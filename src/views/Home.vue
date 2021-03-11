<template>
  <div>
    <div class="my-container">
      <b-row>
        <b-col>
          <b-navbar toggleable="lg" type="dark" variant="info" sticky>
            <b-navbar-brand to="/">SEMAT Modeler</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
              <b-navbar-nav>
                <b-nav-item>Home</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <template #button-content>
                    <em>Account</em>
                  </template>
                  <b-dropdown-item to="/signup">Register</b-dropdown-item>
                  <b-dropdown-item to="/signin">Sign In</b-dropdown-item>
                  <b-dropdown-item>Sign Out</b-dropdown-item>
                  <b-dropdown-item to="/profile">Profile</b-dropdown-item>

                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
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

export default {
  name: 'Home',
  components: {
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
