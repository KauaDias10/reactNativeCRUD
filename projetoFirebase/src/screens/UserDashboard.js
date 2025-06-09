// src/screens/UserDashboard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel do Aluno</Text>
      <Text style={styles.text}>Bem-vindo! Aqui você verá seus dados e projetos.</Text>
      {/* Adicione funcionalidades específicas para aluno */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16 },
});
