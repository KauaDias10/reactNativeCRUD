import React from "react";
import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Painel do Administrador</Text>

      <Text style={styles.section}>Usuários</Text>  
      <Button title="Cadastrar Novo Usuário" onPress={() => navigation.navigate('CadastroUsuarioScreen')} />
      <Button title="Ver/Editar Usuários" onPress={() => navigation.navigate("UserList")} />
  

      <Text style={styles.section}>Cursos</Text>
      <Button title="Cadastrar Curso" onPress={() => navigation.navigate("CursoScreen")} />
      <Button title="Ver/Editar Cursos" onPress={() => navigation.navigate("CursoList")} />

      <Text style={styles.section}>Alunos</Text>
      <Button title="Cadastrar Aluno" onPress={() => navigation.navigate("AlunoScreen")} />
      <Button title="Ver/Editar Alunos" onPress={() => navigation.navigate("AlunoList")} />

      <Text style={styles.section}>Temas</Text>
      <Button title="Cadastrar Tema" onPress={() => navigation.navigate("TemaScreen")} />
      <Button title="Ver/Editar Temas" onPress={() => navigation.navigate("TemaList")} />

      <Text style={styles.section}>Períodos</Text>
      <Button title="Cadastrar Período" onPress={() => navigation.navigate("PeriodoScreen")} />
      <Button title="Ver/Editar Períodos" onPress={() => navigation.navigate("PeriodoList")} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  section: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "600",
  },
});

export default AdminDashboard;
