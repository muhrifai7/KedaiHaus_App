import React, { Component } from 'react';
import { View,ActivityIndicator,FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

import ListMenu  from './ListMenu'
import { getDrinkfast} from '../_actions/drink'

class Drinkscreen extends Component {
    constructor(){
        super()
        state = {  }
    }
    
    getDrink = async()=>{
             this.props.dispatch(getDrinkfast())
    }
    async componentDidMount(){
      this.getDrink()
  }
    render() { 
      return ( 
        <View style={{flex:1,marginTop:10}}>
        {this.props.drinks.is_Loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
            data={this.props.drinks.data.menus}
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