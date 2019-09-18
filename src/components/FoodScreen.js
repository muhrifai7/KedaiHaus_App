import React from "react";
import { FlatList,View,TouchableOpacity,ActivityIndicator,Image } from "react-native";
import { connect } from "react-redux";
import axios from 'axios'

import ListMenu  from './ListMenu'
import { getFood } from '../_actions/menus';

class FoodScreen extends React.Component {
  constructor() {
    super();
    this.state = { 
    };
  }
  getFoods = async()=> {
        await axios.get("https://foodappss.herokuapp.com/api/v1/categorie/menus/2")
        .then((res)=> {
            const menus = res.data;
             this.props.dispatch(getFood(menus))
        })
      .catch(error => {
        console.log(error);
      });
    }
    async componentDidMount(){
       await this.getFoods()
    }
   render() { 
     console.log('food',this.props.menus);
        return ( 
            <View style={{flex:1,marginTop:10}}>
            {this.props.menus.is_Loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                data={this.props.menus.foods.menus}
                renderItem={({item})=> <ListMenu menuall={item} />}
                keyExtractor={item => item.id}
              />
            </View> 
             );
    }
}

const mapStateToProps = state => {
    return {
      menus: state.menus
    };
  };
  
export default connect(mapStateToProps)(FoodScreen);
