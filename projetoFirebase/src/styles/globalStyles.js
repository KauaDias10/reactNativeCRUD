import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD', // cor análoga suave ao azul do botão
    justifyContent: 'center',   // centraliza verticalmente
    alignItems: 'center',       // centraliza horizontalmente
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2C3E50', // cor escura para contraste
    textAlign: 'center',
  },
    button: {
    backgroundColor: '#4A90E2', // azul vibrante
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // para Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default globalStyles;
