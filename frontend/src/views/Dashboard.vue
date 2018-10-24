<template>

  <div v-if="user">

    <md-app md-waterfall class='topMenu' md-mode="reveal">
      <md-app-toolbar class="md-large">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon style="color: white">menu</md-icon>
            </md-button>
          </div>

          <div class="md-toolbar-section-end">

             <p  style="color: white; margin-top: 10px">Hello, {{user.displayName}}! <img :src="user.photoURL" width="50" style="margin-left: 20px"></p>

             <!--<md-button class="md-icon-button">
             <md-icon  style="color: white">more_vert</md-icon>

            </md-button>-->
          </div>
        </div>

        <div class="md-toolbar-row md-toolbar-offset">
          <span class="md-display-1" style="color: white">
            <img src= "../assets/logoMicrobIoT.png" width="90" height="90">
            Microb-IoT
          </span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>

            <md-icon>exit_to_app</md-icon>
            <span @click="logOut" class="md-list-item-text">Log out</span>
          </md-list-item>

          <md-list-item>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

    <md-app-content class="row" >
      
      
      <div class="col-lg-3 rightDiv">
        <br>
        <v-select :on-change="updateNetworks" :options="networksKeys" style="background: linear-gradient(135deg,#2f2f32,#262628)" ></v-select>
        <br>

        <md-list :md-expand-single="expandSingle" v-if="network"> 
          <md-list-item md-expand>
            <md-icon>rss_feed</md-icon>
            <span class="md-list-item-text">topics</span>

            <md-list slot="md-expand">
              <md-list-item  class="md-inset" v-for="topic in topics" :key="topic" >{{topic}}<br></md-list-item>
              <TopicDialogCustom v-if="network" v-on:updated="updateData" :network="networkName" :user_id="userUID" ></TopicDialogCustom>
            </md-list>
          </md-list-item>

          
        </md-list>
        
        <DialogCustom v-on:updated="updateData" :user_id="userUID"></DialogCustom>
        
      </div>
      <div v-if="network" class="col-lg-9">
        <div v-if="network.topics.water" class="embed-container">
          <iframe width="560" height="315" src="http://35.230.150.123:3000/d/3bjaCaxiz/home-sensors?orgId=2&kiosk" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      
    </md-app-content>

    </md-app>
  </div>

</template>

<script>

  import auth from '@/auth'
  import axios from 'axios'
  import DialogCustom from '../components/DialogCustom'
  import vSelect from 'vue-select'
  import TopicDialogCustom from '../components/TopicDialogCustom'

  export default {
    name: 'auth-success',
    props: ['user_data'],
    components: {DialogCustom, vSelect, TopicDialogCustom},
    data(){
      return {
          uData: {},
          menuVisible: false,
          network: null,
          networkName: null,
          expandSingle: false
      }
    },

    mounted() {
      // console.log("http://35.230.150.123/api-1.0/login/" + this.userUID)
      axios.get("http://35.230.150.123:5000/api-1.0/login/" + this.userUID).then(response =>
      {
        this.uData = response.data;
          }).catch(error => {
            console.log(error)
          })
    },
    computed: {
      user() {
        return this.$store.getters['user/user']
      },
      userUID() {
        return this.$store.getters['user/user'].uid
      },
      networksKeys() {
        var networks = [];
        for (var key in this.uData.networks){
          networks.push(key);
          console.log(networks)
        }
        return networks
      },
      topics() {
        var tpcs = [];
        for (var key in this.network.topics){
          tpcs.push(key);
          console.log(tpcs)
        }
        return tpcs
      }

    },
    methods: {
      logOut() {
        auth.logout()
      },
      updateData(text) {
        console.log("cago en dios")
        this.uData = text
        this.network = this.uData.networks[this.networkName]
      },
      updateNetworks: function(a){
        console.log(a)
        this.networkName = a
        this.network = this.uData.networks[a]

      }
    }
  }
</script>

<style scoped>
  img {
    border-radius: 50px;
  }

  h3 {
    margin-bottom: 0;
  }

  p {
    margin-top: 0;
  }

  pre {
    text-align: left;
  }
  .md-app {
    max-height: 100%;
    border: 1px solid rgba(#000, .12);
  }

  .md-app-toolbar {
    height: 196px;
    background: rgb(0, 0, 0);
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .leftDiv {
   width: 25%;

  }

  .rightDiv {
    height: 752px
  }
  .md-app-content {
    background: linear-gradient(180deg,#222426 20px,#161719 115px);

  }

.embed-container {
    position: relative;
    padding-bottom: 75.00%;
    height: 0;
    overflow: hidden;
}
.embed-container iframe {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
}

</style>
