<template>
  <b-container>
    <b-form @submit.prevent="" @reset.prevent="onReset">
      <b-form-group label="Name">
        <b-form-input v-model="areaOfConcern.name" type="text" placeholder="Area of concern name">

        </b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-input v-model="areaOfConcern.description" type="text" placeholder="Area of concern description">

        </b-form-input>
      </b-form-group>
      <b-form-group label="Convention color">
        <b-form-input v-model="areaOfConcern.color" type="color">

        </b-form-input>
      </b-form-group>
      <b-button variant="outline-secondary">Create</b-button>
      <b-button  class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "AreaOfConcern",
  data() {
    return {
      areaOfConcern: {
        id: '',
        name: '',
        description: '',
        color: '#5982A0'
      }
    }
  },
  methods: {
    onReset() {
      this.areaOfConcern.id = '';
      this.areaOfConcern.name = '';
      this.areaOfConcern.description = '';
      this.areaOfConcern.color = '#F9FFC0';
    }
  }
}
</script>

<style scoped>

</style>