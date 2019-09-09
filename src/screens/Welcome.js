import { createStore } from 'redux'//ngumpulin
import React, { Component } from 'react';
import { View,Text,Button,TextInput,Device,Image,ScrollView,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";

import TableWelcome from '../components/TableWelcome'
import { addTransaction } from '../_actions/transaction';
class Welcome extends Component {
    constructor(){
        super()
        this.state = { 
            tableNumber : '',
            buttonDisabled : false
         }
       
    }

    componentDidMount() {
        this.setState({
          buttonDisabled: true
        });
      }
      _handleInput = (num) => {
        this.setState({
            tableNumber: num
        });
    
        if (num !== '') {
          this.setState({
            buttonDisabled: false
          });
        } else {
          this.setState({
            buttonDisabled: true
          });
        }
      }
    addTable = async()=> {
        let table = this.state.tableNumber
        await AsyncStorage.setItem("tableNumber", table);
        // await this.props.dispatch(addTransaction({
        //   table,ispaid :0
        // }))
        // await AsyncStorage.setItem("transactions", table);
        await this.props.navigation.navigate('Main')
    }

    render() { 
      console.log('transactions',this.props);
        return ( <View style={{flex:1,backgroundColor:'#3498db'}}>
                    <ScrollView>
                    <View style={{justifyContent:'center',margin:20,alignItems:'center'}}>
                        <Text style={{fontSize:25,color:'#ecf0f1'}}>Kedai Hauss</Text>
                        <Image
                        style={{width: 280, height: 200}}
                        source={require('../assets/img/welcome.png')}
                        />
                    </View>

                    <View style={{alignContent:'center',margin:30,backgroundColor:'#ecf0f1',borderRadius:16}}>
                
                                <View style={{marginHorizontal:40,marginTop:40,marginBottom:50}}>
                                <Text style={{fontSize:25,color:'#e67e22'}}>Selamat datang</Text>
                                <Text style={{fontSize:15,color:'#e67e22'}}>Silahkan Pilih No Meja</Text>
                                        <View style={{marginTop:25}}>
                                        
                                        </View>
                                        <View>
                                            <TextInput placeholder='Masukan Nomor Meja'
                                                    keyboardType={"numeric"}
                                                    onChangeText={this._handleInput}
                                            >
                                            </TextInput>
                                        </View>

                                        <TouchableOpacity disabled={this.state.buttonDisabled}
                                         onPress={()=> this.addTable()}>
                                            <View 
                                            style={{backgroundColor:'#3498db',borderRadius:8,alignSelf:'center',flex:1,paddingVertical:10,paddingHorizontal:54}}>
                                                <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Daftar</Text>
                                            </View>
                                        
                                            </TouchableOpacity>
                                        </View>
                                </View>
                    </ScrollView>
                </View>);
    }
}
 
export default Welcome;