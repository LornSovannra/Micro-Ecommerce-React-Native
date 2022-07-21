import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons, Entypo, Feather, EvilIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";

export default function Cart() {
  // Hooks
  const navigation = useNavigation();
  const dispatch = useDispatch()

  //Variables
  let total = 0;
  const HEIGHT = Dimensions.get("window").height;
  const WIDTH = Dimensions.get("window").width;

  //Invokes
  const { cartItems } = useSelector(state => state.cart)
  const [ isCartEmpty, setIsCartEmpty ] = useState(true);

  cartItems.forEach(item => {
    total += item.totalPrice
  })

  useEffect(() => {
    cartItems.length === 0 ? setIsCartEmpty(true) : setIsCartEmpty(false)
  }, []);

  const increaseCartItem = (id, image, title, price, totalPrice) => {
    dispatch(cartActions.addToCart({
      id,
      image,
      title,
      price,
      totalPrice
    }))
  }

  const decreaseCartItem = (id) => {
    dispatch(cartActions.remoreFromCart(id))
  }

  return (
    <View style={styles().wrapper}>
      <View style={styles().header}>
        <TouchableOpacity  onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={30} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={styles().headerText}>Cart</Text>
        </View>
        <View>
          <SimpleLineIcons name="bag" size={25} color="black" />
        </View>
      </View>

      {isCartEmpty ? (
        <View style={styles().cartEmptyWrapper}>
          <Text>Cart is empty</Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles().cartItemsWrapper}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles().itemWrapper}>
                <View style={styles().imageWrapper}>
                  <Image
                    style={styles().image}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
                <View style={styles().secondary_wrapper}>
                  <View style={styles().title_price_wrapper}>
                    <Text style={styles().itemTitleText} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles().itemPriceText} numberOfLines={1}>
                      $ {(item.totalPrice).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles().adjust_and_delete}>
                    <View style={styles().adjust_wrapper}>
                      <TouchableOpacity onPress={() => decreaseCartItem(item.id)}>
                          <Feather name="minus" size={20} color="black" />
                      </TouchableOpacity>
                      <Text style={styles().numOfItemText}>{ item.totalQty }</Text>
                      <TouchableOpacity onPress={() => increaseCartItem(item.id, item.image, item.title, item.price, item.totalPrice)}>
                          <EvilIcons name="plus" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles().btnAddToCart}>
            <Text style={styles().addToCartText}>Buy Now (${total.toFixed(2)})</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: "white",
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 20,
      paddingVertical: 10,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 20,
    },
    cartEmptyWrapper:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartItemsWrapper: {
      margin: 20,
      marginBottom: 70,
    },
    itemWrapper: {
      flexDirection: "row",
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'black'
    },
    imageWrapper: {
      marginRight: 10,
      width: 100,
      height: 100,
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: "contain",
    },
    itemTitleText: {
      marginBottom: 10,
      fontSize: 18,
      fontWeight: "bold",
      width: 260
    },
    itemPriceText: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: "500",
    },
    adjust_and_delete: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    adjust_wrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    numOfItemText: {
      fontSize: 20,
      marginHorizontal: 10
    },
    btnAddToCart: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    addToCartText: {
      color: 'white',
    }
  });
