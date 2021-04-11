import React, { Component } from "react";
import { createStackNavigator,CardStyleInterpolators } from "@react-navigation/stack";

import HomeScreen from "../screens/Home/HomeScreen"
import DetailedScreen from "../screens/Detailed/DetailedScreen";

const Stack = createStackNavigator();

class AppNavigation extends Component {
  render() {
    return (
        <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailedScreen" component={DetailedScreen} />
          
        </Stack.Navigator>
    );
  }
}

export default AppNavigation;