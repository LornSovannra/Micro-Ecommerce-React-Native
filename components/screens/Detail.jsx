import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native-paper';
import Header from "../layouts/Header";
import axios from "axios";
import { useDispatch } from 'react-redux' 
import { cartActions } from "../redux/slices/cartSlice";
import Toast, { BaseToast } from 'react-native-toast-message';

export default function Detail() {
  // Hooks
  const route = useRoute();
  const dispatch = useDispatch()

  // States
  const [itemData, setItemData] = useState([]);
  const [isFetching, SetIsFetching] = useState(true);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    customToast: ({ text1, props }) => (
      <View style={{ height: 30, width: '90%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}>
        <Text>{text1}</Text>
        {/* <Text>{props.uuid}</Text> */}
      </View>
    )
  };

  const addToCartHandler = () => {

    Toast.show({
      type: 'customToast',
      text1: 'One item added to cart.',
      text2: 'This is some something 👋',
      position: 'top',
      bottomOffset: 80
    });

    dispatch(cartActions.addToCart({
      id: itemData.id,
      image: itemData.image,
      title: itemData.title,
      price: itemData.price
    }))
  }

  const fetchItemData = () => {
    axios
      .get(`https://fakestoreapi.com/products/${route.params}`)
      .then((res) => {
        setItemData(res.data);
        SetIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchItemData();

    console.log(itemData);
  }, []);

  return (
    <>
      <Header routeName={route.name} />
      <Toast config={toastConfig} />
      {isFetching ? (
        <View style={styles.loading}>
          <ActivityIndicator size={50} animating={true} color={"black"} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.wrapper}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{
                  uri: itemData.image,
                }}
              />
            </View>
            <View style={styles.name_price}>
              <View style={styles.nameWrapper}>
                <Text numberOfLines={2} style={styles.nameText}>
                  {itemData.title}
                </Text>
              </View>
              <View>
                <Text style={styles.priceText}>$ {itemData.price}</Text>
              </View>
            </View>
            <View style={styles.descriptionWrapper}>
              <Text style={styles.descriptionHeader}>Description</Text>
              <Text style={styles.descriptionText}>{itemData.description}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.btnAddToCart} onPress={addToCartHandler}>
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 20,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    marginTop: 40,
    fontSize: 18
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  name_price: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  nameWrapper: {
    width: 230,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  descriptionWrapper: {},
  descriptionHeader: {
    fontSize: 20,
    fontWeight: "400",
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 16,
    paddingBottom: 70,
  },
  btnAddToCart: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  addToCartText: {
    color: 'white',
  }
});
