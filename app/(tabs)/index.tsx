import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';


interface Recipe {
  id: number;
  day: string;
  title: string;
}

export default function Index() {
  const [data, setData] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  //pobierz api
  useEffect(() => {
    fetch("http://cojemy.hcmp.pl")
      .then((response) => response.json())
      .then((json: Recipe[]) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  //spiner
  if (loading) {
    return <ActivityIndicator size="large" color="#72E149" />;
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.h1}>coJemy</Text>
         {/* przelozyc do przepisow*/}
         <TouchableOpacity style={styles.addButton} onPress={() => router.push("/demo")}>
         <AntDesign name="pluscircle" size={24} color="#72E149" />
        </TouchableOpacity>
      </View>

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
    </View>
  );
}

//style
const styles = StyleSheet.create({
  main: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
});

export default Index;
