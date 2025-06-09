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

const CursoScreen = () => {
  const [nomeCurso, setNomeCurso] = useState('');
  const [descricao, setDescricao] = useState('');

  const cursoCollection = collection(db, 'Cursos');

  const adicionarCurso = async () => {
    if (nomeCurso.trim() === '') return;
    await addDoc(cursoCollection, {
      nome: nomeCurso,
      descricao: descricao,
    });
    setNomeCurso('');
    setDescricao('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Curso</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Curso"
        value={nomeCurso}
        onChangeText={setNomeCurso}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />
      <Button title="Cadastrar Curso" onPress={adicionarCurso} />
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

export default CursoScreen;
