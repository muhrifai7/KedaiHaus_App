import { createStore } from 'redux'//ngumpulin
import React, { Component } from 'react';
import { View,Text,Button,TextInput,AsyncStorage,Device,Image,ScrollView,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';

import { actionIncrement,addDataCategorie } from '../_actions/counter';
import { getUsers, getUsersPending } from '../_actions/users'

class Welcome extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            nomor: '',
            is_done : true
        }
    }
        
    _addUser = () => {
        let table = this.state.nomor
        
            this.setState({
            is_done:true
        }
            )
        this.props.navigation.navigate('Menu',{name:table})
    }

    render() {
        return ( 
            
            <View style={{flex:1,backgroundColor:'#3498db'}}>
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
                                           onChangeText={(nomor)=> this.setState({nomor})}
                                >
                                </TextInput>
                            </View>

                            <TouchableOpacity disabled={!this.state.is_done}
                            onPress={()=> this._addUser()}>
                           
                                <View 
                                style={{backgroundColor:'#3498db',borderRadius:8,alignSelf:'center',flex:1,paddingVertical:10,paddingHorizontal:54}}>
                                    <Text style={{color:'white',fontSize:14,fontWeight:'bold'}}>Daftar</Text>
                                </View>
                            
                                </TouchableOpacity>
                            </View>
                </View>
                </ScrollView>
            </View> 
            
        )
    }
}
//callback global
const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        users:state.users,
        categories:state.categories
    }
}
export default connect(mapStateToProps)(Welcome); //hoc

