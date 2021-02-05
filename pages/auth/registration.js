import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import tw from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import rules from "../../api/ValidationRegex";
import { register } from "../../api/Auth";

function app({ navigation }) {
  const [obj_register, setObjRegister] = useState({});
  let Inputs = {};
  const registerValidationHandler = () => {
    const res =
      rules(obj_register.name, "required", "使用者帳戶請勿空白") &&
      rules(obj_register.email, "required", "電子信箱請勿空白") &&
      rules(obj_register.email, "email") &&
      rules(obj_register.password, "required", "密碼請勿空白") &&
      rules(obj_register.password, "password") &&
      rules(
        obj_register.password == obj_register.password_confirmation,
        "same",
        "密碼與重複密碼不相符"
      ) &&
      rules(obj_register.nickname, "required", "顯示名稱請勿空白");
    if (res) {
      console.log("pass");
      register({ ...obj_register, role: "admin" }).then((res) => {
        if (res.data.success) {
          alert("註冊完成");
          navigation.navigate("登入");
        }
      });
    }
  };
  return (
    <SafeAreaView style={tw("h-full")}>
      <KeyboardAwareScrollView>
        <View style={tw("bg-gray-100 py-6 flex flex-col justify-center ")}>
          <View style={tw("relative py-3 ")}>
            <View style={tw("relative px-4 py-10 bg-white mx-8 rounded-3xl ")}>
              <View style={tw("max-w-md ")}>
                <View style={tw("")}>
                  <View style={tw("py-8 text-base leading-6 text-gray-700 ")}>
                    <View style={tw("flex flex-col")}>
                      <Text style={tw("mb-2")}>使用者帳號</Text>
                      <TextInput
                        value={obj_register.name}
                        onChangeText={
                          (newValue) =>
                            setObjRegister({ ...obj_register, name: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        clearButtonMode="always"
                        textContentType="username"
                        style={tw(
                          "px-4 py-2 border w-full border-gray-300 rounded-md text-gray-600"
                        )}
                        placeholder="請輸入使用者帳號"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                          Inputs["email"].focus();
                        }}
                        blurOnSubmit={false}
                      />
                    </View>
                    <View style={tw("flex flex-col")}>
                      <Text style={tw("mt-3 mb-2")}>電子信箱</Text>
                      <TextInput
                        value={obj_register.email}
                        onChangeText={
                          (newValue) =>
                            setObjRegister({ ...obj_register, email: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        // 定位
                        ref={(input) => (Inputs["email"] = input)}
                        // 送出時觸發
                        onSubmitEditing={() => {
                          Inputs["password"].focus();
                        }}
                        //送出時不要關閉鍵盤
                        blurOnSubmit={false}
                        keyboardType="email-address"
                        clearButtonMode="always"
                        textContentType="emailAddress"
                        style={tw(
                          "px-4 py-2 border w-full border-gray-300 rounded-md text-gray-600"
                        )}
                        placeholder="請輸入註冊Email"
                        returnKeyType="next"
                      />
                    </View>
                    <View style={tw("flex flex-col")}>
                      <Text style={tw("mt-3 mb-2")}>密碼</Text>
                      <TextInput
                        value={obj_register.password}
                        onChangeText={
                          (newValue) =>
                            setObjRegister({
                              ...obj_register,
                              password: newValue,
                            }) //賦予要寫後面不然會被蓋過去
                        }
                        // 定位
                        ref={(input) => (Inputs["password"] = input)}
                        // 送出時觸發
                        onSubmitEditing={() => {
                          Inputs["password_confirmation"].focus();
                        }}
                        //送出時不要關閉鍵盤
                        blurOnSubmit={false}
                        clearButtonMode="always"
                        secureTextEntry={true}
                        textContentType="password"
                        style={tw(
                          "px-4 py-2 border w-full border-gray-300 rounded-md text-gray-600"
                        )}
                        placeholder="請輸入密碼"
                        returnKeyType="next"
                      />
                    </View>
                    <View style={tw("flex flex-col")}>
                      <Text style={tw("mt-3 mb-2")}>重複密碼</Text>
                      <TextInput
                        value={obj_register.password_confirmation}
                        onChangeText={
                          (newValue) =>
                            setObjRegister({
                              ...obj_register,
                              password_confirmation: newValue,
                            }) //賦予要寫後面不然會被蓋過去
                        }
                        // 定位
                        ref={(input) =>
                          (Inputs["password_confirmation"] = input)
                        }
                        // 送出時觸發
                        onSubmitEditing={() => {
                          Inputs["nickname"].focus();
                        }}
                        //送出時不要關閉鍵盤
                        blurOnSubmit={false}
                        clearButtonMode="always"
                        secureTextEntry={true}
                        textContentType="newPassword"
                        style={tw(
                          "px-4 py-2 border w-full border-gray-300 rounded-md text-gray-600"
                        )}
                        placeholder="請再次輸入密碼確保密碼正確"
                        returnKeyType="next"
                      />
                    </View>
                    <View style={tw("flex flex-col")}>
                      <Text style={tw("mt-3 mb-2")}>顯示名稱</Text>
                      <TextInput
                        value={obj_register.nickname}
                        onChangeText={
                          (newValue) =>
                            setObjRegister({
                              ...obj_register,
                              nickname: newValue,
                            }) //賦予要寫後面不然會被蓋過去
                        }
                        // 定位
                        ref={(input) => (Inputs["nickname"] = input)}
                        clearButtonMode="always"
                        textContentType="nickname"
                        style={tw(
                          "px-4 py-2 border w-full border-gray-300 rounded-md text-gray-600"
                        )}
                        placeholder="請輸入顯示名稱"
                        returnKeyType="done"
                      />
                    </View>
                  </View>
                  <View class="pt-4 flex items-center">
                    <Pressable
                      onPress={registerValidationHandler}
                      style={tw(
                        "bg-blue-500 rounded-lg font-bold px-12 py-3 my-3"
                      )}
                    >
                      <Text style={tw("text-white text-center")}>立即註冊</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default app;
