<template>
  <b-container>
    <h2 class="ml-3 text-center">Kernel Alphas</h2>
    <Alpha v-bind:include-super-alpha="false"></Alpha>
    <b-table-simple small striped hover responsive="md" class="ml-3 mr-6 mt-5">
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Brief Description</b-th>
          <b-th>Super Alpha</b-th>
          <b-th>Is Kernel</b-th>
          <b-th>Area Of Concern</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="alpha in getAlphas" :key="alpha._id">
          <b-td>{{ alpha.name }}</b-td>
          <b-td>{{ alpha.briefDescription }}</b-td>
          <b-td>{{ alpha.superAlpha !== null && alpha.superAlpha !== undefined ? alpha.superAlpha.name : ''}}</b-td>
          <b-td> {{ alpha.isKernel }}</b-td>
          <b-td v-bind:style="{backgroundColor: alpha.areaOfConcern.colorConvention}"
                v-text="alpha.areaOfConcern.name"></b-td>
          <!--
          <b-td>
            <b-button @click="onDeleteAlpha" size="sm" variant="danger">
              <b-icon-trash></b-icon-trash>
            </b-button>
          </b-td>
          -->
          <b-td>
            <b-button @click="onEditAlpha(alpha)" squared size="sm" variant="warning">
              <b-icon-pencil></b-icon-pencil>
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
import Alpha from '@/components/Alpha'
import {mapGetters, mapActions} from "vuex";

export default {
  name: "AlphaView",
  components: {Alpha},
  computed: {
    ...mapGetters('alpha', ['getAlpha', 'getAlphas']),
  },
  methods: {
    ...mapActions('alpha', ['fetchAllAlphas', 'setSelectedAlpha']),
    async onLoad() {
      await this.fetchAllAlphas();
    },
    onDeleteAlpha() {

    },
    onEditAlpha(alphaSelected) {
      this.setSelectedAlpha(alphaSelected);

    }
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style scoped>

</style>