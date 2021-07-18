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
    <b-form-group>
      <h5 class="text-center">Editing practice: <strong class="text-success" v-text="getPractice.name"></strong></h5>
    </b-form-group>
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
            <b-form-select v-model="alphaPracticeSelected"
                           :options="getKernelAndPracticeAlphasForSelect" text-field="name"
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
              <b-tr v-for="alpha in getOwnedAlphas" :key="alpha._id">
                <b-td>{{ alpha.name }}</b-td>
                <b-td>{{ alpha.description }}</b-td>
                <b-td v-bind:style="{backgroundColor: alpha.areaOfConcern.colorConvention}">
                  {{ alpha.areaOfConcern.name }}
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
                <b-button @click="setSelectedWorkProduct(workProduct)" variant="warning" size="sm" squared>
                  <b-icon-pencil></b-icon-pencil>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
      <b-tab title="Work product manifest" :title-link-class="linkTabClass(4)">
        <b-form
            @submit.prevent="onSaveWorkProductManifest"
            @reset.prevent="defaultWorkProduct" class="my-3 mx-3">
          <b-form-group class="shadow p-3 mb-5 bg-white rounded border border-info p-2"
                        label="Work products manifest"
                        label-align=""
                        label-class="font-weight-bold"
                        description="Concrete work products representation to describe the alpha">
            <b-form-group label="">
              <b-input v-model="getWorkProductManifest.lowerBound" required placeholder="Lower Bound"></b-input>
            </b-form-group>
            <b-form-group label="">
              <b-input v-model="getWorkProductManifest.upperBound" required placeholder="Upper Bound"></b-input>
            </b-form-group>
            <b-form-group label=""
                          description="Alpha bound by this manifest">
              <b-form-select required v-model="getWorkProductManifest.alpha"
                             value-field="_id"
                             text-field="name"
                             :options="getPractice.ownedElements.alphas">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select an alpha --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group label=""
                          description="Work product bound by this manifest">
              <b-form-select required v-model="getWorkProductManifest.workProduct"
                             value-field="_id"
                             text-field="name"
                             :options="getPractice.ownedElements.workProducts">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select a work product --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-button type="submit" variant="outline-success">Save</b-button>
            <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
            <b-form-group class="mt-3">
              <b-table-simple small striped responsive="md" hover class="mt-2">
                <b-thead head-variant="dark">
                  <b-tr>
                    <b-th>Alpha</b-th>
                    <b-th>Work Product</b-th>
                    <b-th>Lower Bound</b-th>
                    <b-th>Upper Bound</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr v-for="wpm in getAllWorkProductManifests" v-bind:key="wpm._id">
                    <b-td v-bind:style="{backgroundColor: wpm.alpha.areaOfConcern.colorConvention}"
                          v-text="wpm.alpha.name"></b-td>
                    <b-td v-text="wpm.workProduct.name"></b-td>
                    <b-td v-text="wpm.lowerBound"></b-td>
                    <b-td v-text="wpm.upperBound"></b-td>
                    <b-td>
                      <b-button @click="onRemoveWorkProductManifest(wpm)"
                                squared size="sm" variant="danger">
                        <b-icon-trash></b-icon-trash>
                      </b-button>
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-form-group>
          </b-form-group>
        </b-form>
      </b-tab>
      <b-tab title="Activities" :title-link-class="linkTabClass(5)">
        <b-form-group description="Available activity spaces for this practice"
                      label="Activity Spaces to represent this practice" label-class="font-weight-bold"
                      class="shadow p-3 mb-3 bg-white rounded border border-info p-2">
          <b-input-group>
            <b-form-select
                value-field="_id"
                text-field="name"
                v-model="activitySpaceSelected" :options="getActivitySpaces">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Please select an activity space --
                </b-form-select-option>
              </template>
            </b-form-select>
            <b-input-group-append class="ml-2">
              <b-button @click="onAddingActivitySpace" :disabled="activitySpaceSelected === null" variant="info">Add
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <p class="text-center text-dark bg-active mt-3">
            Available activity spaces for this practice to organize activities</p>
          <b-table-simple small striped hover responsive="md" table-variant="light" class="mt-3">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Activity Space</b-th>
                <b-th>Area of concern</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="activitySpace in getPractice.ownedElements.activitySpaces" :key="activitySpace._id">
                <b-td v-text="activitySpace.name"></b-td>
                <b-td
                    v-bind:style="{backgroundColor: activitySpace.areaOfConcern.colorConvention}"
                    v-text="activitySpace.areaOfConcern.name"></b-td>
                <b-td>
                  <b-button @click="onRemoveActivitySpace(activitySpace)" size="sm" squared variant="danger">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-form-group>

        <b-form-group label="Activities" label-class="font-weight-bold" description="Things to do"
                      class="shadow p-3 bg-white rounded border border-info p-2">
          <b-form @submit.prevent="onSavePracticeActivity" @reset.prevent="onClearActivity">
            <b-form-group
                description="Select an activity space to group activities"
                label="">
              <b-form-select required
                             value-field="_id"
                             text-field="name"
                             :options="getPractice.ownedElements.activitySpaces"
                             v-model="activitySpaceSelectedForActivity">
                <template #first>
                  <b-form-select-option :value="null" disabled>** Select Activity Space **</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group description="Representative name for the activity">
              <b-form-input v-model="activityName" required placeholder="Activity Name">
              </b-form-input>
            </b-form-group>
            <b-form-group description="Competency required to accomplish the activity (Optional)">
              <b-form-checkbox-group size="lg"
                                     v-model="selectedCompetencies"
                                     :options="getCompetencies"
                                     text-field="name"
                                     value-field="_id" name="competencies">

              </b-form-checkbox-group>
            </b-form-group>
            <b-button type="submit" variant="outline-success">Save</b-button>
            <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
          </b-form>

          <b-table-simple small striped hover responsive="sm" class="mt-3">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Activity Space</b-th>
                <b-th>Activity</b-th>
                <b-th>Competencies (Level)</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="activityAssociation in getPractice.ownedElements.activityAssociations"
                    :key="activityAssociation._id">
                <b-td v-bind:style="{backgroundColor: activityAssociation.end2.areaOfConcern.colorConvention}"
                      v-text="activityAssociation.end2.name"></b-td>
                <b-td v-bind:style="{backgroundColor: activityAssociation.end2.areaOfConcern.colorConvention}"
                      v-text="activityAssociation.end1.name"></b-td>
                <!--
                <b-td v-text="getCompetencyNames(activityAssociation.end1.requiredCompetencyLevel)"></b-td>
                -->
                <b-td>
                  <b-list-group size="sm">
                    <b-list-group-item size="sm"
                        class="d-flex justify-content-between align-items-center"
                        v-for="competency in activityAssociation.end1.requiredCompetencyLevel"
                        :key="competency._id">
                      {{ competency.name }}
                      <b-badge variant="dark" pill>5</b-badge>
                    </b-list-group-item>
                  </b-list-group>
                </b-td>
                <b-td class="align-items-center">
                  <b-button @click="onDeletePracticeActivity(activityAssociation)" size="sm" squared variant="danger"><b-icon-trash></b-icon-trash></b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
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
      activitySpaceSelected: null,
      activitySpaceSelectedForActivity: null,
      selectedCompetencies: [],
      activityName: '',
    }
  },
  computed: {
    ...mapGetters('practice', ['getPractice', 'getPractices', 'getErrorMessage', 'getInfoMessage',
      'getOwnedAlphas']),
    ...mapGetters('alpha', ['getKernelAndPracticeAlphasForSelect']),
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern']),
    ...mapGetters('workProductManifest', ['getAllWorkProductManifests', 'getWorkProductManifest']),
    ...mapGetters('activitySpace', ['getActivitySpaces']),
    ...mapGetters('competency', ['getCompetencies'])
  },
  methods: {
    ...mapActions('practice',
        ['create', 'updatePractice', 'fetchAvailablePractices', 'removeAlphaFromPractice',
          'setPracticeToEdit', 'defaultPractice', 'addAlphaPractice', 'updateWorkProduct',
          'addActivitySpace','removeActivitySpace', 'addPracticeActivity', 'removePracticeActivity']),
    ...mapActions('alpha', ['fetchAllPracticeAlphas']),
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern']),
    ...mapActions('workProduct', ['defaultWorkProduct', 'setSelectedWorkProduct']),
    ...mapActions('workProductManifest',
        ['fetchAllWorkProductManifests', 'defaultWorkProduct',
          'defaultWorkProductManifests', 'createWorkProductManifest', 'deleteWorkProductManifest']),
    ...mapActions('activitySpace', ['fetchAllActivitySpaces']),
    async onRemoveAlphaFromPractice(alpha) {
      await this.removeAlphaFromPractice({
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
      this.defaultWorkProductManifests();
    },
    linkTabClass(index) {
      if (this.tabIndex === index) {
        return ['bg-warning', 'text-white', 'font-weight-bold']
      } else {
        return ['bg-light', 'text-secondary']
      }

    },
    onTabSelectionChange(newTabIndex) {
      if (newTabIndex === 2 && this.getPractice._id !== '') {
        this.fetchAllPracticeAlphas(this.getPractice._id);
      }
      if (newTabIndex === 5) {
        this.activitySpaceSelected = null;
      }
    },
    async onPracticeEdit(practice) {
      this.tabIndex = 1;
      this.defaultWorkProductManifests();
      await this.setPracticeToEdit(practice);
      this.fetchAllWorkProductManifests(practice._id);
    },
    async addAlphaToPractice() {
      if (this.tabIndex === 2 && this.alphaPracticeSelected !== null) {
        //let alpha = this.getPracticeAlphas.find(e => e._id === this.alphaPracticeSelected);
        console.log('Alpha to add .... ' + JSON.stringify(this.alphaPracticeSelected));
        //if (!alpha.isKernel) {
        await this.addAlphaPractice(this.alphaPracticeSelected);
        //}
      }
    },
    async onSaveWorkProductManifest() {
      if (this.getPractice._id !== '' && this.getPractice._id !== null) {
        await this.createWorkProductManifest(this.getPractice._id);
      }
    },
    async onRemoveWorkProductManifest(workProductManifest) {
      await this.deleteWorkProductManifest(workProductManifest);
    },
    async onAddingActivitySpace() {
      if (this.activitySpaceSelected !== null && this.getPractice._id !== '') {
        await this.addActivitySpace({
          practice: this.getPractice._id,
          activitySpace: this.activitySpaceSelected
        });
      }
    },
    async onRemoveActivitySpace(ownedActivitySpace) {
      if (this.getPractice._id !== '') {
        this.deleteAS = false;
        try {
          this.deleteAS = await this.$bvModal.msgBoxConfirm(
              `Are you sure to delete this: ${ownedActivitySpace.name} Activity Space? \n
              Be cautious if this activity space is already associated with other activities`,
              {
                title: 'Please Confirm removal',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'Yes',
                cancelTitle: 'No',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
              })
          if (this.deleteAS) {
            console.log('removing ...  AS')
            await this.removeActivitySpace({
              practice: this.getPractice._id,
              activitySpace: ownedActivitySpace._id
            });
          }
        }catch (e) {
          this.deleteAS = false;
        }
      }
    },
    async onSavePracticeActivity() {
      if (this.getPractice._id !== '') {
        const data = {
          practice: this.getPractice._id,
          activitySpace: this.activitySpaceSelectedForActivity,
          name: this.activityName,
          competencies: this.selectedCompetencies
        }
        await this.addPracticeActivity(data);
      }
    },
    async onDeletePracticeActivity(activityAssociation) {
      if (this.getPractice._id !== '') {
        const data = {
          practice: this.getPractice._id,
          activityAssociation: activityAssociation._id,
          activity: activityAssociation.end1._id
        }
        await this.removePracticeActivity(data);
        this.onClearActivity();
      }
    },
    onClearActivity() {
      this.activityName = '';
      this.selectedCompetencies = [];
      this.activitySpaceSelectedForActivity = null;
    }
  },
  created() {
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