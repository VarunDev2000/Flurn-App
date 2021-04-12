import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Alert, Image, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-community/async-storage';
import HTML from "react-native-render-html";
import styles from "./styles";
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors"

import Loader3 from "../../components/Loaders/Loader3";

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";


class CachedQuestionsScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,

    loading: true,
    data_len : 0,
    data: {},
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
    let b_data = {}
    
    if(val == undefined | val == null){
      await AsyncStorage.setItem('bookmarks',JSON.stringify({}))
    }
    else{
      b_data = JSON.parse(val)
    }

    //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
    //console.log(b_data)

    this.setState({
      data : b_data,
      data_len : Object.keys(b_data).length,
      loading : false
    })
  }

  //Ask for delete confirmation
  handleDeleteButtonClick() {
    Alert.alert("Hold on!", "Are you sure you want to clear all data?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => this.deleteAll() }
    ]);
    return true;
  }

  deleteAll = async () => {
    await AsyncStorage.setItem('bookmarks',JSON.stringify({}))
    this.setState({
      loading: true,
      data: {},
    },
      function(){
        this.getData()
      }
    )
  }

  render() {
    return (
        <SafeAreaView style={{height:this.state.height, backgroundColor:colors.bgColor}}>
            <View style={styles.topLayout}>
              <View style={{flexDirection:"row",alignItems:"center",width:"60%"}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()} style={styles.backButtonOuterLayout}>
                  <Icon1 name="ios-chevron-back" size={Mixins.scale(25)} color={colors.primary}/>
                </TouchableOpacity>
                <Text style={[styles.pageTitle,{fontFamily:"Poppins-SemiBold"}]}>Bookmarks</Text>
              </View>
              {
                this.state.loading | this.state.data_len <= 0 ? (null) : (
                  <TouchableOpacity activeOpacity={0.5} onPress={() => this.handleDeleteButtonClick()} style={styles.deleteTextOuterLayout}>
                    <Text style={[styles.deleteText,{fontFamily: "Poppins-Regular"}]}>Clear cache</Text>
                  </TouchableOpacity> 
                )
              }
            </View>
            {
              this.state.loading ? (
                <Loader3 marginBottom={Mixins.scale(80)}/>
              ) : (
                <View style={styles.outerLayout}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {
                      this.state.data != undefined && this.state.data_len > 0 ? (
                        Object.keys(this.state.data).map((key, index) => ( 
                          <TouchableOpacity key={"bookmark" + index} activeOpacity={0.8} onPress={() => this.props.navigation.navigate("CachedQuestionDetailedScreen",{id:this.state.data[key]['question_data'].question_id})} style={styles.questionCardLayout}> 
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
                                <HTML tagsStyles={htmlStyles} contentWidth={0.90 * Dimensions.get('window').width} source={{ html: "<title>" + this.state.data[key]['question_data'].title + "</title>" }} />
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
                      ) : (
                        <View style={styles.searchErrorImageOuterlayout}>
                          <Image style={styles.searchErrorImageStyle} source={require("../SearchResult/res/search_error.png")} />
                        </View>
                      )
                    }
                  </ScrollView>
                </View>
              )
            }
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