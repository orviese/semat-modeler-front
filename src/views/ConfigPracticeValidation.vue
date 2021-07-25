<template>
  <b-container class="mb-5">
    <h4>Current practice: <strong>{{ getPractice.name }}</strong></h4>
    <p class="text-info">Here you can create new practice criteria, new validation request
      and download a simple report with finished validation requests</p>
    <b-tabs class="my-5" v-model="tabIndex" lazy @activate-tab="onTabSelectionChange">
      <b-tab title="Available Practices">
        <b-table-simple hover striped small bordered class="mt-3">
          <b-thead head-variant="dark">
            <b-th>Name</b-th>
            <b-th>Objective</b-th>
            <b-th>Tags</b-th>
            <b-th>Create Validation Request / Visualize / Download</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="practice in getPractices" :key="practice._id">
              <b-td>{{ practice.name }}</b-td>
              <b-td>{{ practice.objective }}</b-td>
              <b-td>{{ practice.tags }}</b-td>
              <b-td class="text-center">
                <b-button v-b-tooltip.hover title="Click to create a new public validation request"
                          squared size="sm"
                          @click="onCreateValidation(practice)" variant="success">
                  <b-icon-check-circle></b-icon-check-circle>
                </b-button>
                <b-button @click="onVisualizePracticeValidation(practice)"
                          v-b-tooltip.hover title="Click to visualize practice criteria and validation requests"
                          class="ml-3" variant="info" squared size="sm">
                  <b-icon-eye></b-icon-eye>
                </b-button>
                <b-button @click="onDownloadReport(practice._id)"
                          v-b-tooltip.hover title="Click to download report"
                          class="ml-3" squared size="sm">
                  <b-icon-download></b-icon-download>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
      <b-tab title="Practice Criteria">
        <b-form @submit.prevent="onSaveCriterion" @reset.prevent="clearCriterion" class="mt-5">
          <b-form-row>
            <b-col>
              <b-form-group>
                <b-form-input required size="sm" v-model="criterion.name" placeholder="Criterion Name"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group>
                <b-form-textarea required size="sm" v-model="criterion.description" rows="4"
                                 placeholder="Criterion Objective"></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-group label="Variables" label-class="font-weight-bold">
            <b-form-group v-for="variable in criterion.variables" :key="variable.index" class="border border-info p-3">
              <b-form-group>
                <b-form-input required v-model="variable.meaning" size="sm" placeholder="Variable Meaning"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input required v-model="variable.symbol" :formatter="toUpperCase" size="sm"
                              placeholder="Variable Symbol"></b-form-input>
              </b-form-group>
            </b-form-group>
          </b-form-group>
          <b-form-group>
            <b-button size="sm" @click="onAddVariable" variant="success">Add</b-button>
            <b-button class="ml-3" v-if="criterion.variables.length > 1" size="sm" @click="onRemoveVariable"
                      variant="warning">
              Remove
            </b-button>
          </b-form-group>
          <b-form-group
              label="Formula"
              description="Formula expression to be evaluated. Use these SUM[+] SUB[-] MUL[*] DIV[/] Exp[**] Parenthesis ( ) arithmetic and grouping symbols only."
              label-class="font-weight-bold">
            <b-form-group>
              <b-form-input required v-model="criterion.expression" :formatter="toUpperCase"
                            placeholder="Expression"></b-form-input>
            </b-form-group>
          </b-form-group>
          <b-form-group>
            <b-button class="ml-3 float-right" type="reset" variant="outline-dark">Clear</b-button>
            <b-button class="float-right" type="submit" variant="outline-success">Save</b-button>
            <div style="margin-bottom: 15px"></div>
          </b-form-group>
        </b-form>
        <b-form-group>
          <b-table-simple small striped hover responsive="sm" class="mt-5">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Criterion</b-th>
                <b-th>Objective</b-th>
                <b-th>Expression</b-th>
                <b-th></b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="criterion in getAllValidationCriteria" :key="criterion._id">
                <b-td v-text="criterion.name"></b-td>
                <b-td v-text="criterion.description"></b-td>
                <b-td v-text="criterion.expression"></b-td>
                <b-td>
                  <b-button @click="onDeleteCriterion(criterion)" variant="danger" squared size="sm">
                    <b-icon-trash></b-icon-trash>
                  </b-button>
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-form-group>
      </b-tab>
      <b-tab title="Created Validation Requests">
        <b-table-simple small striped hover responsive="xs" class="mt-5">
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>Link</b-th>
              <b-th>Practice</b-th>
              <b-th>Person</b-th>
              <b-th>Email</b-th>
              <b-th>Finished</b-th>
              <b-th>Comments</b-th>
              <b-th>Criteria</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="validationRequest in getAllPublicValidation" :key="validationRequest._id">
              <b-td>
                <b-button @click="onGetLink(validationRequest._id)" size="sm" squared variant="success">
                  <b-icon-link></b-icon-link>
                </b-button>
              </b-td>
              <b-td>{{ validationRequest.practice.name }}</b-td>
              <b-td>{{ validationRequest.personName }}</b-td>
              <b-td>{{ validationRequest.email }}</b-td>
              <b-td>{{ validationRequest.finished ? 'Yes' : 'No' }}</b-td>
              <b-td>{{ validationRequest.comment }}</b-td>
              <b-td>
                <b-list-group>
                  <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                      v-for="criterion in validationRequest.criteria" :key="criterion._id">
                    {{ criterion.name }}
                    <b-badge variant="info" pill>{{ criterion.result | number('0.000') }}</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-td>
              <b-td>
                <b-button @click="onRemovePublicValidationRequest(validationRequest._id)" :disabled="validationRequest.finished" variant="danger" squared size="sm">
                  <b-icon-trash></b-icon-trash>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {applicationPaths} from '@/utils/commons'

