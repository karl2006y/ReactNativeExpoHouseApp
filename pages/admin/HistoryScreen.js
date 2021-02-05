import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { getUserHistory, setUserHistory } from "../../api//Auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-rn";

const HistoryList = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  const getHistoryHandler = () => {
    getUserHistory().then((res) => {
      console.log("get history");
      setHistory(res.data.data);
    });
  };

  const HistoryItem = ({ cr_at, history_name }) => {
    return (
      <View style={tw("w-full bg-white rounded-xl mt-2 p-5 ")}>
        <Text style={tw("mt-1")}>瀏覽名稱：{history_name}</Text>
        <Text style={tw("mt-1")}>瀏覽時間：{cr_at}</Text>
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <HistoryItem cr_at={item.cr_at} history_name={item.name} />
  );

  // 初始化時只執行一次
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUserHistory("瀏覽紀錄"); //紀錄瀏覽紀錄
      getHistoryHandler();
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={tw("h-full")}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default HistoryList;
