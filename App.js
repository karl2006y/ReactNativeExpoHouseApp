import React, { useState } from "react";
import { Text, View } from "react-native";
import AdminView from "./pages/admin/index";
import LoginView from "./pages/auth/index";

export default function App() {
  const [isLogin, setLoginStatus] = useState(false);
  if (isLogin) {
    return <AdminView setLoginStatus={setLoginStatus}></AdminView>;
  } else {
    return <LoginView setLoginStatus={setLoginStatus}></LoginView>;
  }
}
