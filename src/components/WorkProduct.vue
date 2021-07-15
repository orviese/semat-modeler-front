<template>
<b-container>
  <b-form @submit.prevent="onWorkProductSave" @reset.prevent="defaultWorkProduct" class="my-3 mx-3">
    <b-form-group label="" label-class="font-weight-bold">
      <b-form-input required v-model="getWorkProduct.name" placeholder="Work Product Name"></b-form-input>
    </b-form-group>
    <b-form-group label="" label-class="font-weight-bold">
      <b-form-textarea required v-model="getWorkProduct.description" placeholder="Description" rows="3"></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="outline-success">Save</b-button>
    <b-button class="ml-3" type="reset" variant="outline-dark">Clear</b-button>
  </b-form>
</b-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "WorkProduct",
  data() {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters('workProduct', ['getWorkProduct'])
  },
  methods: {
    ...mapActions('workProduct', ['defaultWorkProduct']),
    ...mapActions('practice', ['addWorkProduct', 'updateWorkProduct']),
    async onWorkProductSave() {
      if (this.getWorkProduct._id !== '') {
        await this.updateWorkProduct(this.getWorkProduct);
      }else {
        await this.addWorkProduct(this.getWorkProduct);
      }
      this.defaultWorkProduct();
    }
  }
}
</script>

<style scoped>

</style>