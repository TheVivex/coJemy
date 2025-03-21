import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from 'expo-router';
export default function Recepie() {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.main}>
      <Text>DEMO wartość {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flex:1
  },
  list: {
    flex:10,
  },
  h1:{
    fontSize: 40
  }

});
