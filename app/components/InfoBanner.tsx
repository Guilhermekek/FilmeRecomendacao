import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface InfoBannerProps {
  message: string;
  actionLabel?: string;
  onPress?: () => void;
  tone?: 'info' | 'success' | 'danger';
}

export function InfoBanner({ message, actionLabel, onPress, tone = 'info' }: InfoBannerProps) {
  const { colors } = useTheme();

  const backgroundColor =
    tone === 'success'
      ? colors.success
      : tone === 'danger'
        ? colors.danger
        : colors.accentMuted;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.message}>{message}</Text>
      {actionLabel ? (
        <Pressable onPress={onPress} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  message: {
    color: '#fff',
    flex: 1,
    fontWeight: '600',
  },
  action: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
  },
});

export default InfoBanner;
