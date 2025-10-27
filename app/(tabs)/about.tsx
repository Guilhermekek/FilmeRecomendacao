import { StatusBar } from 'expo-status-bar';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { SectionHeader } from '../components/SectionHeader';

export default function AboutScreen() {
  const { colors, darkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <StatusBar style={darkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.content}>
        <SectionHeader
          title="Sobre o CineAI"
          subtitle="Nosso projeto de recomendações inteligentes de filmes"
        />

        <View style={[styles.card, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.cardTitle, { color: colors.text }]}>A proposta</Text>
          <Text style={[styles.paragraph, { color: colors.textMuted }]}>
            O CineAI foi criado por Guilherme para ajudar pessoas apaixonadas por cinema a
            descobrirem novos filmes de forma personalizada. A plataforma considera diretores,
            roteiristas, atores recorrentes e as notas que você mais gosta para sugerir o próximo
            título perfeito.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.cardTitle, { color: colors.text }]}>Próximos passos</Text>
          <Text style={[styles.paragraph, { color: colors.textMuted }]}>
            Estamos trabalhando em um motor de recomendação com aprendizado de máquina que atribui
            pesos diferentes para características-chave dos seus filmes favoritos. Muito em breve
            você verá sugestões em tempo real baseadas nos elementos que importam para você.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface }]}> 
          <Text style={[styles.cardTitle, { color: colors.text }]}>Conecte-se</Text>
          <Text style={[styles.paragraph, { color: colors.textMuted }]}>
            Quer acompanhar o progresso do projeto ou colaborar com ideias? Entre em contato pelo
            <Text
              style={[styles.link, { color: colors.accent }]}
              onPress={() => Linking.openURL('mailto:guilherme@example.com')}
            >
              {' email oficial do CineAI'}
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    gap: 20,
  },
  card: {
    padding: 20,
    borderRadius: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    fontWeight: '700',
  },
});
