import firebase from 'firebase'
import firebaseui from 'firebaseui';
import axios from 'axios'

const config = {
    apiKey: "AIzaSyCifX6HM69YtkUP80IiBuqpMihabLJrpxk",
    authDomain: "microbiot-ea325.firebaseapp.com",
    databaseURL: "https://microbiot-ea325.firebaseio.com",
    projectId: "microbiot-ea325",
    storageBucket: "microbiot-ea325.appspot.com",
    messagingSenderId: "856760088283"
};

const auth = {
  context: null,
  uiConfig: null,
  ui: null,

  init(context) {
    this.context = context;

    firebase.initializeApp(config);
    this.uiConfig = {
      signInSuccessUrl: 'dashboard',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ]
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());

    firebase.auth().onAuthStateChanged((user) => {
      this.context.$store.dispatch('user/setCurrentUser')

      let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
      let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

      if(requireAuth && !user) this.context.$router.push('auth')
      else if (guestOnly && user) {
        axios.post("http://localhost:5000/api-1.0/login", {"user_id": user.uid}).then(response =>
          {
            console.log(response);
            }).catch(error => {
              console.log(error)
            })
          this.context.$router.push('dashboard')
      }
    });
  },
  authForm(container) {
    this.ui.start(container, this.uiConfig);
  },
  user() {
    return this.context ? firebase.auth().currentUser : null;
  },
  logout() {
    firebase.auth().signOut();
  }
}

export default auth;
