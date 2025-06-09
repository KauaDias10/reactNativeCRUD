// src/services/credenciaisFirebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCunKwz4UmyrM3R50lvspU9zB0XgDG5mQs",
  authDomain: "appunipamrafael.firebaseapp.com",
  projectId: "appunipamrafael",
  storageBucket: "appunipamrafael.firebasestorage.app",
  messagingSenderId: "952078334919",
  appId: "1:952078334919:web:ad401ff6c1deec0ec137e2"
};

// Inicializa o App
const appFirebase = initializeApp(firebaseConfig);

// **NOVO**: inicializa e exporta o Firestore
export const db = getFirestore(appFirebase);

// Mantém export default do App (útil caso queira)
export default appFirebase;
