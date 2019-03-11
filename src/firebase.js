import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyAjMAJuXjOw0BCXnjIlCOl8O0SxXCHL1b8',
  authDomain: 'slack-clone-d0b47.firebaseapp.com',
  databaseURL: 'https://slack-clone-d0b47.firebaseio.com',
  projectId: 'slack-clone-d0b47',
  storageBucket: 'slack-clone-d0b47.appspot.com',
  messagingSenderId: '53425402868'
}

firebase.initializeApp(config)

export default firebase
