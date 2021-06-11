<template>
<div class="container">
  <b-row>
    <b-col>
      <b-form @submit.prevent="" @reset.prevent="" class="my-3 mx-3">
        <b-form-group label="Activity Space Name" label-class="font-weight-bold">
          <b-form-input></b-form-input>
        </b-form-group>
        <b-form-group label="Description" label-class="font-weight-bold">
          <b-form-textarea rows="3"></b-form-textarea>
        </b-form-group>
        <b-form-group label="Is kernel?" label-cols="2" label-class="font-weight-bold">
          <b-form-select v-model="isKernel" :options="isKernelOptions">
            <template #first>
              <b-form-select-option :value="null" disabled>
                -- Please select an option --
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Area or concern" label-cols="2" v-if="isKernel" label-class="font-weight-bold">
          <b-input-group>
            <b-form-select>
              <template #first>
                <b-form-select-option :value="null" disabled>
                  -- Please select an area of concern --
                </b-form-select-option>
              </template>
            </b-form-select>
            <b-input-group-append class="ml-2">
              <b-button variant="">Add new</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group label="Required Alphas as inputs" label-class="font-weight-bold">
          <b-form-select v-model="inputAlpha">
            <template #first>
              <b-form-select-option :value="null" disabled>
                -- Please select --
              </b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <b-button variant="outline-secondary">Create</b-button>
        <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
      </b-form>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-table-simple small striped class="ml-3 mr-6 mt-5">
        <b-thead>
          <b-tr>
            <b-th>Name</b-th>
            <b-th>Description</b-th>
            <b-th></b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr>
            <b-td>Customer</b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr>
          <b-tr>
            <b-td>Solution</b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr>
          <b-tr style="">
            <b-td>Endeavor</b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr>
          <b-tr v-bind:style="{backgroundColor: color}">
            <b-td>Endeavor</b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr>
          <b-tr>
            <b-td>Endeavor</b-td>
            <b-td></b-td>
            <b-td></b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-col>
  </b-row>
</div>
</template>

<script>
export default {
  name: "ActivitySpace",
  data() {
    return {
      isKernel: null,
      inputAlpha: null,
      inputAlphas: [],
      isKernelOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
    }
  }
}
</script>

<style scoped>

</style>