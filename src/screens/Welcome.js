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
            nomor: ''
        }
    }
        
    _addUser = () => {
        let table = this.state.nomor
        this.props.navigation.navigate('Menu',{name:table})
    }

    render() {
        return ( 
            
            <View style={{flex:1,backgroundColor:'#3498db'}}>
            <ScrollView>
            <View style={{justifyContent:'center',margin:20,alignItems:'center'}}>
                <Text style={{fontSize:25,color:'#ecf0f1'}}>Kedai Bootscamp</Text>

                <Image
                    style={{width: 280, height: 200}}
                    source={require('../assets/img/welcome.png')}
                    />
            </View>
                <View style={{alignSelf:'center',margin:40,backgroundColor:'#ecf0f1',borderRadius:20}}>
                
                    <View style={{marginHorizontal:40,marginTop:40,marginBottom:60}}>
                    <Text style={{fontSize:25}}>Selamat datang</Text>
                            <View style={{marginTop:25}}>
                                <Text style={{fontSize:18}}>Masukan Nomor Meja</Text>
                            </View>
                            <View>
                                <TextInput placeholder='Nomor Meja'
                                           keyboardType={"numeric"}
                                           onChangeText={(nomor)=> this.setState({nomor})}
                                >
                                </TextInput>
                            </View>

                            <TouchableOpacity onPress={()=> this._addUser()}>
                            <View style={{backgroundColor:'#0984e3',borderRadius:8}} >
                                <View 
                                style={{backgroundColor:'#0984e3',borderRadius:8,alignSelf:'center',flex:1,margin:5}}>
                                    <Text style={{color:'white'}}>Daftar</Text>
                                </View>
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

