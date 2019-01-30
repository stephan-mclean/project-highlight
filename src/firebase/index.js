import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID
});

export const authRef = firebase.auth();
export const dbRef = firebase.firestore();

const storage = firebase.storage().ref();
export const uploadFile = file => {
  return new Promise(resolve => {
    console.log("upload file");
    const currentUser = authRef.currentUser;
    const fileStorageRef = storage.child(`${currentUser.uid}/${file.name}`);

    console.log("uploading to", `${currentUser.uid}/${file.name}`);

    fileStorageRef.put(file).then(() => {
      console.log("uploaded, getting download url");
      fileStorageRef.getDownloadURL().then(url => {
        console.log("download file: ", url);
        resolve(url);
      });
    });
  });
};
