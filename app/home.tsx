// app/home.tsx
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './context/ThemeContext';

const quickActions = [
  {
    title: 'Explorar recomendações',
    description: 'Veja como o algoritmo aprende com o seu gosto',
    icon: 'star',
    route: '/(tabs)/index',
    colors: ['#ff6a88', '#e50914'],
  },
  {
    title: 'Ver filmes em cartaz',
    description: 'Catálogo atualizado com trailers e notas',
    icon: 'film',
    route: '/(tabs)/FilmesEmCartaz',
    colors: ['#4e54c8', '#1d2671'],
  },
  {
    title: 'Ajustar preferências',
    description: 'Controle notificações, modo escuro e autoplay',
    icon: 'sliders',
    route: '/(tabs)/settings',
    colors: ['#43cea2', '#185a9d'],
  },
];

export default function Home() {
  const { colors, darkMode } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}> 
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}> 
        <Text style={[styles.headline, { color: colors.text }]}>Bem-vindo ao CineAI</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}> 
          Monte sua lista de favoritos, acompanhe diretores queridos e deixe que o nosso algoritmo
          traga recomendações precisas para a sua próxima sessão.
        </Text>

        {quickActions.map(action => (
          <Pressable
            key={action.title}
            onPress={() => router.push(action.route as never)}
            style={styles.card}
          >
            <LinearGradient colors={action.colors} style={styles.gradient}> 
              <View style={styles.iconWrapper}>
                <FontAwesome name={action.icon as any} size={28} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{action.title}</Text>
                <Text style={styles.cardDescription}>{action.description}</Text>
              </View>
              <FontAwesome name="chevron-right" size={18} color="#fff" />
            </LinearGradient>
          </Pressable>
        ))}
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
    paddingVertical: 32,
    gap: 20,
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  gradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
  },
});
