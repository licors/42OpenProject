import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, LogBox } from "react-native";
import { SearchBar } from "../../SignUp/SearchBar";
import { SelectedFoodList } from "../../SignUp/SelectedFoodList";
import { HomeButton } from "../HomeButton";
import {
	onPressInLikeSearchPreview,
	onPressInDisLikeSearchPreview,
} from "../../func/func_on_press";
import { getTokenFromStorage, putDataToServer } from "../../func/func_data_communication";
import { ip } from "../../data/data";


export const FoodList = ({ navigation, route }) => {

	  LogBox.ignoreLogs([
      "Non-serializable values were found in the navigation state",
    ]);

	const SignInExpired = route.params.SignInExpired;

	const originLikeFood = route.params.data.data.likeFoodList;
	const originDisLikeFood = route.params.data.data.dislikeFoodList;

	const [signal, setSignal] = useState(0);
	const [likeFoodList, setLikeFoodList] = useState(route.params.data.data.likeFoodList);
	const [disLikeFoodList, setDisLikeFoodList] = useState(route.params.data.data.dislikeFoodList);

	const updateFoodList = (originLikeFood, originDisLikeFood, likeFoodList, disLikeFoodList) => {

		let object = {
			dislikeFood: {},
			likeFood: {}
		  };

		object.likeFood.deleteFoodList = originLikeFood.map(food => {
			if (!likeFoodList.includes(food))
				return (food);
		}).filter(food => food != null);

		object.dislikeFood.deleteFoodList = originDisLikeFood.map(food => {
			if (!disLikeFoodList.includes(food))
				return (food);
		}).filter(food => food != null);

		object.likeFood.addFoodList = likeFoodList.map(food => {
			if (!originLikeFood.includes(food))
				return (food);
		}).filter(food => food != null);

		object.dislikeFood.addFoodList = disLikeFoodList.map(food => {
			if (!originDisLikeFood.includes(food))
				return (food);
		}).filter(food => food != null);

		return object;
	};


	const onPressInLSP = (item) => {
		onPressInLikeSearchPreview(
			item,
			likeFoodList,
			disLikeFoodList,
			setLikeFoodList
		);
	};

	const onPressInDLSP = (item) => {
		onPressInDisLikeSearchPreview(
			item,
			likeFoodList,
			disLikeFoodList,
			setDisLikeFoodList
		);
	};

	const [onPress, foodList, setFoodList] =
		signal == 0
			? [onPressInLSP, likeFoodList, setLikeFoodList]
			: [onPressInDLSP, disLikeFoodList, setDisLikeFoodList];


	return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
        <HomeButton navigation={navigation} />
      <View style={styles.titlealign}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setSignal(0)}>
          <Text
            style={{
              fontSize: 70,
              textAlign: "center",
              fontFamily: "BlackHanSans_400Regular",
              color: signal == 0 ? "black" : "gray",
              opacity: signal == 0 ? 1 : 0.3,
            }}
          >
            좋아
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setSignal(1)}>
          <Text
            style={{
              fontSize: 70,
              textAlign: "center",
              fontFamily: "BlackHanSans_400Regular",
              color: signal != 0 ? "black" : "gray",
              opacity: signal != 0 ? 1 : 0.3,
            }}
          >
            싫어
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "center"}}
      >
        <SearchBar onPress={onPress} />
        <SelectedFoodList foodList={foodList} setFoodList={setFoodList} />
      </View>
      <View style={styles.buttonalign}>
        <TouchableOpacity
          style={styles.buttonstyle}
          onPress={() => {
            const okFunc = (value) => {
              const resFunc = () => navigation.navigate("Setting");
              const params = updateFoodList(
                originLikeFood,
                originDisLikeFood,
                likeFoodList,
                disLikeFoodList
              );
              putDataToServer(
                `${ip}/user/info/food`,
                params,
                value,
                resFunc,
                0,
                SignInExpired
              );
            };
            getTokenFromStorage(okFunc, 0, 0);
          }}
        >
          <Text style={styles.textstyle}>적용</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
	titlealign: {
		flex : 0.13,
		flexDirection: "row",
		alignItems: "center",
		justifyContent :'center',
		marginTop : '5%'
	},
	textstyle: {
		fontSize: 20,
		color: "white",
		fontFamily: "BlackHanSans_400Regular",
		textAlign: "center",
	},
	buttonstyle: {
		height: 55,
		width: 110,
		backgroundColor: "orange",
		borderRadius: 40,
		justifyContent: "center",
	},
	buttonalign: {
		flex : 0.15,
		alignItems : 'center',
		justifyContent : 'center',
		marginBottom : '9%'
	},
});

// {
// 	"dislikeFood": {
// 	  "addFoodList": [
// 		"string"
// 	  ],
// 	  "deleteFoodList": [
// 		"string"
// 	  ]
// 	},
// 	"likeFood": {
// 	  "addFoodList": [
// 		"string"
// 	  ],
// 	  "deleteFoodList": [
// 		"string"
// 	  ]
// 	}
//   }