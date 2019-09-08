import React, { Component } from 'react';
import { View,Text,TouchableOpacity,ScrollView,Image,ActivityIndicator,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {  ListItem, Left, Body, Right } from 'native-base'
import { connect } from "react-redux";
import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";

import { getAllMenu,getMenuPending } from '../_actions/allmenu';
import { addNewOrders,updateOrderQty } from '../_actions/orders';
import convertToRupiah from '../env/convert'

class AllMenu extends Component {
    constructor(){
        super()
        state = { 
          menus : [],
          totalOrder : 0
         }
    }
    getMenus = async()=> {
        await axios.get("http://192.168.43.82:5000/api/v1/menus")
        .then((res)=> {
            const menus = res.data;
             this.props.dispatch(getAllMenu(menus))
             
        })
      .catch(error => {
        console.log(error);
      });
    }
    async componentDidMount(){
     await  this.props.dispatch(getMenuPending()); 
        this.getMenus()
    }
    handleAddOrder = async(data) => { 
      await  this.props.totalAdd(data)
      await this.props.dispatch(addNewOrders(data));
    // const index = allmenus.findIndex(item => {
    //   return item.id == data.id
    // });


    // if (index >= 0) {
    //   let orderData = allmenus[index];
    //   let incQty = orderData.qty + 1;
    //   let incOrder = {
    //     ...orderData,
    //     qty: incQty
    //   }

    //   allmenus[index] = incOrder;
    //   await this.props.dispatch(updateOrderQty(allmenus));
    // } else {
    //   data = {
    //     ...data, 
    //     qty: 1
    //   };
    //   await this.props.dispatch(addNewOrders(data));
    // }
    }
    handleMinus = async()=> {
      await this.props.totalMinus()
    }

    _renderItem = ({ item }) => {
     
        return (
          <View
          style={{padding:10,flexDirection:'row',flex:1}}>
           <TouchableOpacity>
            <Image
              style={{width: 70, height: 80,resizeMode:'cover',borderRadius:10}}
              source={{uri: item.img}}
            />
            </TouchableOpacity>
            <View style={{paddingHorizontal:14}}>
              <Text 
              style={{fontSize:16,fontWeight:'bold'}}>{item.menus}
              </Text>
              <Text>Ini adalah Menu yang kami sediakan</Text>
              <Text 
              style={{fontSize:14,color:'#e67e22'}}>Rp {item.price}
              </Text>
              <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
              <TouchableOpacity onPress={()=> this.handleAddOrder(item)}>
                <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
                  <Text style={{color:'white',fontWeight:'bold'}}>Tambah</Text>
                  
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> this.handleMinus(item)}>
                <View style={{justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3,borderWidth:0.6,marginLeft:6}}>
                  <Text style={{color:'salmon',fontWeight:'bold'}}>-</Text>

                </View>
              </TouchableOpacity>
              </View>
            </View>
    </View>
        );
    };
    

    render() { 
        return ( <View style={{flex:1,marginTop:10}}>
            {this.props.allmenus.is_loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                data={this.props.allmenus.data}
                renderItem={this._renderItem}
                keyExtractor={item => item.id}
               
              />
            </View>  );
    }
}
 
AllMenu.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>(  
        <Icon  
            name={focused ? 'ios-person' : 'md-person'}  
            color={tintColor}  
            size={25}  
        />  
    )  
}  
const mapStateToProps = state => {
    return {
      allmenus: state.allmenus
    };
  };
  
export default connect(mapStateToProps)(AllMenu);
