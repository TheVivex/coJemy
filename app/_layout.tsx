import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Powrót"  }} />
      <Stack.Screen name="recepie" options={{ headerShown: true, title: "Przepis" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}