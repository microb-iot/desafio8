<template>
  <div>
    <md-field>
      <label>Network Name</label>
      <md-input v-model="name" md-counter="30"></md-input>
    </md-field>
    <md-checkbox v-model="DDS">DDS</md-checkbox>
    <md-checkbox v-model="kafka">Kafka</md-checkbox>
    <md-checkbox v-model="mqtt">MQTT</md-checkbox>


<md-button class="md-primary" @click="postNetwork">Create</md-button>

  </div>
</template>

<script>
 import axios from "axios"

  export default {
    name: 'newNetworkForm',
    data: () => ({
      name: '',
      DDS: false,
      mqtt: false,
      kafka: false
    }),
    props: {
      user_id: {
        type: String,
        required: true
      }
    },
    methods: {
      postNetwork(){
        var body = {
          user_id:  this.user_id
        }
      axios.post("http://35.230.150.123:5000/api-1.0/network/" + this.name, body).then(response =>
      {
         this.$emit('created', response.data)
          }).catch(error => {
            console.log(error)
          })

      }
    }

  }
</script>

<style scoped>
  .md-checkbox {
    display: flex;
  }
</style>
