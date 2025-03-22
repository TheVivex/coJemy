import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
    <Stack screenOptions={{ headerTintColor: "black", headerBackTitle: "Wstecz" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="recepie" options={{ headerShown: true, title: "Przepis" }} />
      <Stack.Screen name="new" options={{ headerShown: true, title: "Nowy przepis" }} />
      <Stack.Screen name="lista" options={{ headerShown: true, title: "Lista zakupów" }} />
      <Stack.Screen name="+not-found" />
    </Stack>
      </>
  );
}