/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Container from "./src/components";
import { MainContextProvider } from "./src/contexts/MainContext";

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={"light-content"}
				translucent
				showHideTransition="fade"
				backgroundColor={"#006ae9"}
			/>

			<MainContextProvider>
				<Container />
			</MainContextProvider>
		</SafeAreaView>
	);
};
export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
	},
});
