import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";
import { db } from "../services/credenciaisFirebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AlunoList = () => {
  const [alunos, setAlunos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", matricula: "" });

  const fetchAlunos = async () => {
    const snapshot = await getDocs(collection(db, "Alunos"));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlunos(lista);
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const iniciarEdicao = (aluno) => {
    setEditandoId(aluno.id);
    setFormData({ nome: aluno.nome, matricula: aluno.matricula });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({ nome: "", matricula: "" });
  };

  const salvarEdicao = async () => {
    const alunoRef = doc(db, "Alunos", editandoId);
    await updateDoc(alunoRef, formData);
    cancelarEdicao();
    fetchAlunos();
  };

  const excluirAluno = async (id) => {
    Alert.alert("Confirmar", "Deseja excluir este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await deleteDoc(doc(db, "Alunos", id));
          fetchAlunos();
        },
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const estaEditando = item.id === editandoId;

    return (
      <View style={styles.item}>
        {estaEditando ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={formData.nome}
              onChangeText={(text) => setFormData({ ...formData, nome: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              value={formData.matricula}
              onChangeText={(text) =>
                setFormData({ ...formData, matricula: text })
              }
            />
            <View style={styles.botoes}>
              <Button title="Salvar" onPress={salvarEdicao} />
              <Button title="Cancelar" color="gray" onPress={cancelarEdicao} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Matrícula: {item.matricula}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => iniciarEdicao(item)} />
              <Button
                title="Excluir"
                color="red"
                onPress={() => excluirAluno(item.id)}
              />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  item: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  nome: { fontWeight: "bold", fontSize: 18 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AlunoList;
