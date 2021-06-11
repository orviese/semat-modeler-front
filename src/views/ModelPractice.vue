<template>
<div class="container">
  <h3 class="text-center">
    <span class="border border-warning  p-3">Model a Practice</span>
  </h3>

  <b-row>
    <b-col>
      <b-form class="mb-5">
        <b-form-group label="Practice Name" label-class="font-weight-bold" class="color-font">
          <b-form-input></b-form-input>
        </b-form-group>
        <b-form-group class="border border-info p-2" label="Alphas" label-class="font-weight-bold" description="Things to work with">
          <b-input-group>
            <b-form-select v-model="alphaSelected" :options="alphas" text-field="name" value-field="id">
              <template #first>
                <b-form-select-option :value="null" disabled>-- Please select an alpha --</b-form-select-option>
              </template>
            </b-form-select>
            <b-input-group-append class="ml-2">
              <b-button variant="info">Add</b-button>
              <b-button variant="success" class="ml-2">New</b-button>
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

        <b-form-group label="Work products" description="Activity results" label-class="font-weight-bold"></b-form-group>


        <b-form-group class="border border-info p-2"
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
          <b-form-group label="Work Product" label-cols="3">
            <b-input-group>
              <b-form-select v-model="workProduct" :options="workProducts">
              </b-form-select>
              <b-input-group-append class="ml-2">
                <b-button variant="info">Add</b-button>
                <b-button variant="success" class="ml-2">New</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-form-group>
            <b-table-simple small striped class="mt-2">
              <b-thead>
                <b-tr>
                  <b-th>Work Product</b-th>
                  <b-th>Description</b-th>
                  <b-th>Lower Bound</b-th>
                  <b-th>Upper Bound</b-th>
                  <b-th></b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr>
                  <b-td>Customer</b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
                  <b-td></b-td>
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
        <b-form-group label="Activity Spaces" label-class="font-weight-bold" class="border border-info p-2">
          <b-form-group label="Activities" description="Things to do"></b-form-group>
          <b-form-group label="Work product manifest"></b-form-group>

        </b-form-group>
        <b-button variant="outline-secondary">Create</b-button>
        <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
      </b-form>
    </b-col>
  </b-row>
</div>
</template>

<script>
export default {
  name: "ModelPractice",
  data() {
    return {
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
          {id:'1', name: 'stakeholders'},
          {id:'1', name: 'system'},
          {id:'1', name: 'requirements'},
          {id:'1', name: 'work'},
      ],
      alphasSelected: []
    }
  },
  computed: {
    availableOptions() {
      return this.options.filter(opt => this.value.indexOf(opt.value) === -1)
    }
  }
}
</script>

<style scoped>
.color-font {
  color: darkgoldenrod;
  /*background-color: darkgoldenrod;*/
}
</style>