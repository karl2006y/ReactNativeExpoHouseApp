import * as React from "react";
import { Pressable, SafeAreaView, Text, View, Linking } from "react-native";

import { MyPager } from "../../component/carousel";
import { ProductsList } from "../../component/productsList";

import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import ProductDetail from "./productDetail";

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f6f6f6",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            height: 250,
            backgroundColor: "#fff",
          }}
        >
          <MyPager images="banners/" />
        </View>
        <View style={{ flexDirection: "row", margin: 15 }}>
          {/* <Button title="我的資料" />
          <Button title="補貨單" /> */}
          {/* 283 like this: */}
          <Text
            onPress={() => navigation.navigate("商品頁面")}
            style={{ color: "blue", marginRight: 15 }}
            // onPress={() => Linking.openURL("http://google.com")}
          >
            我的資料
          </Text>
          <Text
            style={{ color: "blue", marginRight: 5 }}
            onPress={() => Linking.openURL("http://google.com")}
          >
            補貨端
          </Text>
        </View>
        <ProductsList navigate={navigation.navigate}></ProductsList>
      </View>
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="首頁"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <Pressable
              style={{ marginRight: 15 }}
              onPress={() => alert("This is a button!")}
            >
              <Ionicons name="notifications-outline" size={30} color="#000" />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="商品頁面"
        component={ProductDetail}
        options={{
          headerRight: () => (
            <Pressable
              style={{ marginRight: 15 }}
              onPress={() => alert("This is a button!")}
            >
              <Ionicons name="notifications-outline" size={30} color="#000" />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
