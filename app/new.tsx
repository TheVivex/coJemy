import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';


export default function AddNew() {
  const [text, setText] = useState("");
  const [recipeName, setRecipeName] = useState(""); 
  const [preparationText, setPreparationText] = useState("");

 
  const handleRecipeNameChange = (input) => {
    setRecipeName(input);
  };

  const handleSubmit = () => {
    alert(`You entered: ${text}`);
  };

  const handlePreparationChange = (input) => {
    setPreparationText(input);
  };

  //funkcja do dodawania skladnikow
  const [ingredients, setIngredients] = useState([{ ingredient: '', amount: '' }]);
  const addIngredient = () => {
    setIngredients([...ingredients, { ingredient: '', amount: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };
  
  
  const [isCheckedB, setCheckedB] = useState(false);
  const [isCheckedC, setCheckedC] = useState(false);
  const [isCheckedD, setCheckedD] = useState(false);


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.h2}>Nazwa przepisu</Text>
      <TextInput
        style={styles.input}
        placeholder="Wpisz nazwę przepisu"
        placeholderTextColor="gray" 
        onChangeText={handleRecipeNameChange}  // Use handleRecipeNameChange here
        value={recipeName}
      />

<Text style={styles.h2}>Składniki</Text>
{ingredients.map((ingredient, index) => (
        <View style={styles.row} key={index}>
          <TextInput
            style={[styles.input_ing, { width: "60%" }]}
            placeholder="Składnik"
            placeholderTextColor="gray"
            onChangeText={(text) => handleIngredientChange(index, 'ingredient', text)}
            value={ingredient.ingredient}
          />
          <TextInput
            style={[styles.input_ing, { width: "38%" }]}
            placeholder="Gramatura"
            placeholderTextColor="gray"
            onChangeText={(text) => handleIngredientChange(index, 'amount', text)}
            value={ingredient.amount}
          />
        </View>
      ))}

<TouchableOpacity style={styles.button} onPress={addIngredient}>
        <AntDesign name="pluscircle" size={20} color="black" style={styles.icon} />
        <Text style={styles.buttonText}>Dodaj kolejny składnik</Text>
      </TouchableOpacity>

      <Text style={styles.h2}>Opcje dietetyczne</Text>

      {/* Checkbox B */}
      <View style={[styles.section, isCheckedB && styles.checked]}>
        <Checkbox
          value={isCheckedB}
          onValueChange={setCheckedB}  
          color={isCheckedB ? "#72E149" : undefined}  
        />
        <Text style={styles.paragraph}>Wegańskie</Text>
      </View>

      {/* Checkbox C */}
      <View style={[styles.section, isCheckedC && styles.checked]}>
        <Checkbox
          value={isCheckedC}
          onValueChange={setCheckedC}  
          color={isCheckedC ? "#72E149" : undefined}  
        />
        <Text style={styles.paragraph}>Bez laktozy</Text>
      </View>

{/* Checkbox D */}
      <View style={[styles.section, isCheckedD && styles.checked]}>
        <Checkbox
          value={isCheckedD}
          onValueChange={setCheckedD}  
          color={isCheckedD ? "#72E149" : undefined}  
        />
        <Text style={styles.paragraph}>Bez glutenu</Text>
      </View>

      <Text style={styles.h2}>Sposób przygotowania</Text>
      <TextInput
        style={styles.input_desc}
        placeholder="Opisz sposób przygotowania..."
        placeholderTextColor="gray" 
        onChangeText={handlePreparationChange}
        value={preparationText}
      />
      
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
      
          <Text style={styles.buttonText}>Dodaj przepis</Text>
</TouchableOpacity>


    </View>
     </ScrollView>
     </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  h2: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    width: "100%",
    marginBottom: 20,
  },
  input_ing: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  input_desc:{
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    width: "100%",
    marginBottom: 20,
    height: 100, 
    textAlignVertical: 'top', 
  },

  buttonText:{
    color: "black",
    textAlign: "center",
    fontSize: 16,
    marginLeft: 10,
  },
  button:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#72E149",

  },
  icon_s: {
    marginRight: 10, 
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 5,
    borderRadius: 8,
  },
  paragraph: {
    fontSize: 15,
    marginLeft: 10,
  },
  submitButton:{
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
  
});
