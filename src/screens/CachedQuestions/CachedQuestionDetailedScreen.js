import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "../Detailed/styles";
import * as Font from 'expo-font';

import Loader2 from "../../components/Loaders/Loader2";

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';


class CachedQuestionDetailedScreen extends Component {

  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    
    loading: true,

    id : null,
    question_text : "",
    profile_image : "",
    user_name : "",
    score: 0,
    a_data : [],

    bookmark_data: {},
  }

  componentDidMount(){
    //console.log(this.props.route.params.id)
    this.setState({
      id: this.props.route.params.id
    },
      function(){
        this.getData()
      }
    )
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

  getData = async () => {
    this.loadFonts()

    const val = await AsyncStorage.getItem('bookmarks')
    let b_data = JSON.parse(val)

    //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
    //console.log(b_data)

    this.setState({
      bookmark_data : b_data,
      question_text : b_data[this.state.id]['question_data'].body,
      profile_image: b_data[this.state.id]['question_data'].owner.profile_image,
      user_name: b_data[this.state.id]['question_data'].owner.display_name,
      score: b_data[this.state.id]['question_data'].score,
      a_data : b_data[this.state.id]['answer_data'],
      loading : false
    })
  }

  render() {
    return (
      <SafeAreaView style={{height:this.state.height, backgroundColor:colors.detailedScreenBgColor}}>
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()} style={styles.backButtonOuterLayout}>
            <Icon1 name="ios-chevron-back" size={Mixins.scale(25)} color={colors.primary}/>
          </TouchableOpacity>
        </View>
        {
          this.state.loading ? (
            <Loader2 />
          ) : (
            <ScrollView>
              <View style={styles.questionOuterLayout}>
                <View style={styles.cardInfoLayout}>
                  <View style={{width:"69%",flexDirection:"row",alignItems:"center",flexWrap:"wrap"}}>
                    <View style={styles.profileImageOuterlayout}>
                      {
                        this.state.profile_image != undefined && this.state.profile_image != "" ? (
                          <Image style={styles.profileImageStyle} source={{uri : this.state.profile_image}} />
                        ) : (
                          <Image style={styles.profileImageStyle} source={require("../../../assets/images/unknown.png")} />
                        )
                      }
                    </View>
                    <Text numberOfLines={1} style={[styles.userNameText,{fontFamily:"Poppins-SemiBold"}]}>{this.state.user_name}</Text>
                  </View>
                  <View style={{width:"29%",flexDirection:"row",alignItems:"center",justifyContent:"flex-end",flexWrap:"wrap"}}>
                    <Icon2 name="caretup" size={Mixins.scale(15)} color="black" style={{marginRight:Mixins.scale(5)}}/>
                    <Text numberOfLines={1} style={[styles.scoreText,{fontFamily:"Poppins-Medium"}]}>{this.state.score}</Text>
                  </View>
                </View>
                <View style={styles.cardQuestionDescriptionLayout}>
                  <HTML tagsStyles={htmlStyles} contentWidth={0.90 * Dimensions.get('window').width} source={{ html: this.state.question_text }} />
                </View>
              </View>
              {
                this.state.a_data.map(function(object, i){
                  let answer_text = object.body
                  return (
                    <View key={"answer" + i} style={[styles.answerOuterLayout,{borderWidth : object.is_accepted ? (1) : (0)}]}>
                      <View style={styles.cardInfoLayout}>
                        <View style={{width:"69%",flexDirection:"row",alignItems:"center",flexWrap:"wrap"}}>
                          <View style={styles.profileImageOuterlayout}>
                            {
                              object.owner.profile_image != undefined && object.owner.profile_image != "" ? (
                                  <Image style={styles.profileImageStyle} source={{uri : object.owner.profile_image}} />
                              ) : (
                                <Image style={styles.profileImageStyle} source={require("../../../assets/images/unknown.png")} />
                              )
                            }
                          </View>
                          <Text numberOfLines={1} style={[styles.userNameText,{fontFamily:"Poppins-SemiBold"}]}>{object.owner.display_name}</Text>
                        </View>
                        <View style={{width:"29%",flexDirection:"row",alignItems:"center",justifyContent:"flex-end",flexWrap:"wrap"}}>
                          <Icon2 name="caretup" size={Mixins.scale(15)} color="black" style={{marginRight:Mixins.scale(5)}}/>
                          <Text numberOfLines={1} style={[styles.scoreText,{fontFamily:"Poppins-Medium"}]}>{object.score}</Text>
                        </View>
                      </View>
                      <View style={styles.cardAnswerDescriptionLayout}>
                        <HTML tagsStyles={htmlStyles} contentWidth={0.90 * Dimensions.get('window').width} source={{ html: answer_text }} />
                      </View>
                    </View>
                  )
                })
              }
            </ScrollView>
          )
        }
        </SafeAreaView>
    );
  }
}

const htmlStyles = StyleSheet.create({
  code: {
    fontSize : Mixins.scale(10),
    fontFamily: "Poppins-Medium",
    backgroundColor: colors.searchResultCardBgColour,
    lineHeight: 25,
  },
  p: {
    fontSize : Mixins.scale(11),
    fontFamily: "Poppins-Regular",
    lineHeight: 25,
    fontStyle:"normal"
  },
  a: {
    fontSize : Mixins.scale(11),
    fontFamily: "Poppins-Regular",
    lineHeight: 25,
    color:"green",
    textDecorationLine:"underline",
    fontStyle:"normal"
  }

})

export default CachedQuestionDetailedScreen;