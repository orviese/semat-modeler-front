<template>
<div>
  <h2 class="ml-3">Alpha</h2>
  <Alpha></Alpha>
  <b-table-simple small striped hover class="ml-3 mr-6 mt-5">
    <b-thead head-variant="dark">
      <b-tr>
        <b-th>Name</b-th>
        <b-th>Brief Description</b-th>
        <b-th>Description</b-th>
        <b-th>Is Kernel</b-th>
        <b-th></b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="alpha in getAlphas" :key="alpha._id">
        <b-td>{{ alpha.name }}</b-td>
        <b-td>{{ alpha.briefDescription}}</b-td>
        <b-td>{{ alpha.description}}</b-td>
        <b-td> {{ alpha.isKernel }}</b-td>
        <b-td><b-button size="sm" variant="danger"><b-icon-trash></b-icon-trash></b-button></b-td>
        <b-td><b-button size="sm" variant="warning"><b-icon-pencil></b-icon-pencil></b-button></b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</div>
</template>

<script>
import Alpha from '@/components/Alpha'
import {mapGetters} from "vuex";
export default {
  name: "AlphaView",
  components: {Alpha},
  computed: {
    ...mapGetters('alpha', ['getAlpha', 'getAlphas'])
  }
}
</script>

<style scoped>

</style>