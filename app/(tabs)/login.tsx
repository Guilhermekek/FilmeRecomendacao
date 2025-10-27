import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpoCheckbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

const STORAGE_KEYS = {
  username: '@cineai/username',
  password: '@cineai/password',
};

export default function LoginPage() {
  const router = useRouter();
  const { colors, darkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Informe usuário e senha para continuar.');
      return;
    }

    setError(null);

    if (rememberMe) {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.username, username],
        [STORAGE_KEYS.password, password],
      ]);
    } else {
      await AsyncStorage.multiRemove([STORAGE_KEYS.username, STORAGE_KEYS.password]);
    }

    router.replace('/(tabs)/index');
  };

  const loadSavedCredentials = async () => {
    const [savedUsername, savedPassword] = await AsyncStorage.multiGet([
      STORAGE_KEYS.username,
      STORAGE_KEYS.password,
    ]);

    const storedUser = savedUsername[1];
    const storedPass = savedPassword[1];

    if (storedUser && storedPass) {
      setUsername(storedUser);
      setPassword(storedPass);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    loadSavedCredentials();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}> 
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
              }}
              style={styles.logo}
            />

            <Text style={[styles.title, { color: colors.text }]}>Entrar no CineAI</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}> 
              Acesse a sua conta e deixe a inteligência artificial sugerir o próximo filme.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Usuário</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="nome@email.com"
                placeholderTextColor={colors.textMuted}
              />

              <Text style={[styles.inputLabel, { color: colors.textMuted }]}>Senha</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="••••••••"
                placeholderTextColor={colors.textMuted}
              />

              <View style={styles.checkboxContainer}>
                <ExpoCheckbox
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  color={rememberMe ? colors.accent : undefined}
                />
                <Text style={[styles.checkboxLabel, { color: colors.textMuted }]}>Lembrar login</Text>
              </View>

              {error ? <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text> : null}

              <Pressable style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
              </Pressable>
            </View>

            <Text style={[styles.or, { color: colors.textMuted }]}>Ou entre com</Text>

            <View style={styles.socialIcons}>
              <FontAwesome name="facebook-f" size={22} color={colors.text} style={styles.icon} />
              <FontAwesome name="google" size={22} color={colors.text} style={styles.icon} />
              <FontAwesome name="apple" size={22} color={colors.text} style={styles.icon} />
            </View>

            <View style={styles.registerContainer}>
              <Text style={[styles.registerText, { color: colors.textMuted }]}>Não tem uma conta? </Text>
              <Pressable onPress={() => router.push('/(tabs)/RegisterPage')}>
                <Text style={[styles.registerLink, { color: colors.accent }]}>Cadastre-se</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    gap: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  logo: {
    width: 74,
    height: 74,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  checkboxLabel: {
    fontSize: 13,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  or: {
    marginTop: 8,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 18,
  },
  icon: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  registerText: {
    fontSize: 13,
  },
  registerLink: {
    fontSize: 13,
    fontWeight: '700',
  },
});
