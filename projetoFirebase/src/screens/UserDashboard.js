import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button'; // seu botão estilizado

export default function UserDashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Aluno</Text>
      <Text style={styles.text}>Bem-vindo! Aqui você verá seus dados e projetos.</Text>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#34495e',
  },
  text: {
    fontSize: 18,
    marginBottom: 30,
    color: '#2c3e50',
    textAlign: 'center',
  },
  button: {
    width: '60%',
  },
});
