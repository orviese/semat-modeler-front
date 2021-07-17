<template>
<div class="container">
  <b-row>
    <b-col>
      <b-form @submit.prevent="onSave" @reset.prevent="" class="my-3 mx-3">
        <b-form-group label="" label-class="font-weight-bold">
          <b-form-input required v-model="getActivitySpace.name" placeholder="Activity Space Name"></b-form-input>
        </b-form-group>
        <b-form-group label="" label-class="font-weight-bold">
          <b-form-textarea required v-model="getActivitySpace.description" placeholder="Description" rows="3"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Is kernel?" label-cols="2" label-class="font-weight-bold">
          <b-form-select :disabled="!this.includeSuperActivitySpace" required v-model="getActivitySpace.isKernel" :options="isKernelOptions">
            <template #first>
              <b-form-select-option :value="null" disabled>
                -- Please select an option --
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Area or concern" label-cols="2"
                      v-if="getActivitySpace.isKernel" label-class="font-weight-bold">
          <b-input-group>
            <b-form-select :required="getActivitySpace.isKernel ? true : false"
                v-model="getActivitySpace.areaOfConcern"
                value-field="_id"
                text-field="name"
                :options="getAllAreasOfConcern">
              <template #first>
                <b-form-select-option :value="null" disabled>
                  -- Please select an area of concern --
                </b-form-select-option>
              </template>
            </b-form-select>
            <!--
            <b-input-group-append class="ml-2">
              <b-button variant="">Add new</b-button>
            </b-input-group-append> -->
          </b-input-group>
        </b-form-group>
        <!--
        <b-form-group label="Required Alphas as inputs" label-class="font-weight-bold">
          <b-form-select v-model="inputAlpha">
            <template #first>
              <b-form-select-option :value="null" disabled>
                -- Please select --
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        -->
        <b-button type="submit" variant="outline-success">Save</b-button>
        <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
      </b-form>
    </b-col>
  </b-row>
</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: "ActivitySpace",
  props: {
    includeSuperActivitySpace: Boolean,
    practice: String
  },
  data() {
    return {
      isKernel: null,
      inputAlpha: null,
      inputAlphas: [],
      isKernelOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
      selectedAOC: null
    }
  },
  computed: {
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern']),
    ...mapGetters('activitySpace', ['getActivitySpace', 'getActivitySpaces'])
  },
  methods: {
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern']),
    ...mapActions('activitySpace', ['defaultActivitySpace', 'fetchAllActivitySpaces',
      'updateActivitySpace', 'createActivitySpace']),
    async onLoad() {
      await this.fetchAllAreasOfConcern();
      if (!this.includeSuperActivitySpace){
        this.getActivitySpace.isKernel = true;
      }
    },
    onSave() {
      if(this.getActivitySpace._id !== '') {
          this.updateActivitySpace(this.getActivitySpace);
      } else {
        console.log('saving new ...... ');
        this.createActivitySpace(this.getActivitySpace);
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