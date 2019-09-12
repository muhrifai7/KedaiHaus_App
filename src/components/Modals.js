import React, { Component } from 'react';
import { View,Text,Image,TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

import { resetorder } from "../_actions/orders";

class Modals extends Component {

    state = {  }

    handleCancel = async()=> {
        
       await this.props.navigation.navigate('Welcome')
       await this.props.dispatch(resetorder())
    }
   
  


    render() { 
        return ( <View style={{backgroundColor:'white',padding:20,flex:1}}>
                   
                    <View style={{alignItems:'center',marginBottom:20,height:100}}>
                        <Text style={{fontSize:24,color:'salmon'}}>Thankyou</Text>
                        <Text style={{fontSize:24,color:'salmon'}}>Please Wait Your Order..</Text>
                    </View>

                     <View style={{backgroundColor:'#f5f6fa',padding:20,flex:1,justifyContent:'center',alignItems:'center',paddingBottom:20}}>
                     
                     <Image
                        style={{width: 280, height: 250,resizeMode:'cover'}}
                        source={{uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMPashKtqsno5fL5RD-tYO6RsxyoYkKMRcKrbS2NyfgKIfsDed'}}
                        />
                          
                    </View>
                    <TouchableOpacity onPress={()=> this.handleCancel()}>
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