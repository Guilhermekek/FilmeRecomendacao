import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { HeroBanner } from '../components/HeroBanner';
import { InfoBanner } from '../components/InfoBanner';
import { MovieCard } from '../components/MovieCard';
import { SectionHeader } from '../components/SectionHeader';
import { Movie } from '../types/movie';
import { HERO_PLACEHOLDER_COPY } from '../data/fallbackMovies';
import { useNowPlaying } from '../hooks/useNowPlaying';

const RECOMMENDATION_COPY =
  'Com base na sua lista de favoritos, priorizamos filmes com diretores recorrentes, elencos familiares e gêneros que você mais assiste.';

export default function HomeScreen() {
  const { colors, darkMode } = useTheme();
  const { movies, loading, error, refresh } = useNowPlaying({ limit: 24 });

  const heroMovie = useMemo<Movie>(() => {
    const first = movies[0];
    return {
      ...first,
      sinopse: first.sinopse ?? HERO_PLACEHOLDER_COPY,
    };
  }, [movies]);

  const curatedSections = useMemo(
    () => ({
      topMatches: movies.slice(1, 7),
      directors: movies.slice(7, 13),
      mood: movies.slice(13, 19),
      freshPicks: movies.slice(19, 24),
    }),
    [movies],
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 48 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}> 
          <Text style={[styles.greeting, { color: colors.text }]}>Boa noite, cinéfilo!</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>{RECOMMENDATION_COPY}</Text>
        </View>

        <HeroBanner
          movie={heroMovie}
          onPrimaryAction={movie => {
            if (movie.trailer) {
              Linking.openURL(movie.trailer).catch(() =>
                Alert.alert('Ops!', 'Não foi possível abrir o trailer agora.'),
              );
            } else {
              Alert.alert('Trailer indisponível', 'Adicionaremos um trailer em breve.');
            }
          }}
          onSecondaryAction={() => {
            Alert.alert('Em breve', 'Logo você poderá adicionar filmes à sua lista personalizada.');
          }}
        />

        {error ? (
          <InfoBanner
            message={error}
            actionLabel="Tentar novamente"
            onPress={() => refresh()}
            tone="danger"
          />
        ) : null}

        <View style={styles.section}>
          <SectionHeader
            title="Seus matches perfeitos"
            subtitle="Baseado nos gêneros e atores que você mais curte"
          />
          {loading ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator size="small" color={colors.accent} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {curatedSections.topMatches.map(item => (
                <MovieCard
                  key={`top-${item.titulo}`}
                  movie={item}
                  size="medium"
                  footer={
                    item.nota ? (
                      <Text style={[styles.badge, { color: colors.text }]}>⭐ {item.nota.toFixed(1)}</Text>
                    ) : null
                  }
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Diretores recorrentes"
            subtitle="Os cineastas que você mais acompanha"
            actionLabel="Ver todos"
            onActionPress={() => {}}
          />
          {loading ? (
            <View style={styles.loadingRowSmall}>
              <ActivityIndicator size="small" color={colors.accent} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {curatedSections.directors.map(item => (
                <MovieCard
                  key={`director-${item.titulo}`}
                  movie={item}
                  size="small"
                  footer={<Text style={[styles.footerLabel, { color: colors.textMuted }]}>Direção favorita</Text>}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Sessão para o seu humor"
            subtitle="Combine emoções, diretores e elencos da sua lista"
          />
          {loading ? (
            <View style={styles.loadingRowSmall}>
              <ActivityIndicator size="small" color={colors.accent} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {curatedSections.mood.map(item => (
                <MovieCard
                  key={`mood-${item.titulo}`}
                  movie={item}
                  size="small"
                  footer={<Text style={[styles.footerLabel, { color: colors.textMuted }]}>Ideal hoje</Text>}
                />
              ))}
            </ScrollView>
          )}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Adições recentes"
            subtitle="Filmes que combinam com o seu histórico e acabaram de chegar"
          />
          {loading ? (
            <View style={styles.loadingRowSmall}>
              <ActivityIndicator size="small" color={colors.accent} />
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            >
              {curatedSections.freshPicks.map(item => (
                <MovieCard
                  key={`fresh-${item.titulo}`}
                  movie={item}
                  size="small"
                  footer={<Text style={[styles.footerLabel, { color: colors.textMuted }]}>Novo por aqui</Text>}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 16,
    marginBottom: 24,
    gap: 8,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginTop: 32,
  },
  horizontalList: {
    paddingRight: 24,
  },
  loadingRow: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingRowSmall: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
  },
  footerLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

