import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Pressable, Image } from "react-native";
import tw from "tailwind-rn";

const Button = ({ onPress, title, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...tw("bg-blue-500 rounded-md font-bold w-24 h-10 justify-center"),
        ...style,
      }}
    >
      <Text style={tw("text-white text-center")}>{title}</Text>
    </Pressable>
  );
};
const app = (props) => {
  const { route } = props;
  console.log(props);
  const logoutHandler = route.params.logout;
  return (
    <SafeAreaView style={tw("h-full")}>
      <Button
        title="登出"
        onPress={() => {
          logoutHandler();
        }}
      />
    </SafeAreaView>
  );
};
export default app;
