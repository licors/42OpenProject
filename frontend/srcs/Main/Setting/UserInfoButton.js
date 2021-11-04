import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDataFromServer, getTokenFromStorage } from "../../func/func_data_communication";
import { ip } from "../../data/data";

export const UserInfoButton = ({ navigation }) => {

	return (
		<View style={styles.buttonalign}>
			<TouchableOpacity
				style={styles.buttonstyle}
				onPress={() => {

					const okFunc = (value) => {

						const params = {
							headers: {
								"X-AUTH-TOKEN": value,
							}
						};

						const okFunc2 = (data) => {
							navigation.navigate("UserInfo", data);
						};
						
						getDataFromServer(`${ip}​/user​/info`, params, okFunc2, 0, 0);
					};
					getTokenFromStorage(okFunc, 0, 0);
				}}
			>
				<Text style={styles.textstyle}>회원정보</Text>
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