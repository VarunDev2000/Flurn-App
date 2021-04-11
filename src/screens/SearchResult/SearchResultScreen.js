import React, { Component } from "react";
import { View, Text } from "react-native";

class SearchResultScreen extends Component {
  componentDidMount(){
    console.log(this.props.route.params.searchText)
  }
  render() {
    return (
        <View>
            <Text>Search Result Screen</Text>
        </View>
    );
  }
}

export default SearchResultScreen;