// src/services/credenciaisFirebaseAuth.js
import appFirebase from './credenciaisFirebase';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
