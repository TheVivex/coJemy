import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';





export default function Index() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function PrintElements(){
    
    useEffect(() => {
      fetch('http://cojemy.hcmp.pl')
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
    if(!(!data || !data[0])){
      return (data.map((item) => (
        <Link key={item.id} href={"/recepie?id="+item.id}>{item.day} {item.title}</Link>
      )))
    }
  }

  
  return (
    <View style={styles.main}>
      <View style={{flex: 1,flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={styles.h1} >coJemy</Text>
        <Link style={styles.h1} href="/demo">+</Link>
      </View>

      <View style={styles.list}>        
        {PrintElements()}
      </View>
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
