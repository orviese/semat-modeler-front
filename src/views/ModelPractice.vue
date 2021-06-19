<template>
  <div class="container">
    <b-tabs class="mb-5" v-model="tabIndex">
      <b-tab title="Practice definition" :title-link-class="linkTabClass(0)">
        <b-form class="mt-3">
          <b-form-group  label-cols="2" label="Practice Name" label-class="font-weight-bold" class="color-font">
            <b-form-input v-model="practice.name" placeholder="Software development practice"></b-form-input>
          </b-form-group>
          <b-form-group label="Objective" label-class="font-weight-bold"
                        description="The objective of this Practice, expressed as a concise and isolated phrase. The content of this attribute should be an explicit and short statement that describes the goal that the practice pursues.">
            <b-form-textarea rows="3" v-model="practice.objective"></b-form-textarea>
          </b-form-group>
          <b-form-group label="Tags" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags" tag-pills size="md" tag-variant="success" separator=","
                v-model="practice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>
          <b-form-group label="Resources" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags" tag-pills size="md" tag-variant="success" separator=","
                 v-model="practice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Properties" label-class="font-weight-bold"
                        description="Enter desired properties separated by comma ','">
            <b-form-tags
                input-id="tags" tag-pills size="md" tag-variant="warning" separator=","
                v-model="practice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Measures" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags" tag-pills size="md" tag-variant="dark" separator=","
                v-model="practice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Entries" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags" tag-pills size="md" tag-variant="dark" separator=","
                v-model="practice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group label="Results" label-class="font-weight-bold"
                        description="Enter desired tags separated by comma ','">
            <b-form-tags
                input-id="tags" tag-pills size="md" tag-variant="success" separator=","
                 v-model="practice.tags" placeholder="">
            </b-form-tags>
          </b-form-group>

          <b-form-group>
            <b-button @click="onSavePractice" variant="info">Save</b-button>
            <!--
            <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
            -->
          </b-form-group>
          <div><p>{{getPractice}}</p></div>

        </b-form>
      </b-tab>
      <b-tab title="Alphas" :title-link-class="linkTabClass(1)">

      </b-tab>
      <b-tab title="Work products" :title-link-class="linkTabClass(2)">

      </b-tab>
    </b-tabs>

    <b-row>
      <b-col>
        <b-form class="mb-5">

          <b-form-group class="shadow p-3 mb-5 bg-white rounded border border-info p-2" label="Alphas" label-class="font-weight-bold"
                        description="Things to work with">
            <b-input-group>
              <b-form-select v-model="alphaSelected" :options="alphas" text-field="name" value-field="id">
                <template #first>
                  <b-form-select-option :value="null" disabled>-- Please select an alpha --</b-form-select-option>
                </template>
              </b-form-select>
              <b-input-group-append class="ml-2">
                <b-button size="sm" variant="info">Add</b-button>
                <b-button size="sm" variant="success" class="ml-2">New</b-button>
              </b-input-group-append>
            </b-input-group>
            <b-table-simple small striped class="mt-3">
              <b-thead>
                <b-tr>
                  <b-th>Name</b-th>
                  <b-th>Area of concern</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td>Alpha</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
                <b-tr>
                  <b-td>Alpha 123</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-form-group>

          <b-form-group
              class="shadow p-3 mb-5 bg-white rounded border border-info p-2"
              label="Work products"
              description="Activity result that describes an alpha"
              label-class="font-weight-bold">
            <b-form-group label="Work Product" label-cols="3">
              <b-input-group>
                <b-form-select v-model="workProduct" :options="workProducts">
                </b-form-select>
                <b-input-group-append class="ml-2">
                  <b-button size="sm" variant="info">Add</b-button>
                  <b-button size="sm" variant="success" class="ml-2">New</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-table-simple small striped hover class="mt-2">
                <b-thead head-variant="dark">
                  <b-tr>
                    <b-th>Work Product</b-th>
                    <b-th>Description</b-th>
                    <b-th></b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr>
                    <b-td>Test Case</b-td>
                    <b-td></b-td>
                    <b-td><b-button variant="danger" size="sm"><b-icon-trash></b-icon-trash></b-button></b-td>
                  </b-tr>
                  <b-tr>
                    <b-td>Test Case</b-td>
                    <b-td></b-td>
                    <b-td></b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-form-group>
          </b-form-group>

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
                    <b-td><b-button-group>

                    </b-button-group></b-td>
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
            <b-table-simple small striped hover outlined  class="mt-3">
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
            <b-form-group label="Activities"  label-class="font-weight-bold"  description="Things to do">
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

        </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "ModelPractice",
  data() {
    return {
      tabIndex: 0,
      practice: {
        id: '',
        name: '',
        objective: '',
        tags: [],
        resources: [],
        properties: [],
        measure: [],
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
      alphaSelected: null,
      alphas: [
        {id: '1', name: 'stakeholders'},
        {id: '1', name: 'system'},
        {id: '1', name: 'requirements'},
        {id: '1', name: 'work'},
      ],
      alphasSelected: [],
      activitySpaces: [
        {id: '1', name: 'Explore possibilities', areaOfConcern:''},
        {id: '2', name: 'Understand the requirements', areaOfConcern:''},
        {id: '3', name: 'Test the system', areaOfConcern:''},
        {id: '4', name: 'Coordinate activity', areaOfConcern:''},
        {id: '5', name: 'Support the team', areaOfConcern:''},
      ],
      activitySpaceSelected: null
    }
  },
  computed: {
    ...mapGetters('practice', ['getPractice', 'getErrorMessage']),
    availableOptions() {
      return this.options.filter(opt => this.value.indexOf(opt.value) === -1)
    }
  },
  methods: {
    ...mapActions('practice', ['create', 'updatePractice']),
    async onSavePractice() {
      if (this.practice.id === '') {
        await this.create(this.practice);
      } else {
        await this.updatePractice(this.practice)
      }
    },
    linkTabClass(index) {
      if (this.tabIndex === index) {
        return ['bg-warning', 'text-white', 'font-weight-bold']
      } else {
        return ['bg-light', 'text-secondary']
      }
    }
  },
  mounted() {
    this.practice.id = this.getPractice.id;
    this.practice.name = this.getPractice.name;
    this.practice.objective = this.getPractice.objective;
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