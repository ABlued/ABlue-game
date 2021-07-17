import firebase from 'firebase/app';
import 'firebase/firestore';

const firbaseConfig = {
    apiKey: "AIzaSyAl1czW68CCNZc0aSiVyVV8muFdSdLdzFE",
    authDomain: "sparta-miniproject.firebaseapp.com",
    projectId: "sparta-miniproject",
    storageBucket: "sparta-miniproject.appspot.com",
    messagingSenderId: "165323005365",
    appId: "1:165323005365:web:4e5a1ed4bfa37046d3cdfc"
}

firebase.initializeApp(firbaseConfig);

const firestore = firebase.firestore();     // firebase의 인스턴스에 접근하기 위한 코드

export { firestore };