import React, { Component } from 'react';
import { View,Text,Button,StyleSheet,TextInput } from 'react-native';

class Booking extends Component {
    state = {  }
    render() { 
        return ( <View style={{flex:1,backgroundColor:'gray'}}>
        <View style ={{flexDirection:'row'}}>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
        </View>
        <View style ={{flexDirection:'row'}}>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
        </View>
        <View style ={{flexDirection:'row'}}>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
             <View style={{fontSize:30}}><Text>Promo</Text></View>
        </View>
        
           <View style={{flexDirection:'row'}}>
           <View style={styles.textAreaContainer} >
                <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                />
            </View>
            <View style={{flex:1}}>
            <View><Text>gambar</Text></View>
            <View><Text>gambar</Text></View>
            <View><Text>gambar</Text></View></View> 
           </View>
       </View> );
    }
}
 
export default Booking;