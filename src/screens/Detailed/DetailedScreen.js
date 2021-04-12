import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity, Image } from "react-native";
import HTMLView from 'react-native-htmlview';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font'

import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import { getQuestionDetails, getAnswersforQuestion } from '../../actions/actions';


class DetailedScreen extends Component {

  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,

    id : null,
    question_text : "",
    profile_image : "",
    user_name : "",
    score: 0,
    a_data : [],
  }

  componentDidMount(){
    //console.log(this.props.route.params.id)
    this.setState({
      id: this.props.route.params.id
    },
      function(){
        this.getQuestionData()
        this.getAnswerData()
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
    
    try {
      this.setState({
        search_type: "search"
      })
      let res = await getQuestionDetails(this.state.id)
      //console.log("-------------------------------------------------------------------------------------------------------------------------------------------------")
      //console.log(res.data.items[0])

      this.setState({
        question_text : (res.data.items[0].body).replace(/\n/g,""),
      })

      this.setState({
        profile_image: res.data.items[0].owner.profile_image,
        user_name: res.data.items[0].owner.display_name,
        score: res.data.items[0].score,
      })

    } catch (error) {
      console.log(error.response);
    }
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
      })

    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    return (
      <SafeAreaView style={{height:this.state.height, backgroundColor:colors.detailedScreenBgColor}}>
        <View style={styles.topLayout}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.goBack()} style={styles.backButtonOuterLayout}>
            <Icon1 name="ios-chevron-back" size={Mixins.scale(25)} color={colors.primary}/>
          </TouchableOpacity>
        </View>
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
              <HTMLView stylesheet={htmlStyles} value={this.state.question_text} />
            </View>
          </View>
          {
            this.state.a_data.map(function(object, i){
              let answer_text = (object.body).replace(/\n/g,"")
              return (
                <View key={"answer" + i} style={[styles.answerOuterLayout,{borderWidth : object.is_accepted ? (0.7) : (0)}]}>
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
                    <HTMLView stylesheet={htmlStyles} value={answer_text} />
                  </View>
                </View>
              )
            })
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const htmlStyles = StyleSheet.create({
  code: {
      fontFamily: "Poppins-Regular",
      backgroundColor: colors.searchResultCardBgColour,
      lineHeight: 25,
  },
  p: {
    fontFamily: "Poppins-Regular",
    lineHeight: 25
  },
  a: {
    fontFamily: "Poppins-Regular",
    lineHeight: 25,
    color:"green",
    textDecorationLine:"underline"
  }

})

export default DetailedScreen;