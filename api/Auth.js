// Storage;
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserEmail = async (value) => {
  try {
    await AsyncStorage.setItem("email", value);
  } catch (e) {
    // save error
    console.log(e);
  }

  console.log("Done.");
};
export const getUserEmail = async () => {
  try {
    return await AsyncStorage.getItem("email");
  } catch (e) {
    // read error
  }

  console.log("Done.");
};
export const setLoginToken = async (value) => {
  try {
    await AsyncStorage.setItem("key", value);
  } catch (e) {
    // save error
    console.log(e);
  }

  console.log("Done.");
};
export const getLoginToken = async () => {
  try {
    const val = await AsyncStorage.getItem("key");
    // console.log("token", val);
    return val;
  } catch (e) {
    // read error
  }

  console.log("Done.");
};
export const removeLoginToken = async () => {
  try {
    await AsyncStorage.removeItem("key");
  } catch (e) {
    // remove error
  }

  console.log("Done.");
};

// api
import request from "./request";
export function getUserInfo() {
  return request({
    url: `/user/getuser`,
    method: "get",
  });
}

export function getUserHistory() {
  return request({
    url: `/user/history`,
    method: "get",
  });
}

export function setUserHistory(name) {
  return request({
    url: `/user/history`,
    method: "post",
    data: {
      name: name,
    },
  });
}
export function login(data) {
  return request({
    url: `/user/login`,
    method: "post",
    data: data,
  });
}

export function register(data) {
  return request({
    url: `/user/register`,
    method: "post",
    data: data,
  });
}
export function editUserInfo(data) {
  return request({
    url: `/user/edituser`,
    method: "put",
    data: data,
  });
}

export function uploadUserPic(data) {
  return request({
    url: `/user/uploaduserpic`,
    method: "post",
    data: data,
  });
}
