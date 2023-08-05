// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import {getStorage,ref, uploadBytes , getDownloadURL} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQC-Pgdjc4jXajU1AASnphbZEzxVEoY3g",
  authDomain: "snkr-street.firebaseapp.com",
  projectId: "snkr-street",
  storageBucket: "snkr-street.appspot.com",
  messagingSenderId: "313231230289",
  appId: "1:313231230289:web:e98fbd728fcd3402f17f70",
  measurementId: "G-3G755X1JMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);

export const saveImgToDB = async(fileName, uploadedImgFile)=>{
  try{
      const imageRef = ref(storage, `productImg/${fileName}`);
  
      uploadBytes(imageRef, uploadedImgFile).then((snapshot) => {
          console.log(snapshot.ref)
      });
  }
  catch(error){
      console.log(error)
  }
}

export const downloadIMG = async (id)=>{
  const FileFolderRef = ref(storage, `productImg/${id}`);
  try{
      const url = await getDownloadURL(FileFolderRef)
      return url
  }catch(error){
      console.log(error)
  }
}

export const downloadUserIMG = async (id)=>{
  const FileFolderRef = ref(storage, `userImg/${id}`);
  try{
      const url = await getDownloadURL(FileFolderRef)
      return url
  }catch(error){
      console.log(error)
  }
}