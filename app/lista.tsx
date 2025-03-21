import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from 'expo-router';
export default function Lista() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.main}>
      <Text style={styles.h1}>Twoja lista zakupów</Text>
      <ScrollView>
        <Text>ss</Text>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
  },
});