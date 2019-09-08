import React, { Component } from "react";
import { TouchableOpacity, StyleSheet,View,Alert } from "react-native";
import { Text, Badge, Thumbnail,Picker, Form } from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import { updateOrderQty } from "../_actions/orders";
import { ScrollView } from "react-native-gesture-handler";

class OrderItem extends Component {

  constructor(){
    super()
    this.state = {
      total : 0,
      tableNumber : 0,
      selected: "key1"
    }
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
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
      "Thank You",
      "Your order will arrive soon?",
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
   async componentDidMount() {
        const tableNum = await AsyncStorage.getItem('tableNumber');
        this.setState({
            tableNumber : tableNum
        });
    }
  
  render() {
    
    return ( 

      <View style={{backgroundColor:'#a5b1c2',flex:1}}>

        <View style={{backgroundColor:'white',margin:10,flex:1,borderRadius:6}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Payment Process</Text>
            
            <View style={{justifyContent:'flex-end'}}>
               <Text>Table Number : {this.state.tableNumber}</Text>
            </View>
          </View>

          <ScrollView>
          <View style={{flexDirection:'row',marginTop:14,padding:6,marginLeft:20,justifyContent:'center'}}>
            <Text style={{fontSize:15,fontWeight:'bold',flex:2}}>Order name  </Text>
            <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Price</Text>
            <Text style={{fontSize:15,fontWeight:'bold',flex:1}}>Qty</Text>
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
                      <Text style={{fontSize:15,fontWeight:'bold'}}>Rp : {item.price}</Text>
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
        <View style={{backgroundColor:'white',marginBottom:10,marginHorizontal:10,borderRadius:6}}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:20}}>Payment Method</Text>
          </View>
                <Form>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 120 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Wallet" value="key0" />
                  <Picker.Item label="ATM Card" value="key1" />
                  <Picker.Item label="Debit Card" value="key2" />
                  <Picker.Item label="Credit Card" value="key3" />
                  <Picker.Item label="Cash" value="key4" />
                </Picker>
              </Form>
            </View>

        <View style={{backgroundColor:'white',marginHorizontal:10,marginBottom:10,borderRadius:6}}>
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