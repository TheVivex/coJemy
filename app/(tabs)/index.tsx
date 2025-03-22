import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';


interface Recipe {
  id: number;
  day: string;
  title: string;
}
let firstTime = true;
function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

let week_ids = [];
export default function Index() {

  const Update = () => {  
    fetch("http://cojemy.hcmp.pl/get_week.php?new=1")
    .then(response => response.json())
    .catch(error => {
      console.error(error);
    }); 
    

  };


  return (
    <View style={styles.main}>
      {/* Nagłówek */}
      <View style={styles.header}>
        <Text style={styles.h1}>coJemy</Text>
      </View>

      {/* pobierz listę zakupow */}
      <MenuList />

      {/* losuj przepis */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push(`/lista?ids_sr=${week_ids}`)}>
          <AntDesign name="shoppingcart" size={20} color="black" />
          <Text style={styles.footerButtonText}>Pobierz listę</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => { Update() }}>
          <AntDesign name="bars" size={20} color="black" />
          <Text style={styles.footerButtonText}>Losuj przepisy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const MenuList = () => {
  function Sprawdz(){
    if(firstTime){
      firstTime = false;
      return 0
    }
    
    return 5000;
  }
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const buttonColors: { [key: string]: string } = {
    "Pon.": "#72E149",
    "Wt.": "#7AE253",
    "Śr.": "#82E85D",
    "Czw.": "#8BEC66",
    "Pt.": "#94F06F",
    "Sob.": "#9BFF7A",
    "Ndz.": "#A2FF84",
  };
  
  setTimeout(() => {
    fetch("http://cojemy.hcmp.pl/get_week.php")
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
  
  if (loading) {
    return <ActivityIndicator size="large" color="#72E149" />;
  }
  if(data && data[0]){
    for(let i = 0; i< 7; i++){
      week_ids.push(data[i]["id"]);
    }
    return (
      <View style={styles.list}>
          {data?.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.button, { backgroundColor: buttonColors[item.day] || "#ddd" }]}
              onPress={() => router.push(`/recepie?id=${item.id}`)}
            >
              <Text style={styles.recipeDay}>{item.day}</Text>
              <Text style={styles.recipeName}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
    )
  }   
  
  
}

//style
const styles = StyleSheet.create({
  main: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  h1: {
    fontSize: 40,
    fontWeight: "bold",
  },
  addButton: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#72E149",
  },
  list: {
    flex: 1,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recipeDay: {
    fontSize: 18,
    fontWeight: "bold",
  },
  recipeName: {
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footerButton: {
    backgroundColor: "#f8f9fa",
    borderColor: "#72E149",   
    borderWidth: 1,  
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    justifyContent: "center",
  },
  footerButtonText: {
    fontSize: 18,
    color: "black",
    marginLeft: 10,
  },
});

export default Index;
