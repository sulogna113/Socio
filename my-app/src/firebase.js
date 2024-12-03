
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBPhqpQMa7Bv4S46D-fqwxiOp6wCH5q1R0",
    authDomain: "sociout-20f97.firebaseapp.com",
    projectId: "sociout-20f97",
    storageBucket: "sociout-20f97.appspot.com",
    messagingSenderId: "803220179036",
    appId: "1:803220179036:web:2c41972015d7f6450bfe99",
    measurementId: "G-XE8NQ7XLFQ"
};
export const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);