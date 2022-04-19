import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

const COLOR = "#006ae9";

const HomePage = () => {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			nestedScrollEnabled
			style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				<Text style={{ color: COLOR }}>This is awesome</Text>
			</View>
		</ScrollView>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
