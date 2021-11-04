import React from "react";
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native";
import { checkNickname } from "../../func/func_check_userinfo";
import { UserNicknameModal } from "./UserNicknameModal";

export const UserNickname = ({ nickName, setNickName, setModalVisible, modalVisible, alertMessage }) => {


	return (
		<View style={{ flex: 1.2 }}>
			<Text style={styles.title}>닉네임</Text>
			<View style={styles.nicknamealign}>
				<TextInput
					style={styles.textinputstyle}
					onChangeText={(input) => {
						if (checkNickname(input) && input.length != 0)
							setNickName(input);
					}}
				>
					<Text>기존닉네임</Text>
				</TextInput>
				<TouchableOpacity
					style={styles.changebutton}
					onPress={() => {
						setModalVisible(true);
						
						const okFunc = () => {
						const resFunc = () => {
							setAlertMessage("사용 가능한 닉네임입니다.");
							setModalVisible(true);
							}
						const noFunc = () => {
							setAlertMessage("중복된 닉네임입니다.");
							setModalVisible(true);
						const errFunc = () => {
							Alert.alert("서버와 통신이 되지 않습니다.");
						}
						}
						const params = nickName;
						putDataToServer(url, params, resFunc, noFunc, errFunc)
						};
					
						getTokenFromStorage(okFunc, noFunc, 0);
						
					}}
				>
					<Text style={styles.buttonText}>변경</Text>
				</TouchableOpacity>
				{
					modalVisible ?
					<Modal
					isVisible={true}
					hasBackdrop={true}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text
								style={{
									margin: 25,
									fontSize: 16,
									fontFamily: "BlackHanSans_400Regular",
								}}
							>
								{alertMessage}
							</Text>
							<TouchableOpacity
								onPress={() => {
									setModalVisible(false);
								}}
								style={styles.button}
							>
								<Text
									style={{
										color: "white",
										fontFamily: "BlackHanSans_400Regular",
									}}
								>
									확인
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
						: null
				}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.8,
		marginLeft: '25%',
		marginTop: "20%",
		justifyContent: "center",
		// alignItems: "center",
	},
	head: {
		fontSize: 50,
		fontFamily: "BlackHanSans_400Regular",
	},
	title: {
		fontSize: 20,
		fontFamily: "BlackHanSans_400Regular",
	},
	detail: {
		marginTop: "3%",
		fontSize: 15,
		fontFamily: "BlackHanSans_400Regular",
		opacity: 0.4,
	},
	nicknamealign: {
		marginTop: "3%",
		flexDirection: "row",
	},
	changebutton: {
		marginLeft: '15%',
		height: 30,
		width: 60,
		backgroundColor: "orange",
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonstyle: {
		height: 40,
		width: 110,
		backgroundColor: "orange",
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontFamily: "BlackHanSans_400Regular",
	},
	button: {
		height: 30,
		width: 60,
		borderRadius: 20,
		backgroundColor: "orange",
		justifyContent: "center",
		alignItems: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 20,
		alignItems: "center",
	},
	textinputstyle: {
		borderBottomWidth: 0.5,
		height: 35,
		width: 120,
		borderRadius: 5,
		paddingHorizontal: "2%",
		fontFamily: "BlackHanSans_400Regular",
		opacity: 0.4
	},
});