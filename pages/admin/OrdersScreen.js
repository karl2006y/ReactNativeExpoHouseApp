import * as React from "react";
import {
  Pressable,
  SafeAreaView,
  FlatList,
  StatusBar,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const OrderDetail = () => {
  return (
    <View
      style={{
        marginHorizontal: 30,
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 25 }}>TITLE</Text>
      <Text style={{ marginTop: 5 }}>發布時間:數天前</Text>
      <Text style={{ marginTop: 5 }}>金額:3,000</Text>
      <Text style={{ marginTop: 5 }}>金額:3,000</Text>
      <Text style={{ marginTop: 5 }}>金額:3,000</Text>
      <Text style={{ marginTop: 5 }}>金額:3,000</Text>
      <Text style={{ marginTop: 5 }}>金額:3,000</Text>
      <Text style={{ marginTop: 5 }}>金額:3,000</Text>
    </View>
  );
};
const Item = ({ title }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

function OrdersScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("訂單細節")}>
      <Item title={item.title} />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="訂單列表" component={OrdersScreen} />
      <Stack.Screen name="訂單細節" component={OrderDetail} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    // backgroundColor: "#f6f6f6",
  },
  item: {
    // backgroundColor: "#f9c2ff",

    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
  },
});

export default App;
