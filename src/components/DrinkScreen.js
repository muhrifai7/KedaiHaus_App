import React, { Component } from 'react';
import { View,Text,TouchableOpacity,ScrollView,Image,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import axios from 'axios'

import { getDrinkfast} from '../_actions/drink'

class Drinkscreen extends Component {
    constructor(){
        super()
        state = {  }
        this.getDrink()
    }
    
    getDrink = async()=>{
        await axios.get("http://192.168.1.30:5000/api/v1/categorie/menus/3")
        .then((res)=> {console.log(res)
            const getDrinkFood = res.data.menus;
             this.props.dispatch(getDrinkfast(getDrinkFood))
             
        })
      .catch(error => {
        console.log(error);
      });
    }
    
    render() { 
        return ( <View style={{flex:1,marginTop:10}}>
            {this.props.drinks.is_loading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
            <ScrollView showsVerticalScrollIndicator={false} >
              {this.props.drinks.data.map((value,i) => {
                return ( 
                          <View keys={value.id}
                                style={{padding:10,flexDirection:'row',flex:1}}>
                                 <TouchableOpacity>
                                  <Image
                                    style={{width: 70, height: 80,resizeMode:'cover',borderRadius:10}}
                                    source={{uri: value.img}}
                                  />
                                  </TouchableOpacity>
                                  <View style={{paddingHorizontal:14}}>
                                    <Text 
                                    style={{fontSize:16,fontWeight:'bold'}}>{value.menus}
                                    </Text>
                                    <Text>Ini adalah Menu yang kami sediakan</Text>
                                    <Text 
                                    style={{fontSize:14,color:'#e67e22'}}>Rp {value.price}
                                    </Text>
                                    <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                                    <TouchableOpacity onPress={()=>this.handleItem(value)}>
                                      <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
                                        <Text style={{color:'white',fontWeight:'bold'}}>Tambah</Text>
                                        
                                      </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                      <View style={{justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3,borderWidth:0.6,marginLeft:6}}>
                                        <Text style={{color:'salmon',fontWeight:'bold'}}>-</Text>

                                      </View>
                                    </TouchableOpacity>
                                    </View>
                                  </View>
                          </View>
                )
                  })}
                  </ScrollView>
            </View>  );
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