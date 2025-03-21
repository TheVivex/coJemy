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
          <MaterialCommunityIcons name={focused ? 'fridge' : 'fridge-outline'} color={focused ? '#72E149' : '#aaa'} size={24} />
        ), tabBarLabelStyle: { color: '#aaa' }  }} />


      <Tabs.Screen name="index" options={{ 
        title: 'Strona Główna', 
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={focused ? '#72E149' : '#aaa'} size={24} />
        ), tabBarLabelStyle: { color: '#aaa' } }}  />


      <Tabs.Screen name="recepies_list" options={{ 
        title: 'Przepisy', 
        headerShown: false,
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name={focused ? 'clipboard-list' : 'clipboard-list-outline'} color={focused ? '#72E149' : '#aaa'}  size={24} />
        ), tabBarLabelStyle: { color: '#aaa' } }} />
    </Tabs>
  );
}