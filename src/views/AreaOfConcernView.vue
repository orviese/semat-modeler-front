<template>
  <b-container>
    <h3 class="text-center">Areas of concern</h3>
    <area-of-concern></area-of-concern>
    <b-table-simple responsive="md" small striped hover class="ml-3 mr-6 mt-5">
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Name</b-th>
          <b-th>Description</b-th>
          <b-th>Color Convention</b-th>
          <b-th></b-th>
          <b-th></b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="aoc in getAllAreasOfConcern" :key="aoc._id">
          <b-td>{{ aoc.name }}</b-td>
          <b-td>{{ aoc.description}}</b-td>
          <b-td v-bind:style="{backgroundColor: aoc.colorConvention}">{{aoc.colorConvention}}</b-td>
          <b-td><b-button @click="onDelete(aoc)" size="sm" squared variant="danger"><b-icon-trash></b-icon-trash></b-button></b-td>
          <b-td><b-button @click="onEdit(aoc)" size="sm" squared variant="warning"><b-icon-pencil></b-icon-pencil></b-button></b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
import AreaOfConcern from "@/components/AreaOfConcern";
import {mapGetters, mapActions} from "vuex";
export default {
  name: "AreaOfConcernView",
  components: {AreaOfConcern},
  data() {
    return {
      deleteAoc: false,
      color: '#5982A0',
      areasOfConcern: [{
        id: '',
        name: '',
        description: '',
        colorConvention: '',
        order: null
      }]
    }
  },
  methods: {
    ...mapActions('areaOfConcern', ['fetchAllAreasOfConcern', 'deleteAreaOfConcern', 'setSelectedAreaOfConcern']),
    async onLoad() {
      await this.fetchAllAreasOfConcern();
    },
    async onClear() {
      await this.setDefaultAreaOfConcern();
    },
    onEdit(aoc) {
      this.setSelectedAreaOfConcern(aoc);
    },
    async onDelete(aoc) {
      this.deleteAoc = false;
      try {
        this.deleteAoc = await this.$bvModal.msgBoxConfirm(
      `Are you sure to delete this: ${aoc.name} area of concern?`,
            {
              title: 'Please Confirm',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              okTitle: 'Yes',
              cancelTitle: 'No',
              footerClass: 'p-2',
              hideHeaderClose: false,
              centered: true
            })
        if (this.deleteAoc) {
          await this.deleteAreaOfConcern(aoc._id);
        }
      }catch (e) {
        this.deleteAoc = false;
      }
    }
  },
  computed: {
    ...mapGetters('areaOfConcern', ['getAllAreasOfConcern'])
  },
  mounted() {
    this.onLoad();
  }
}
</script>

<style scoped>

</style>