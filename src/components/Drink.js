import React, { Component } from 'react';
import { View,Text,ActivityIndicator,Image,TouchableOpacity,ScrollView } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';


import { getDrinkfast} from '../_actions/drink'


class Drink extends Component {
    constructor(){
        super()
        this.state = {  }
        this.getDrink()
    }
    // get all categorie
    getDrink = async() => {
        await axios.get("http://192.168.1.46:5000/api/v1/categorie/menus/3")
        .then((res)=> {
          console.log(res.data.menus)
          const getDrinkFood = res.data.menus;
          this.props.dispatch(getDrinkfast(getDrinkFood))
            .catch(error => {
              console.log(error);
            });
        })
      }
    render() { 
        return  ( <View style={{flex:1,marginTop:10}}>
       
            {this.props.drinks.isLoading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
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
                                    <TouchableOpacity onPress={()=>alert(value.menus)}>
                                      <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
                                        <Text style={{color:'white',fontWeight:'bold'}}>Tambah</Text>
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                          </View>
                        
                )
                  })}
                  </ScrollView> 
            </View>  );
    }
}
const mapStateToProps = (state) => {
    return {
      drinks: state.drinks
    }
  }

export default connect(mapStateToProps)(Drink);
