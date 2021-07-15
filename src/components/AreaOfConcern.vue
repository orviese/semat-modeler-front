<template>
  <b-container>
    <b-form @submit.prevent="onSave" @reset.prevent="onClear">
      <b-form-group>
        <b-form-input v-model="getSelectedAreaOfConcern.name"
                      required type="text" placeholder="Name">
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input required v-model="getSelectedAreaOfConcern.description"
                      type="text" placeholder="Description">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Color Convention" label-class="font-weight-bold">
        <b-form-input required v-model="getSelectedAreaOfConcern.colorConvention" type="color">
        </b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="getSelectedAreaOfConcern.order" required placeholder="Index to order colors" type="number"></b-form-input>
      </b-form-group>
      <b-button  type="submit" variant="outline-success">Save</b-button>
      <b-button class="ml-2" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "AreaOfConcern",
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('areaOfConcern', ['','getAllAreasOfConcern', 'getSelectedAreaOfConcern'])
  },
  methods: {
    ...mapActions('areaOfConcern',
        [
          'fetchAllAreasOfConcern',
          'setDefaultAreaOfConcern',
          'setSelectedAreaOfConcern',
          'updateAreaOfConcern',
          'addAreaOfConcern'
        ]),
    async defaultSelectedAreaOfConcern() {
      await this.setDefaultAreaOfConcern();
    },
    onClear() {
      return this.defaultSelectedAreaOfConcern();
    },
    async onSave() {
      if (this.getSelectedAreaOfConcern._id !== '') {
        await this.updateAreaOfConcern(this.getSelectedAreaOfConcern);
        await this.fetchAllAreasOfConcern();
      } else {
        await this.addAreaOfConcern(this.getSelectedAreaOfConcern);
      }
      this.onClear();
    }
  }
}
</script>

<style scoped>

</style>