import React, { Component } from 'react';
import { TouchableOpacity,View ,Text,ScrollView,Image} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import { getMenu,getMenuPending} from '../_actions/menu'

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
        alert(i)
    }

    render() { 
        return ( <View style={{flex:1,marginTop:10}}>
            {this.props.menus.isLoading === false ? null : <Text style={{fontSize:20,color:'green'}}>Please Wait...</Text>}
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
                                    <TouchableOpacity onPress={()=>this.props.handleCategorie(value.menus)}>
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
      menus: state.menus,
    }
  }
  
  export default connect(mapStateToProps)(Menulist);