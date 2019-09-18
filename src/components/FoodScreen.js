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
       
      this.props.dispatch(getFood())
}

    async componentDidMount(){
       await this.getFoods()
      //  alert(JSON.stringify(this.props.menus
      //   ))
    }
   render() { 
     console.log('menu', this.props.menus.data);
        return ( 
            <View style={{flex:1,marginTop:10}}>
            {this.props.menus.is_Loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                data={this.props.menus.data.menus}
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
