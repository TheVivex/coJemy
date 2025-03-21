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
  ingredients.pop();
  let theWay = dane["preparation"];


  function PrintElements(x){
    if(x == 0){
      let i = 0;
      return (ingredients.map((item) => (
        <Text key={"bullet_"+i++} style={styles.styleText}>{`\u2022 ${item.replace('-', " ").replace('-', "")}`}</Text>
            )))
    }
    else if(x == 1){
      return (<Text style={styles.styleText}>{theWay}</Text>)
    }
    
  }
  
  return (
    <ScrollView style={styles.main}>
      <Text style={styles.h1}>{dane["title"]}</Text>
      
      <View style={{flex:2}}>
        <Text style={styles.h2}>Składniki</Text>
        <View>
            {PrintElements(0)}
        </View>
      </View>
      <View style={{flex:2}}>
        <Text style={styles.h2}>Sposób przygotowania</Text>
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
    flex:1,
    backgroundColor: "#f8f9fa",
  },
  list: {
    flex:10,
  },
  h1:{
    fontSize: 30,
    fontWeight: "bold",
    textAlign:  "center"
  },
  h2:{
    fontSize: 22,
    marginTop: 50,
    marginBottom: 15,
    borderColor: "#000000",
    borderStyle: "solid",
    fontWeight: "bold",
    borderBottomWidth: 1, 
    paddingBottom: 5,
    borderBottomColor: "#72E149",
  },
  styleText:{
    fontSize: 16,
  }

});
