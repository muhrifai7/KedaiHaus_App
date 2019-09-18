import React, { Component } from 'react';
import { View,Text,StatusBar,ActivityIndicator,TouchableOpacity } from 'react-native';
import Barcode from "react-native-barcode-builder";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import { resetorder } from "../_actions/orders";

class CashierPaymend extends Component {
    constructor(){
      super()
      this.state = { 
        tableNumber: '',
        transactionId: undefined ,
        is_Loading : true
      }
    }

    async componentDidMount(){
      const tableNum = await AsyncStorage.getItem('@tableNumber');
      const transactionId = await AsyncStorage.getItem('@TRANSACTION_ID');
      this.setState({
          tableNumber : tableNum
      });
      setTimeout(() => {
        this.setState({ is_Loading: false });
      }, 4000);

    }
    handleCancel = async()=> {
        
      await this.props.navigation.navigate('Modals')
      await this.props.dispatch(resetorder())
   }


    render() { 
        return (  <View style={{ justifyContent: "center", flex: 1 }}>
         {this.state.is_Loading ? 
                   <View style={{alignItems:'center'}}>
                    <ActivityIndicator size="large" color="salmon" 
                    />
                    <Text style={{color:'salmon'}}>Please Wait Your order hass been process</Text>
                    </View> 
                    : null
 }
        <StatusBar  backgroundColor={'gray'} barStyle={"light-content"} />

        <View style={{ alignItems: "center" }}>
        <Text style={{fontSize:17}}>{this.state.tableNumber}</Text>
          <Text
            h1
            h1Style={{
              fontSize: 20,
              marginHorizontal: 20,
              textAlign: "center",
              color: '',
              marginBottom: 20
            }}
          >
            PLEASE BRING THE PHONE TO THE CASHIER TO PROCEED WITH THE PAYMENT
          </Text>
          <Text>{this.state.tableNumber}</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            
              <Barcode
                value={'this.state.tableNumber'}
                format="CODE128"
                width={1.1}
                text= {'this.state.tableNumber'}
              />
    
          </View>
        </View>
        <TouchableOpacity disabled={this.state.is_Loading}
                     onPress={()=> this.handleCancel()}>
                    <View style={{backgroundColor:'#3498db',padding:10,justifyContent:'center',alignItems:'center',borderRadius:6}}>
                        <Text style={{color:'salmon',fontSize:17}}>Done</Text>
                    </View>
                    </TouchableOpacity>
        
      </View> );
    }
}
const mapStateToProps = (state) => {
  return {
    transactions : state.transactions
  }
}

export default connect(mapStateToProps)(CashierPaymend);