import { createStore } from 'redux'//ngumpulin
import React, { Component } from 'react';
import { View,Text,Button,TextInput,Device,Image,ScrollView,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";


class TableWelcome extends Component{
    constructor(){
        super()
        state = { 
            tableNumber : ''
         }
       
    }
        
    addTable = async()=> {
        let table = this.state.tableNumber
        await AsyncStorage.setItem("tableNumber", table);
        await this.props.navigation.navigate('AppNavigator')
    }
    render() {
        return ( 
                <View style={{alignContent:'center',margin:30,backgroundColor:'#ecf0f1',borderRadius:16}}>
                
                    <View style={{marginHorizontal:40,marginTop:40,marginBottom:50}}>
                    <Text style={{fontSize:25,color:'#e67e22'}}>Selamat datang</Text>
                    <Text style={{fontSize:15,color:'#e67e22'}}>Silahkan Pilih No Meja</Text>
                            <View style={{marginTop:25}}>
                               
                            </View>
                            <View>
                                <TextInput placeholder='Masukan Nomor Meja'
                                           keyboardType={"numeric"}
                                           onChangeText={(tableNumber)=> this.setState({tableNumber})}
                                >
                                </TextInput>
                            </View>

                            <TouchableOpacity
                           onPress={()=> this.addTable()}>
                           
                                <View 
                                style={{backgroundColor:'red',borderRadius:8,alignSelf:'center',flex:1,paddingVertical:10,paddingHorizontal:54}}>
                                    <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Daftar</Text>
                                </View>
                            
                                </TouchableOpacity>
                            </View>
                </View>
        )
    }
}
export default TableWelcome