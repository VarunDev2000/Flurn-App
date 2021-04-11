import React, { Component } from "react";
import { Dimensions, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

class HomeScreen extends Component {
  state = {
    height: Dimensions.get("screen").height,
  }
  render() {
    return (
        <SafeAreaView style={{ height: this.state.height }}>
            <Text>Home Screen</Text>
        </SafeAreaView>
    );
  }
}

export default HomeScreen;