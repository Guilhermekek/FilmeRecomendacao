import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function LoginPage() {
  const router = useRouter();
  const { darkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    if (rememberMe) {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
    }
    alert(`Logado como ${username}`);
  };

  const loadSavedCredentials = async () => {
    const savedUsername = await AsyncStorage.getItem('username');
    const savedPassword = await AsyncStorage.getItem('password');
    if (savedUsername && savedPassword) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  const styles = getStyles(darkMode);

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
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
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

          <View style={styles.checkboxContainer}>
            <Checkbox
              value={rememberMe}
              onValueChange={setRememberMe}
              color={rememberMe ? '#E50914' : undefined}
            />
            <Text style={styles.checkboxLabel}>Lembrar login</Text>
          </View>

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>
        </View>

        <Text style={styles.or}>Ou entre com</Text>

        <View style={styles.socialIcons}>
          <FontAwesome name="facebook-f" size={24} color="#333" style={styles.icon} />
          <FontAwesome name="google" size={24} color="#333" style={styles.icon} />
          <FontAwesome name="apple" size={24} color="#333" style={styles.icon} />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Não tem uma conta? </Text>
          <Pressable onPress={() => router.push('/RegisterPage')}>
            <Text style={styles.registerLink}>Cadastre-se</Text>
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
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    checkboxLabel: {
      marginLeft: 8,
      color: isDark ? '#eee' : '#333',
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
    or: {
      marginTop: 25,
      color: isDark ? '#ccc' : '#333',
    },
    socialIcons: {
      flexDirection: 'row',
      marginTop: 15,
    },
    icon: {
      marginHorizontal: 10,
    },
    registerContainer: {
      flexDirection: 'row',
      marginTop: 25,
    },
    registerText: {
      color: isDark ? '#ccc' : '#333',
    },
    registerLink: {
      color: '#E50914',
      fontWeight: 'bold',
    },
  });
