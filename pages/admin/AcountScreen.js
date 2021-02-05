import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, Pressable, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { getUserInfo, removeLoginToken, setUserHistory } from "../../api/Auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-rn";
import EditUserDataScreen from "./EditUserDataScreen";
import BannerScreen from "./BannerScreen";
import ClassificationScreen from "./ClassificationScreen";
import ProductScreen from "./ProductScreen";
import CreateProductScreen from "./CreateProductScreen";
import HistoryScreen from "./HistoryScreen";
import SettingScreen from "./SettingScreen";
const Stack = createStackNavigator();

const AcountPage = (props) => {
  // 登出的東西
  const { route, navigation } = props;
  const setLoginStatus = route.params.setLoginStatus;
  const logout = () => {
    removeLoginToken().then(() => {
      alert("已登出");
      setLoginStatus(false);
    });
  };
  // 取得個資資料的東西
  const [userInfo, setUserInfo] = useState({});
  const getUserInfoFromApiHandler = () => {
    getUserInfo().then((res) => {
      setUserInfo(res.data.user);
      console.log("userInfo", userInfo);
    });
  };

  // 初始化時只執行一次
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getUserInfoFromApiHandler();
      setUserHistory(route.name); //紀錄瀏覽紀錄
    });

    return unsubscribe;
  }, [navigation]);

  // 個人頭貼
  const UserPic = () => {
    if (userInfo.user_pic_url) {
      return (
        <Image
          style={tw("rounded-full w-28 h-28")}
          source={{ uri: userInfo.user_pic_url }}
        />
      );
    } else {
      return (
        <Image
          style={tw("rounded-full border-2 w-28 h-28")}
          source={require("../../assets/user.png")}
        />
      );
    }
  };
  return (
    <SafeAreaView style={tw("h-full")}>
      <View style={tw("mt-2 flex-row h-1/4 justify-center")}>
        <View style={tw("my-2 flex-row w-11/12 bg-white rounded-3xl ")}>
          <View style={tw("flex-1 justify-center items-center")}>
            {/* <View style={tw("p-5")}> */}
            <UserPic />
            {/* </View> */}
          </View>
          <View style={tw("flex-1 flex-row ")}>
            <View style={tw("flex-1 justify-center py-6")}>
              <Text style={tw("flex-1")}>名稱：{userInfo.name}</Text>
              <Text style={tw("flex-1")}>暱稱：{userInfo.nickname}</Text>
              <Text style={tw("flex-1")}>
                手機：{userInfo.phone ? userInfo.phone : "無"}
              </Text>
              <Text style={tw("flex-1")}>服務時間：{userInfo.cr_at}</Text>
              <View style={tw("items-end pr-10 mt-2")}>
                <Button
                  title="編輯"
                  onPress={() => {
                    navigation.navigate("編輯個人資料");
                  }}
                  style={tw("w-full h-7")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={tw("flex-1 items-center")}>
        {/* 各大模組管理 */}
        <ModelsLayOut
          title="消息管理"
          Item1={
            <Button
              title="瀏覽紀錄"
              onPress={() => {
                navigation.navigate("瀏覽紀錄");
              }}
            />
          }
          Item2={
            <Button
              title="我的評價"
              onPress={() => {
                alert("尚未開放");
              }}
              style={tw("bg-yellow-400")}
            />
          }
          Item3={
            <Button
              title="我的消息"
              onPress={() => {
                alert("尚未開放");
              }}
              style={tw("bg-yellow-400")}
            />
          }
        />
        <ModelsLayOut
          title="客戶管理"
          Item1={
            <Button
              title="我的預約"
              onPress={() => {
                alert("尚未開放");
              }}
              style={tw("bg-yellow-400")}
            />
          }
          Item2={
            <Button
              title="我的訂單"
              onPress={() => {
                alert("尚未開放");
              }}
              style={tw("bg-yellow-400")}
            />
          }
          Item3={
            <Button
              title="我的合約"
              onPress={() => {
                alert("尚未開放");
              }}
              style={tw("bg-yellow-400")}
            />
          }
        />
        <ModelsLayOut
          title="物件管理"
          Item1={
            <Button
              title="Banner"
              onPress={() => {
                navigation.navigate("Banner");
              }}
            />
          }
          Item2={
            <Button
              title="我的資料"
              onPress={() => {
                navigation.navigate("我的資料");
              }}
            />
          }
          Item3={
            <Button
              title="分類管理"
              onPress={() => {
                navigation.navigate("分類管理");
              }}
            />
          }
        />
        <ModelsLayOut
          title="其他功能"
          Item1={
            <Button
              title="聯繫客服"
              onPress={() => {
                alert("客服電話0912345678");
              }}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const ModelsLayOut = ({ title, Item1, Item2, Item3 }) => {
  return (
    <View style={tw("h-1/5 my-1 w-11/12 bg-white rounded-xl px-2")}>
      <View style={tw("px-3 pt-4 ")}>
        <Text>{title}</Text>
      </View>
      <View style={tw("flex-auto flex-row py-6")}>
        <View style={tw(`flex-1 justify-center items-center`)}>{Item1}</View>
        <View style={tw(`flex-1 justify-center items-center`)}>{Item2}</View>
        <View style={tw("flex-1 justify-center items-center")}>{Item3}</View>
      </View>
    </View>
  );
};
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
  const { route, navigation } = props;
  const TitleRightButton = () => {
    return (
      <Pressable
        style={tw("mr-4 p-2")}
        onPress={() => navigation.navigate("設定")}
      >
        <Ionicons name="settings-outline" size={28} color="#000" />
      </Pressable>
    );
  };
  const setLoginStatus = route.params.setLoginStatus;
  const logout = () => {
    removeLoginToken().then(() => {
      alert("已登出");
      setLoginStatus(false);
    });
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="個人資料"
        component={AcountPage}
        initialParams={{ setLoginStatus }}
        options={{
          headerRight: TitleRightButton,
        }}
      />
      <Stack.Screen name="編輯個人資料" component={EditUserDataScreen} />
      <Stack.Screen name="Banner" component={BannerScreen} />
      <Stack.Screen name="分類管理" component={ClassificationScreen} />
      <Stack.Screen name="我的資料" component={ProductScreen} />
      <Stack.Screen name="新增我的資料" component={CreateProductScreen} />
      <Stack.Screen name="瀏覽紀錄" component={HistoryScreen} />
      <Stack.Screen
        name="設定"
        component={SettingScreen}
        initialParams={{ logout }}
      />
    </Stack.Navigator>
  );
};
export default app;
