import React, { Component } from 'react';
import { View,ActivityIndicator,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import axios from 'axios'

import ListMenu  from './ListMenu'
import { getDrinkfast} from '../_actions/drink'

class Drinkscreen extends Component {
    constructor(){
        super()
        state = {  }
    }
    
    getDrink = async()=>{
        await axios.get("https://foodappss.herokuapp.com/api/v1/categorie/menus/3")
        .then((res)=> {console.log(res)
            const getDrinkFood = res.data.menus;
             this.props.dispatch(getDrinkfast(getDrinkFood))
             
        })
      .catch(error => {
        console.log(error);
      });
    }
    async componentDidMount(){
      this.getDrink()
  }

    // handleAddOrder = async (data) => {
    //   let order = this.props.drinks.data
    //   const index = order.findIndex(item => item.id === data.id)
     
    //   if(index >= 0 && order.id == data.id) {
    //       let orderData = order[index]
    //       let incAmount = orderData.qty + 1
    //       let incOrder = {
    //           ...ListItemorderData,
    //           qty: incAmount,
    //           sumPrice: await orderData.price * incAmount
    //       }
    //       order[index] =incOrder
    //       await this.props.dispatch(updateOrderQty(order))
          
    //   } else {
    //       data = {
    //           ...data,
    //           qty: 1,
    //           status: 0,
    //           sumPrice: data.price
    //       }
    //       await this.props.dispatch(addNewOrders(data))
          
    //   }
      
  // }
    render() { 
      return ( 
        <View style={{flex:1,marginTop:10}}>
        {this.props.drinks.is_Loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
            data={this.props.drinks.data}
            renderItem={({item})=>  <ListMenu menuall={item} />}
            keyExtractor={item => item.id}
          />
        </View> 
         );
    }
}
 
Drinkscreen.navigationOptions={  
    tabBarIcon:({tintColor, focused})=>(  
        <Icon  
            name={focused ? 'ios-person' : 'md-person'}  
            color={tintColor}  
            size={25}  
        />  
    )  
}  
const mapStateToProps = state => {
    return {
      drinks: state.drinks
    };
  };
  
  export default connect(mapStateToProps)(Drinkscreen);