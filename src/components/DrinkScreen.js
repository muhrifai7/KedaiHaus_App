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
        .then((res)=> {
            const getDrinkFood = res.data.menus;
             this.props.dispatch(getDrinkfast(getDrinkFood))
             
        })
      .catch(error => {
        console.log(error);
      });
    }
    async componentDidMount(){
      this.getDrink()
      alert(JSON.stringify(this.props.drinks
        ))
  }
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