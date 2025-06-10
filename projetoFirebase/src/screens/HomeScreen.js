import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import globalStyles from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Bem vindo ao Portal Universitário</Text>
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        feito por Kauã Christian e Luccas Rodrigues
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerText: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
