import React, { Component } from "react";
import { TouchableOpacity, StyleSheet,View,Alert } from "react-native";
import { Text, Badge, Thumbnail } from "native-base";
import { connect } from "react-redux";

import { updateOrderQty } from "../_actions/orders";
import { ScrollView } from "react-native-gesture-handler";

class OrderItem extends Component {

  constructor(){
    super()
    this.state = {
      total : 0
    }
  }

  _handleMinOrders = async (data) => {
    // let orders = this.props.orders;
    const index = orders.findIndex(item => {
      return item.id == data.id
    });

    let orderData = orders[index];
    if (orderData.qty > 1) {
      let incQty = orderData.qty - 1;
      let incOrder = {
        ...orderData,
        qty: incQty
      }

      orders[index] = incOrder;
    } else {

      
      orders.splice(index, 1);
    }
    await this.props.dispatch(updateOrderQty(orders));
  }
  handleConfirmOrder = () => {
    Alert.alert(
      "Confirm Order",
      "Are you sure to order this?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.handleOrder() }
      ],
      { cancelable: false }
    );
  };
  handleOrder = ()=> {
    this.props.navigation.navigate('Modals')
  }
  
  render() {
    console.log('orders:',this.props.orders);

    return ( 

      <View style={{backgroundColor:'#a5b1c2',flex:1}}>

        <View style={{backgroundColor:'white',margin:20,flex:1,borderRadius:6}}>
          <View style={{alignSelf:'center'}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Proses Pembayaran</Text>
            <Text style={{color:'gray'}}>Semua Transaksi Anda Kami Pastikan Aman</Text>
          </View>

          <ScrollView>
          <View style={{flexDirection:'row',marginTop:20,padding:6,marginLeft:24,justifyContent:'center'}}>
            <Text style={{fontSize:15,fontWeight:'bold',flex:2}}>Nama Pesanan  </Text>
            <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Harga</Text>
            <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Jumlah</Text>
          </View>

          <View style={{flexDirection:'row',marginLeft:24,flex:1}}>
            <View style={{flex:2}}>
              {this.props.orders.map((item)=> {
                return(
                      <Text style={{fontSize:15,fontWeight:'bold'}}>{item.menus}</Text>
                      )
              })}
            </View>
            <View style={{flex:1}}>
              {this.props.orders.map((item)=> {
                return(
                      <Text style={{fontSize:15,fontWeight:'bold'}}>{item.price}</Text>
                      )
              })}
            </View>

            <View style={{flex:1}}>
              {this.props.orders.map((item)=> {

                return(
                      <Text style={{fontSize:15,fontWeight:'bold'}}>{1}</Text>
                      )
              })}
            </View>
          </View>
          </ScrollView>
        </View>

        <View style={{backgroundColor:'white',margin:20,borderRadius:6}}>
        <View style={{marginVertical:10,padding:10,alignSelf:'flex-end'}}>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Sub Total : </Text>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Tax : 10 % </Text>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Service Charge : 5 %  </Text>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Total : 140.000 </Text>
      </View>
        </View>

        <View style={{backgroundColor:'white',height:70}}>
          <View style={{flexDirection:'row',marginRight:30,justifyContent:'flex-end',marginBottom:10}}>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Main')}>
              <View style={{margin:10,padding:6,backgroundColor:'salmon',borderRadius:6}}><Text>Cancel</Text></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleConfirmOrder}>
              <View  style={{margin:10,padding:6,backgroundColor:'#3498db',borderRadius:6}}><Text>Confirm</Text></View>
            </TouchableOpacity>
          </View>
        </View>


    </View>


    

    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders
  }
}

export default connect(mapStateToProps)(OrderItem);

const styles = StyleSheet.create({
  orderContainer: {
    paddingHorizontal: 5,
    paddingTop: 5
  },
  badge: {
    top: 0, 
    right: 0,
    position: "absolute"
  }
})