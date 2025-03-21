import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: "Powrót"  }} />
      <Stack.Screen name="recepie" options={{ headerShown: true, title: "Przepis" }} />
      <Stack.Screen name="new" options={{ headerShown: true, title: "Nowy przepis" }} />
      <Stack.Screen name="lista" options={{ headerShown: true, title: "Lista zakupów" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}