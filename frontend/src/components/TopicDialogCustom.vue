<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Add new topic</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="Add Topic">
           <md-field>
            <label>Topic name</label>
            <md-input v-model="topic" md-counter="30"></md-input>      
          </md-field>
          <md-checkbox v-model="track">Track for graph</md-checkbox>
          
        </md-tab>
      </md-tabs>
     
      <pre>
        {{network}}
      </pre>

      <md-dialog-actions>
        <md-button class="md-primary" @click="postTopic">Create</md-button>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
      
    </md-dialog>

    <md-button class="md-primary md-raised" @click="showDialog = true">Add new topic</md-button>
  </div>
</template>

<script>
  import axios from "axios"
  export default {
    name: 'TopicDialogCustom',
    data: () => ({
      topic: '',
      track: false,
      showDialog: false
    }),
    props: {
      user_id: {
        type: String,
        required: true
      },
      network: {
        type: String,
        required: true
      }
    },
    methods: {
      postTopic(){
        var body = {
          user_id:  this.user_id,
        }
        
        axios.post("http://35.230.150.123:5000/api-1.0/network/" + this.network + "/topic/" + this.topic, body).then(response =>
        { 
          console.log(response.data)
          this.$emit('updated', response.data)
          }).catch(error => {
            console.log(error)
          })

        this.showDialog = false;

      }
    },
    
  }
</script>

<style scoped>
  .md-dialog {
    max-width: 768px;
  }
</style>
