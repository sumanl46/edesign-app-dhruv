import React from "react";
import { Text, View, FlatList, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const renderItem = ({ item }) => {
	return (
		<View style={{ width: WIDTH }}>
			<Text>{item}</Text>
			{/* {item.map((e, i) => (
				<Text key={i}>{e}</Text>
			))} */}
		</View>
	);
};

export default function TabContent({ clr }) {
	return (
		<View
			style={{
				position: "relative",
				width: WIDTH - 40,
				backgroundColor: clr,
			}}>
			<FlatList
				scrollEnabled={false}
				bounces
				renderItem={renderItem}
				data={[1, 2, 3, 4]}
			/>
		</View>
	);
	e;
}
