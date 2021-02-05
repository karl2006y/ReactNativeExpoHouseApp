import * as React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./login";
import RegistrationScreen from "./registration";
import { createStackNavigator } from "@react-navigation/stack";
// import { HeaderBackButton } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App(props) {
  const { setLoginStatus } = props;
  setLoginStatus(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="登入"
          component={LoginScreen}
          initialParams={{ setLoginStatus }}
        />
        <Stack.Screen name="註冊" component={RegistrationScreen} />
        <Stack.Screen name="忘記密碼" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
