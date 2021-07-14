<template>
  <b-container>
    <h3 class="text-center">Activity Spaces</h3>
    <activity-space></activity-space>
    <b-table-simple small striped responsive="md" hover class="ml-3 mr-6 mt-5">
      <b-thead>
        <b-tr>
          <b-th>Activity</b-th>
          <b-th>Description</b-th>
          <b-th>Is Kernel</b-th>
          <b-th>Area of Concern</b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="ae in getActivitySpaces" :key="ae._id">
          <b-td>{{ae.name}}</b-td>
          <b-td>{{ae.description}}</b-td>
          <b-td>{{ae.isKernel}}</b-td>
          <b-td v-bind:style="{backgroundColor: findActivitySpaceAreaOfConcernColor(ae.areaOfConcern)}"></b-td>
          <b-td><b-button @click="setSelectedActivitySpace(ae)" variant="warning"><b-icon-pencil></b-icon-pencil></b-button></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
import ActivitySpace from "@/components/ActivitySpace";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ActivitySpaceView",
  props: {
    includeSuperActivity: Boolean,
    practice: String
  },
  components: {ActivitySpace},
  data() {
    return {
      activitySpaceToEdit: null
    }
  },
  computed: {
    ...mapGetters('activitySpace', ['getActivitySpaces', 'getActivitySpace']),
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern'])
  },
  methods: {
    ...mapActions('activitySpace', ['fetchAllActivitySpaces','setSelectedActivitySpace']),
    findActivitySpaceAreaOfConcernColor(areaOfConcernId) {
      let found = this.getAllAreasOfConcern.find(e => e._id === areaOfConcernId);
      if (found) {
        return found.colorConvention;
      } else {
        return  '';
      }
    },
    async onLoad() {
      await this.fetchAllActivitySpaces();
    }
  },
  mounted() {
    this.onLoad();
  }

}
</script>

<style scoped>

</style>