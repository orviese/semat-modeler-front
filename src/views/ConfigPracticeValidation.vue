<template>
  <b-container class="mb-5">
    <h4>Config validation for practice: <strong>{{ getPractice.name }}</strong></h4>
    <b-tabs class="my-5" v-model="tabIndex" lazy @activate-tab="onTabSelectionChange" >
      <b-tab title="Available Practices">
        <b-table-simple hover striped small bordered class="mt-3">
          <b-thead head-variant="dark">
            <b-th>Name</b-th>
            <b-th>Objective</b-th>
            <b-th>Tags</b-th>
            <b-th>Create Validation</b-th>
          </b-thead>
          <b-tbody>
            <b-tr v-for="practice in getPractices" :key="practice._id">
              <b-td>{{ practice.name }}</b-td>
              <b-td>{{ practice.objective }}</b-td>
              <b-td>{{ practice.tags }}</b-td>
              <b-td class="text-center">
                <b-button @click="onValidate(practice)" variant="success">
                  <b-icon-check-circle></b-icon-check-circle>
                </b-button>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
      <b-tab title="Criteria">
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
      <b-tab title="Validations"></b-tab>
      <b-tab title="Validate">
        <b-form @submit.prevent="onSaveValidationResults" class="mt-5">
          <b-form-group label="Criteria List" label-class="font-weight-bold bg-warning">
            <b-form-group
                label-class="font-weight-bold"
                :id="criterion._id" :label="criterion.name"
                v-for="criterion in getAllValidationCriteria"
                :key="criterion._id">
              <b-form-group :description="variable.meaning"
                  label-class="font-weight-bold" label-cols="2" :label="variable.symbol"
                  v-for="variable in criterion.variables"
                  :key="variable._id">
                <b-form-input required v-on:keypress="isNumber($event, variable.value)" type="number"
                              v-model="variable.value"></b-form-input>
              </b-form-group>
              <b-form-group label-class="font-weight-bold" label-cols="2"
                            label="Result" :description="`Formula expression: ${getExpressionResult(criterion)}`">
                <b-form-input v-model="criterion.result"  disabled>
                </b-form-input>
              </b-form-group>
            </b-form-group>
          </b-form-group>
          <b-form-group>
            <b-button class="ml-3 float-right" type="reset" variant="outline-dark">Clear</b-button>
            <b-button class="float-right" type="submit" variant="outline-success">Save</b-button>
          </b-form-group>
          <b-form-group>
            <b-table-simple small striped hover responsive="xs" class="mt-5">
              <b-thead head-variant="dark">
                <b-tr>
                  <b-th>Criterion</b-th>
                  <!--<b-th>Description</b-th>-->
                  <b-th>Expression</b-th>
                  <b-th>Avg. Results</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <!--
                <b-tr v-for="result in getAllValidationCriteria" :key="result._id">
                  <b-td>{{ result.name }}</b-td>
                  <b-td>{{ result.description }}</b-td>
                  <b-td>{{ result.expression }}</b-td>
                  <b-td>
                    <b-button-group vertical size="sm">
                      <b-button class="ml-1" size="sm"
                                v-for="validation in result.validations"
                                :key="validation._id">
                        {{ validation.formulaResult | number('0.00') }}
                        <b-icon-trash></b-icon-trash>
                      </b-button>
                    </b-button-group>
                  </b-td>
                  <b-td>
                    <b-button variant="danger" squared size="sm">
                      <b-icon-trash></b-icon-trash>
                    </b-button>
                  </b-td>
                </b-tr>
                -->
                <b-tr v-for="summary in getAllPracticeValidationSummary" :key="summary._id.criterion">
                  <b-td>{{summary._id.name}}</b-td>
                  <b-td>{{summary._id.expression}}</b-td>
                  <b-td>{{summary.average | number('0.00')}}</b-td>
                  <b-td>
                    <b-button @click="onRemoveValidations(summary._id.criterion)" variant="danger" squared size="sm">
                      <b-icon-trash></b-icon-trash>
                    </b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-form-group>
        </b-form>
      </b-tab>
      <b-tab title="Summary" disabled>
        <vue-bar-graph class="my-5 mx-5"
                       :points="getGraphPoints"
                       :width="400"
                       :height="200"
                       :show-y-axis="true"
                       :show-x-axis="true"/>
      </b-tab>
    </b-tabs>

  </b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import VueBarGraph from 'vue-bar-graph';

export default {
  name: "ValidatePractice",
  components: {
    VueBarGraph
  },
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
        ['getPractice', 'getPractices', 'getAllValidationCriteria', 'getAllPracticeValidationSummary']),
    getGraphPoints() {
      return this.getAllPracticeValidationSummary.map(el => {
        return {
          label: el._id.name,
          value: el.average
        }
      });
    },
  },
  methods: {
    ...mapActions('validatePractice', ['fetchAvailablePractices',
      'setPracticeToEdit', 'fetchAllPracticeValidationCriteria',
      'removePracticeValidationCriterion', 'create',
      'savePracticeValidationResult', 'fetchAllValidationCriteriaSummary', 'removeValidationsFromCriterion']),
    isNumber(event, variableValue) {
      if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(variableValue)))
        return event.preventDefault();
    },
    onValidate(practice) {
      this.tabIndex = 1;
      this.setPracticeToEdit(practice);
      this.criterion.owner = practice._id;
      this.fetchAllPracticeValidationCriteria(this.criterion.owner);
      this.fetchAllValidationCriteriaSummary(this.criterion.owner);
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
    getExpressionResult(criterion) {
      let expressionWithNumbers = criterion.expression;
      try {
        criterion.variables.forEach(e => {
          expressionWithNumbers = expressionWithNumbers.replaceAll(e.symbol, e.value);
        });
        criterion.result = eval(expressionWithNumbers);
      } catch (e) {
        alert('Problems with some expression ' + e);
      }
      return expressionWithNumbers;
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
    }

  },
  mounted() {
    this.fetchAvailablePractices();
  }
}
</script>

<style scoped>

</style>