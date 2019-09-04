import React, { Component } from 'react';
import { View,Text,Image,TouchableOpacity } from 'react-native';

class Pembayaran extends Component {

    state = {  }

   
    render() { 
        return ( <View style={{backgroundColor:'#f5f6fa',padding:20,flex:1}}>
                   
                     <View style={{backgroundColor:'#f5f6fa',padding:20,flex:1,justifyContent:'center',alignContent:'center',paddingBottom:20}}>
                     <Text style={{fontSize:24,color:'salmon'}}></Text>   
                     <Image
                        style={{width: 280, height: 250,resizeMode:'cover'}}
                        source={{uri : 'https://www.colourbox.com/preview/25749569-woman-looking-for-restaurant-in-her-smartphone.jpg'}}
                        />
                          
                    </View>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Welcome")}>
                    <View style={{backgroundColor:'salmon',padding:10,justifyContent:'center',alignItems:'center',borderRadius:6}}>
                        <Text style={{color:'white',fontSize:17}}>Back To Home</Text>
                    </View>
                    </TouchableOpacity>
                 </View>
        

                );
    }
}
 
export default Pembayaran;