<template>
  <b-container>
    <h3 class="text-center">Competencies</h3>
    <b-form @submit.prevent="" @reset.prevent="" class="my-3 mx-3">
      <b-form-group label="" label-class="font-weight-bold">
        <b-form-input required v-model="name" placeholder="Competency Name"></b-form-input>
      </b-form-group>
      <b-form-group label="" label-class="font-weight-bold">
        <b-form-textarea required v-model="description" placeholder="Description" rows="3"></b-form-textarea>
      </b-form-group>
      <b-form-group label="Area or concern" label-cols="2" label-class="font-weight-bold">
        <b-input-group>
          <b-form-select required @change="getColor"
              v-model="areaOfConcern"
              value-field="_id"
              text-field="name"
              :options="getAllAreasOfConcern">
            <template #first>
              <b-form-select-option :value="null" disabled>
                -- Please select an area of concern --
              </b-form-select-option>
            </template>
          </b-form-select>
          <b-input-group-append v-if="aocColor !== ''">
            <b-button squared class="ml-2" v-bind:style="{backgroundColor: aocColor}">
              <b-icon-book scale="1.5"></b-icon-book>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-button type="submit" variant="outline-success">Save</b-button>
      <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Competency",
  data() {
    return {
      name: '',
      description: '',
      areaOfConcern: null,
      aocColor: '',
    }
  },
  computed: {
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern'])
  },
  methods: {
    getColor() {
      let areaFound = this.getAllAreasOfConcern.find(area => this.areaOfConcern === area._id);
      if (areaFound) {
        this.aocColor = areaFound.colorConvention;
      } else {
        this.aocColor = '';
      }
    }
  }
}
</script>

<style scoped>

</style>