import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import {
  getAllProduct_admin,
  createProduct,
  updateProduct,
  turnOnProduct,
  turnOffProduct,
  deleteProduct,
} from "../../api/Products";
import { setUserHistory } from "../../api/Auth";
import Ionicons from "react-native-vector-icons/Ionicons";
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

const ProductList = ({ navigation, route }) => {
  const [newProduct, setNewProduct] = useState(null);
  const [product, setProduct] = useState([]);

  const createProductHandler = () => {
    navigation.navigate("新增我的資料");
  };
  const getProductHandler = () => {
    getAllProduct_admin().then((res) => {
      console.log("get product");
      setProduct(res.data.data.data);
    });
  };

  const turnOnProductHandler = (id) => {
    console.log("turn on", id);
    turnOnProduct(id).then(() => {
      getProductHandler();
      alert("起用成功");
    });
  };
  const turnOffProductHandler = (id) => {
    console.log("turn off", id);

    turnOffProduct(id).then(() => {
      getProductHandler();
      alert("停用成功");
    });
  };
  const deleteProductHandler = (id) => {
    console.log("delete", id);
    deleteProduct(id).then(() => {
      getProductHandler();
      alert("刪除成功");
    });
  };

  const ProductItem = ({ main_pic_url, cr_at, status, product_name, id }) => {
    return (
      <View style={tw("w-full bg-white rounded-xl mt-2 p-5 ")}>
        <View style={tw("")}>
          <Image
            style={tw("rounded w-full h-40")}
            source={{ uri: main_pic_url }}
            resizeMode="cover"
          />
        </View>
        <Text style={tw("mt-1")}>商品名稱：{product_name}</Text>
        <Text style={tw("mt-1")}>建立時間：{cr_at}</Text>
        <Text style={tw("mt-1")}>是否啟用：{status ? "是" : "否"}</Text>

        <View style={tw("mt-2 pt-2 border-t border-gray-300 flex-row")}>
          <View style={tw("flex-1  items-center border-r border-gray-300")}>
            {status ? (
              <Button
                title="停用"
                onPress={() => {
                  turnOffProductHandler(id);
                }}
              />
            ) : (
              <Button
                title="起用"
                onPress={() => {
                  turnOnProductHandler(id);
                }}
              />
            )}
          </View>
          <View style={tw("flex-1 items-center")}>
            <Button
              style={tw("bg-red-400")}
              title="刪除"
              onPress={() => {
                deleteProductHandler(id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <ProductItem
      cr_at={item.cr_at}
      status={item.status == 1}
      product_name={item.name}
      id={item.id}
      main_pic_url={item.medias_1_url}
    />
  );

  // 初始化時只執行一次
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProductHandler();
      setUserHistory(route.name); //紀錄瀏覽紀錄
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={tw("h-full")}>
      <View style={tw("items-center mt-2 ")}>
        <View
          style={tw(
            "w-full bg-white rounded-xl h-24 justify-center items-center flex-row"
          )}
        >
          <Button
            onPress={() => {
              createProductHandler();
            }}
            title="新增我的資料"
            style={tw("w-32 ")}
          />
        </View>
      </View>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default ProductList;
