import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/credenciaisFirebase";

const AlunoScreen = () => {
  const [nomeAluno, setNomeAluno] = useState('');
  const [matricula, setMatricula] = useState('');

  const alunoCollection = collection(db, 'Alunos');

  const adicionarAluno = async () => {
    if (nomeAluno.trim() === '') return;
    await addDoc(alunoCollection, {
      nome: nomeAluno,
      matricula: matricula,
    });
    setNomeAluno('');
    setMatricula('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Aluno"
        value={nomeAluno}
        onChangeText={setNomeAluno}
      />
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />
      <Button title="Cadastrar Aluno" onPress={adicionarAluno} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default AlunoScreen;
