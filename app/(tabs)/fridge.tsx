import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Fridge() {
  return (
    <View style={styles.main}>
      <View style={{ flex: 0.1, flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.h1}>Lodówka</Text>
        <Link style={styles.plus} href="/add_fridge">
          <AntDesign name="pluscircle" size={35} color="#72E149" />
        </Link>
      </View>

      <ScrollView style={styles.list}>        
        <PrintElements />
      </ScrollView>
    </View>
  );
}



const PrintElements = () => {
  const ingredients = [
    { name: "Mleko", amount: 1, unit: "L", expirationDate: "2025-04-10" },
    { name: "Jajka", amount: 10, unit: "szt.", expirationDate: "2025-03-30" },
    { name: "Ser", amount: 200, unit: "g", expirationDate: "2025-04-15" },
  ];

  return (
    <ScrollView>
      {ingredients.map((item, index) => (
        <View key={index} style={styles.obj}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.amount}>{item.amount} {item.unit}</Text>
          </View>
          <View style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
            <Text style={styles.expiration}>Ważne do: {item.expirationDate}</Text>
          </View>
          
        </View>
      ))}
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  main: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  list: {
    flex: 1,
  },
  h1: {
    fontSize: 40,
  },
  plus: {
    marginTop: 10,
  },
  obj: {
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1, 
    fontWeight: "bold",
    marginBottom: 10,
    padding: 9,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  expiration: {
    fontSize: 16,
  }
});