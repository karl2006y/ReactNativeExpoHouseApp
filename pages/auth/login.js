import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import tailwind from "tailwind-rn";
import {
  login,
  setLoginToken,
  getUserInfo,
  setUserEmail,
  getUserEmail,
} from "../../api/Auth";

function app(props) {
  const { navigation, route } = props;
  const setLoginStatus = route.params.setLoginStatus;
  // console.log(props);
  // console.log("setLoginStatus", setLoginStatus);
  const [email, setEmailController] = useState("");
  const [password, setPasswordController] = useState("");
  // 初始化只執行一次 看看能不能登陸
  useEffect(() => {
    // 用於首次進入時檢查token是否有效
    getUserInfo().then((res) => {
      if (res) {
        setLoginStatus(true);
      }
    });

    //用於處理記住帳號
    getUserEmail().then((emailInStorage) => {
      if (emailInStorage) {
        setEmailController(emailInStorage);
      }
    });
  }, []);
  const loginHandler = () => {
    // console.log(email, password);
    login({ email: email, password: password }).then((res) => {
      if (res.data.token) {
        setLoginToken(res.data.token).then(() => {
          getUserInfo().then((res) => {
            if (res) {
              setUserEmail(email);
              setLoginStatus(true);
            }
          });
        });
      }
    });
  };
  return (
    <SafeAreaView style={tailwind("h-full")}>
      {/* logo */}
      <View style={tailwind("pt-8 justify-center items-center")}>
        <Image
          style={tailwind("w-32 h-32")}
          source={{
            uri:
              "https://snack-web-player.s3.us-west-1.amazonaws.com/v2/40/static/media/react-native-logo.79778b9e.png",
          }}
        />
      </View>
      {/* 輸入帳密 */}
      <View style={tailwind("pt-6 items-center")}>
        <View style={tailwind("w-11/12 h-64 bg-gray-50 p-3 rounded-lg")}>
          {/* 帳號 */}
          <View style={tailwind("flex-row items-center px-10 my-3")}>
            <View style={tailwind("w-2/12")}>
              <Text>帳號 </Text>
            </View>
            <TextInput
              placeholder="請輸入註冊Email"
              keyboardType="email-address"
              clearButtonMode="always"
              returnKeyLabel="next"
              value={email}
              onChangeText={(newValue) => {
                setEmailController(newValue);
              }}
              style={tailwind(
                "rounded-lg pl-3 border border-gray-300 w-10/12 h-8"
              )}
            />
          </View>
          {/* 密碼 */}
          <View style={tailwind("flex-row items-center px-10 my-3")}>
            <Text style={tailwind("w-2/12")}>密碼</Text>
            <TextInput
              secureTextEntry={true}
              textContentType="password"
              placeholder="請輸入註冊密碼"
              clearButtonMode="always"
              value={password}
              onChangeText={(newValue) => {
                setPasswordController(newValue);
              }}
              style={tailwind(
                "rounded-lg pl-3 border border-gray-300 w-10/12 h-8"
              )}
            />
          </View>
          <View style={tailwind("pl-10")}>
            <Text
              onPress={() => navigation.navigate("忘記密碼")}
              style={tailwind("text-blue-600 text-left")}
            >
              忘記密碼?
            </Text>
          </View>
          {/* 送出與註冊 */}
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor: "green",
            }}
          >
            <Pressable
              onPress={loginHandler}
              style={tailwind(
                "bg-blue-500 rounded-lg font-bold text-center px-12 py-3 my-3"
              )}
            >
              <Text style={tailwind("text-white")}>登 入</Text>
            </Pressable>

            <Text
              onPress={() => navigation.navigate("註冊")}
              style={tailwind("text-blue-600")}
            >
              立即註冊
            </Text>
          </View>
        </View>
      </View>

      <View style={tailwind("items-center")}>
        <View style={tailwind("my-10")}>
          <Text style={tailwind("text-gray-400")}>or</Text>
        </View>
        <Pressable
          style={tailwind(
            "flex-row items-center bg-blue-500 rounded-lg font-bold text-center px-6 py-3 mb-3 "
          )}
        >
          <View style={tailwind("bg-white rounded-full p-1")}>
            <Image
              style={tailwind("w-6 h-6")}
              source={{
                uri:
                  "https://cdn.icon-icons.com/icons2/2119/PNG/512/google_icon_131222.png",
              }}
            />
          </View>

          <Text style={tailwind("ml-2 text-white")}>用Google帳號登入</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default app;
