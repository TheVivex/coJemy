import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, useRouter } from 'expo-router';  
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';


export default function RecepiesList() {
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);


  function GetIcons(vegan = -1, gluten = -1, lactose = -1){
      if(vegan == 1){
        return (<Ionicons name="leaf" size={12} color="green" />)
      }
      else if(gluten == 0){
        return (<MaterialIcons name="grass" size={12} color="#8a8a08" />)
      }
      else if(lactose == 0){
        return (<Entypo name="bucket" size={12} color="#8a8a8a" />)
      }
  }

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
              <View style={{flexDirection:"row"}}>
                  {GetIcons(item.isVegan)}
                  {GetIcons(undefined, item.isGlutenFree)}
                  {GetIcons(undefined,undefined, item.isLactoseFree)}
              </View>
        </Link>
      )))
    }
  }
  
  
  return (
    <View style={styles.main}>
          <View style={{flex: 0.1,flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.h1} >Przepisy</Text>
            <Link style={styles.plus} href="/new"><AntDesign name="pluscircle" size={35} color="#72E149" /></Link>
            
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
    fontWeight: "bold",
    marginBottom: 10,
    padding: 9,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  }
});