import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import HTML from "react-native-render-html";
import AsyncStorage from '@react-native-community/async-storage';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font';

import {showToast} from "../../components/Toast";
import Loader2 from "../../components/Loaders/Loader2";

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import { getQuestionDetails, getAnswersforQuestion } from '../../actions/actions';


class DetailedScreen extends Component {

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

    bookmark_data : {},
    bookmarked : false,
  }

  componentDidMount(){
    //console.log(this.props.route.params.id)
    this.setState({
      id: this.props.route.params.id
    },
      function(){
        this.getQuestionData()
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

  getQuestionData = async () => {
    this.loadFonts();
    try {
      this.setState({
        search_type: "search"
      })
      let res = await getQuestionDetails(this.state.id)
      //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
      //console.log(res.data.items[0])

      this.setState({
        question_text : res.data.items[0].body,
        q_data : res.data.items[0],
        profile_image: res.data.items[0].owner.profile_image,
        user_name: res.data.items[0].owner.display_name,
        score: res.data.items[0].score,
      },
        function(){
          this.getBookMarks()
        }
      )

    } catch (error) {
      console.log(error.response);
    }
  }

  getBookMarks = async () => {
    const val = await AsyncStorage.getItem('bookmarks')
    let final_b_val = {}
    if(val == undefined | val == null){
      await AsyncStorage.setItem('bookmarks',JSON.stringify({}))
    }
    else{
      final_b_val = JSON.parse(val)
    }

    console.log(val)

    //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
    //console.log(this.state.id in final_b_val)

    this.setState({
      bookmark_data : final_b_val,
      bookmarked : this.state.id in final_b_val,
    },
      function(){
        this.getAnswerData()
      }
    )
  }

  getAnswerData = async () => {
    
    try {
      this.setState({
        search_type: "search"
      })
      let res = await getAnswersforQuestion(this.state.id)
      //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
      //console.log(res.data.items)
      
      this.setState({
        a_data : res.data.items
      },
        function(){
          setTimeout(() => {this.setState({loading: false,})}, 700)
        }
      )

    } catch (error) {
      console.log(error.response);
    }
  }

  setBookMark = async () => {
    let b_data = {}
    let temp = {}

    temp["question_data"] = this.state.q_data
    temp["answer_data"] = this.state.a_data

    b_data[this.state.id] = temp;

    let final_b_data = {...b_data,...this.state.bookmark_data}

    const jsonValue = JSON.stringify(final_b_data)
    await AsyncStorage.setItem("bookmarks", jsonValue)

    showToast("Bookmark added");
  }

  removeBookMark = async () => {
    delete this.state.bookmark_data[this.state.id]

    const jsonValue = JSON.stringify(this.state.bookmark_data)
    await AsyncStorage.setItem("bookmarks", jsonValue)

    showToast("Bookmark removed");
  }
  
  bookMarkClick = () => {
    this.setState({
      bookmarked : !this.state.bookmarked
    })

    if(this.state.bookmarked){
      this.removeBookMark();
    }
    else{
      this.setBookMark();
    }
  }

  render() {
    return (
      <SafeAreaView style={{height:this.state.height, backgroundColor:colors.detailedScreenBgColor}}>
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()} style={styles.backButtonOuterLayout}>
            <Icon1 name="ios-chevron-back" size={Mixins.scale(25)} color={colors.primary}/>
          </TouchableOpacity>
          {
            !this.state.loading ? (
              this.state.bookmarked ? (
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.bookMarkClick()} style={styles.bookmarkButtonOuterLayout}>
                  <Icon1 name="bookmark" size={Mixins.scale(20)} color= {"red"} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.bookMarkClick()} style={styles.bookmarkButtonOuterLayout}>
                  <Icon1 name="bookmark-outline" size={Mixins.scale(20)} color="#616161" />
                </TouchableOpacity>
              )
            ) : (null) 
          }
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
  },
  image: {
    marginVertical: Mixins.scale(20)
  }
})
export default DetailedScreen;