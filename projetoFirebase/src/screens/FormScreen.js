import React, { useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Text,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { useNavigation } from '@react-navigation/native'; 
import { db } from '../services/credenciaisFirebase';
import { collection, addDoc } from 'firebase/firestore';

const FormScreen = () => {
  const navigation = useNavigation(); 

  const [carro, setCarro] = useState('');
  const [cliente, setCliente] = useState('');
  const [valoraluguel, setValorAluguel] = useState('');
  const [data, setData] = useState('');

  const aluguelCollection = collection(db, 'Aluguel');

  const adicionarForm = async () => {
    if (carro.trim() === '') return;
    await addDoc(aluguelCollection, {
      Carro: carro,
      Cliente: cliente,
      Preco: valoraluguel,
      Data: data
    });
    setCarro('');
    setCliente('');
    setValorAluguel('');
    setData('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluguel</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Carro"
        value={carro}
        onChangeText={setCarro}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do cliente"
        value={cliente}
        onChangeText={setCliente}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor do aluguel"
        value={valoraluguel}
        onChangeText={setValorAluguel}
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />

      <Button title="Adicionar" onPress={adicionarForm} />
      
      <Button
        title="Visualizar Aluguel"
        onPress={() => navigation.navigate('ListScreen')} 
      />
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

export default FormScreen;
