import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ImageBackground,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onPress?: (movie: Movie) => void;
  size?: 'small' | 'medium' | 'large';
  showShadow?: boolean;
  footer?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SIZE_MAP = {
  small: { width: 120, height: 170 },
  medium: { width: 150, height: 220 },
  large: { width: 220, height: 300 },
};

export function MovieCard({
  movie,
  onPress,
  size = 'medium',
  showShadow = true,
  footer,
  style,
}: MovieCardProps) {
  const { colors } = useTheme();
  const dimensions = SIZE_MAP[size];

  return (
    <Pressable
      onPress={() => onPress?.(movie)}
      style={[styles.container, showShadow && styles.shadow, style]}
    >
      <ImageBackground
        source={{ uri: movie.poster }}
        style={[styles.poster, dimensions]}
        imageStyle={styles.posterImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text numberOfLines={2} style={[styles.title, { color: colors.text }]}>
              {movie.titulo}
            </Text>
            {footer}
          </View>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  poster: {
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  posterImage: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  content: {
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default MovieCard;
