// app/home.tsx
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from './context/ThemeContext';

export default function Home() {
  const { darkMode } = useTheme();
  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: darkMode ? '#121212' : '#fff' }}>
      <Pressable
        onPress={() => router.push('/(tabs)/index')}
        style={{ padding: 20, borderRadius: 12, backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="film" size={32} color="#E50914" />
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 18, color: darkMode ? '#fff' : '#000' }}>Filmes em Cartaz</Text>
          <Text style={{ color: darkMode ? '#ccc' : '#666' }}>Ver cartões de filmes</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => router.push('/recommend')}
        style={{ padding: 20, borderRadius: 12, backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name="star" size={32} color="#E50914" />
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 18, color: darkMode ? '#fff' : '#000' }}>Recomendações</Text>
          <Text style={{ color: darkMode ? '#ccc' : '#666' }}>Obter recomendações de filmes</Text>
        </View>
      </Pressable>
    </View>
  );
}
