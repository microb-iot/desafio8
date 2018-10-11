<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>New Network</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Setup">
          <newNetworkForm  v-on:created="hideDialog" :user_id="user_id"></newNetworkForm>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">New Network</md-button>
  </div>
</template>

<script>
import newNetworkForm from './newNetworkForm'

  export default {
    name: 'DialogCustom',
    data: () => ({
      showDialog: false
    }),
    props: {
      user_id: {
        type: String,
        required: true
      }
    },
    components: {newNetworkForm},
    methods: {
      hideDialog: function(text){
        this.$emit('updated', text)
        this.showDialog = false;
      }
    }
  }
</script>

<style scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>
