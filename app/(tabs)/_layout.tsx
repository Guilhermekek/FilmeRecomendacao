import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

const TAB_ICONS: Record<string, keyof typeof FontAwesome.glyphMap> = {
  index: 'home',
  FilmesEmCartaz: 'ticket',
  settings: 'sliders',
  about: 'info-circle',
};

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingVertical: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => (
          <FontAwesome
            name={TAB_ICONS[route.name] ?? 'circle'}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="FilmesEmCartaz" options={{ title: 'Em cartaz' }} />
      <Tabs.Screen name="settings" options={{ title: 'Preferências' }} />
      <Tabs.Screen name="about" options={{ title: 'Sobre' }} />
      <Tabs.Screen name="login" options={{ href: null, tabBarButton: () => null }} />
      <Tabs.Screen name="RegisterPage" options={{ href: null, tabBarButton: () => null }} />
    </Tabs>
  );
}
