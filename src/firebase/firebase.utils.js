import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCfm6AF9msH0w4IvM2FJvMboNApCmVF1Ng',
  authDomain: 'crown-db-8793c.firebaseapp.com',
  databaseURL: 'https://crown-db-8793c.firebaseio.com',
  projectId: 'crown-db-8793c',
  storageBucket: 'crown-db-8793c.appspot.com',
  messagingSenderId: '727998710542',
  appId: '1:727998710542:web:765987497a5376d5bc0d5f'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
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
provider.setCustomParameters({ prompt: 'select_account' });
export const signinWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
