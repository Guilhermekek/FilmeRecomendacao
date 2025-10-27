import React, { useState } from 'react';
import {
  Alert,
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

export default function RegisterPage() {
  const { colors, darkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <View style={[styles.card, { backgroundColor: colors.surface }]}> 
            <Text style={[styles.title, { color: colors.text }]}>Criar conta no CineAI</Text>
            <Text style={[styles.subtitle, { color: colors.textMuted }]}> 
              Cadastre-se para salvar favoritos, acompanhar diretores e personalizar recomendações.
            </Text>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Nome completo</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="Guilherme Silva"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>E-mail</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="voce@email.com"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Senha</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="Crie uma senha forte"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: colors.textMuted }]}>Confirmar senha</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                placeholder="Repita a senha"
                placeholderTextColor={colors.textMuted}
              />
            </View>

            <Pressable style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </Pressable>
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
  content: {
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
    gap: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: 'transparent',
  },
  button: {
    marginTop: 16,
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
});
