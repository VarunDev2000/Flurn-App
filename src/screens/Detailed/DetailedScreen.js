import React, { Component } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity } from "react-native";
import HTMLView from 'react-native-htmlview';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font'

import Icon1 from 'react-native-vector-icons/Ionicons';

import { getQuestionDetails, getAnswersforQuestion } from '../../actions/actions';


class DetailedScreen extends Component {

  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,

    id : null,
    q_data : {},
    question_text : "",
    a_data : {},
  }

  componentDidMount(){
    console.log(this.props.route.params.id)
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
        q_data : res.data.items[0],
        question_text : (res.data.items[0].body).replace(/\n/g,"")
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
            <HTMLView stylesheet={htmlStyles} value={this.state.question_text} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const htmlStyles = StyleSheet.create({
  code: {
      fontFamily: "Poppins-Regular",
      backgroundColor: colors.searchResultCardBgColour,
  },
  p: {
    fontFamily: "Poppins-Regular",
  }

})

export default DetailedScreen;