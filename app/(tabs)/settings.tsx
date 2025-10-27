import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SectionHeader } from '../components/SectionHeader';
import { useTheme } from '../context/ThemeContext';

const STORAGE_KEYS = {
  notifications: '@cineai/notifications',
  autoPlay: '@cineai/autoplay',
};

interface SettingRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingRow({ label, description, value, onValueChange }: SettingRowProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.settingRow, { borderBottomColor: colors.border }]}> 
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {description ? (
          <Text style={[styles.description, { color: colors.textMuted }]}>{description}</Text>
        ) : null}
      </View>
      <Switch value={value} onValueChange={onValueChange} thumbColor={colors.accent} />
    </View>
  );
}

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, colors } = useTheme();
  const [notifications, setNotifications] = useState(false);
  const [autoPlayTrailers, setAutoPlayTrailers] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      const notif = await AsyncStorage.getItem(STORAGE_KEYS.notifications);
      const autoPlay = await AsyncStorage.getItem(STORAGE_KEYS.autoPlay);

      if (notif !== null) setNotifications(notif === 'true');
      if (autoPlay !== null) setAutoPlayTrailers(autoPlay === 'true');
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.notifications, notifications.toString());
  }, [notifications]);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEYS.autoPlay, autoPlayTrailers.toString());
  }, [autoPlayTrailers]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader
          title="Preferências"
          subtitle="Ajuste como o CineAI interage com você"
        />
        <SettingRow
          label="Modo escuro"
          description="Ideal para ambientes com pouca luz"
          value={darkMode}
          onValueChange={toggleDarkMode}
        />
        <SettingRow
          label="Receber notificações"
          description="Alertas de novos lançamentos com atores e diretores favoritos"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingRow
          label="Reproduzir trailers automaticamente"
          description="Tocar automaticamente os trailers ao abrir um detalhe de filme"
          value={autoPlayTrailers}
          onValueChange={setAutoPlayTrailers}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
});
