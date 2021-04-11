import React, { Component } from "react";
import { Dimensions, View, Text } from "react-native";
import HTMLView from 'react-native-htmlview';
import * as Mixins from '../../styles/mixins';
import colors from "../../styles/colors";
import styles from "./styles";
import * as Font from 'expo-font'

import { getQuestionDetails, getAnswersforQuestion } from '../../actions/actions';

class DetailedScreen extends Component {

  state = {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,

    id : null,
    q_data : {},
    a_data : {},
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
        q_data : res.data.items[0]
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
        <View>
            <Text>Detailed Screen</Text>
        </View>
    );
  }
}

export default DetailedScreen;