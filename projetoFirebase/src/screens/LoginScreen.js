// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert } from 'react-native';
import auth from '../services/credenciaisFirebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/credenciaisFirebase';
import globalStyles from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Buscar o tipo do usuário no Firestore
      const userDoc = await getDoc(doc(db, 'Usuarios', user.uid));

      if (userDoc.exists()) {
        const { tipo } = userDoc.data();

        if (tipo === 'admin') {
          navigation.navigate('AdminDashboard');
        } else if (tipo === 'aluno') {
          navigation.navigate('UserDashboard');
        } else if (tipo === 'avaliador') {
          navigation.navigate('AvaliadorDashboard');
        } else {
          Alert.alert('Erro', 'Tipo de usuário desconhecido.');
        }
      } else {
        Alert.alert('Erro', 'Usuário não cadastrado no sistema.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha no login');
      console.error(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Senha"
        style={globalStyles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
