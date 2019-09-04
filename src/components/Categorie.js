import React, { Component } from 'react';
import { TouchableOpacity,View ,Text,ScrollView} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import {getCategorie } from '../_actions/categories'

class Categorie extends Component {
    constructor(){
        super()
        this.state = {  }
        this.getCategories()
    }
    // get all categorie
    getCategories = async() => {
        await axios.get("http://192.168.1.46:5000/api/v1/categories")
        .then((res)=> {
          // console.log(res)
          const categorie = res.data;
          this.props.dispatch(getCategorie(categorie))
            .catch(error => {
              console.log(error);
            });
        })
      }

        categorieRole = (i)=> {
          this.props.handleCategorie(i)
        }
    render() { 
        return (  
           
                <View style={{flexDirection:'row',marginTop:10}} > 
                    <ScrollView horizontal={true}>

                         {this.props.categories.data.map((cate,i) => {
                         return <TouchableOpacity  onPress={()=> {this.categorieRole(i)}}>                    
                                 <View keys={cate.id}
                                     style={{padding:7,justifyContent:'center',backgroundColor:'#2980b9',borderRadius:6,margin:5}}>
                                     <Text 
                                     style={{fontSize:16,color:'white'}}>{cate.name}
                                     </Text>
                                 </View>
                             </TouchableOpacity>
                         })} 
                    </ScrollView> 
                                    
                </View> 
               
                );
    }
}
const mapStateToProps = (state) => {
    return {
      categories: state.categories
    }
  }

export default connect(mapStateToProps)(Categorie);
