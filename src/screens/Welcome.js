import { createStore } from 'redux'//ngumpulin
import React, { Component } from 'react';
import { View,Text,Button,TextInput,AsyncStorage,Device,Image,ScrollView } from 'react-native'
import { connect } from 'react-redux';
import axios from 'axios';

import { actionIncrement,addDataCategorie } from '../_actions/counter';
import { getUsers, getUsersPending } from '../_actions/users'
// import { tsConstructorType } from '@babel/types';

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
            <View style={{justifyContent:'center',alignSelf:'center',margin:20,alignContent:'center'}}>
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
                            <View>
                            <Button title="Daftar" onPress={()=> this._addUser()}/></View>
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

