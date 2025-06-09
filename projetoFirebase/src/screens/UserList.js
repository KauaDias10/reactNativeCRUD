// src/screens/UserList.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/credenciaisFirebase";
import { useNavigation } from "@react-navigation/native";

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);
  const navigation = useNavigation();

  const fetchUsuarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Usuarios"));
      const lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsuarios(lista);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const excluirUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, "Usuarios", id));
      Alert.alert("Sucesso", "Usuário excluído com sucesso.");
      fetchUsuarios(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchUsuarios);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Tipo: {item.tipo}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, styles.editar]}
          onPress={() => navigation.navigate("CadastroUsuarioScreen", { usuario: item })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.excluir]}
          onPress={() => excluirUsuario(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum usuário encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  nome: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: {
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
  },
  editar: { backgroundColor: "#4CAF50" },
  excluir: { backgroundColor: "#f44336" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", marginTop: 40, fontStyle: "italic" }
});
