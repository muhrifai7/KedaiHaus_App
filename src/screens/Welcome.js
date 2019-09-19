import React, { Component } from 'react';
import { View,Text,TextInput,Image,ScrollView,TouchableOpacity,StyleSheet } from 'react-native'

import { connect } from "react-redux";

import AsyncStorage from "@react-native-community/async-storage";
import { postTransactionsId } from "../_actions/transaction";
class Welcome extends Component {
   
       
        state = { 
            tableNumber : '',
            buttonDisabled : true
         }

        _handleInput = async(num) => {
          await this.setState({
                tableNumber: num,
                buttonDisabled: false
            });
        }
        addTable = async()=> {
            let table = parseInt(this.state.tableNumber)
           try {
            await AsyncStorage.setItem('@tableNumber', table);
          } catch (error) {
            console.log(error)
          }
           await this.props.navigation.navigate('Main')
        //    await this.props.dispatch(postTransactionsId({
        //    tableNumber : table,
        //    isPaid : false
        //   }))
        }
  
    render() { 
        return ( <View style={styles.container}>
                    <ScrollView>
                    <View style={styles.wrapImage}>
                        <Text style={styles.title}>Kedai Haus</Text>
                        <Image
                        style={{width: 280, height: 200}}
                        source={require('../assets/img/welcome.png')}
                        />
                    </View>

                    <View style={styles.wrapForm}>
                                <View style={{margin:20}}>
                                   <Text style={{fontSize:25,color:'#e67e22'}}>Welcome</Text>
                                </View>
                               
                                        <View style={{alignItems:'center',margin:10}}>
                                            <TextInput style={styles.formInput}
                                                    placeholder='Select table number'
                                                    keyboardType={"numeric"}
                                                    onChangeText={this._handleInput}
                                            >
                                            </TextInput>
                                        </View>

                                            <TouchableOpacity disabled={this.state.buttonDisabled} 
                                                onPress={()=> this.addTable()}>
                                                <View style={styles.buttonStyle}>
                                                    <Text style={styles.register}>Register</Text>
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

const styles = StyleSheet.create({
    container :{flex:1,backgroundColor:'#3498db'},
    wrapImage : {
        justifyContent:'center',margin:20,alignItems:'center'
    },
    title : {
        fontSize:25,color:'#ecf0f1',fontFamily: 'Roboto'
    },
    wrapForm : {margin:26,backgroundColor:'#ecf0f1',borderRadius:16,alignItems:'center'},
    formInput : {borderColor: 'gray',borderBottomWidth:0.8,fontSize:17,alignItems:'center',textAlign: 'center'},
    buttonStyle : {backgroundColor:'#3498db',borderRadius:8,alignSelf:'center',marginVertical:26,paddingHorizontal:50,paddingVertical:13},
    register : {color:'white',fontSize:20,fontWeight:'bold',fontFamily: 'Roboto'}

})