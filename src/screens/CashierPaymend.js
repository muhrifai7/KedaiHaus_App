import React, { Component } from 'react';
import { View,Text,StatusBar } from 'react-native';
import Barcode from "react-native-barcode-builder";

class CashierPaymend extends Component {
    state = {  }

    

    render() { 
        return (  <View style={{ justifyContent: "center", flex: 1 }}>
        <StatusBar barStyle={"light-content"} />
        {/* backgroundColor={'gray'} */}
        <View style={{ alignItems: "center" }}>
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            
              <Barcode
                value='tset'
                format="CODE128"
                width={1.1}
                text='test'
              />
    
          </View>
        </View>
        {/* <Button
          title={"Back to Homepage"}
          onPress={this.goHome}
          buttonStyle={{ backgroundColor: primaryColor }}
          containerStyle={{ marginHorizontal: 20, marginTop: 30 }}
        /> */}
      </View> );
    }
}
 
export default CashierPaymend;