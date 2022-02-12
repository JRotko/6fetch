import { setStatusBarStyle } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);
 
  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseJson => setRecipes(responseJson.meals))
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.head}>
        <Text style={{fontSize: 18, fontWeight: "bold"}}>Recipes</Text>
      </View>
      <View style={styles.list}>
        <FlatList 
          style={{marginLeft : "5%"}}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({item}) => 
            <View>
              <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
              <Image source={{uri:item.strMealThumb}} style = {{ width: 200, height: 200 }}/>
            </View>}
          data={recipes} 
          ItemSeparatorComponent={listSeparator} /> 
      </View>
      <View style={styles.search}>
        <TextInput style={{fontSize: 18, width: 200}} placeholder='keyword' 
          onChangeText={text => setKeyword(text)} />
        <Button title="Find" onPress={getRecipes} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
 },
 head: {
   flex: 1,
   alignItems: 'flex-start',
   justifyContent: 'center',
   backgroundColor: '#fff',
   borderTopWidth: 20,
   borderColor: "#fff"
 },
 list: {
  flex: 10
 },
 search: {
  flex: 1,
  borderTopWidth: 10,
  borderColor: "#fff"
 }
});