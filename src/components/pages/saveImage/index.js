import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Dimensions,
	StatusBar,
	TouchableOpacity,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Share from "react-native-share";
import RNFetchBlob from "react-native-fetch-blob";
import { MainContext } from "../../../contexts/MainContext";

const STATUSBAR_H = StatusBar.currentHeight;
const { height: HEIGHT } = Dimensions.get("screen");

const TOPNAV_HEIGHT = 35;
const BOTTOMNAV_HEIGHT = 90;
const MAIN_CONT_HEIGHT =
	HEIGHT - (BOTTOMNAV_HEIGHT + TOPNAV_HEIGHT + STATUSBAR_H);

export default function SaveImage({ navigation, route }) {
	const { mainData, textData } = React.useContext(MainContext);

	const [contextData, setContextData] = mainData;
	const [textProps, setTextProps] = textData;

	const { uri, template } = route.params;

	const [saved, setSaved] = useState(false);

	const shareImage = async () => {
		const shareOptions = {
			message: "",
			url: "data:image/png;base64," + uri,
		};

		try {
			const response = await Share.open(shareOptions);

			console.log(JSON.stringify(response));
		} catch (error) {
			console.log(error);
		}
	};

	const addImage = async ({ path }) => {
		await RNFetchBlob.fs.createFile(path, uri, "base64").then(async () => {
			await RNFetchBlob.fs
				.scanFile([{ path, mime: "image/png" }])
				.then(() => {
					setSaved(true);
				})
				.catch(error => console.log(error));
		});
	};

	const saveImage = async () => {
		const { imgId } = template;
		const fodlerPath = "/storage/emulated/0/Edesign";
		const fileName = fodlerPath + "/" + imgId + ".png";

		await RNFetchBlob.fs.isDir(fodlerPath).then(async isDir => {
			if (isDir) {
				addImage({ path: fileName });
			} else {
				await RNFetchBlob.fs.mkdir(fodlerPath).then(() => {
					addImage({ path: fileName });
				});
			}
		});
	};

	useEffect(() => {
		navigation.addListener("beforeRemove", e => {
			// Prevent default behavior of leaving the screen
			setContextData({
				...contextData,
				resizableImage: null,
				overImage: null,
			});

			setTextProps([]);
		});

		return () => {
			navigation.removeListener("beforeRemove", () => {
				console.log("Removed");
			});
		};
	}, [navigation]);

	return (
		<View style={styles.container}>
			{/* Absolute view after the image is saved */}
			{saved && (
				<View
					style={[
						StyleSheet.absoluteFillObject,
						{ zIndex: 20, justifyContent: "flex-end" },
					]}>
					<View
						style={[styles.bottomBar, { backgroundColor: "#FFF" }]}>
						<View style={[styles.btn]}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Feather name="check" size={18} color="green" />

								<Text
									style={[
										styles.txt,
										{ marginLeft: 15, color: "#3498DB" },
									]}>
									Saved
								</Text>
							</View>
						</View>

						<TouchableOpacity
							style={[styles.btn, { backgroundColor: "#F1F3F4" }]}
							activeOpacity={0.7}
							onPress={() => navigation.navigate("Home")}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Feather
									name="chevron-left"
									size={24}
									color="#000"
								/>

								<Text
									style={[
										styles.txt,
										{ marginLeft: 15, color: "#000" },
									]}>
									Go to HomePage
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			)}

			<View style={styles.topBar}>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					activeOpacity={0.6}>
					<Feather name="chevron-left" size={26} color="#000" />
				</TouchableOpacity>
			</View>

			<View style={styles.content}>
				<Image
					source={{ uri: "data:image/png;base64," + uri }}
					resizeMethod="auto"
					resizeMode="contain"
					style={{ width: "100%", height: "100%" }}
				/>
			</View>

			<View style={styles.bottomBar}>
				<TouchableOpacity
					style={[
						styles.btn,
						{
							borderBottomWidth: 1,
							borderBottomColor: "#00000010",
						},
					]}
					activeOpacity={0.7}
					onPress={saveImage}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Feather name="save" size={18} color="#000" />

						<Text
							style={[
								styles.txt,
								{ marginLeft: 15, color: "#000" },
							]}>
							Save
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.btn]}
					activeOpacity={0.7}
					onPress={shareImage}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Feather name="share" size={18} color="#3498DB" />

						<Text
							style={[
								styles.txt,
								{ marginLeft: 15, color: "#3498DB" },
							]}>
							Share
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	topBar: {
		position: "relative",
		width: "100%",
		height: TOPNAV_HEIGHT,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
	},
	content: {
		position: "relative",
		width: "100%",
		height: MAIN_CONT_HEIGHT,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomBar: {
		position: "relative",
		width: "100%",
		height: BOTTOMNAV_HEIGHT,
		borderTopWidth: 1,
		borderTopColor: "#00000020",
	},
	btn: {
		position: "relative",
		width: "100%",
		height: "50%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	txt: {
		fontWeight: "600",
		fontSize: 15,
	},
});
