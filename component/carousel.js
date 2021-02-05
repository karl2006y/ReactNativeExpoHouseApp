import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { getImage } from "../api/getimage";

const onPageChanged = (e) => {
  // console.log(e);
};

const MyPager = (props) => {
  const [dataImages, setDataImages] = useState(null);
  const { images } = props;
  console.log("create Image");
  if (dataImages == null) {
    getImage(images).then((res) => {
      console.log("carousel res", res);
      setDataImages(
        res.data.message.map((prop, key) => {
          return (
            <View key={prop.id}>
              {/* <Text key={key}>{prop.download_url}</Text> */}
              <Image
                source={{
                  uri: prop.pic_url,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          );
        })
      );
    });
  }

  return (
    <>
      <ViewPager
        style={styles.viewPager}
        initialPage={0}
        showPageIndicator={true}
        onPageScrollStateChanged={onPageChanged}
      >
        {dataImages}
      </ViewPager>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});
export { MyPager };
