/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";

const App = () => {
	return (
		<SafeAreaView>
			<StatusBar
				barStyle={"light-content"}
				translucent
				showHideTransition="fade"
				backgroundColor={"#006ae9"}
			/>

			<View style={styles.container}>
				<Text>Welcome</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		backgroundColor: "#FFFFFF",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default App;
