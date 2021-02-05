import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import {
  getAllClassification_admin,
  createClassification,
  updateClassification,
  turnOnClassification,
  turnOffClassification,
  deleteClassification,
} from "../../api/Classification";
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

const ClassificationList = ({ navigation, route }) => {
  const [newClassification, setNewClassification] = useState(null);
  const [classification, setClassification] = useState([]);

  const createClassificationHandler = () => {
    if (newClassification) {
      createClassification(newClassification).then(() => {
        console.log("create classification");
        getClassificationHandler();
      });
    } else {
      alert("請勿空白");
    }
  };
  const getClassificationHandler = () => {
    getAllClassification_admin().then((res) => {
      console.log("get classification");
      setClassification(res.data.data);
    });
  };

  const turnOnClassificationHandler = (id) => {
    console.log("turn on", id);
    turnOnClassification(id).then(() => {
      getClassificationHandler();
      alert("起用成功");
    });
  };
  const turnOffClassificationHandler = (id) => {
    console.log("turn off", id);

    turnOffClassification(id).then(() => {
      getClassificationHandler();
      alert("停用成功");
    });
  };
  const deleteClassificationHandler = (id) => {
    console.log("delete", id);
    deleteClassification(id).then(() => {
      getClassificationHandler();
      alert("刪除成功");
    });
  };

  const ClassificationItem = ({ cr_at, status, classification_name, id }) => {
    return (
      <View style={tw("w-full bg-white rounded-xl mt-2 p-5 ")}>
        <Text style={tw("mt-1")}>類別名稱：{classification_name}</Text>
        <Text style={tw("mt-1")}>建立時間：{cr_at}</Text>
        <Text style={tw("mt-1")}>是否啟用：{status ? "是" : "否"}</Text>

        <View style={tw("mt-2 pt-2 border-t border-gray-300 flex-row")}>
          <View style={tw("flex-1  items-center border-r border-gray-300")}>
            {status ? (
              <Button
                title="停用"
                onPress={() => {
                  turnOffClassificationHandler(id);
                }}
              />
            ) : (
              <Button
                title="起用"
                onPress={() => {
                  turnOnClassificationHandler(id);
                }}
              />
            )}
          </View>
          <View style={tw("flex-1 items-center")}>
            <Button
              style={tw("bg-red-400")}
              title="刪除"
              onPress={() => {
                deleteClassificationHandler(id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <ClassificationItem
      cr_at={item.cr_at}
      status={item.status == 1}
      classification_name={item.classification_name}
      id={item.id}
    />
  );

  // 初始化時只執行一次
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getClassificationHandler();
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
          <TextInput
            placeholder="請輸入新的類別名稱"
            clearButtonMode="always"
            returnKeyLabel="done"
            value={newClassification}
            onChangeText={(newValue) => {
              setNewClassification(newValue);
            }}
            style={tw("rounded-lg pl-3 border border-gray-300 w-48 h-10 mr-2")}
          />
          <Button
            onPress={() => {
              createClassificationHandler();
            }}
            title="新增類別"
            style={tw("w-20 ")}
          />
        </View>
      </View>
      <FlatList
        data={classification}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
};

export default ClassificationList;
