import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import {
  getAllBanner_admin,
  turnOnBanner,
  turnOffBanner,
  deleteBanner,
  createBanner,
} from "../../api/Banner";
import { setUserHistory } from "../../api/Auth";

import Ionicons from "react-native-vector-icons/Ionicons";
import tw from "tailwind-rn";
import * as ImagePicker from "expo-image-picker";

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

const BannersList = ({ navigation, route }) => {
  const [banners, setBanners] = useState([]);
  const getBannerHandler = () => {
    getAllBanner_admin().then((res) => {
      console.log("get banner");
      setBanners(res.data.message);
    });
  };
  const bannerPickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    // image.uri =
    //   Platform.OS === "android" ? image.uri : image.uri.replace("file://", "");
    // alert(image.uri);
    alert("上傳中");
    // console.log(image);
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
    createBanner(data).then(() => {
      getBannerHandler();
    });
    // if (!result.cancelled) {
    //   // this.setState({ image: result.uri });
    // }
  };
  const turnOnBannerHandler = (id) => {
    console.log("turn on", id);
    turnOnBanner(id).then(() => {
      getBannerHandler();
      alert("起用成功");
    });
  };
  const turnOffBannerHandler = (id) => {
    console.log("turn off", id);

    turnOffBanner(id).then(() => {
      getBannerHandler();
      alert("停用成功");
    });
  };
  const deleteBannerHandler = (id) => {
    console.log("delete", id);
    deleteBanner(id).then(() => {
      getBannerHandler();
      alert("刪除成功");
    });
  };

  const BannerItem = ({ cr_at, status, pic_url, id }) => {
    return (
      <View style={tw("w-full bg-white rounded-xl mt-2 p-5 ")}>
        <Text style={tw("")}>建立時間：{cr_at}</Text>
        <Text style={tw("my-2")}>是否啟用：{status ? "是" : "否"}</Text>
        <View style={tw("")}>
          <Image
            style={tw("rounded w-full h-40")}
            source={{ uri: pic_url }}
            resizeMode="center"
          />
        </View>
        <View style={tw("mt-2 pt-2 border-t border-gray-300 flex-row")}>
          <View style={tw("flex-1  items-center border-r border-gray-300")}>
            {status ? (
              <Button
                title="停用"
                onPress={() => {
                  turnOffBannerHandler(id);
                }}
              />
            ) : (
              <Button
                title="起用"
                onPress={() => {
                  turnOnBannerHandler(id);
                }}
              />
            )}
          </View>
          <View style={tw("flex-1 items-center")}>
            <Button
              style={tw("bg-red-400")}
              title="刪除"
              onPress={() => {
                deleteBannerHandler(id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <BannerItem
      cr_at={item.cr_at}
      status={item.status == 1}
      pic_url={item.pic_url}
      id={item.id}
    />
  );

  // 初始化時只執行一次
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getBannerHandler();
      setUserHistory(route.name); //紀錄瀏覽紀錄
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={tw("h-full")}>
      <View style={tw("items-center mt-2")}>
        <View
          style={tw(
            "w-full bg-white rounded-xl h-24 justify-center items-center"
          )}
        >
          <Button
            onPress={() => {
              bannerPickImage();
            }}
            title="+ 選擇圖片來新增Banner"
            style={tw("w-56")}
          />
        </View>
      </View>
      <FlatList
        data={banners}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default BannersList;
