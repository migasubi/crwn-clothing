import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCUe8Pm1RukgV8yL2hjCubEywi-E-iC8qU",
  authDomain: "crwn-db-806f9.firebaseapp.com",
  databaseURL: "https://crwn-db-806f9.firebaseio.com",
  projectId: "crwn-db-806f9",
  storageBucket: "crwn-db-806f9.appspot.com",
  messagingSenderId: "57164423662",
  appId: "1:57164423662:web:a131dced2651695fb66eff",
  measurementId: "G-YPX9W0R7LQ"
};

 
export const createUserProfileDocument = async ( userAuth, additionalData ) => {
 
  if(!userAuth) return; 

   const userRef = firestore.doc(`users/${userAuth.uid}`); 
   const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    // store to firebase db async 
    try {
      await userRef.set({
        displayName, email, createdAt, 
        ...additionalData
      })
    } catch (error) {
        console.log('error creating user', error.message);
    } 
  }

  return userRef; 


};

 

firebase.initializeApp(config);


export const auth = firebase.auth(); 
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account ' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 



