<template>
  <div class="ml-3 mr-3">
    <h3 class="text-center">Public Validation: {{ id }}</h3>
    <b-alert class="mt-3"
             :show="dismissCountDown"
             dismissible
             :variant="getErrorMessage === '' ? 'success' : 'danger'"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged"
    >
      {{  getAlertMessage }}
    </b-alert>
    <b-tabs class="mt-3">
      <b-tab title="Practice Representation">
        <b-button class="mt-3" variant="success" @click="onGetInformation">Get information
          <b-icon-arrow-down></b-icon-arrow-down>
        </b-button>
        <b-table-simple
            v-if="getPublicPracticeToValidate.practice !== undefined"
            small striped hover responsive borderless sticky-header="100%"  caption-top class="mt-3">
          <caption>Practice: {{getPublicPracticeToValidate.practice.name}}</caption>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>Alphas</b-th>
              <b-th>Activity Space / Activities / Competencies</b-th>
              <b-th>Patterns</b-th>
              <b-th></b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td>
                <b-table-simple>
                  <b-thead>
                    <b-th>Alphas</b-th>
                    <b-th>Work Product</b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr class="border-bottom border-success" v-for="wp in getWorkProductManifest" :key="wp._id">
                      <b-td v-bind:style="{backgroundColor: wp.alpha.areaOfConcern.colorConvention}">{{wp.alpha.name}}</b-td>
                      <b-td>{{wp.workProduct.name}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-td>
              <b-td>
                <b-table-simple bordered>
                  <b-thead>
                    <b-th>Activity Spaces</b-th>
                    <b-th>Activity</b-th>
                    <b-th>Required Competencies</b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr class="border-bottom border-success" v-for="activityAssociation in getActivityAssociations" :key="activityAssociation._id">
                      <b-td v-bind:style="{backgroundColor: activityAssociation.end2.areaOfConcern.colorConvention}">
                        {{activityAssociation.end2.name}}</b-td>
                      <b-td>{{activityAssociation.end1.name}}</b-td>
                      <b-td>
                        <b-list-group>
                          <b-list-group-item
                              v-bind:style="{backgroundColor: cl.areaOfConcern.colorConvention}"
                              v-for="cl in activityAssociation.end1.requiredCompetencyLevel" :key="cl._id">
                            {{cl.name}}
                          </b-list-group-item>
                        </b-list-group>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-td>
              <b-td>
                <b-table-simple>
                  <b-thead>
                    <b-th>Pattern</b-th>
                    <b-th>Association</b-th>
                    <b-th>Target</b-th>
                    <b-th>Element</b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr class="border-bottom border-success" v-for="patternActivity in getActivitySpacePatterns" :key="patternActivity._id">
                      <b-td v-bind:style="{backgroundColor: patternActivity.areaOfConcern.colorConvention}" >{{patternActivity.name}}</b-td>
                      <b-td>{{patternActivity.associationName}}</b-td>
                      <b-td>{{patternActivity.target}}</b-td>
                      <b-td>{{patternActivity.activitySpaceElement.name}}</b-td>
                    </b-tr>
                    <b-tr v-for="patternActivity in getAlphaPatterns" :key="patternActivity._id">
                      <b-td v-bind:style="{backgroundColor: patternActivity.areaOfConcern.colorConvention}" >{{patternActivity.name}}</b-td>
                      <b-td>{{patternActivity.associationName}}</b-td>
                      <b-td>{{patternActivity.target}}</b-td>
                      <b-td>{{patternActivity.alphaElement.name}}</b-td>
                    </b-tr>
                    <b-tr v-for="patternActivity in getWorkProductPatterns" :key="patternActivity._id">
                      <b-td v-bind:style="{backgroundColor: patternActivity.areaOfConcern.colorConvention}" >{{patternActivity.name}}</b-td>
                      <b-td>{{patternActivity.associationName}}</b-td>
                      <b-td>{{patternActivity.target}}</b-td>
                      <b-td>
                        <b-list-group>
                          <b-list-group-item
                              v-for="pwp in patternActivity.workProductElements" :key="pwp._id">
                            {{pwp.name}}
                          </b-list-group-item>
                        </b-list-group>
                      </b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-tab>
      <b-tab title="Practice Validation">
        <b-form @submit.prevent="onSavePracticeValidation" class="mt-5">
          <b-form-row>
            <b-col>
              <b-form-group>
                <b-form-input required
                    :disabled="getPublicPracticeToValidate.finished"
                    placeholder="Evaluator Name"
                    v-model="getPublicPracticeToValidate.personName"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-input required type="email"
                              :disabled="getPublicPracticeToValidate.finished"
                              placeholder="Email"
                              v-model="getPublicPracticeToValidate.email"></b-form-input>
              </b-form-group>
              <b-form-group>
                <b-form-textarea
                    :disabled="getPublicPracticeToValidate.finished"
                    placeholder="Additional Comments"
                    v-model="getPublicPracticeToValidate.comment"></b-form-textarea>
              </b-form-group>
              <b-form-group>
                <p>Status: <strong>{{getPublicPracticeToValidate.finished ? 'Closed' : 'Open'}}</strong></p>
              </b-form-group>
            </b-col>
            <b-col>
            </b-col>
          </b-form-row>
          <b-form-group label="Criteria List" label-class="font-weight-bold bg-info p-3 text-center">
            <b-form-group
                label-class="font-weight-bold bg-warning p-2" :id="criterion._id" :label="criterion.name"
                v-for="criterion in getCriteria" :key="criterion._id" :description="criterion.description">
              <b-form-group :description="variable.meaning"
                            label-class="font-weight-bold" label-cols="2" :label="variable.symbol"
                            v-for="variable in criterion.variables" :key="variable._id">
                <b-form-input :disabled="getPublicPracticeToValidate.finished" required v-on:keypress="isNumber($event, variable.value)" type="number"
                              v-model="variable.value"></b-form-input>
              </b-form-group>
              <b-form-group label-class="font-weight-bold" label-cols="2"
                            label="Result" :description="`Formula expression: ${getExpressionResult(criterion)}`">
                <b-form-input v-model="criterion.result" disabled>
                </b-form-input>
              </b-form-group>
            </b-form-group>
          </b-form-group>
          <b-form-group>
            <b-button :disabled="getPublicPracticeToValidate.finished"
                      class="ml-3 float-right" type="reset" variant="outline-dark">Clear</b-button>
            <b-button :disabled="getPublicPracticeToValidate.finished"
                      class="float-right" type="submit" variant="outline-success">Save</b-button>
          </b-form-group>
        </b-form>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "PublicPracticeValidation",
  props: ['id'],
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      tabIndex: 0
    }
  },
  computed: {
    ...mapGetters('validatePractice',
        ['getPublicPracticeToValidate', 'getErrorMessage', 'getInfoMessage']),
    getWorkProductManifest() {
      return this.getPublicPracticeToValidate.practice.ownedElements.workProductManifests;
    },
    getActivityAssociations() {
      return this.getPublicPracticeToValidate.practice.ownedElements.activityAssociations;
    },
    getActivitySpacePatterns() {
      return this.getPublicPracticeToValidate.practice.ownedElements.patterns
          .filter(e => e.target === 'activitySpace')
    },
    getAlphaPatterns() {
      return this.getPublicPracticeToValidate.practice.ownedElements.patterns
          .filter(e => e.target === 'alpha')
    },
    getWorkProductPatterns() {
      return this.getPublicPracticeToValidate.practice.ownedElements.patterns
          .filter(e => e.target === 'workProduct')
    },
    getCriteria() {
      return this.getPublicPracticeToValidate.criteria;
    },
    getCriteriaToSave() {
      return this.getPublicPracticeToValidate.criteria.map(e => {
        return {
          result: e.result,
          name: e.name,
          expression: e.expression,
          variables: e.variables
        }
      });
    },
    getAlertMessage() {
      return this.getInfoMessage !== '' ? this.getInfoMessage : this.getErrorMessage;
    }
  },
  methods: {
    ...mapActions('validatePractice', ['findPublicPracticeValidationById', 'savePublicValidation']),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async onGetInformation() {
      await this.findPublicPracticeValidationById(this.id);
      this.dismissCountDown = this.dismissSecs;
    },
    isNumber(event, variableValue) {
      if (!/\d/.test(event.key) && (event.key !== "." || /\./.test(variableValue)))
        return event.preventDefault();
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
    async onSavePracticeValidation() {
      const closeValidation = await this.$bvModal.msgBoxConfirm(
          `Are you sure to send and close this validations?`,
          {
            title: 'Please Confirm',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Yes',
            cancelTitle: 'No',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          });
      if (closeValidation) {
        const {personName, email, comment} = this.getPublicPracticeToValidate
        console.log(this.getCriteriaToSave)
        await this.savePublicValidation({
          validationId: this.id,
          personName, email, comment,
          criteria: this.getCriteriaToSave
        });
        this.dismissCountDown = this.dismissSecs;
      }
    }
  }
}
</script>

<style scoped>

</style>