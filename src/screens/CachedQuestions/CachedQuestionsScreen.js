import React, { Component } from "react";
import { Dimensions, StyleSheet, View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HTMLView from 'react-native-htmlview';
import styles from "./styles";
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors"

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";


class CachedQuestionsScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,

    data: {},
    searchText : "",
  }

  componentDidMount(){
    this.getData()
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
      'Poppins-Bold': {
        uri: require('../../../assets/fonts/Poppins-Bold.ttf')
      },
      'OpenSans-Bold': {
        uri: require('../../../assets/fonts/OpenSans-Bold.ttf')
      }
    });
  }

  getData = async () => {
    this.loadFonts()

    //await AsyncStorage.setItem('bookmarks',JSON.stringify({}))

    const val = await AsyncStorage.getItem('bookmarks')
    let b_data = JSON.parse(val)

    //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
    //console.log(b_data)

    this.setState({
      data : b_data,
    })
  }

  render() {
    return (
        <SafeAreaView style={{height:this.state.height, backgroundColor:colors.bgColor}}>
            <View style={styles.topLayout}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()} style={styles.backButtonOuterLayout}>
                <Icon1 name="ios-chevron-back" size={Mixins.scale(25)} color={colors.primary}/>
              </TouchableOpacity>
              <Text style={[styles.pageTitle,{fontFamily:"Poppins-SemiBold"}]}>Bookmarks</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={() => null} style={styles.backButtonOuterLayout}>
              </TouchableOpacity>
            </View>
            <View style={styles.outerLayout}>
              <ScrollView>
                {
                  this.state.data != undefined && this.state.data != {} ? (
                    Object.keys(this.state.data).map((key, index) => ( 
                      <TouchableOpacity key={"bookmark" + index} activeOpacity={0.8} onPress={() => this.props.navigation.navigate("DetailedScreen",{id:this.state.data[key]['question_data'].question_id})} style={styles.questionCardLayout}> 
                        <View style={{width:"24%",marginRight: Mixins.scale(10),marginLeft: Mixins.scale(2)}}>
                          <View style={styles.profileImageOuterlayout}>
                            {
                              this.state.data[key]['question_data'].owner.profile_image != undefined && this.state.data[key]['question_data'].owner.profile_image != "" ? (
                                <Image style={styles.profileImageStyle} source={{uri : this.state.data[key]['question_data'].owner.profile_image}} />
                              ) : (
                                <Image style={styles.profileImageStyle} source={require("../../../assets/images/unknown.png")} />
                              )
                            }
                          </View>
                          <Text numberOfLines={1} style={[styles.userNameText,{fontFamily:"Poppins-Medium"}]}>{this.state.data[key]['question_data'].owner.display_name}</Text>
                          <View style={{alignSelf:"center",justifyContent:"center",alignItems:"center"}}>
                            <View style={{flexDirection:"row", alignItems:"center", marginBottom:Mixins.scale(5)}}>
                              <Icon1 name="eye" size={Mixins.scale(14)} color="black" style={{marginRight:Mixins.scale(5)}}/>
                              <Text numberOfLines={1} style={styles.attributeText}>{this.state.data[key]['question_data'].view_count}</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                              <Icon2 name="caretup" size={Mixins.scale(14)} color="black" style={{marginRight:Mixins.scale(5),marginTop:Mixins.scale(3)}}/>
                              <Text numberOfLines={1} style={styles.attributeText}>{this.state.data[key]['question_data'].score}</Text>
                            </View>
                          </View>
                        </View>
                        <View style={{width:"71%",padding : Mixins.scale(2)}}>
                          <View style={styles.htmlOuterlayout}>
                            <HTMLView stylesheet={htmlStyles} value={"<title>" + this.state.data[key]['question_data'].title + "</title>"} />
                          </View>
                          <View style={styles.tagContainer}>
                            {
                              this.state.data[key]['question_data'].tags.map(function(object, i){
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
                    ))
                  ) : (null)
                }
              </ScrollView>
            </View>
        </SafeAreaView>
    );
  }
}


const htmlStyles = StyleSheet.create({
  title: {
      fontSize: Mixins.scale(11),
      lineHeight: 22,
      fontFamily: "Poppins-Regular"
    },

})

export default CachedQuestionsScreen;