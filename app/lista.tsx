import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';




export default function Lista() {
  const { ids_sr } = useLocalSearchParams();

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
              <Text>{`\u2022 ${item[0]} ${item[1]}${item[2]}`}</Text>
        </Link>
        )))
    }
  }

  return (
    <View style={styles.main}>
      <Text style={styles.h1}>Twoja lista zakupów</Text>
      <ScrollView>
        {GetList()}
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