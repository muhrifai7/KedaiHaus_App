import React, { Component } from 'react';
import { View,Text,TextInput,Image,ScrollView,TouchableOpacity } from 'react-native'

import { connect } from "react-redux";

import AsyncStorage from "@react-native-community/async-storage";
import { postTransactionsId } from "../_actions/transaction";
class Welcome extends Component {
   
       
        state = { 
            tableNumber : '',
            buttonDisabled : false
         }

        _handleInput = (num) => {
            this.setState({
                tableNumber: num,
                buttonDisabled: false
            });
        }
        addTable = async()=> {
            let table = this.state.tableNumber
           try {
            await AsyncStorage.setItem('@tableNumber', table);
          } catch (error) {
            console.log(error)
          }
           await this.props.navigation.navigate('Main')
           await this.props.dispatch(postTransactionsId({
            orderId : this.state.tableNumber
          }))
        }


  
    render() { 
      
        return ( <View style={{flex:1,backgroundColor:'#3498db'}}>
                    <ScrollView>
                    <View style={{justifyContent:'center',margin:20,alignItems:'center'}}>
                        <Text style={{fontSize:25,color:'#ecf0f1'}}>Kedai Hauss</Text>
                        <Image
                        style={{width: 280, height: 200}}
                        source={require('../assets/img/welcome.png')}
                        />
                    </View>

                    <View style={{margin:26,backgroundColor:'#ecf0f1',borderRadius:16,alignItems:'center'}}>
                                <View style={{margin:20}}>
                                   <Text style={{fontSize:25,color:'#e67e22'}}>Welcome</Text>
                                </View>
                               
                                        <View style={{alignItems:'center',margin:10}}>
                                            <TextInput style={{borderColor: 'gray',borderBottomWidth:0.8,fontSize:17,alignItems:'center',textAlign: 'center'}}
                                                    placeholder='Select table number'
                                                    keyboardType={"numeric"}
                                                    onChangeText={this._handleInput}
                                            >
                                            </TextInput>
                                        </View>

                                            <TouchableOpacity disabled={this.state.buttonDisabled} 
                                                onPress={()=> this.addTable()}>
                                                <View style={{backgroundColor:'#3498db',borderRadius:8,alignSelf:'center',marginVertical:26,paddingHorizontal:50,paddingVertical:13}}>
                                                    <Text style={{color:'white',fontSize:17,fontWeight:'bold'}}>Register</Text>
                                                </View>
                                            </TouchableOpacity>             
                    </View>
                                
                    </ScrollView>
                </View>);
    }
}
const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
  }
}

export default connect(mapStateToProps)(Welcome);