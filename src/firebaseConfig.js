import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Firebase configuration. Set the values in the .env file.
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DB_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID
};
firebase.initializeApp(config); // Initialize the app.

// Configure the db.
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

// Configure the autentication.
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