export default {
  name: "ConfigPracticeValidation",
  data() {
    return {
      tabIndex: 0,
      criterion: {
        owner: '',
        name: '',
        description: '',
        variables: [
          {index: 0, symbol: '', meaning: '', value: 1}
        ],
        expression: ''
      },
      points: []
    }
  },
  computed: {
    ...mapGetters('validatePractice',
        ['getPractice', 'getPractices', 'getAllValidationCriteria', 'getAllPublicValidation']),
    getAppURL() {
      return applicationPaths.application;
    },
    getPublicResource() {
      return applicationPaths.publicResource;
    }
  },
  methods: {
    ...mapActions('validatePractice', ['fetchAllAvailablePractices',
      'setPracticeToEdit', 'fetchAllPracticeValidationCriteria', 'removePracticeValidationCriterion',
      'newPracticeValidationCriterion', 'clearPracticeValidationConfigData', 'createPublicPracticeValidation',
      'fetchAllPublicPracticeValidationRequests', 'getPracticeValidationRequestReport',
      'removePublicPracticeValidationRequest']),
    async onCreateValidation(practice) {
      await this.clearPracticeValidationConfigData();
      await this.setPracticeToEdit(practice);
      this.criterion.owner = practice._id;
      await this.fetchAllPracticeValidationCriteria(this.criterion.owner);
      if (this.getAllValidationCriteria.length > 0) {
        let data = this.getAllValidationCriteria.map(e => {
          const {name, description, expression, variables} = e;
          return {
            name, objective: description, expression, variables
          }
        })
        await this.createPublicPracticeValidation({criteria: data});
        this.tabIndex = 2;
      } else {
        alert('Selected practice does not have any validation criteria.')
        this.tabIndex = 1;
      }
    },
    onAddVariable() {
      this.criterion.variables.push({
        index: this.criterion.variables.length,
        symbol: '',
        meaning: '',
        value: 1
      })
    },
    onRemoveVariable() {
      this.criterion.variables.pop();
    },
    toUpperCase(value) {
      return value.toUpperCase();
    },
    async onSaveCriterion() {
      if (this.getPractice._id !== '') {
        this.criterion.owner = this.getPractice._id;
        let expressionOk = true;
        let expressionWithoutOperator = this.criterion.expression.replace(/[^a-zA-Z]/mg,'');
        console.log(expressionWithoutOperator)
        for (let i = 0; i < expressionWithoutOperator.length; i++) {
          let result = this.criterion.variables.filter(e => expressionWithoutOperator.charAt(i) === e.symbol);
          if (result.length === 0){
            expressionOk = false;
            break;
          }
        }
        if (expressionOk){
          await this.newPracticeValidationCriterion(this.criterion);
          this.clearCriterion();
        }else {
          alert(`Some variable symbols present in the expression were not defined in variable list`)
        }
      }
    },
    onDeleteCriterion(criterion) {
      if (criterion) {
        this.removePracticeValidationCriterion(criterion._id);
      }
    },
    clearCriterion() {
      this.criterion = {
        owner: '',
        name: '',
        description: '',
        variables: [
          {index: 0, symbol: '', meaning: ''}
        ],
        expression: ''
      }
    },
    async onTabSelectionChange(newTabIndex) {
      if (newTabIndex === 2 && this.getPractice._id !== '') {
        await this.fetchAllPublicPracticeValidationRequests();
      }
      if (newTabIndex === 0) {
        await this.fetchAllAvailablePractices();
      }
    },
    async onRemovePublicValidationRequest(validationRequestId) {
      if (validationRequestId) {
        await this.removePublicPracticeValidationRequest(validationRequestId);
      }
    },
    onGetLink(publicValidationId) {
      this.$bvModal.msgBoxOk(
          `${this.getAppURL}/#${this.getPublicResource}${publicValidationId}`,
          {
            title: 'Information',
            size: 'lg',
            buttonSize: 'sm',
            okVariant: 'success',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: false
          })
          .then(() => {
          })
    },
    onVisualizePracticeValidation(practice) {
      this.clearPracticeValidationConfigData();
      this.setPracticeToEdit(practice);
      this.criterion.owner = practice._id;
      this.fetchAllPracticeValidationCriteria(this.criterion.owner);
      this.fetchAllPublicPracticeValidationRequests();
      this.tabIndex = 2;
    },
    async onDownloadReport(practiceId) {
      await this.getPracticeValidationRequestReport(practiceId);
    }
  },
  mounted() {
    this.fetchAllAvailablePractices();
  }
}
</script>

<style scoped>

</style>