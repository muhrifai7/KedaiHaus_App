import React from "react";
import { FlatList,View,TouchableOpacity,ActivityIndicator,Image } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";
import { connect } from "react-redux";
import axios from 'axios'

import { getFood } from '../_actions/menus';
import { addNewOrders,updateOrderQty } from '../_actions/orders';

class FoodScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
    };
  }
  getFoods = async()=> {
        await axios.get("http://192.168.0.5:5000/api/v1/categorie/menus/1")
        .then((res)=> {
            const menus = res.data;
             this.props.dispatch(getFood(menus))
        })
      .catch(error => {
        console.log(error);
      });
    }
    async componentDidMount(){
        this.getFoods()
    }
    handleAddOrder = async (data) => {
      let order = this.props.menus.foods.menus
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
        <View style={{padding:10,flexDirection:'row',flex:1}}>
          <TouchableOpacity>
            <Image
              style={{width: 80, height: 90,resizeMode:'cover',borderRadius:10,flex:1}}
              source={{uri: item.img}}
            />
          </TouchableOpacity>
          <View style={{paddingHorizontal:14}}>
            <Text style={{fontSize:16,fontWeight:'bold'}}>{item.menus}
            </Text>
            <Text>Ini adalah Menu yang kami sediakan</Text>
            <Text 
            style={{fontSize:14,color:'#e67e22'}}>Rp {rupiah}
            </Text>
            <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
            <TouchableOpacity onPress={()=> this.handleAddOrder(item)}>
              <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
                <Text style={{color:'white',fontWeight:'bold'}}>Add to cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
  </View>
      );
  };
   render() { 
     console.log('food',this.props.menus);
        return ( 
            <View style={{flex:1,marginTop:10}}>
            {this.props.menus.is_loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                data={this.props.menus.foods.menus}
                renderItem={this._renderItem}
                keyExtractor={item => item.id}
              />
            </View> 
             );
    }
}

const mapStateToProps = state => {
    return {
      menus: state.menus
    };
  };
  
export default connect(mapStateToProps)(FoodScreen);
