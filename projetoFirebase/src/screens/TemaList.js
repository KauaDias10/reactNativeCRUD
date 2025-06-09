import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, Button, FlatList, Alert, StyleSheet,
} from "react-native";
import { db } from "../services/credenciaisFirebase";
import {
  collection, getDocs, deleteDoc, doc, updateDoc,
} from "firebase/firestore";

const TemaList = () => {
  const [temas, setTemas] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ titulo: "", descricao: "" });

  const fetchTemas = async () => {
    const snapshot = await getDocs(collection(db, "Temas"));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTemas(lista);
  };

  useEffect(() => {
    fetchTemas();
  }, []);

  const iniciarEdicao = (tema) => {
    setEditandoId(tema.id);
    setFormData({ titulo: tema.titulo, descricao: tema.descricao });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({ titulo: "", descricao: "" });
  };

  const salvarEdicao = async () => {
    const temaRef = doc(db, "Temas", editandoId);
    await updateDoc(temaRef, formData);
    cancelarEdicao();
    fetchTemas();
  };

  const excluirTema = async (id) => {
    Alert.alert("Confirmar", "Deseja excluir este tema?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await deleteDoc(doc(db, "Temas", id));
          fetchTemas();
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
              placeholder="Título"
              value={formData.titulo}
              onChangeText={(text) =>
                setFormData({ ...formData, titulo: text })
              }
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
            <Text style={styles.nome}>{item.titulo}</Text>
            <Text>{item.descricao}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => iniciarEdicao(item)} />
              <Button title="Excluir" color="red" onPress={() => excluirTema(item.id)} />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={temas}
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

export default TemaList;
