<template>
  <b-container class="mb-5">
    <h4>Config validation for practice: <strong>{{ getPractice.name }}</strong></h4>
    <b-tabs class="my-5" v-model="tabIndex" lazy @activate-tab="onTabSelectionChange">
      <b-tab title="Available Practices">
        <b-table-simple hover striped small bordered class="mt-3">
          <b-thead head-variant="dark">
            <b-th>Name</b-th>
            <b-th>Objective</b-th>
            <b-th>Tags</b-th>
            <b-th>Create Validation / Look</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="practice in getPractices" :key="practice._id">
              <b-td>{{ practice.name }}</b-td>
              <b-td>{{ practice.objective }}</b-td>
              <b-td>{{ practice.tags }}</b-td>
              <b-td class="text-center">
                <b-button v-b-tooltip.hover title="Click to create a new public validation"
                          squared size="sm"
                          @click="onCreateValidation(practice)" variant="success">
                  <b-icon-check-circle></b-icon-check-circle>
                </b-button>
                <b-button @click="onVisualizePracticeValidation(practice)"
                          v-b-tooltip.hover title="Click to visualize practice criteria and validations"
                          class="ml-3" variant="info" squared size="sm">
                  <b-icon-eye></b-icon-eye>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
      <b-tab title="Practice Criteria">
        <b-form @submit.prevent="onSaveCriterion" @reset.prevent="clearCriterion" class="mt-5">
          <b-form-group>
            <b-form-input v-model="criterion.name" placeholder="Criterion Name"></b-form-input>
          </b-form-group>
          <b-form-group>
            <b-form-textarea v-model="criterion.description" rows="3"
                             placeholder="Criterion Objective"></b-form-textarea>
          </b-form-group>
          <b-form-group label="Variables" label-class="font-weight-bold">
            <b-form-group v-for="variable in criterion.variables" :key="variable.index" class="border border-info p-3">
              <b-form-group>
                <b-form-input v-model="variable.meaning" size="sm" placeholder="Variable Meaning"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input v-model="variable.symbol" :formatter="toUpperCase" size="sm"
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
              <b-form-input v-model="criterion.expression" :formatter="toUpperCase"
                            placeholder="Expression"></b-form-input>
            </b-form-group>
          </b-form-group>
          <b-form-group>
            <b-button class="ml-3 float-right" type="reset" variant="outline-dark">Clear</b-button>
            <b-button class="float-right" type="submit" variant="outline-success">Save</b-button>
            <div style="margin-bottom: 15px"></div>
          </b-form-group>
        </b-form>
        <b-form-group class="border border-info p-3">
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
      <b-tab title="Created Validations">
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
            <b-tr v-for="result in getAllPublicValidation" :key="result._id">
              <b-td>
                <b-button @click="onGetLink(result._id)" size="sm" squared variant="success">
                  <b-icon-link></b-icon-link>
                </b-button>
              </b-td>
              <b-td>{{ result.practice.name }}</b-td>
              <b-td>{{ result.personName }}</b-td>
              <b-td>{{ result.email }}</b-td>
              <b-td>{{ result.finished ? 'Yes' : 'No' }}</b-td>
              <b-td>{{ result.comment }}</b-td>
              <b-td>
                <b-list-group>
                  <b-list-group-item
                      class="d-flex justify-content-between align-items-center"
                      v-for="criterion in result.criteria" :key="criterion._id">
                    {{ criterion.name }}
                    <b-badge variant="info" pill>{{ criterion.result }}</b-badge>
                  </b-list-group-item>
                </b-list-group>
              </b-td>
              <b-td>
                <b-button :disabled="result.finished" variant="danger" squared size="sm">
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
        ['getPractice', 'getPractices', 'getAllValidationCriteria',
          'getAllPracticeValidationSummary', 'getAllPublicValidation']),
    getAppURL() {
      return applicationPaths.application;
    },
    getPublicResource() {
      return applicationPaths.publicResource;
    }
  },
  methods: {
    ...mapActions('validatePractice', ['fetchAvailablePractices',
      'setPracticeToEdit', 'fetchAllPracticeValidationCriteria',
      'removePracticeValidationCriterion', 'create',
      'savePracticeValidationResult', 'fetchAllValidationCriteriaSummary',
      'removeValidationsFromCriterion', 'clearConfigValidationData',
      'createPublicPracticeValidation', 'fetchAllPublicPracticeValidations']),
    async onCreateValidation(practice) {
      this.clearConfigValidationData();
      this.setPracticeToEdit(practice);
      this.criterion.owner = practice._id;
      await this.fetchAllPracticeValidationCriteria(this.criterion.owner);
      await this.fetchAllPublicPracticeValidations();
      console.log(this.getAllValidationCriteria.length);
      if (this.getAllValidationCriteria.length > 0) {
        console.log('creation public validation');
        let data = this.getAllValidationCriteria.map(e => {
          const {name, objective, expression, variables} = e;
          return {
            name, objective, expression, variables
          }
        })
        await this.createPublicPracticeValidation({
          criteria: data
        });
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
        meaning: ''
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
        await this.create(this.criterion);
        this.clearCriterion();
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
    async onSaveValidationResults() {
      const dataToSend = this.getAllValidationCriteria.map(e => {
        return {
          criterionId: e._id,
          variables: e.variables,
          result: e.result
        }
      });
      await this.savePracticeValidationResult({
        criteria: dataToSend
      });

      this.getAllValidationCriteria.forEach(criteria => {
        criteria.variables.forEach(v => {
          v.value = 1;
        })
      })
    },

    async onTabSelectionChange(newTabIndex) {
      if ((newTabIndex === 3 || newTabIndex === 2) && this.getPractice._id !== '') {
        await this.fetchAllValidationCriteriaSummary(this.getPractice._id);
      }
    },

    async onRemoveValidations(criterionId) {
      if (criterionId) {
        console.log('Removing criterion validations... ' + criterionId)
        await this.removeValidationsFromCriterion(criterionId);
      }
    },
    onGetLink(publicValidationId) {
      alert(`Link to validate practice: \n ${this.getAppURL}/#${this.getPublicResource} ${publicValidationId}`)
    },
    onVisualizePracticeValidation(practice) {
      this.clearConfigValidationData();
      this.setPracticeToEdit(practice);
      this.criterion.owner = practice._id;
      this.fetchAllPracticeValidationCriteria(this.criterion.owner);
      this.fetchAllPublicPracticeValidations();
      this.tabIndex = 2;
    }

  },
  mounted() {
    this.fetchAvailablePractices();
  }
}
</script>

<style scoped>

</style>