<template>
  <b-container>
    <b-form @submit.prevent="" @reset.prevent="onReset" class="mb-5">
      <b-form-group label="Name" label-class="font-weight-bold">
        <b-form-input v-model="getAlpha.name" type="text" placeholder="Alpha name">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Brief description" label-class="font-weight-bold">
        <b-form-input v-model="getAlpha.briefDescription" placeholder="Alpha brief description">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Description" label-class="font-weight-bold">
        <b-form-textarea v-model="getAlpha.description" rows="4" size="sm"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Is kernel?" label-class="font-weight-bold" label-cols="3">
        <b-form-select v-model="getAlpha.isKernel" :options="isKernelOptions">
          <template #first>
            <b-form-select-option :value="null" disabled>
              -- Please select an option --
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group label-class="font-weight-bold" label="Area or concern" label-cols="3"
                    v-if="getAlpha.isKernel">
        <b-input-group>
          <b-form-select @change="getColor"
              value-field="_id"
              text-field="name"
              v-model="aoc"
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
      <b-form-group label="Super Alpha" label-cols="3"
                    v-if="null !== getAlpha.isKernel && !getAlpha.isKernel" label-class="font-weight-bold">
        <b-form-select v-model="superAlpha" :options="superAlphaOptions">
        </b-form-select>
      </b-form-group>

      <b-button variant="outline-success">Save</b-button>
      <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
  name: "Alpha",
  data() {
    return {
      isKernelOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
      superAlpha: null,
      aoc: null,
      aocColor: '',
      superAlphaOptions: [
        {
          label: 'Kernel Alphas', options: [
            {value: '1', text: 'Requirements'},
            {value: '1', text: 'Software'},
            {value: '1', text: 'Stakeholders'},
          ]
        },
        {value: '1', text: 'Alpha 1'},
        {value: '2', text: 'Alpha 2'},
        {value: '3', text: 'Alpha 3'},
      ]
    }
  },
  computed: {
    ...mapGetters('alpha', ['getAlpha']),
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern'])
  },
  methods: {
    ...mapActions('alpha', ['defaultAlpha']),
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern']),
    onReset() {
      this.defaultAlpha();
    },
    async onLoad() {
      await this.fetchAllAreasOfConcern();
      this.aoc = this.getAllAreasOfConcern;
    },
    getColor() {
      let areaFound = this.getAllAreasOfConcern.find(area => this.aoc === area._id);
      if (areaFound) {
        this.aocColor = areaFound.colorConvention;
      }
    }
  },
  created() {
    this.onLoad();
  }
}
</script>

<style scoped>

</style>