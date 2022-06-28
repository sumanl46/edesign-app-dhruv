/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { LogBox, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";

import { MainContextProvider } from "./src/contexts/MainContext";
import Container from "./src/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import firestore from "@react-native-firebase/firestore";
import DeviceInfo from "react-native-device-info";

async function requestUserPermission() {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log("Authorization status:", authStatus);
	}
}

LogBox.ignoreAllLogs();

const updateToken = async token => {
	const ID = DeviceInfo.getUniqueId();
	const BRAND = DeviceInfo.getBrand();
	const NAME = DeviceInfo.getSystemName();

	const ref = await firestore()
		.collection("fcm_token")
		.doc("android")
		.collection("tokens")
		.doc(ID)
		.get();

	console.log({ ID, BRAND, NAME, token: token.token });

	if (ref.exists) {
		await firestore()
			.collection("fcm_token")
			.doc("android")
			.collection("tokens")
			.doc(ID)
			.update({
				token: token.token,
			})
			.then(res => console.log("Updated token ", { token, res }))
			.catch(error => console.log(error));
	} else {
		await firestore()
			.collection("fcm_token")
			.doc("android")
			.collection("tokens")
			.add({
				id: ID,
				brand: BRAND,
				name: NAME,
				createdAt: firestore.Timestamp,
				token: token.token,
			})
			.then(res => console.log("Success ", res))
			.catch(error => console.log(error));
	}
};

const App = () => {
	let updated = false;

	useEffect(() => {
		requestUserPermission();

		PushNotification.configure({
			// (optional) Called when Token is generated (iOS and Android)
			onRegister: function (token) {
				if (updated) {
					console.log("TOKEN:", token);
				} else {
					updated = true;

					updateToken(token);
				}
			},

			// (required) Called when a remote or local notification is opened or received
			onNotification: function (notification) {
				console.log("NOTIFICATION:", notification);

				// process the notification here

				// required on iOS only
				notification.finish(PushNotificationIOS.FetchResult.NoData);
			},
			// Android only
			senderID: "198069383748",
			// iOS only
			permissions: {
				alert: true,
				badge: true,
				sound: true,
			},
			popInitialNotification: true,
			requestPermissions: true,
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={"light-content"}
				translucent
				showHideTransition="fade"
				backgroundColor={"#3498DB"}
			/>

			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<MainContextProvider>
						<Container />
					</MainContextProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
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
