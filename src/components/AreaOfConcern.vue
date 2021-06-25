<template>
  <b-container>
    <b-form @submit.prevent="onSave">
      <b-form-group label="Name">
        <b-form-input v-model="getSelectedAreaOfConcern.name" required type="text" placeholder="Area of concern name">

        </b-form-input>
      </b-form-group>
      <b-form-group label="Description">
        <b-form-input required v-model="getSelectedAreaOfConcern.description" type="text" placeholder="Area of concern description">

        </b-form-input>
      </b-form-group>
      <b-form-group label="Convention color">
        <b-form-input v-model="getSelectedAreaOfConcern.colorConvention" type="color">

        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="outline-secondary">Save</b-button>
      <b-button @click="onClear" class="ml-2" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "AreaOfConcern",
  data() {
    return {
      areaOfConcern: {
        _id: '',
        name: '',
        description: '',
        color: '#5982A0'
      }
    }
  },
  computed: {
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern', 'getSelectedAreaOfConcern'])
  },
  methods: {
    ...mapActions('areaOfConcern',
        ['fetchAllAreasOfConcern', 'setDefaultAreaOfConcern', 'setSelectedAreaOfConcern', 'updateAreaOfConcern']),
    async defaultSelectedAreaOfConcern() {
      await this.setDefaultAreaOfConcern();
    },
    onClear() {
      return this.defaultSelectedAreaOfConcern();
    },
    onSave() {
      console.log('Saving');
      if (this.getSelectedAreaOfConcern._id !== '') {
        this.updateAreaOfConcern(this.getSelectedAreaOfConcern);
      }
    }
  }
}
</script>

<style scoped>

</style>