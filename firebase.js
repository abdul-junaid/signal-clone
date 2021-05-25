import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB04d1IYjweCYpHSa2n4RFe4MYztM86GT4",
    authDomain: "signal-clone-test-d44a6.firebaseapp.com",
    projectId: "signal-clone-test-d44a6",
    storageBucket: "signal-clone-test-d44a6.appspot.com",
    messagingSenderId: "748794999298",
    appId: "1:748794999298:web:278015d660a40af08c2d1b"
  };

  let app;
  if(firebase.apps.length === 0){
      app = firebase.initializeApp(firebaseConfig);
  }else{
      app = firebase.app();
  }

  const db = firebase.firestore()
  const auth = firebase.auth()

  export { db, auth }