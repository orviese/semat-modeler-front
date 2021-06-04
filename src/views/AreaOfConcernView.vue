<template>
  <b-container>
    <h3>Areas of concern</h3>
    <area-of-concern></area-of-concern>
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
  </b-container>
</template>

<script>
import AreaOfConcern from "@/components/AreaOfConcern";
export default {
  name: "AreaOfConcernView",
  components: {AreaOfConcern},
  data() {
    return {
      color: '#5982A0',
      areasOfConcern: [{
        id: '',
        name: '',
        description: '',
        colorConvention: ''
      }]
    }
  }
}
</script>

<style scoped>

</style>