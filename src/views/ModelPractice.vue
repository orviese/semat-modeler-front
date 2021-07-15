<template>
  <div class="container">
    <b-alert class="mt-3"
             :show="dismissCountDown"
             dismissible
             :variant="getErrorMessage === '' ? 'success' : 'danger'"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>
    <b-tabs class="mb-5" v-model="tabIndex" lazy @activate-tab="onTabSelectionChange">
      <b-tab title="Available Practices" :title-link-class="linkTabClass(0)" @click="onLoad">
        <b-table-simple hover striped small bordered class="mt-3">
          <b-thead head-variant="dark">
            <b-th>Name</b-th>
            <b-th>Objective</b-th>
            <b-th>Tags</b-th>
            <b-th></b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="practice in getPractices" :key="practice._id">
              <b-td>{{ practice.name }}</b-td>
              <b-td>{{ practice.objective }}</b-td>
              <b-td>{{ practice.tags }}</b-td>
              <b-td>
                <b-button variant="info" @click="onPracticeEdit(practice)">
                  <b-icon-pencil></b-icon-pencil>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
      <b-tab title="Practice definition" :title-link-class="linkTabClass(1)">
        <b-form class="mt-3" @submit.prevent="onSavePractice">
          <b-form-group>
          </b-form-group>
          <b-form-group>
            <b-button type="submit" squared class="float-right" variant="success">Save</b-button>
            <b-button squared class="float-right mr-3" @click="onNewPractice">New</b-button>
          </b-form-group>
          <b-form-group label-cols="2" label="Practice Name" label-class="font-weight-bold" class="color-font">
            <b-form-input required v-model="getPractice.name"
                          placeholder="Software development practice"></b-form-input>
          </b-form-group>
          <b-form-group label="Objective" label-class="font-weight-bold"
                        description="The objective of this Practice, expressed as a concise and isolated phrase. The content of this attribute should be an explicit and short statement that describes the goal that the practice pursues.">
            <b-form-textarea required rows="3" v-model="getPractice.objective"></b-form-textarea>
          </b-form-group>
          <b-form-group label="Tags" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags" tag-class="font-weight-bold" tag-pills size="md" tag-variant="info" separator=","
                v-model="getPractice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>
          <b-form-group label="Resources" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags-resource" tag-class="font-weight-bold" tag-pills size="md" tag-variant="info"
                separator=","
                v-model="getPractice.resources" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Properties" label-class="font-weight-bold"
                        description="Enter desired properties separated by comma ','">
            <b-form-tags
                input-id="tags-properties" tag-class="font-weight-bold" tag-pills size="md" tag-variant="info"
                separator=","
                v-model="getPractice.properties" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Measures" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags-measures" tag-class="font-weight-bold" tag-pills size="md" tag-variant="info"
                separator=","
                v-model="getPractice.measures" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Entries" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags-entry" tag-class="font-weight-bold" tag-pills size="md" tag-variant="info" separator=","
                v-model="getPractice.entry" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Results" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags-result" tag-class="font-weight-bold" tag-pills size="md" tag-variant="info" separator=","
                v-model="getPractice.result" placeholder="">
            </b-form-tags>
          </b-form-group>
          <div><p>{{ getPractice }}</p></div>
        </b-form>
      </b-tab>
      <b-tab title="Alphas" :title-link-class="linkTabClass(2)">
        <b-form-group class="shadow p-3 mb-5 bg-white rounded border border-info p-2" label="Alphas"
                      label-class="font-weight-bold"
                      description="Things to work with">
          <b-input-group>
            <b-form-select v-model="alphaPracticeSelected" :options="getPracticeAlphas" text-field="name"
                           value-field="_id">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Please select an alpha --</b-form-select-option>
              </template>
            </b-form-select>
            <b-input-group-append class="ml-2">
              <b-button @click="addAlphaToPractice" :disabled="alphaPracticeSelected === null" size="sm" variant="info">
                Add
              </b-button>
              <b-button @click="$bvModal.show('new-alpha')" size="sm" variant="success" class="ml-2">New</b-button>
            </b-input-group-append>
          </b-input-group>
          <b-table-simple small striped class="mt-3">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Name</b-th>
                <b-th>Description</b-th>
                <b-th>Area Of Concern</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="alpha in getPractice.ownedElements.alphas" :key="alpha._id">
                <b-td>{{ alpha.name }}</b-td>
                <b-td>{{ alpha.description }}</b-td>
                <b-td v-bind:style="{backgroundColor: findAreaOfConcernColor(alpha.areaOfConcern)}">
                  {{ findAreaOfConcernName(alpha.areaOfConcern) }}
                </b-td>
                <b-td>
                  <b-button @click="onRemoveAlphaFromPractice(alpha)" variant="danger" size="sm">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-form-group>
      </b-tab>
      <b-tab title="Work products" :title-link-class="linkTabClass(3)">
        <work-product></work-product>
        <b-table-simple small striped hover responsive="md" class="mt-2">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>Work Product</b-th>
              <b-th>Description</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="workProduct in getPractice.ownedElements.workProducts" v-bind:key="workProduct._id">
              <b-td v-text="workProduct.name"></b-td>
              <b-td v-text="workProduct.description"></b-td>
              <b-td>
                <b-button @click="setSelectedWorkProduct(workProduct)" variant="warning" size="sm" squared><b-icon-pencil></b-icon-pencil></b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>

      <b-tab title="Work product manifest" :title-link-class="linkTabClass(4)">
        <b-form-group class="shadow p-3 mb-5 bg-white rounded border border-info p-2"
                      label="Work products manifest"
                      label-align="left"
                      label-class="font-weight-bold"
                      description="Concrete work products representation to describe the alpha">
          <b-form-group label="Lower Bound" label-cols="3">
            <b-input></b-input>
          </b-form-group>
          <b-form-group label="Upper Bound" label-cols="3">
            <b-input></b-input>
          </b-form-group>
          <b-form-group label="Alpha" label-cols="3"
                        description="Alpha bound by this manifest">
            <b-form-select v-model="workProduct" :options="workProducts">
            </b-form-select>
          </b-form-group>
          <b-form-group label="Work Product" label-cols="3"
                        description="Work product bound by this manifest">
            <b-form-select v-model="workProduct" :options="workProducts">
            </b-form-select>
          </b-form-group>
          <b-form-group>
            <b-button variant="info">Add</b-button>
          </b-form-group>

          <b-form-group>
            <b-table-simple small striped class="mt-2">
              <b-thead>
                <b-tr>
                  <b-th>Alpha</b-th>
                  <b-th>Work Product</b-th>
                  <b-th>Lower Bound</b-th>
                  <b-th>Upper Bound</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td>Stakeholders</b-td>
                  <b-td>UAT</b-td>
                  <b-td>0</b-td>
                  <b-td>1</b-td>
                  <b-td>
                    <b-button-group>

                    </b-button-group>
                  </b-td>
                </b-tr>
                <b-tr>
                  <b-td>Solution</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
                <b-tr style="">
                  <b-td>Endeavor</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
                <b-tr>
                  <b-td>Endeavor</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
                <b-tr>
                  <b-td>Endeavor</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-form-group>
        </b-form-group>
      </b-tab>

      <b-tab title="Activities" :title-link-class="linkTabClass(5)">
        <b-form-group description="Available activity spaces" label="Activity Spaces" label-class="font-weight-bold"
                      class="shadow p-3 mb-5 bg-white rounded border border-info p-2">
          <b-input-group>
            <b-form-select
                value-field="id"
                text-field="name"
                v-model="activitySpaceSelected" :options="activitySpaces">
            </b-form-select>
            <b-input-group-append class="ml-2">
              <b-button variant="info">Add</b-button>
            </b-input-group-append>
          </b-input-group>
          <p class="text-center text-black-50 bg-warning mt-3">Available activity spaces</p>
          <b-table-simple small striped hover outlined class="mt-3">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Activity Space</b-th>
                <b-th>Area of concern</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td>Shape the system</b-td>
                <b-td></b-td>
                <b-td></b-td>
              </b-tr>
              <b-tr>
                <b-td>Understand requirements</b-td>
                <b-td></b-td>
                <b-td></b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <b-form-group label="Activities" label-class="font-weight-bold" description="Things to do">
            <b-form-group label="Activity Space that organize the activity">
              <b-form-select
                  value-field="id"
                  text-field="name"
                  v-model="activitySpaceSelected" :options="activitySpaces"></b-form-select>
            </b-form-group>
            <b-form-group label="Activity">
              <b-input-group>
                <b-form-select v-model="workProduct" :options="workProducts">
                </b-form-select>
                <b-input-group-append class="ml-2">
                  <b-button variant="info">Add</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>

            <b-table-simple small striped hover class="mt-3">
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>Activity</b-th>
                  <b-th></b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-form-group>

        </b-form-group>

      </b-tab>

      <b-tab title="Patterns" :title-link-class="linkTabClass(6)">

      </b-tab>
    </b-tabs>

    <b-row>
      <b-col>
        <b-form class="mb-5">
        </b-form>
      </b-col>
    </b-row>

    <b-modal hide-footer id="new-alpha"
             ref="modal"
             title="Add new alpha to practice">
      <alpha v-on:new-sub-alpha="newSubAlpha"
             include-super-alpha :practice="getPractice._id"></alpha>
    </b-modal>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Alpha from "@/components/Alpha";
