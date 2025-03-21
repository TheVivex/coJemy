import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

export default function Recepie() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  let dane;
  useEffect(() => {
    fetch('http://cojemy.hcmp.pl/get_recepie.php?id=' + id)
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
  dane = Array(data)[0];


  if (loading) {
    return <ActivityIndicator size="large" color="#72E149" />;
  }

  let ingredients = dane["ingredients"].split(";");
  let theWay = dane["preparation"];


  function PrintElements(x){
    if(x == 0){
      return (ingredients.map((item) => (
        <Text>{`\u2022 ${item.replace('-', " ").replace('-', "")}`}</Text>
            )))
    }
    else if(x == 1){
      return (<Text>{theWay}</Text>)
    }
    
  }
  
  return (
    <ScrollView style={styles.main}>
      <Text style={styles.h1}>{dane["title"]}</Text>
      
      <View style={{flex:2}}>
        <Text style={styles.h2}>Składniki:</Text>
        <View>
            {PrintElements(0)}
        </View>
      </View>
      <View style={{flex:2}}>
        <Text style={styles.h2}>Przygotowanie:</Text>
        <View>
            {PrintElements(1)}
        </View>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex:1
  },
  list: {
    flex:10,
  },
  h1:{
    fontSize: 40,
  },
  h2:{
    fontSize: 25,
    marginTop: 50
  }

});
