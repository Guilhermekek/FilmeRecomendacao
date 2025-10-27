import React, { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { darkMode } = useTheme();
  const styles = getStyles(darkMode);

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    Alert.alert('Sucesso', `Conta criada para ${name}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
          }}
          style={styles.logo}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            placeholderTextColor="#999"
          />

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    card: {
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      width: '90%',
      maxWidth: 425,
      padding: 30,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    logo: {
      width: 70,
      height: 70,
      marginBottom: 20,
    },
    inputContainer: {
      width: '100%',
    },
    input: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#2a2a2a' : '#fff',
    },
    button: {
      backgroundColor: '#E50914',
      paddingVertical: 12,
      borderRadius: 6,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
    },
  });
