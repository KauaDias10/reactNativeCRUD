import React, { useEffect, useState } from "react";
import {
  View, Text, TextInput, Button, FlatList, Alert, StyleSheet,
} from "react-native";
import { db } from "../services/credenciaisFirebase";
import {
  collection, getDocs, deleteDoc, doc, updateDoc,
} from "firebase/firestore";

const PeriodoList = () => {
  const [periodos, setPeriodos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nome: "", ano: "" });

  const fetchPeriodos = async () => {
    const snapshot = await getDocs(collection(db, "Periodos"));
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPeriodos(lista);
  };

  useEffect(() => {
    fetchPeriodos();
  }, []);

  const iniciarEdicao = (periodo) => {
    setEditandoId(periodo.id);
    setFormData({ nome: periodo.nome, ano: periodo.ano });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({ nome: "", ano: "" });
  };

  const salvarEdicao = async () => {
    const periodoRef = doc(db, "Periodos", editandoId);
    await updateDoc(periodoRef, formData);
    cancelarEdicao();
    fetchPeriodos();
  };

  const excluirPeriodo = async (id) => {
    Alert.alert("Confirmar", "Deseja excluir este período?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          await deleteDoc(doc(db, "Periodos", id));
          fetchPeriodos();
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
            <View style={styles.botoes}>
              <Button title="Salvar" onPress={salvarEdicao} />
              <Button title="Cancelar" color="gray" onPress={cancelarEdicao} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>Ano: {item.ano}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => iniciarEdicao(item)} />
              <Button
                title="Excluir"
                color="red"
                onPress={() => excluirPeriodo(item.id)}
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
        data={periodos}
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

export default PeriodoList;
