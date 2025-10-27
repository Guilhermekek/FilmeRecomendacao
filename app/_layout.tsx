// app/_layout.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';

/**
 * Componente raiz responsável por envolver o aplicativo com o ThemeProvider
 * e definir que todas as telas terão o header oculto. As rotas são geradas
 * automaticamente a partir dos arquivos em `app/`.
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* 
          Não é necessário declarar as telas aqui, pois o Expo Router usa 
          roteamento baseado em arquivos. O arquivo `app/index.tsx` fará o 
          redirecionamento inicial para /login, e as demais páginas (home, 
          movies, recommend) serão registradas conforme forem adicionadas. 
        */}
      </Stack>
    </ThemeProvider>
  );
}
