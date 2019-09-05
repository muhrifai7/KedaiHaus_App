import React, { Component } from 'react';
import { TouchableOpacity,View ,Text,ScrollView,Image,ActivityIndicator} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import { getMenu,getMenuPending} from '../_actions/menu'
import { getDataItem } from '../_actions/transactions'

class Menulist extends Component {
    state = {  }

    getMenus = async() => {
        await axios.get("http://192.168.1.46:5000/api/v1/menus")
        .then((res)=> {
          const menu = res.data;
          this.props.dispatch(getMenu(menu))
        //   console.log(menu);
        })
        .catch(error => {
          console.log(error);
        });
      }

      componentDidMount(){
        this.props.dispatch(getMenuPending()); 
        this.getMenus()
      }
      addItem = (i) =>{
        this.props.handleCategorie(i.menus)
        this.props.dispatch(getDataItem(i));
    }

    render() { 
        return ( <View style={{flex:1,marginTop:10}}>
            {this.props.menus.isLoading === false ? null : <ActivityIndicator size="large" color="#0000ff" />}
            <ScrollView showsVerticalScrollIndicator={false} >
              {this.props.menus.data.map((value,i) => {
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
                                    <TouchableOpacity onPress={()=>this.addItem(value)}>
                                      <View style={{backgroundColor:'#2ecc71',justifyContent:'center',alignSelf:'flex-end',borderRadius:7,paddingHorizontal:10,paddingVertical:3}}>
                                        <Text style={{color:'white',fontWeight:'bold'}}>Tambah</Text>
                                      </View>
                                    </TouchableOpacity>
                                    {/* onPress={()=>this.props.handleMin(value.name)} */}
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
const mapStateToProps = (state) => {
    return {
      menus: state.menus,
    }
  }
  
  export default connect(mapStateToProps)(Menulist);