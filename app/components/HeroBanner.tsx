import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Movie } from '../types/movie';

interface HeroBannerProps {
  movie: Movie;
  onPrimaryAction?: (movie: Movie) => void;
  onSecondaryAction?: (movie: Movie) => void;
}

export function HeroBanner({
  movie,
  onPrimaryAction,
  onSecondaryAction,
}: HeroBannerProps) {
  const { colors } = useTheme();

  return (
    <ImageBackground
      source={{ uri: movie.poster }}
      style={styles.hero}
      imageStyle={styles.heroImage}
    >
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.85)']}
        style={styles.overlay}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Destaque da semana</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{movie.titulo}</Text>
        {movie.sinopse ? (
          <Text numberOfLines={3} style={[styles.subtitle, { color: colors.textMuted }]}>
            {movie.sinopse}
          </Text>
        ) : null}

        <View style={styles.actions}>
          <Pressable
            onPress={() => onPrimaryAction?.(movie)}
            style={[styles.primaryButton, { backgroundColor: colors.accent }]}
          >
            <Text style={styles.primaryText}>Assistir trailer</Text>
          </Pressable>
          <Pressable
            onPress={() => onSecondaryAction?.(movie)}
            style={[styles.secondaryButton, { borderColor: colors.accent }]}
          >
            <Text style={[styles.secondaryText, { color: colors.text }]}>Adicionar à lista</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 360,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
  },
  heroImage: {
    borderRadius: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(229, 9, 20, 0.85)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
    borderWidth: 1,
  },
  secondaryText: {
    fontWeight: '700',
    fontSize: 14,
  },
});

export default HeroBanner;
