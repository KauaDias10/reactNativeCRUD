import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/credenciaisFirebase";

const TemaScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  const temaCollection = collection(db, 'Temas');

  const adicionarTema = async () => {
    if (titulo.trim() === '') return;
    await addDoc(temaCollection, {
      titulo,
      descricao,
    });
    setTitulo('');
    setDescricao('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Tema</Text>
      <TextInput
        style={styles.input}
        placeholder="Título do Tema"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Cadastrar Tema" onPress={adicionarTema} />
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

export default TemaScreen;
