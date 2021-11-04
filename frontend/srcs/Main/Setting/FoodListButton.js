import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ip } from "../../data/data";
import { getDataFromServer, getTokenFromStorage } from "../../func/func_data_communication";

export const FoodListButton = ({ navigation }) => {

	return (
		<View style={styles.buttonalign}>
          <TouchableOpacity
            style={styles.buttonstyle}
            onPress={() => {

				const okFunc = (value) => {

					const okFunc1 = (data) => navigation.navigate("FoodList", data);

					const params = {
						headers: {
							"X-AUTH-TOKEN": value,
						}
					};
					getDataFromServer(`${ip}/user/info/food`, params, okFunc1, 0, 0);
				};
				getTokenFromStorage(okFunc, 0, 0);
			}}
          >
            <Text style={styles.textstyle}>음식리스트</Text>
          </TouchableOpacity>
        </View>
	);
};



const styles = StyleSheet.create({

	buttonalign: {
		justifyContent: "center",
		margin: "8%",
	  },
	buttonstyle: {
		height: 55,
		width: 110,
		backgroundColor: "orange",
		borderRadius: 40,
		justifyContent: "center",
	},
	textstyle: {
		fontSize: 20,
		fontFamily: "BlackHanSans_400Regular",
		color: "white",
		textAlign: "center",
	},
});