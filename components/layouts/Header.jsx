import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons, Ionicons, AntDesign } from '@expo/vector-icons';

export default function Header({ routeName }) {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const showLogoutAlert = () =>
    Alert.alert(
      "You're going to logout",
      "Are you sure to logout?",
      [
        {
          text: "Cancel",
          /* onPress: () => Alert.alert("Cancel Pressed"), */
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: logoutHandler,
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        /* onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ), */
      }
    );

  return (
    <View style={styles.wrapper}>
      {
        routeName === "Detail" && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        )
      }

      <View>
        <Text style={styles.headerText}>Micro-Ecommerce</Text>
      </View>
      
      <View style={styles.headerRightWrapper}>
        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate("Cart")}>
          <SimpleLineIcons name="bag" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showLogoutAlert}>
          <AntDesign name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#1d3557",
    justifyContent: "space-between",
    alignContent: "center",
    height: 90,
    paddingTop: 40,
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  headerRightWrapper: {
    flexDirection: 'row',
  },
  btnLogin: {
    marginRight: 10
  }
});
