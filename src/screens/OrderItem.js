import React, { Component } from "react";
import { TouchableOpacity, StyleSheet,View,Alert } from "react-native";
import { Text, Badge, Thumbnail,Picker, Form } from "native-base";
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import { updateOrderQty,resetorder,Increment,Decrement } from "../_actions/orders";
import { ScrollView } from "react-native-gesture-handler";

class OrderItem extends Component {

  constructor(){
    super()
    this.state = {
      subTotal : 0,
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
  _count = () => {
    totalku = 0
    this.props.orders.map((item) => {
        let data = item.price * item.qty
        totalku = data + totalku
    })
    this.setState({
        subTotal: totalku
    })
}
  _countAll= ()=> {
    let totals = this.state.subTotal
    this.setState({
      total : totals + Math.floor(15/100 * totals)
    })
  }

  handleOrder = ()=> {
    this.props.navigation.navigate('Modals')
  }
  resetOrder = ()=> {
    this.props.dispatch(resetorder())
    this.props.navigation.navigate('Main')
  }
  
  inc = async (item) => {
    await this.props.dispatch(Increment(item,this.props.orders,this.props.orders))
    await this._count()
     await this._countAll
    
  }
  dec = async (item)=> {
    await this.props.dispatch(Decrement(item,this.props.orders,this.props.orders))
    await this._count()
    await this._countAll
    
  }

   async componentDidMount() {
     this.inc()
     this.dec()
        const tableNum = await AsyncStorage.getItem('tableNumber');
        this.setState({
            tableNumber : tableNum
        });
      await this._count()
      await this._countAll()
    }
  
  render() {
    console.log('hasil',this.props)
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
            <Text style={{fontSize:20,fontWeight:'bold',flex:2}}>Order name  </Text>
            <Text style={{fontSize:20,fontWeight:'bold',flex:1}}>Price</Text>
            <Text style={{fontSize:20,fontWeight:'bold',flex:1}}>Qty</Text>
          </View>

          <View style={{flexDirection:'row',marginLeft:24,flex:1}}>
            <View style={{flex:1}}>
              {this.props.orders.map((item)=> {
                return(
                      <Text style={{fontSize:17}}>{item.menus}</Text>
                      )
              })}
            </View>
            <View style={{flex:1}}>
              {this.props.orders.map((item)=> {
                return(
                      <Text style={{fontSize:17}}>Rp : {item.price}</Text>
                      )
              })}
            </View>

            <View style={{flex:1}}>
              {this.props.orders.map((item)=> {

                return( 
                        <View style={{elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5, borderRadius: 5, marginRight: 3 }}>
                            <TouchableOpacity onPress={() => this.dec(item)}>
                                <View>
                                    <Icon name='minus' color='#00a663' size={23} />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold'}}>{item.qty}</Text>
                            <TouchableOpacity onPress={() => this.inc(item)}>
                                <View>
                                    <Icon name='plus' color='#00a663' size={23} />
                                </View>
                            </TouchableOpacity>
                        </View> )
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
            <Text style={{fontSize:17,fontWeight:'bold'}}>Sub Total Rp : {this.state.subTotal}</Text>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Tax : 10 % </Text>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Service Charge : 5 %  </Text>
            <Text style={{fontSize:17,fontWeight:'bold'}}>Total Rp : {this.state.total}  </Text>
      </View>
        </View>

        <View style={{backgroundColor:'white',height:70}}>
          <View style={{flexDirection:'row',marginRight:30,justifyContent:'flex-end',marginBottom:10}}>
            <TouchableOpacity onPress={this.resetOrder}>
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