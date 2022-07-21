import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ToastAndroid, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux' 
import { cartActions } from "../redux/slices/cartSlice";

export default function Card({ id, image, nameOfProduct, brandName, price }) {
  // Hooks
  const navigate = useNavigation()
  const dispatch = useDispatch()

  // Invokes
  const { cartItems } = useSelector(state => state.cart)

  return (
    <View style={{ flex: 1, flexDirection: 'column', margin: 10 }}>
      <TouchableOpacity style={styles.wrapper} onPress={() => navigate.navigate("Detail", id)}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={styles.bodyWrapper}>
          <View style={styles.productName_brandName}>
            <Text numberOfLines={2} style={styles.productNameText}>
              {nameOfProduct}
            </Text>
            <Text style={styles.brandNameText}>{brandName}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>$ {price}</Text>
        <View style={styles.wishList_cart}>
          <TouchableOpacity onPress={() => alert("wishlisted")}>
            <AntDesign
              style={styles.wishList}
              name="hearto"
              size={25}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    margin: 10,
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  image: {
    width: 125,
    height: 125,
    resizeMode: "contain",
  },
  bodyWrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName_brandName: {
    marginVertical: 10,
    paddingHorizontal: 2,
    width: "100%",
  },
  productNameText: {
    fontWeight: "bold",
  },
  brandNameText: {
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  wishList_cart: {
    flexDirection: "row",
  }
});
