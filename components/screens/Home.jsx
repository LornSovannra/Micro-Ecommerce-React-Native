import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import { ActivityIndicator } from 'react-native-paper';
import Header from "../layouts/Header";
import Card from "../utils/Card";

export default function Home() {
  const [data, setData] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  const fetchData = () => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        setData(res.data);
        setIsFetching(false)
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Header />
      {isFetching ? (
        <View style={styles.loading}>
          <ActivityIndicator size={50} animating={true} color={"black"} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <Card
              id={item.id}
              image={item.image}
              nameOfProduct={item.title}
              brandName={"Unknown"}
              price={item.price}
            />
          )}
          numColumns={"2"}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    flexWrap: "wrap",
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
  welcomeText: {
    fontSize: 20,
  },
});
