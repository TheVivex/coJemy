import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';  
import AntDesign from '@expo/vector-icons/AntDesign';


export default function RecepiesList() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function PrintElements(){
    
    useEffect(() => {
      fetch('http://cojemy.hcmp.pl/get_recepies.php')
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
        <Link key={item.id} href={"/recepie?id="+item.id} style={styles.obj}>
              <Text>{item.title}</Text>
        </Link>
      )))
    }
  }
  
  
  return (
    <View style={styles.main}>
          <View style={{flex: 0.1,flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.h1} >Przepisy</Text>
            <Link style={styles.plus} href="/demo"><AntDesign name="pluscircle" size={35} color="#72E149" /></Link>
            
          </View>
    
          <ScrollView style={styles.list}>        
            {PrintElements()}
          </ScrollView>
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
    flex:1,
  },
  h1:{
    fontSize: 40,
  },
  plus:{
    marginTop: 10,
  },
  obj: {
    borderColor: "#000000",
    borderStyle: "solid",
    borderWidth: 1,
    textAlign: 'center',   
    fontWeight: "bold",
    padding: 9,
    borderRadius: 8,
    marginBottom: 10
  }
});