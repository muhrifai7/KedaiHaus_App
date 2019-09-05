import React, { Component } from 'react';
import { TouchableOpacity,View ,Text,ScrollView,Image,ActivityIndicator,} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import {getBreakfast} from '../_actions/breakfast'

class Breakfast extends Component {
    constructor(){
        super()
        this.state = {  }
        this.getBreak()
    }
    // get all categorie
    getBreak = async() => {
        await axios.get("http://192.168.1.46:5000/api/v1/categorie/menus/2")
        .then((res)=> {
          console.log(res.data.menus)
          const breakfast = res.data.menus;
          this.props.dispatch(getBreakfast(breakfast))
            .catch(error => {
              console.log(error);
            });
        })
      }

    render() { 
        return  ( <View style={{flex:1,marginTop:10}}>
       
            {this.props.breakfast.isLoading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
             <ScrollView showsVerticalScrollIndicator={false} >
              {this.props.breakfast.data.map((value,i) => {
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
      breakfast: state.breakfast
    }
  }

export default connect(mapStateToProps)(Breakfast);
