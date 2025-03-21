import { Text, View } from "react-native";
import { Link } from 'expo-router';
export default function fridge() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Tu będzie lodówka</Text>
    </View>
  );
}
