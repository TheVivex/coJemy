import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from 'expo-router';
export default function demo() {
  const { id } = useLocalSearchParams();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>DEMO wartość {id}</Text>
    </View>
  );
}
