import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="fridge" options={{   
        title: 'Lodówka', 
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name={focused ? 'fridge' : 'fridge-outline'} color={color} size={24} />
        ), }} />


      <Tabs.Screen name="index" options={{ 
        title: 'Strona Główna', 
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
        ), }}  />


      <Tabs.Screen name="about" options={{ 
        title: 'Przepisy', 
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name={focused ? 'clipboard-list' : 'clipboard-list-outline'} color={color} size={24} />
        ), }} />
    </Tabs>
  );
}