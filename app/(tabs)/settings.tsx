import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [autoPlayTrailers, setAutoPlayTrailers] = useState(false);

  useEffect(() => {
    const loadPreferences = async () => {
      const dark = await AsyncStorage.getItem('darkMode');
      const notif = await AsyncStorage.getItem('notifications');
      const autoPlay = await AsyncStorage.getItem('autoPlayTrailers');

      if (dark !== null) setDarkMode(dark === 'true');
      if (notif !== null) setNotifications(notif === 'true');
      if (autoPlay !== null) setAutoPlayTrailers(autoPlay === 'true');
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    AsyncStorage.setItem('notifications', notifications.toString());
  }, [notifications]);

  useEffect(() => {
    AsyncStorage.setItem('autoPlayTrailers', autoPlayTrailers.toString());
  }, [autoPlayTrailers]);

  const isDark = darkMode;
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Text style={styles.label}>Modo escuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Receber notificações</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.label}>Reproduzir trailers automaticamente</Text>
        <Switch value={autoPlayTrailers} onValueChange={setAutoPlayTrailers} />
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: isDark ? '#121212' : '#fff',
      justifyContent: 'center',
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#444' : '#ccc',
    },
    label: {
      fontSize: 16,
      color: isDark ? '#eee' : '#333',
    },
  });
