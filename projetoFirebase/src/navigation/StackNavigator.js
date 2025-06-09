import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserListScreen from '../screens/UserListScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import FormScreen from '../screens/FormScreen';
import ListScreen from '../screens/ListScreen';
import AdminDashboard from '../screens/AdminDashboard';
import CursoScreen from '../screens/CursoScreen';
import CursoList from '../screens/CursoList';
import AlunoScreen from '../screens/AlunoScreen';
import AlunoList from '../screens/AlunoList';
import TemaScreen from '../screens/TemaScreen';
import TemaList from '../screens/TemaList';
import PeriodoScreen from '../screens/PeriodoScreen'
import PeriodoList from '../screens/PeriodoList'
import CadastroUsuarioScreen from '../screens/CadastroUsuarioScreen';
import UserDashboard from '../screens/UserDashboard';
import AvaliadorDashboard from '../screens/AvaliadorDashboard';
import UserList from '../screens/UserList';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserListScreen" component={UserListScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        <Stack.Screen name="FormScreen" component={FormScreen} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CursoScreen" component={CursoScreen} />
        <Stack.Screen name="CursoList" component={CursoList} />
        <Stack.Screen name="AlunoScreen" component={AlunoScreen} />
        <Stack.Screen name="AlunoList" component={AlunoList} />
        <Stack.Screen name="TemaScreen" component={TemaScreen} />
        <Stack.Screen name="TemaList" component={TemaList} />
        <Stack.Screen name="PeriodoScreen" component={PeriodoScreen} />
        <Stack.Screen name="PeriodoList" component={PeriodoList} />
        <Stack.Screen name="CadastroUsuarioScreen" component={CadastroUsuarioScreen} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="AvaliadorDashboard" component={AvaliadorDashboard} />
        <Stack.Screen name="UserList" component={UserList} />

    
    </ Stack.Navigator>
);
export default StackNavigator;
