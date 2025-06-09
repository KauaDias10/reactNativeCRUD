import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/credenciaisFirebase";

const PeriodoScreen = () => {
  const [nomePeriodo, setNomePeriodo] = useState('');
  const [ano, setAno] = useState('');

  const periodoCollection = collection(db, 'Periodos');

  const adicionarPeriodo = async () => {
    if (nomePeriodo.trim() === '') return;
    await addDoc(periodoCollection, {
      nome: nomePeriodo,
      ano,
    });
    setNomePeriodo('');
    setAno('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Período</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Período"
        value={nomePeriodo}
        onChangeText={setNomePeriodo}
      />
      <Button title="Cadastrar Período" onPress={adicionarPeriodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default PeriodoScreen;
