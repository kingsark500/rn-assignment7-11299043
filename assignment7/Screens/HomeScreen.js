import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



export default function HomeScreen ({navigation}) {

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

const [products, setProducts] = useState([]);

useEffect(() => {
  
  axios.get("https://fakestoreapi.com/products")
    .then(response => {

      setProducts(response.data);
      setLoading(false);

    })
    .catch(error => {

      console.error(error);
      setLoading(false);
    });

}, []);


useEffect(() => {
  const loadCart = async () => {

    const cartData = await AsyncStorage.getItem('cart');

    if (cartData) {

      setCart(JSON.parse(cartData));
    }
  };
  loadCart();

}, []);

const addToCart = async (product) => {
  const updatedCart = [...cart, product];

  setCart(updatedCart);

  await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
};





const renderItem = ({ item }) => (

  <View style={styles.product}>
    
  <TouchableOpacity onPress={() => navigation.navigate('Product Details', { product: item })}>
  <Image source={{uri: item.image}} style={styles.image}/>

  </TouchableOpacity>
   
    <Text style={styles.title}>{item.title}</Text>
    
    <Text style={styles.price}>
        ${item.price}
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
       <Image style={styles.add} source={require('../assets/add_circle.png')}/>

      </TouchableOpacity>

  </View>
);

if (loading) {
  return (
    <View style={styles.loadingContainer}>

      <ActivityIndicator size="large" color="#0000ff" />

    </View>
  );
}

return (
  <View style={styles.container}>

    <View>
      
<Image style={styles.menu} source={require('../assets/Menu.png')}/>
<Image style={styles.Logo} source={require('../assets/Logo.png')}/>
<Image style={styles.search} source={require('../assets/Search.png')}/>
<Image style={styles.Bag} source ={require('../assets/shoppingBag.png')}/>

<Text style={styles.story} >
    OUR STORY
</Text>

<Image style={styles.List} source={require('../assets/Listview.png')}/>

<Image style={styles.filter} source={require('../assets/Filter.png')}/>

    </View>
    <FlatList
      data={products}
      renderItem={renderItem}

      keyExtractor={item => item.id.toString()}
    />
    <View>
    <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>

<Text style={styles.buttonText}>Go to Cart</Text>

</TouchableOpacity>
    </View>

  
  </View>


);

};


const styles = StyleSheet.create({

    Logo:{
      left:130,
      bottom:30
    },
    search:{
      left:260,
      bottom:55,
    },

    Bag:{
      left:310,
      bottom:85,
    },

    story:{
      fontSize:24,
      bottom:10
    },
    List:{
      left:260,
      bottom:35,
    },

    filter:{
      left:300,
      bottom:55,
      width:20,
      height:20
    },

   
    container: {
        flex: 1,
        padding: 16,
      },
      product: {
        padding: 16,
        backgroundColor:'#FFFFFF',
        borderRadius:20,
      },

      image: {
        width: 150,
        height: 190,
        marginBottom: 8,
      },
      price:{
        color:'red',
        fontSize:16
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight:'bold',
        fontSize:20,
      },
      cartButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
      },

      

  });
  