import WorkProduct from "@/components/WorkProduct";

export default {
  name: "ModelPractice",
  components: {WorkProduct, Alpha},
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      tabIndex: 0,
      alertMessage: '',
      practice: {
        id: '',
        name: '',
        objective: '',
        tags: [],
        resources: [],
        properties: [],
        measures: [],
        entry: [],
        result: []
      },
      options: [
        {value: {id: '1', value: 'Apple'}},
        {value: {id: '2', value: 'Orange'}},
        {value: {id: '3', value: 'Banana'}},
        {value: {id: '4', value: 'Lime'}}
      ],
      value: [],
      workProduct: null,
      workProducts: [],
      alphaPracticeSelected: null,
      alphasSelected: [],
      activitySpaces: [
        {id: '1', name: 'Explore possibilities', areaOfConcern: ''},
        {id: '2', name: 'Understand the requirements', areaOfConcern: ''},
        {id: '3', name: 'Test the system', areaOfConcern: ''},
        {id: '4', name: 'Coordinate activity', areaOfConcern: ''},
        {id: '5', name: 'Support the team', areaOfConcern: ''},
      ],
      activitySpaceSelected: null
    }
  },
  computed: {
    ...mapGetters('practice', ['getPractice', 'getPractices', 'getErrorMessage', 'getInfoMessage']),
    ...mapGetters('alpha', ['getPracticeAlphas']),
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern'])
  },
  methods: {
    ...mapActions('practice',
        ['create', 'updatePractice', 'fetchAvailablePractices', 'removeAlphaFromPractice',
          'setPracticeToEdit', 'defaultPractice', 'addAlphaPractice', 'updateWorkProduct']),
    ...mapActions('alpha', ['fetchAllPracticeAlphas']),
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern']),
    ...mapActions('workProduct', ['defaultWorkProduct', 'setSelectedWorkProduct']),
    findAreaOfConcernColor(areaOfConcernId) {
      let foundAC = this.getAllAreasOfConcern.find(e => e._id === areaOfConcernId);
      if (foundAC) {
        return foundAC.colorConvention;
      }
      return '';
    },
    findAreaOfConcernName(areaOfConcernId) {
      let foundAC = this.getAllAreasOfConcern.find(e => e._id === areaOfConcernId);
      if (foundAC) {
        return foundAC.name;
      }
      return 'NOT FOUND';
    },
    onRemoveAlphaFromPractice(alpha) {
      this.removeAlphaFromPractice({
        practice: this.getPractice._id,
        alpha: alpha._id
      });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    newSubAlpha() {
      console.log('New sub alpha created')
    },
    async onSavePractice() {
      this.dismissCountDown = this.dismissSecs;
      if (this.getPractice._id === '') {
        await this.create(this.getPractice);
      } else {
        await this.updatePractice(this.getPractice)
      }
      this.alertMessage = this.getErrorMessage === '' ? this.getInfoMessage : this.getErrorMessage;
    },
    async onLoad() {
      await this.fetchAvailablePractices();
      await this.fetchAllAreasOfConcern();
    },
    onNewPractice() {
      this.defaultPractice();
    },
    linkTabClass(index) {
      if (this.tabIndex === index) {
        return ['bg-warning', 'text-white', 'font-weight-bold']
      } else {
        return ['bg-light', 'text-secondary']
      }

    },
    onTabSelectionChange(newTabIndex) {
      if (newTabIndex === 2) {
        this.fetchAllPracticeAlphas(this.getPractice._id);
      }
    },
    async onPracticeEdit(practice) {
      this.tabIndex = 1;
      await this.setPracticeToEdit(practice);
    },
    async addAlphaToPractice() {
      if (this.tabIndex === 2 && this.alphaPracticeSelected !== null) {
        let alpha = this.getPracticeAlphas.find(e => e._id === this.alphaPracticeSelected);
        console.log('Alpha to add .... ' + JSON.stringify(alpha));
        //if (!alpha.isKernel) {
        await this.addAlphaPractice({
          name: alpha.name,
          description: alpha.description,
          areaOfConcern: alpha.areaOfConcern,
          parent: alpha.isKernel ? '' : alpha.superAlpha,
          isKernel: alpha.isKernel
        });
        //}
      }
    },
    async onEditWorkProduct(workProduct) {
      await this.updateWorkProduct(workProduct);
      this.defaultWorkProduct();
    }
  },
  created() {
    console.log('mounted model practice');
    //this.onLoad();
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style scoped>
.color-font {
  color: black;
  font-weight: bold;
  /*background-color: darkgoldenrod;*/
}
</style>