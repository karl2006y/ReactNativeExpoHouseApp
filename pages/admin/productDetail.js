import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { MyPager } from "../../component/carousel";

const ProductDetail = ({ route }) => {
  const { productId } = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f6f6f6",
      }}
    >
      <View
        style={{
          height: 250,
          backgroundColor: "#fff",
        }}
      >
        <MyPager images="https://picsum.photos/v2/list?limit=8&page=3" />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 30,
          marginTop: 20,
        }}
      >
        {/* <Text>{productId}ProductDetail</Text> */}
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 25 }}>TITLE</Text>
          <Text style={{ fontSize: 16 }}>發布時間:數分鐘前</Text>
        </View>
        <View style={{ flex: 1, marginTop: "auto" }}>
          <Text>被讚數:20</Text>
          <Text>被關注數:20</Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 30,
        }}
      >
        <Text style={{ fontSize: 16 }}>金額:3,000</Text>
        <Text style={{ marginTop: 10, fontSize: 16 }}>文字描述</Text>
        <Text style={{ fontSize: 16 }}>
          What follows within the Fundamentals section of this documentation is
          a tour of the most important aspects of React Navigation. It should
          cover enough for you to know how to build your typical small mobile
          application, and give you the background that you need to dive deeper
          into the more advanced parts of React Navigation.
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default ProductDetail;
