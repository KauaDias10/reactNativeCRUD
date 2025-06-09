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

const CursoList = () => {
  const [cursos, setCursos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", descricao: "" });

  const fetchCursos = async () => {
    const snapshot = await getDocs(collection(db, "Cursos"));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCursos(lista);
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const iniciarEdicao = (curso) => {
    setEditandoId(curso.id);
    setFormData({ nome: curso.nome, descricao: curso.descricao });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({ nome: "", descricao: "" });
  };

  const salvarEdicao = async () => {
    const cursoRef = doc(db, "Cursos", editandoId);
    await updateDoc(cursoRef, formData);
    cancelarEdicao();
    fetchCursos();
  };

  const excluirCurso = async (id) => {
    Alert.alert("Confirmar", "Deseja excluir este curso?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await deleteDoc(doc(db, "Cursos", id));
          fetchCursos();
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
              placeholder="Descrição"
              value={formData.descricao}
              onChangeText={(text) =>
                setFormData({ ...formData, descricao: text })
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
            <Text>{item.descricao}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => iniciarEdicao(item)} />
              <Button
                title="Excluir"
                color="red"
                onPress={() => excluirCurso(item.id)}
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
        data={cursos}
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

export default CursoList;
