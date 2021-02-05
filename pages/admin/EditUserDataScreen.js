import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  getUserInfo,
  editUserInfo,
  uploadUserPic,
  setUserHistory,
} from "../../api/Auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as ImagePicker from "expo-image-picker";

const app = ({ route }) => {
  // 取得個資資料的東西
  const [userInfo, setUserInfo] = useState({});
  const getUserInfoFromApiHandler = () => {
    getUserInfo().then((res) => {
      setUserInfo(res.data.user);
      console.log("userInfo", userInfo);
    });
  };
  let Inputs = {};
  // 儲存編輯
  const editValidationHandler = () => {
    const res = true;
    if (res) {
      console.log("pass");
      editUserInfo(userInfo).then((res) => {
        if (res.data.success) {
          alert("編輯完成");
          getUserInfoFromApiHandler();
        }
      });
    }
  };

  // 初始化時只執行一次
  useEffect(() => {
    getUserInfoFromApiHandler();
    setUserHistory(route.name); //紀錄瀏覽紀錄
  }, []);
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

  // 上傳頭貼
  // const [userImg, setUserImg] = useState(null)
  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // image.uri =
    //   Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");
    alert(image.uri);
    console.log(image);
    const data = new FormData();
    data.append(
      "picfile",
      {
        file: image,
        uri: image.uri,
        type: image.type,
        name: "pic",
      },
      image
    );
    uploadUserPic(data).then(() => {
      getUserInfoFromApiHandler();
    });
    // if (!result.cancelled) {
    //   // this.setState({ image: result.uri });
    // }
  };
  return (
    <SafeAreaView style={tw("h-full")}>
      <KeyboardAwareScrollView>
        <View>
          <View style={tw("my-2 flex-row h-36 bg-white mx-8 rounded-3xl")}>
            <View style={tw("flex-1 justify-center items-center")}>
              <UserPic />
            </View>

            <View style={tw("flex-1 flex-row ")}>
              <View style={tw("flex-1 justify-center py-6")}>
                <Text style={tw("text-left text-gray-400")}>更新個人頭貼</Text>
                <View style={tw("items-end pr-10 mt-2")}>
                  <Button
                    title="點擊上傳"
                    onPress={pickImage}
                    style={tw("w-full py-2")}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={tw("bg-gray-100 flex flex-col justify-center ")}>
            <View style={tw("relative")}>
              <View style={tw("relative px-4 py-5 bg-white mx-8 rounded-3xl ")}>
                <View style={tw("max-w-md ")}>
                  <View style={tw("")}>
                    <View style={tw("py-3 text-base leading-6 text-gray-700 ")}>
                      <InputCom
                        label="使用者名稱"
                        value={userInfo.name}
                        onChangeText={
                          (newValue) =>
                            setUserInfo({ ...userInfo, name: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        propref={(input) => (Inputs["name"] = input)}
                        propOnSubmitEditing={() => {
                          Inputs["nickname"].focus();
                        }}
                        blurOnSubmit={false}
                        textContentType="name"
                        placeholder="請輸入名稱"
                        returnKeyType="next"
                      />
                      <InputCom
                        label="使用者暱稱"
                        value={userInfo.nickname}
                        onChangeText={
                          (newValue) =>
                            setUserInfo({ ...userInfo, nickname: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        propref={(input) => (Inputs["nickname"] = input)}
                        propOnSubmitEditing={() => {
                          Inputs["phone"].focus();
                        }}
                        blurOnSubmit={false}
                        textContentType="nickname"
                        placeholder="請輸入暱稱"
                        returnKeyType="next"
                      />
                      <InputCom
                        label="連絡電話"
                        value={userInfo.phone}
                        onChangeText={
                          (newValue) =>
                            setUserInfo({ ...userInfo, phone: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        propref={(input) => (Inputs["phone"] = input)}
                        blurOnSubmit={true}
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        placeholder="請輸入連絡電話"
                        returnKeyType="done"
                      />
                    </View>
                    <View class="pt-4 flex items-center">
                      <Button
                        onPress={editValidationHandler}
                        title="儲存編輯"
                      ></Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const InputCom = ({
  label,
  value,
  onChangeText,
  propref,
  propOnSubmitEditing,
  blurOnSubmit,
  keyboardType,
  textContentType,
  placeholder,
  returnKeyType,
}) => {
  return (
    <View style={tw("flex flex-col")}>
      <Text style={tw("mt-3 mb-2")}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        // 定位
        ref={propref}
        // 送出時觸發
        onSubmitEditing={propOnSubmitEditing}
        //送出時不要關閉鍵盤
        blurOnSubmit={blurOnSubmit}
        keyboardType={keyboardType ? keyboardType : "default"}
        clearButtonMode="always"
        textContentType={textContentType ? textContentType : "none"}
        style={tw(
          "px-4 py-2 border w-full border-gray-300 rounded-md text-gray-600"
        )}
        placeholder={placeholder}
        returnKeyType={returnKeyType}
      />
    </View>
  );
};

const Button = ({ onPress, title, style }) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...tw("bg-blue-500 rounded-md font-bold px-6 py-3"),
        ...style,
      }}
    >
      <Text style={tw("text-white text-center")}>{title}</Text>
    </Pressable>
  );
};

export default app;
