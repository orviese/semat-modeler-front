<template>
  <div>
    <b-row>
      <b-col>
        <h2>{{msg}}</h2>
        <b-button class="btn-success">Success</b-button>
        <b-badge>10</b-badge>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
          Dismissible Alert!
        </b-alert>
      </b-col>
    </b-row>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      showDismissibleAlert: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
