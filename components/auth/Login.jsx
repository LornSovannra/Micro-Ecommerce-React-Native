import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.login())
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.welcomeWrapper}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.toText}>to</Text>
        <Text style={styles.appName}>Micro - Ecommerce</Text>
      </View>
      <TouchableOpacity style={styles.btnLogin} onPress={loginHandler}>
        <Text style={styles.btnLoginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcomeWrapper: {
    alignItems: 'center',
  },  
  welcomeText: {
    fontSize: 20,
    fontWeight: '600'
  },
  toText: {
    marginTop: 20,
    fontSize: 18
  },
  appName: {
    marginTop: 20,
    fontSize: 27,
    fontWeight: 'bold'
  },
  btnLogin: {
    paddingVertical: 17,
    paddingHorizontal: 47,
    backgroundColor: 'black'
  },
  btnLoginText: {
    color: "white",
    fontSize: 20,
  },
});
