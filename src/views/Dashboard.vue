<template>
  <b-container>
    <b-jumbotron header="SEMOVA" lead="SEMAT Modeler Validator">
      <p class="text-justify" >This is a prototype functional application for academic purpose that allows modeling software
        development practices using the basic SEMAT elements defined in the ESSENCE spec.
      </p>
      <p class="text-justify">Once your software development practice contains the minimal elements that represent in a textual way
        the  practice, you would be able to create validation request to let volunteers evaluate your practice
        using defined validation criteria.
      </p>
      <b-button variant="link" to="/model-practices" v-if="isLogged">Model your first practice</b-button>
    </b-jumbotron>
  </b-container>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('account', ['isLogged'])
  },
  methods: {
    onToggleCollapse(collapse){
      this.collapse = collapse;
    }
  }
}
</script>

<style scoped>
</style>