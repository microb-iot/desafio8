<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item">
        <md-field>
          <label for="network">Networks</label>
          <md-select v-model="network" name="network" id="network">
            <md-option v-for="(value, key) in networks" :key="key"></md-option>


          </md-select>
        </md-field>
      </div>
   <pre v-if="network">{{network}}</pre>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BasicSelect',
    props: {
      networks: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      network: null,
    })
  }
</script>

<style>
.md-layout{
  width: 200px;
}
</style>

