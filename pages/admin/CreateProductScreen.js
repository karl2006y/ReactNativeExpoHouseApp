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
import { createProduct } from "../../api/Products";
import { setUserHistory } from "../../api/Auth";
import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-rn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as ImagePicker from "expo-image-picker";

const app = ({ navigation, route }) => {
  const [productInfo, setProductInfo] = useState({});

  let Inputs = {};

  // 初始化時只執行一次
  useEffect(() => {
    setUserHistory(route.name); //紀錄瀏覽紀錄
  }, []);

  // 上傳頭貼
  // const [userImg, setUserImg] = useState(null)
  const pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // image.uri =
    //   Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");
    alert("上傳中");
    console.log(image);
    const data = new FormData();
    data.append("medias_1_file", {
      file: image,
      uri: image.uri,
      type: image.type,
      name: "pic",
    });
    data.append("medias_1_type", "picture");
    Object.keys(productInfo).forEach((key) => {
      data.append(key, productInfo[key]);
    });
    console.log(data);
    createProduct(data).then(() => {
      alert("建立成功");
      navigation.navigate("我的資料");
    });
    // if (!result.cancelled) {
    //   // this.setState({ image: result.uri });
    // }
  };
  return (
    <SafeAreaView style={tw("h-full")}>
      <KeyboardAwareScrollView>
        <View>
          <View style={tw("bg-gray-100 flex flex-col justify-center ")}>
            <View style={tw("relative")}>
              <View
                style={tw("mt-5 relative px-4 py-5 bg-white mx-8 rounded-3xl ")}
              >
                <View style={tw("max-w-md ")}>
                  <View style={tw("")}>
                    <View style={tw("py-3 text-base leading-6 text-gray-700 ")}>
                      <InputCom
                        label="類別id"
                        value={productInfo.classification_id}
                        onChangeText={
                          (newValue) =>
                            setProductInfo({
                              ...productInfo,
                              classification_id: newValue,
                            }) //賦予要寫後面不然會被蓋過去
                        }
                        propref={(input) =>
                          (Inputs["classification_id"] = input)
                        }
                        propOnSubmitEditing={() => {
                          Inputs["name"].focus();
                        }}
                        blurOnSubmit={false}
                        textContentType="name"
                        placeholder="類別（必填）"
                        returnKeyType="next"
                      />
                      <InputCom
                        label="名稱（必填）"
                        value={productInfo.name}
                        onChangeText={
                          (newValue) =>
                            setProductInfo({ ...productInfo, name: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        propref={(input) => (Inputs["name"] = input)}
                        propOnSubmitEditing={() => {
                          Inputs["price"].focus();
                        }}
                        blurOnSubmit={false}
                        textContentType="name"
                        placeholder="請輸入名稱（必填）"
                        returnKeyType="next"
                      />
                      <InputCom
                        label="價格（必填）"
                        value={productInfo.price}
                        onChangeText={
                          (newValue) =>
                            setProductInfo({ ...productInfo, price: newValue }) //賦予要寫後面不然會被蓋過去
                        }
                        propref={(input) => (Inputs["price"] = input)}
                        blurOnSubmit={true}
                        keyboardType="phone-pad"
                        placeholder="請輸入價格（必填）"
                        returnKeyType="done"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={tw("my-2 flex-row h-36 bg-white mx-8 rounded-3xl")}>
            <View style={tw("flex-1 justify-center items-center")}>
              <Image
                style={tw("rounded-full w-28 h-28")}
                source={{ uri: productInfo.user_pic_url }}
              />
            </View>

            <View style={tw("flex-1 flex-row ")}>
              <View style={tw("flex-1 justify-center py-6")}>
                <Text style={tw("text-left text-gray-400")}>新增主要圖片</Text>
                <View style={tw("items-end pr-10 mt-2")}>
                  <Button
                    title="選擇圖片並上傳"
                    onPress={pickImage}
                    style={tw("w-full py-2")}
                  />
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
