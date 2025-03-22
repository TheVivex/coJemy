import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

let firstTime = true;
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


let isLoaded = false;
const PrintElements = () => {
  function Sprawdz(){
    if(firstTime){
      firstTime = false;
      return 0
    }
    
    return 5000;
  }
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  if(useIsFocused()){
    setTimeout(() => {
      fetch('http://cojemy.hcmp.pl/get_fridge.php')
          .then(response => response.json())
          .then(json => {
            setData(json);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
            setLoading(false);
          }); 
    },Sprawdz())
  }
  
  const transformData = (input) => {
    return input.map(item => {
      return {
        name: item.id,
        amount: item.amount,
        unit: item.unit,
        expirationDate: item.expiration_date
      };
    });
  };
  if(data && data[0]){
    const ingredients = transformData(data);

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
  }
  
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