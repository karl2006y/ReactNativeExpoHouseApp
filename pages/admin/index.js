import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen";
import OrdersScreen from "./OrdersScreen";
import AcountScreen from "./AcountScreen";

const Tab = createBottomTabNavigator();

export default function App({ setLoginStatus }) {
  return (
    // <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "首頁":
                iconName = focused
                  ? "ios-information-circle"
                  : "ios-information-circle-outline";
                break;
              case "訂單":
                iconName = focused
                  ? "ios-document-text"
                  : "ios-document-text-outline";
                break;
              case "個人":
                iconName = focused ? "person" : "person-outline";
                break;
            }
            // if (route.name === "首頁") {
            //   iconName = focused
            //     ? "ios-information-circle"
            //     : "ios-information-circle-outline";
            // } else if (route.name === "訂單") {
            //   iconName = focused
            //     ? "ios-document-text"
            //     : "ios-document-text-outline";
            // } else if (route.name === "個人") {
            //   iconName = focused ? "person" : "person-outline";
            // }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="首頁" component={HomeScreen} />
        <Tab.Screen name="訂單" component={OrdersScreen} />
        <Tab.Screen
          name="個人"
          component={AcountScreen}
          initialParams={{ setLoginStatus }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    // </SafeAreaView>
  );
}
