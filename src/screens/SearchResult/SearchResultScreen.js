import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Dimensions, View, Text, FlatList, TouchableOpacity } from "react-native";
import HTMLView from 'react-native-htmlview';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font'

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import { getSearchResults } from '../../actions/actions';

class SearchResultScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    data : {},
    page : 1,
  }

  componentDidMount(){
    //console.log(this.props.route.params.searchText)
    this.getData(this.state.page)
  }

  loadFonts = async () =>{
    await Font.loadAsync({
      'Poppins-Regular' : {
        uri: require('../../../assets/fonts/Poppins-Regular.ttf')
      },
      'Poppins-Medium': {
        uri: require('../../../assets/fonts/Poppins-Medium.ttf')
      },
      'Poppins-SemiBold': {
        uri: require('../../../assets/fonts/Poppins-SemiBold.ttf')
      },
    });
  }

  getData = async (page) => {
    this.loadFonts();
    try {
      let res = await getSearchResults(this.props.route.params.searchText, page)
      //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
      console.log(res.data)
      this.setState({
        data : res.data
      })

    } catch (error) {
      console.error(error.response);
    }

  }
  render() {
    return (
        <SafeAreaView style={{height:this.state.height}}>
          <View style={{flex:1}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator= {false}
              style={{ width: "100%",alignSelf:"center"}}
              data={this.state.data.items}
              renderItem={({ item }) => (   
                <TouchableOpacity activeOpacity={0.8} onPress={() => null} style={styles.questionCardLayout}> 
                  <View style={{marginRight: Mixins.scale(15)}}>
                    <View style={{flexDirection:"row", alignItems:"center", marginBottom:Mixins.scale(5)}}>
                      <Icon1 name="eye" size={Mixins.scale(14)} color="black" style={{marginRight:Mixins.scale(5)}}/>
                      <Text style={{fontSize:12, fontFamily:"Poppins-SemiBold", marginTop: Mixins.scale(2)}}>{item.view_count}</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                      <Icon2 name="caretup" size={Mixins.scale(14)} color="black" style={{marginRight:Mixins.scale(5),marginTop:Mixins.scale(3)}}/>
                      <Text style={{fontSize:12, fontFamily:"Poppins-SemiBold", marginTop: Mixins.scale(2)}}>{item.score}</Text>
                    </View>
                  </View>
                  <View style={{padding : Mixins.scale(2)}}>
                    <View style={styles.htmlOuterlayout}>
                      <HTMLView stylesheet={htmlStyles} value={"<title>" + item.title + "</title>"} />
                    </View>
                    <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",alignItems:"center",width:"85%"}}>
                      {
                        item.tags.map(function(object, i){
                          return (
                            <View key={"tag" + i} style={styles.tagOuterLayout}>
                              <Text style={[styles.tagText,{fontFamily: "Poppins-Regular"}]}>{object}</Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  </View>
                </TouchableOpacity> 
              )}
            />
          </View>
        </SafeAreaView>
    );
  }
}

const htmlStyles = StyleSheet.create({
  title: {
      lineHeight: 20,
      fontFamily: "Poppins-Regular"
    },

})

export default SearchResultScreen;