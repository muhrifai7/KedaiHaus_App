import React, { Component } from 'react';
import { View,Text,StatusBar,ActivityIndicator,TouchableOpacity,StyleSheet } from 'react-native';
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
      const transactionId = await AsyncStorage.getItem("@TRANSACTION_ID");
      const parser = JSON.parse(transactionId)
      this.setState({
          tableNumber : tableNum,
          transactionId : parser.id
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
        return (  <View style={{ alignItems: "center", flex: 1,marginTop:20,backgroundColor:'white'}}>
          {this.state.is_Loading ? 
                   <View style={{alignItems:'center'}}>
                    <ActivityIndicator size="large" color="salmon" 
                    />
                    <Text style={{color:'salmon'}}>Please Wait Your order hass been process</Text>
                    </View> 
                    : <Text style={{fontSize:20,color:'salmon'}}>#{this.state.tableNumber}</Text>
        }
       <StatusBar  backgroundColor={'gray'} barStyle={"light-content"} />

        <View style={{ backgroundColor: "white",flex:1,alignItems:'center' }}>
          <View style={styles.barcode}>
            
              <Barcode
                value= 'eretgetr'
                format="CODE128"
                width={1.1}
                text= {this.state.transactionId}
              />
    
          </View>
            
            <Text
              h1
              h1Style={{
                fontSize: 20,
                marginHorizontal: 20,
                color:'salmon',
                textAlign: "center",
                color: '',
                marginBottom: 20
              }}
            >
              PLEASE BRING THE PHONE TO THE CASHIER
            </Text>

        </View>
        <TouchableOpacity disabled={this.state.is_Loading}
                     onPress={()=> this.handleCancel()}>
                    <View style={styles.confirm}>
                        <Text style={{color:'salmon',fontSize:17}}>Confirm</Text>
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

const styles = StyleSheet.create({
  barcode : { justifyContent: "center", alignItems: "center",marginVertical:20 },
  confirm : {backgroundColor:'#3498db',paddingHorizontal:136,paddingVertical:10,justifyContent:'center',alignItems:'center',borderRadius:6,marginBottom:30}
})