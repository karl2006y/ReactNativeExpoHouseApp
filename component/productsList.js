import React from "react";
import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { getAllProduct } from "../api/Products";

const ProductItem = ({ image, name, price }) => {
  console.log("create ProductItem", image, name);
  return (
    <View
      style={{
        height: 280,
        borderColor: "gray",
        // borderWidth: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        marginLeft: 4.5,
        marginRight: 4.5,
        backgroundColor: "#fff",
        shadowColor: "#999",
        shadowOffset: { width: 7, height: 7 },
        shadowOpacity: 0.5,
        shadowRadius: 1.5,
        elevation: 1.5,
      }}
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          width: 250,
          height: 200,
        }}
      />
      <Text style={{ padding: 20, paddingBottom: 0 }}>資料名稱：{name}</Text>
      <Text style={{ paddingLeft: 20 }}>價格：{price} 元</Text>
    </View>
  );
};

export const ProductsList = (props) => {
  const { navigate } = props;
  const [productItems, setProductItems] = React.useState(null);
  const PIOnpress = (id) => {
    navigate("商品頁面", { productId: id });
  };
  if (productItems == null) {
    getAllProduct().then((res) => {
      console.log(res.data.data.data);
      setProductItems(
        res.data.data.data.map((prop, key) => {
          return (
            <Pressable key={key} onPress={() => PIOnpress(prop.id)}>
              <ProductItem
                name={prop.name}
                image={prop.medias_1_url}
                price={prop.price}
              ></ProductItem>
            </Pressable>
          );
        })
      );
    });
  }

  return (
    <View style={{ flexDirection: "row", height: 300 }}>
      <ScrollView horizontal={true} vertical={false}>
        {productItems}
      </ScrollView>
    </View>
  );
};
