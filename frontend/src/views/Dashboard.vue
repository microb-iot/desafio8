<template>

  <div v-if="user">

        <md-app md-waterfall md-mode="flexible">
      <md-app-toolbar class="md-large md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
          </div>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>more_vert</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row md-toolbar-offset">
          <span class="md-display-1">Microb-IoT</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
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

      <md-app-content>
            <h1>Hello USER!</h1>
    <img :src="user.photoURL" width="100"> <br>
    <h3>{{user.displayName}}</h3>
    <p>{{user.email}}</p>
    <button @click="logOut">Log out</button>
    <br><br><br>
    <pre>{{userUID}}</pre>
    <br><br><br>
    <pre>{{user}}</pre>
    <br><br><br>
    <pre>{{uData}}</pre>
      </md-app-content>
    </md-app>


  </div>
</template>

<script>
  import auth from '@/auth'
  import axios from 'axios'

  export default {
    name: 'auth-success',
    props: ['user_data'],
    data(){
      return {
          uData: {},
          menuVisible: false
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
      }

    },
    methods: {
      logOut() {
        auth.logout()
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
    max-height: max-content;
    border: 1px solid rgba(#000, .12);
  }

  .md-app-toolbar {
    height: 196px;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>

