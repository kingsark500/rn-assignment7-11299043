
import React from 'react';
import { View, Text,  StyleSheet, TouchableOpacity, Image,} from 'react-native';



export default function ProductDetailScreen ({ route }) {

    const { product } = route.params;



    return(

        <View>

            <View>

            <Image style={styles.menu} source={require('../assets/Menu.png')}/>
            <Image style={styles.Logo} source={require('../assets/Logo.png')}/>
            <Image style={styles.search} source={require('../assets/Search.png')}/>
            <Image style={styles.Bag} source ={require('../assets/shoppingBag.png')}/>

            </View>

            <Image source={{uri: product.image}} style={styles.image}/>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>


          

        </View>
    );
};


const styles = StyleSheet.create({

    menu:{
        top:35,
        left:30
    },
    Logo:{
        left:130,
        top:5
      },
      search:{
        left:260,
        bottom:20,
      },
  
      Bag:{
        left:340,
       bottom:50,
      
      },
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    
    image: {
        width: 200,
        height: 300,
        marginBottom: 8,
        left:20,
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      left:20,
    },
    price: {
      fontSize: 20,
      color: 'red',
      marginBottom: 10,
      left:20,
    },
    description: {
      fontSize: 16,
      textAlign: 'left',
      flexWrap: 'wrap', 
      width: '90%',
      left:14,
    },
  });
  

