import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';



export default function Lista() {
  const { ids_sr } = useLocalSearchParams();

  if(ids_sr){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    let temp = ids_sr;
    let ids = temp.split(",");
    const url = `http://cojemy.hcmp.pl/get_List.php?id[]=${ids[0]}&id[]=${ids[1]}&id[]=${ids[2]}&id[]=${ids[3]}&id[]=${ids[4]}&id[]=${ids[5]}&id[]=${ids[6]}`;
    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          setData(json);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, []);
    function GetList(){
      let licznik = 0;
      if(data){
        return ( data.map((item) => (
          <Link key={licznik++} href={"/recepie?id="+item.id} style={styles.obj}>
                <Text style={styles.itemText}>{`\u2022 ${item[0]} ${item[1]}${item[2]}`}</Text>
          </Link>
          )))
      }
    }
  
    return (
      <ScrollView>
        <View style={styles.main}>
          
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Entypo name="add-to-list" size={24} color="black" style={{ marginRight: 8 }} />
            <Text style={styles.h3}>Twoja lista zakupów</Text>
          </View>
          
          <Text style={styles.h4}>
            dopasowywana jest w oparciu o wylosowany przez Ciebie jadłospis tygodniowy
          </Text>
          
          <View style={styles.listContainer}>
            <GetList />
          </View>
        
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  h3:{
    fontSize: 17,
    marginTop: 20,
    borderColor: "#000000",
    borderStyle: "solid",
    fontWeight: "bold",
    paddingBottom: 5,

  },
  h4:{
    fontSize: 15,
    marginBottom: 15,
    borderColor: "#000000",
    borderStyle: "solid",
    borderBottomWidth: 1, 
    paddingBottom: 10,
    borderBottomColor: "#72E149",
  },
  listContainer: {
    padding: 10,
  },
  listItem: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  itemText: {
    fontSize: 15,
    lineHeight: 24,
  },
});