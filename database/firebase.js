import firebase from 'firebase'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDFdsdA7dOy_LNHVcvRdGH8rDrg4ebHaNk",
    authDomain: "react-native-firebase-a3b92.firebaseapp.com",
    databaseURL: "https://react-native-firebase-a3b92.firebaseio.com",
    projectId: "react-native-firebase-a3b92",
    storageBucket: "react-native-firebase-a3b92.appspot.com",
    messagingSenderId: "645382335909",
    appId: "1:645382335909:web:0e3c7cb5b242fcc9a70c4c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
export default{
    firebase,
    db,
}