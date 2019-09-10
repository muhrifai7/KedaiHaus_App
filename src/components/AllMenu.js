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
           this.props.dispatch(getAllMenu())
  }
    async componentDidMount(){
     await  this.props.dispatch(getMenuPending()); 
        this.getMenus()
    }
    handleAddOrder = async (data) => {
      await this.props.totalAdd(data)
      let order = this.props.allmenus.data
      const index = order.findIndex(item => item.id === data.id)
     
      if(index >= 0 && order.id == data.id) {
          let orderData = order[index]
          let incAmount = orderData.qty + 1
          let incOrder = {
              ...ListItemorderData,
              qty: incAmount,
              sumPrice: await orderData.price * incAmount
          }
          order[index] =incOrder
          await this.props.dispatch(updateOrderQty(order))
          
      } else {
          data = {
              ...data,
              qty: 1,
              status: 0,
              sumPrice: data.price
          }
          await this.props.dispatch(addNewOrders(data))
          
      }
      
  }
handleMinus = async()=> {
      await this.props.totalMinus()
    }    

    _renderItem = ({ item }) => {
     
      const price = item.price
      var number_string = price.toString(),
          sisa = number_string.length % 3,
          rupiah = number_string.substr(0, sisa),
          ribuan = number_string.substr(sisa).match(/\d{3}/g);

      if (ribuan) {
          separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
      }

        return (
          <View
          style={{padding:10,flexDirection:'row',flex:1}}>
           <TouchableOpacity>
            <Image
              style={{width: 80, height: 90,resizeMode:'cover',borderRadius:10,elevation: 6}}
              source={{uri: item.img}}
            />
            </TouchableOpacity>
            <View style={{paddingHorizontal:14}}>
              <Text 
              style={{fontSize:16,fontWeight:'bold'}}>{item.menus}
              </Text>
              <Text 
              style={{fontSize:14,color:'#e67e22'}}>Rp {rupiah}
              </Text>
              <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
              <TouchableOpacity onPress={()=> this.handleAddOrder(item)}>
                <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
                  <Text style={{color:'white',fontWeight:'bold'}}>Add</Text>
                  
                </View>
              </TouchableOpacity>
              </View>
            </View>
    </View>
        );
    };
    

    render() { 
     console.log('all',this.props);
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
      allmenus: state.allmenus,
      orders : state.orders
    };
  };
  
export default connect(mapStateToProps)(AllMenu);
