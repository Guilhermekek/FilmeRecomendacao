import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { InfoBanner } from '../components/InfoBanner';
import { MovieCard } from '../components/MovieCard';
import { SectionHeader } from '../components/SectionHeader';
import { useNowPlaying } from '../hooks/useNowPlaying';

export default function FilmesEmCartazScreen() {
  const { colors, darkMode } = useTheme();
  const { movies, loading, error, refresh, offline } = useNowPlaying({ limit: 60 });

  const gridData = useMemo(() => movies.slice(0, 40), [movies]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <FlatList
        contentContainerStyle={[styles.content, { paddingBottom: 48 }]}
        data={gridData}
        keyExtractor={item => item.titulo}
        numColumns={2}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={
          <View style={styles.header}>
            <SectionHeader
              title="Agora nos cinemas"
              subtitle={
                offline
                  ? 'Você está conferindo uma seleção salva para uso offline'
                  : 'Atualizamos diariamente com base na bilheteria'
              }
            />
            {error ? (
              <InfoBanner
                message={error}
                actionLabel="Recarregar"
                onPress={() => refresh()}
                tone="danger"
              />
            ) : null}
          </View>
        }
        renderItem={({ item, index }) => (
          <MovieCard
            movie={item}
            size="small"
            showShadow={false}
            style={{ marginRight: index % 2 === 0 ? 16 : 0, marginBottom: 24 }}
            onPress={movie => {
              if (movie.trailer) {
                Linking.openURL(movie.trailer).catch(() =>
                  Alert.alert('Ops!', 'Não foi possível abrir o trailer agora.'),
                );
              } else {
                Alert.alert('Trailer indisponível', 'Adicionaremos um trailer em breve.');
              }
            }}
            footer={
              item.nota ? (
                <Text style={[styles.rating, { color: colors.text }]}>⭐ {item.nota.toFixed(1)}</Text>
              ) : (
                <Text style={[styles.rating, { color: colors.textMuted }]}>Em exibição</Text>
              )
            }
          />
        )}
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyState}>
              <ActivityIndicator size="small" color={colors.accent} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>Carregando filmes...</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>Nenhum título encontrado.</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    gap: 24,
  },
  header: {
    marginBottom: 16,
    gap: 16,
  },
  column: {
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

