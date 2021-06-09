<template>
  <b-container>
    <b-form @submit.prevent="" @reset.prevent="onReset" class="mb-5">
      <b-form-group label="Name" label-class="font-weight-bold">
        <b-form-input v-model="alpha.name" type="text" placeholder="Alpha name">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Brief description" label-class="font-weight-bold">
        <b-form-input v-model="alpha.description" placeholder="Alpha brief description">
        </b-form-input>
      </b-form-group>

      <b-form-group label="Description" label-class="font-weight-bold">
        <b-form-textarea v-model="alpha.description" rows="4" size="sm"></b-form-textarea>
      </b-form-group>

      <b-form-group label="Is kernel?" label-class="font-weight-bold">
        <b-form-select v-model="isKernel" :options="isKernelOptions">
          <template #first>
            <b-form-select-option :value="null" disabled>
              -- Please select an option --
            </b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Area or concern" label-cols="3" v-if="isKernel">
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
      <b-form-group label="Super Alpha" v-if="!isKernel" label-class="font-weight-bold">
        <b-form-select v-model="superAlpha" :options="superAlphaOptions">
        </b-form-select>
      </b-form-group>

      <b-form-group
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
            <b-form-select v-model="workProduct" :options="workProductOptions">
            </b-form-select>
            <b-input-group-append class="ml-2">
              <b-button variant="">Add new</b-button>
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

      <b-button variant="outline-secondary">Create</b-button>
      <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: "Alpha",
  data() {
    return {
      isKernel: null,
      isKernelOptions: [{value: true, text: 'Yes'}, {value: false, text: 'No'}],
      workProduct: null,
      workProductOptions: [
        {value: '1', text: 'work product 1'},
        {value: '2', text: 'work product 2'},
        {value: '3', text: 'work product 3'},
        {value: '4', text: 'work product 4'},
        {value: '5', text: 'work product 5'}
      ],
      superAlpha: null,
      superAlphaOptions: [
        {
          label: 'Kernel Alphas', options: [
            {value: '1', text: 'Requirements'},
            {value: '1', text: 'Software'},
            {value: '1', text: 'Stakeholders'},
          ]
        },
        {value: '1', text: 'Alpha 1'},
        {value: '2', text: 'Alpha 2'},
        {value: '3', text: 'Alpha 3'},

      ],
      alpha: {
        id: '',
        isKernel: false,
        areaOfConcern: '',
        owner: '',
        tags: [],
        resources: [],
        properties: [],
        name: '',
        icon: '',
        briefDescription: '',
        description: '',
        states: []
      }
    }
  },
  methods: {
    onReset() {
      this.alpha.id = '';
      this.alpha.name = '';
      this.alpha.description = '';
      this.isKernel = null;
    }
  }
}
</script>

<style scoped>

</style>