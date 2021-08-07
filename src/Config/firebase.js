import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyBAH-UE8NahgJWNvK98Qz3pANd52VqxvjI",
    authDomain: "lisandro-react.firebaseapp.com",
    projectId: "lisandro-react",
    storageBucket: "lisandro-react.appspot.com",
    messagingSenderId: "501939045303",
    appId: "1:501939045303:web:5c5e87c1e6411dbd961e32",
    measurementId: "G-6C4EDFMF3R"
};
firebase.initializeApp(firebaseConfig)
firebase.db = firebase.firestore()
firebase.autenticacion = firebase.auth()
export default firebase