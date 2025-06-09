import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';
import { db } from '../services/credenciaisFirebase';
import {
  collection,
  getDocs
} from 'firebase/firestore';

export default function ListScreen() {
  const [carros, setCarro] = useState([]);

  const aluguelCollection = collection(db, 'Aluguel');

  const listarAluguel = async () => {
    const data = await getDocs(aluguelCollection);
    setCarro(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    listarAluguel();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Aluguel</Text>

      <FlatList
        data={carros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nomeCarro}>Carro: {item.Carro}</Text>
            <Text>Cliente: {item.Cliente}</Text>
            <Text>Valor: R$ {item.Preco}</Text>
            <Text>Data: {item.Data}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8
  },
  nomeCarro: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
