import { StyledImage } from "../style";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { selectFood } from "../func/func_data_communication";
import { ip } from "../data/data";

export const OneOtherOption = ({ image, navigation, imgStyle }) => {
  const [ismodalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!ismodalVisible);
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={toggleModal} styled={{ padding: 10 }}>
          <StyledImage source={image} style={imgStyle} />
        </TouchableOpacity>
        <Modal isVisible={ismodalVisible} hasBackdrop={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={toggleModal} style={styles.button_cancle}>
                <Text
                  style={{
                    color: "white",
                    fontFamily: "BlackHanSans_400Regular",
                  }}
                >
                  취소
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="선택"
                onPress={() => {
                  selectFood(`${ip}/question`, "덮밥", navigation);
                }}
                style={styles.button_decision}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "BlackHanSans_400Regular",
                  }}
                >
                  결정
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
  },
  button_decision: {
    margin: 10,
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  button_cancle: {
    margin: 10,
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
});