<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add new topic</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Add Topic">
        </md-tab>
      </md-tabs>
          <md-field>
      <label>Topic name</label>
      <md-input v-model="topic" md-counter="30"></md-input>
    </md-field>
    <br><br><br>

    <pre> {{topic}} </pre>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">Add new topic</md-button>
  </div>
</template>

<script>

  export default {
    name: 'TopicDialogCustom',
    data: () => ({
      topic: '',
      showDialog: false
    }),
    props: {
      user_id: {
        type: String,
        required: true
      }
    },
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
