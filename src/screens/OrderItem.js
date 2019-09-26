import React, { Component } from "react";
import { TouchableOpacity, StyleSheet,View,Alert } from "react-native";
import { Text,Picker, Form } from "native-base";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios'

import { resetorder,Increment,Decrement } from "../_actions/orders";
import { updateOrder,getTransactions } from "../_actions/transaction";
import { ScrollView } from "react-native-gesture-handler";

class OrderItem extends Component {

  constructor(){
    super()
    this.state = {
      subTotal : 0,
      tax : 0.1,
      discount : 0,
      serviceCharge : 0.5,
      total : 0,
      tableNumber : 0,
      transactionId : undefined,
      is_paid : false,
      data : []
    }
     this.getTransactions()
  }
  
  handleConfirmOrder = () => {
   Alert.alert(
      'Confirm Payment',
      'Are You Sure',
      [
         {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.handleOrder()},
      ],
      {cancelable: false},
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

  _countAll= async()=> {
      subTotal = this.state.subTotal,
      await this.setState({
        total : subTotal + Math.floor(15/100 * subTotal)
    })
  }

  handleOrder = async()=> {
    const tableNum = await AsyncStorage.getItem('@tableNumber');
    const transactionId = await AsyncStorage.getItem("@TRANSACTION_ID");
    const parser = JSON.parse(transactionId)
    this.setState({
        tableNumber : tableNum,
        transactionId : parser.id
    });
    let id = this.state.transactionId
    let data = {
      tableNumber : this.state.tableNumber,
      subtotal : this.state.subTotal,
      discount : 0,
      tax : 0.5,
      total : this.state.total,
      serviceCharge : 0,
      is_paid : true
    }
    this.props.dispatch(updateOrder(data,id))
    this.props.navigation.navigate('CashierPaymend')
    
  }
  handleCancelOrder = () => {
    Alert.alert(
      'Alert Cancel',
      'Are You Sure',
      [
         {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.resetOrder()},
      ],
      {cancelable: false},
    );
  };
  resetOrder = ()=> {
    this.props.dispatch(resetorder())
    this.props.navigation.navigate('Main')
  }
  
  inc = async (item) => {
    await this.props.dispatch(Increment(item,this.props.orders,this.props.orders))
    await this._count()
    await this._countAll()
    
  }
  dec = async (item)=> {
    await this.props.dispatch(Decrement(item,this.props.orders,this.props.orders))
    await this._count()
    await this._countAll()
  }
  getTransactions = async()=>{
    await axios.get("http://192.168.1.112:5000/api/v1/transactions")
    .then((res)=> {console.log(res)
        const dataPostTransaction = res.data;
         this.props.dispatch(getTransactions(dataPostTransaction))
    })
  .catch(error => {
    console.log(error);
  });
}

   async componentDidMount() {
    this.inc()
    this.dec()
    await this._count()
    await this._countAll();
       
    await this.getTransactions()
        const tableNum = await AsyncStorage.getItem('@tableNumber');
        this.setState({
            tableNumber : tableNum
        });
      await this._count()
      await this._countAll();
      await this.props.dispatch(getTransactions(transactionsId, tableNum))
    }
  
    
  
  render() {
    return ( 

      <View style={styles.container}>

        <View style={styles.payment}>
          <View style={{alignItems:'center'}}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Payment Process</Text>
            
            <View style={{justifyContent:'flex-end'}}>
               <Text>Table Number : {this.state.tableNumber}</Text>
            </View>
          </View>

          <ScrollView>
          <View style={styles.paymentList}>
            <Text style={styles.orderName}>Order name  </Text>
            <Text style={styles.title}>Price</Text>
            <Text style={styles.title}>Quantity</Text>
          </View>

          <View style={styles.listPrice}>
            <View style={{flex:1,marginLeft:10}}>
              {this.props.orders.map((item)=> {
                return(
                      <View style={{marginTop:8}}>
                      <Text style={{fontSize:17}}>{item.menus}</Text>
                      </View>
                      )
              })}
            </View>
            <View style={{flex:1,marginLeft:24}}>
              {this.props.orders.map((item)=> {
                return(
                  <View style={{marginTop:8}}>
                      <Text style={{fontSize:17}}>Rp : {item.price}</Text>
                      </View>
                      )
              })}
            </View>

            <View style={{flex:1}}>
              {this.props.orders.map((item)=> {

                return( 
                        <View style={styles.incDec}>
                            <TouchableOpacity onPress={() => this.dec(item)}>
                                <View>
                                   <Text style={{fontSize:23}}> - </Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontWeight: 'bold'}}>{item.qty}</Text>
                            <TouchableOpacity onPress={() => this.inc(item)}>
                                <View>
                                <Text style={{fontSize:23}}> + </Text>
                                </View>
                            </TouchableOpacity>
                        </View> )
              })}
            </View>
          </View>

          

          </ScrollView>
        </View>

        <View style={styles.containTotal}>
        <View style={styles.listTotal}>
            <View>
              <Text style={styles.text}>Sub Total  </Text>
              <Text style={styles.text}>Tax  </Text>
              <Text style={styles.text}>Service Charge  </Text>
              <Text style={styles.text}>Total   </Text>
            </View>
            <View>
            <Text style={styles.text}>: {this.state.subTotal}</Text>
            <Text style={styles.text}>: 10 % </Text>
            <Text style={styles.text}>: 5 %  </Text>
            <Text style={styles.text}>: {this.state.total}</Text>
            </View>
           
      </View>
        </View>

        <View style={styles.containerConfirm}>
          <View style={styles.cancel}>
            <TouchableOpacity onPress={this.handleCancelOrder}>
              <View style={styles.textCancel}><Text>Cancel</Text></View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleConfirmOrder}>
              <View  style={styles.Checkout}><Text>CheckOut</Text></View>
            </TouchableOpacity>
          </View>
        </View>


    </View>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders.orders,
    transactions : state.transactions
  }
}

export default connect(mapStateToProps)(OrderItem);

const styles = StyleSheet.create({
  container : {backgroundColor:'#3498db',flex:1},
  payment : {backgroundColor:'white',margin:10,flex:1,borderRadius:6},
  paymentList : {flexDirection:'row',marginTop:14,padding:6,marginLeft:7,justifyContent:'center'},
  orderName : {fontSize:20,fontWeight:'bold',flex:2},
  title : {fontSize:20,fontWeight:'bold',flex:1},
  listPrice : {flexDirection:'row',flex:1,padding:10},
  incDec : {elevation: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 5, paddingRight: 5, borderRadius: 5, marginRight: 3 },
  text : {
    fontSize:17,fontWeight:'bold'
  },
  containTotal : {backgroundColor:'white',marginHorizontal:10,marginBottom:10,borderRadius:6},
  listTotal : {marginVertical:10,padding:10,alignSelf:'flex-end',flexDirection:'row'},
  containerConfirm : {backgroundColor:'white',height:70},
  cancel : {flexDirection:'row',marginRight:30,justifyContent:'flex-end',marginBottom:10},
  textCancel : {margin:10,padding:6,backgroundColor:'salmon',borderRadius:6},
  Checkout : {margin:10,padding:6,backgroundColor:'#3498db',borderRadius:6}

})