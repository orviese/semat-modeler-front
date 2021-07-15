<template>
<b-container>
  <competency></competency>
  <b-table-simple small striped responsive="md" hover class="ml-3 mr-6 mt-5">
    <b-thead>
      <b-tr>
        <b-th>Competency</b-th>
        <b-th>Description</b-th>
        <b-th>Is Kernel</b-th>
        <b-th>Area of Concern</b-th>
        <b-th></b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="competency in getCompetencies" :key="competency._id">
        <b-td>{{competency.name}}</b-td>
        <b-td>{{competency.description}}</b-td>
        <b-td>{{competency.isKernel}}</b-td>
        <b-td v-bind:style="{backgroundColor: findCompetencyAreaOfConcernColor(competency.areaOfConcern)}">
          {{findCompetencyAreaOfConcernName(competency.areaOfConcern)}}
        </b-td>
        <b-td><b-button size="sm" squared @click="selectedCompetency(competency)" variant="warning"><b-icon-pencil></b-icon-pencil></b-button></b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</b-container>
</template>

<script>
import Competency from "@/components/Competency";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "CompetencyView",
  components: {Competency},
  computed: {
    ...mapGetters('competency', ['getCompetencies']),
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern'])
  },
  methods: {
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern']),
    ...mapActions('competency', ['setSelectedCompetency', 'fetchAllCompetencies']),
    findCompetencyAreaOfConcernColor(areaOfConcernId) {
      let aoc = this.getAllAreasOfConcern.find(e => e._id === areaOfConcernId);
      if (aoc !== undefined) {
        return aoc.colorConvention;
      }
      return '';
    },
    findCompetencyAreaOfConcernName(areaOfConcernId) {
      let aoc = this.getAllAreasOfConcern.find(e => e._id === areaOfConcernId);
      if (aoc !== undefined) {
        return aoc.name;
      }
      return '';
    },
    selectedCompetency(competency) {
      this.setSelectedCompetency(competency);
    },
    async onLoadCompetency() {
      await this.fetchAllCompetencies();
    }
  },
  mounted() {
    this.onLoadCompetency();
  }
}
</script>

<style scoped>

</style>