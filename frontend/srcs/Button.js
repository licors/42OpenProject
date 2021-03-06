import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Container } from './style';
import { postData } from './func_data_communication';
import axios from 'axios';
import { ip } from './data'
import { data } from './question_data';

export const NextButton = ({updateIndex, answer, index}) => {

	const opt = [['question1', 'answer1'], ['question2', 'answer2'], ['question3', 'answer3']];

	const changeAnswerToObject = () => {
		let object = {};
		answer.forEach((arr, i) => {
			object[opt[i][0]] = arr[0];
			object[opt[i][1]] = arr[1];
		});
		return (object);
	}

	const nextPressEvent = () => {
		if (index == 2) {
			console.log("In nextPressEvent");
			const object = changeAnswerToObject();
			postData(`${ip}/question`, object, updateIndex, true);
		}
		if (index != 2)
			updateIndex(true);
  	}

	const prevPressEvent = () => {
		if (index > 0)
			updateIndex(false);
	}

	return (
    <>
      <Button
        title="이전"
        style={styles.materialButtonDanger22}
        onPress={prevPressEvent}
      />
      <Button
        title="다음"
        style={styles.materialButtonDanger2}
        onPress={nextPressEvent}
      />
    </>
  );
};

// 응 클릭시 postData, 메인페이지로 화면 이동
// export const YesButton

const styles = StyleSheet.create({

  materialButtonDanger22: {
    height: 50,
    width: 88
  },
  materialButtonDanger2: {
    height: 50,
    width: 88,
    marginLeft: 71
  },
});