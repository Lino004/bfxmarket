import * as firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAcLqOEiFVIvCVvWgqqeLs-EohWjP47U1c',
  authDomain: 'wfxschool.firebaseapp.com',
  databaseURL: 'https://wfxschool.firebaseio.com',
  projectId: 'wfxschool',
  storageBucket: 'wfxschool.appspot.com',
  messagingSenderId: '792517932727',
  appId: '1:792517932727:web:daf9bfc7b6fe603d17bf32',
});

export default app.database();
