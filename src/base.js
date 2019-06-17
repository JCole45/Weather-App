import Rebase from 're-base';
import firebase from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';



const config = {
    
        apiKey: "AIzaSyBXd-rpp6fZWrRBxIuLv_q64phgz4_UYL8",
        authDomain: "first-app-b842b.firebaseapp.com",
        databaseURL: "https://first-app-b842b.firebaseio.com",
        projectId: "first-app-b842b",
        storageBucket: "first-app-b842b.appspot.com",
        messagingSenderId: "444633776903",
       };

       console.log(config)
  
  const app = firebase.initializeApp(config);
  const base=  Rebase.createClass(app.database());
  const sign= app.auth()
  
  export { base , sign }