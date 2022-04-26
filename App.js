/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { MainContextProvider } from "./src/contexts/MainContext";
import Container from "./src/components";

const App = () => {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={"light-content"}
				translucent
				showHideTransition="fade"
				backgroundColor={"#006ae9"}
			/>

			<NavigationContainer>
				<MainContextProvider>
					<Container />
				</MainContextProvider>
			</NavigationContainer>
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
