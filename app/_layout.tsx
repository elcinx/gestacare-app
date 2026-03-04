import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { Colors } from '../constants/Colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background }
      }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="blood-sugar/index" options={{ headerShown: false }} />
        <Stack.Screen name="blood-sugar/add" options={{ headerShown: false }} />
        <Stack.Screen name="activities/index" options={{ headerShown: false }} />
        <Stack.Screen name="activities/add" options={{ headerShown: false }} />
        <Stack.Screen name="nutrition/index" options={{ headerShown: false }} />
        <Stack.Screen name="nutrition/add" options={{ headerShown: false }} />
        <Stack.Screen name="education/index" options={{ headerShown: false }} />
        <Stack.Screen name="faq/index" options={{ headerShown: false }} />
        <Stack.Screen name="survey/index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
