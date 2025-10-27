import Constants from 'expo-constants';
import { Platform } from 'react-native';

function normalizeUrl(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getApiBaseUrl(): string {
  const envUrl =
    process.env.EXPO_PUBLIC_API_URL ??
    (Constants?.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl;

  if (envUrl) {
    return normalizeUrl(envUrl);
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  if (Platform.OS === 'ios') {
    return 'http://127.0.0.1:3000';
  }

  return 'http://localhost:3000';
}

export async function fetchFromApi<T>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const response = await fetch(`${baseUrl}${normalizedPath}`, init);

  if (!response.ok) {
    const error = new Error(`Request failed with status ${response.status}`);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return (await response.json()) as T;
}
