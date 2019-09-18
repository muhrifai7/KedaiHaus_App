import React, { Component } from 'react';
import { View,Text,TouchableOpacity,StyleSheet,Image,ActivityIndicator,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

import { getAllMenu } from '../_actions/allmenu';
import { addNewOrders,updateOrderQty } from '../_actions/orders';
import ListMenu  from './ListMenu'

class AllMenu extends Component {
   
    state = { 
      menus : [],
      totalOrder : 0,
      handleShowAdd : false
    }
    
    getMenus = async()=> {
           this.props.dispatch(getAllMenu())
    }

    async componentDidMount(){
      await this.getMenus()
    }
    handleAddOrder = async (data) => {
      
      let order = this.props.allmenus.data
      const index = order.findIndex(item => item.id === data.id)
      if(index >= 0 ) {
           data = {
              ...data,
              qty: 1,
              status: 1,
              sumPrice: data.price
          }
          await this.props.dispatch(addNewOrders(data))
      }
  }


handleMinus = async()=> {
      await this.props.totalMinus()
    }    
    render() { 

        return ( 
        <View style={{flex:1,marginTop:10}}>
            {this.props.allmenus.is_Loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                data={this.props.allmenus.data}
                extraData={this.props.orders.orders}
                renderItem={({item})=>  <ListMenu menuall={item} />}
                keyExtractor= {item => item.id}
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

const styles = StyleSheet.create({
    container : {
      padding:10,flexDirection:'row',flex:1
    },
    img : {width: 80, height: 90,resizeMode:'cover',borderRadius:10,flex:1}
  })