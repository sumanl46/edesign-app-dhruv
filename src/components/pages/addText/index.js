import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	Image,
	Dimensions,
	StatusBar,
	Pressable,
	StyleSheet,
} from "react-native";
import ViewShot from "react-native-view-shot";
import Feather from "react-native-vector-icons/Feather";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const HEADER_HEIGHT = 30;
const BOTTOM_TAB_HEIGHT = 80;
const REMAINING_HEIGHT =
	HEIGHT - (HEADER_HEIGHT + BOTTOM_TAB_HEIGHT + StatusBar.currentHeight);

export default function AddText({ navigation, route }) {
	const { uri, width, height } = route.params;
	const viewShotRef = useRef(null);

	return (
		<View style={styles.container}>
			{/* Top Header */}
			<View style={[styles.topHeader, { height: HEADER_HEIGHT }]}>
				<View>
					<Pressable onPress={() => navigation.goBack()}>
						<Feather name="chevron-left" size={30} />
					</Pressable>
				</View>

				<View>
					<Pressable onPress={() => navigation.goBack()}>
						<Feather name="check" size={30} />
					</Pressable>
				</View>
			</View>

			{/* Middle View Content */}
			<View
				style={[
					styles.middleContentContainer,
					{
						height: REMAINING_HEIGHT,
					},
				]}>
				<View
					style={{
						position: "relative",
						width: width,
						height: height,
						backgroundColor: "lightgrey",
					}}>
					<ViewShot
						ref={viewShotRef}
						onCapture={() => {}}
						captureMode="mount"
						options={{
							format: "png",
							quality: 0.9,
							result: "data-uri",
						}}
						style={{
							flex: 1,
							borderWidth: 4,
							borderColor: "blue",
						}}>
						<View
							style={{
								position: "relative",
								width: "100%",
								height: "100%",
								backgroundColor: "skyblue",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Image
								source={{ uri }}
								resizeMethod="auto"
								resizeMode="cover"
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</View>
					</ViewShot>
				</View>
			</View>

			{/* Bottom Tabs Bar */}
			<View
				style={[
					styles.bottomTabsContainer,
					{ height: BOTTOM_TAB_HEIGHT },
				]}>
				{/* Colors Grids */}
				<View
					style={{
						position: "relative",
						width: "100%",
						height: "40%",
						borderBottomWidth: 1,
						borderColor: "#F1F3F4",
					}}></View>

				<View
					style={{
						position: "relative",
						width: "100%",
						height: "60%",
					}}></View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
		backgroundColor: "#FFF",
	},
	topHeader: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	middleContentContainer: {
		position: "relative",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomTabsContainer: {
		position: "relative",
		width: "100%",
		borderTopWidth: 1,
		borderColor: "#F1F3F4",
		backgroundColor: "#F1F3F470",
		flexDirection: "row",
		justifyContent: "flex-start",
		padding: 0,
	},
	tab: {
		width: "25%",
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	tabTxt: {
		marginTop: 4,
		textAlign: "center",
		fontSize: 12,
		fontWeight: "600",
	},
});
