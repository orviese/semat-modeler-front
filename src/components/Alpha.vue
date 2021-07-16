<template>
  <b-container>
    <b-form @submit.prevent="onSave" @reset.prevent="onReset" class="mb-5">
      <b-form-group label-class="font-weight-bold">
        <b-form-input v-model="getAlpha.name" type="text" placeholder="Alpha Name" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label-class="font-weight-bold">
        <b-form-input v-model="getAlpha.briefDescription" placeholder="Alpha brief description" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label-class="font-weight-bold">
        <b-form-textarea placeholder="More complete description" v-model="getAlpha.description" rows="4" size="sm" required></b-form-textarea>
      </b-form-group>

      <b-form-group label="Is kernel?" label-class="font-weight-bold" label-cols="3">
        <b-form-select v-bind:disabled="!includeSuperAlpha" v-model="getAlpha.isKernel" :options="isKernelOptions" required>
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
          <b-form-select :required="getAlpha.isKernel !== null && getAlpha.isKernel" @change="getColor"
                         value-field="_id"
                         text-field="name"
                         v-model="getAlpha.areaOfConcern._id"
                         :options="getAllAreasOfConcern">
            <template #first>
              <b-form-select-option :value="null" disabled>-- Please select an area of concern --</b-form-select-option>
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
                    v-if="null !== getAlpha.isKernel
                    && !getAlpha.isKernel" label-class="font-weight-bold">
        <b-form-select :required="getAlpha.isKernel === false && includeSuperAlpha === true"
                       v-model="getAlpha.superAlpha._id"
                       value-field="_id"
                       text-field="name"
                       :options="getKernelAlphas">
        </b-form-select>
      </b-form-group>

      <b-button variant="outline-success" type="submit">Save</b-button>
      <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Alpha",
  props: {
    includeSuperAlpha: Boolean,
    practice: String
  },
  data() {
    return {
      isKernelOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
      superAlpha: null,
      aoc: null,
      aocColor: '',
    }
  },
  computed: {
    ...mapGetters('alpha', ['getAlpha', 'getAlphas']),
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern']),
    getKernelAlphas() {
      return [{
        label: 'Kernel Alphas', options: this.getAlphas.filter(alpha => alpha.isKernel)
      }]
    }
  },
  methods: {
    ...mapActions('alpha', ['defaultAlpha', 'createAlpha', 'updateAlpha', 'fetchAllAlphas', 'setAlphaOwner']),
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern']),
    async onReset() {
      await this.defaultAlpha(this.includeSuperAlpha);
    },
    async onSave() {
      if (this.getAlpha.superAlpha !== null) {
        let superAlpha = this.getAlphas.find(e => e._id === this.getAlpha.superAlpha._id);
        if (superAlpha !== null && superAlpha !== undefined) {
          this.getAlpha.areaOfConcern._id = superAlpha.areaOfConcern._id;
        }
      }
      if (this.getAlpha._id === null || this.getAlpha._id === '') {
        if (null !== this.practice &&  '' !== this.practice) {
          this.setAlphaOwner(this.practice);
        }
        await this.createAlpha(this.getAlpha);
      } else {
        await this.updateAlpha(this.getAlpha);
      }
      await this.onReset();
      this.$emit('new-sub-alpha');
    },
    async onLoad() {
      await this.fetchAllAreasOfConcern();
      this.aoc = this.getAllAreasOfConcern;
      if (!this.includeSuperAlpha) {
        this.getAlpha.isKernel = true;
      } else {
        await this.fetchAllAlphas();
      }
    },
    getColor() {
      let areaFound = this.getAllAreasOfConcern.find(area => this.getAlpha.areaOfConcern === area._id);
      if (areaFound) {
        this.aocColor = areaFound.colorConvention;
      } else {
        this.aocColor = '';
      }
    }
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style scoped>

</style>