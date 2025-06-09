// src/screens/UserListScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import useFirebase from '../hooks/useFirebase';
import globalStyles from '../styles/globalStyles';

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const { fetchUsers } = useFirebase();

  useEffect(() => {
    (async () => {
      const data = await fetchUsers();
      setUsers(data);
    })();
  }, []);


  const renderItem = ({ item }) => (
    <View style={globalStyles.listItem}>
      <Text>{item.nome}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserDetails', { id: item.id })
        }
      >
        <Text style={globalStyles.link}>Ver</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={globalStyles.link}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Lista de Usuários</Text>
       <Button title='corno do krl'
        onPress={() =>
          navigation.navigate('FormScreen')
        }
      ></Button>

      <FlatList
        data={users}
        keyExtractor={(x) => x.id}
        renderItem={renderItem}
      />
    </View>
  );
}
