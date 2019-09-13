import React, { Component } from 'react';
import { View,Text,Image,TouchableOpacity,ActivityIndicator } from 'react-native';
import { connect } from "react-redux";

import { resetorder } from "../_actions/orders";

class Modals extends Component {
    constructor(){
      super()
      this.state = { 
      is_Loading : true
      }
     
    }
    componentDidMount(){
      setTimeout(() => {
  this.setState({ is_Loading: false });
}, 4000);

    }
    
    handleCancel = async()=> {
        
       await this.props.navigation.navigate('Welcome')
       await this.props.dispatch(resetorder())
    }

    render() { 
        return ( <View style={{backgroundColor:'white',padding:20,flex:1}}>
                   {this.state.is_Loading ? 
                   <View style={{alignItems:'center'}}>
                    <ActivityIndicator size="large" color="salmon" 
                    />
                    <Text style={{color:'salmon'}}>Please Wait Your order hass been process</Text>
                    </View> 
                    :  <View style={{alignItems:'center',marginBottom:20,height:100}}>
                        <Text style={{fontSize:24,color:'salmon'}}>Thankyou</Text>
                        <Text style={{fontSize:24,color:'salmon'}}>Please Enjoy Your Order..</Text>
                    </View>
 }
                  

                     <View style={{backgroundColor:'white',padding:20,flex:1,justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                     
                     <Image
                        style={{width: 280, height: 250,resizeMode:'cover'}}
                        source={{uri : 'https://image.freepik.com/free-vector/organic-food-restaurant-logo-template_23-2147492558.jpg?1'}}
                        />
                          
                    </View>
                    <TouchableOpacity disabled={this.state.is_Loading}
                    onPress={()=> this.handleCancel()}>
                    <View style={{backgroundColor:'#3498db',padding:10,justifyContent:'center',alignItems:'center',borderRadius:6}}>
                        <Text style={{color:'salmon',fontSize:17}}>Back To Home</Text>
                    </View>
                    </TouchableOpacity>
                    
                 </View>
        

                );
    }
}
 
const mapStateToProps = (state) => {
  return {
    transactions : state.transactions
  }
}

export default connect(mapStateToProps)(Modals);