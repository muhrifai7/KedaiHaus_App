import React from "react";
import { FlatList,View,TouchableOpacity,ActivityIndicator,Image } from "react-native";
import { Text, ListItem, Left, Body, Icon, Right, Title } from "native-base";
import { connect } from "react-redux";
import axios from 'axios'

import { getFood,getMenuPending } from '../_actions/allmenu';

class FoodScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }
  getFoods = async()=> {
        await axios.get("http://192.168.43.82:5000/api/v1/categorie/menus/1")
        .then((res)=> {
            const menus = res.data;
             this.props.dispatch(getFood(menus))
             
        })
      .catch(error => {
        console.log(error);
      });
    }
    async componentDidMount(){
     await  this.props.dispatch(getMenuPending()); 
        this.getFoods()
    }
    handleAddOrder = async(data) => { 
      // await  this.props.totalAdd(data)
      // await this.props.dispatch(addNewOrders(data));
  }
  
  _renderItem = ({ item }) => {
     
    return (
      <View
      style={{padding:10,flexDirection:'row',flex:1}}>
       <TouchableOpacity>
        <Image
          style={{width: 70, height: 80,resizeMode:'cover',borderRadius:10}}
          source={{uri: item.img}}
        />
        </TouchableOpacity>
        <View style={{paddingHorizontal:14}}>
          <Text 
          style={{fontSize:16,fontWeight:'bold'}}>{item.menus}
          </Text>
          <Text>Ini adalah Menu yang kami sediakan</Text>
          <Text 
          style={{fontSize:14,color:'#e67e22'}}>Rp {item.price}
          </Text>
          <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
          <TouchableOpacity onPress={()=> this.handleAddOrder(item)}>
            <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
              <Text style={{color:'white',fontWeight:'bold'}}>Tambah</Text>
              
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.handleMinus(item)}>
            <View style={{justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3,borderWidth:0.6,marginLeft:6}}>
              <Text style={{color:'salmon',fontWeight:'bold'}}>-</Text>

            </View>
          </TouchableOpacity>
          </View>
        </View>
</View>
    );
};
   render() { 
     console.log('food',this.props.allmenus.foods.menus)
        return ( 
            <View style={{flex:1,marginTop:10}}>
            {this.props.allmenus.is_loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
                <FlatList
                data={this.props.allmenus.foods.menus}
                renderItem={this._renderItem}
                keyExtractor={item => item.id}
               
              />
            </View> 
             );
    }
}

const mapStateToProps = state => {
    return {
      allmenus: state.allmenus
    };
  };
  
export default connect(mapStateToProps)(FoodScreen);
