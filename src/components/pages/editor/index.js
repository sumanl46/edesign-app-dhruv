import React from "react";
import {
	Text,
	View,
	Image,
	Pressable,
	Dimensions,
	StatusBar,
	TouchableOpacity,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";
import ViewShot, { captureRef } from "react-native-view-shot";
import ImagePicker from "react-native-image-crop-picker";

import { styles } from "./assets/styles";
import SmallImage from "./components/SmallImage";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const HEADER_HEIGHT = 50;
const BOTTOM_TAB_HEIGHT = 60;
const REMAINING_HEIGHT =
	HEIGHT - (HEADER_HEIGHT + BOTTOM_TAB_HEIGHT + StatusBar.currentHeight);

const calcDiff = (w, h) => {
	let diff = w - h;
	let greater = diff >= 0 ? "W" : "H"; // W or H
	let W = 0;
	let H = 0;

	if (diff >= 0) {
		W = WIDTH;
		const pr = (diff / w) * 100;
		H = WIDTH - (pr / 100) * WIDTH;
	} else {
		if (-diff >= REMAINING_HEIGHT) {
			W = (80 / 100) * WIDTH;
			H = REMAINING_HEIGHT;
		} else {
			W = WIDTH;
			const pr = (-diff / h) * 100;
			H = WIDTH + (pr / 100) * WIDTH;
		}
	}

	return { W, H, greater };
};

export default function EditorPage({ navigation, route }) {
	const viewShotRef = React.useRef(null);

	const [smallImage, setSmallImage] = React.useState(null);

	const [imageData, setImageData] = React.useState({
		width: 0,
		height: 0,
		uri: null,
	});

	const SMALL_IMAGE = require("./assets/images/img_1.jpg");
	const BIG_IMAGE = require("./assets/images/img_7.jpg");

	const calcImgSize = async () => {
		const { width, height, uri } = await Image.resolveAssetSource(
			BIG_IMAGE,
		);

		// Image.getSize(uri, (width, height) => {
		// 	console.log(width, height);
		// });

		const data = await calcDiff(width, height);

		setImageData({
			...imageData,
			width: data.W,
			height: data.H,
			uri: uri,
		});
	};

	const selectSmallImage = async () => {
		await ImagePicker.openPicker({
			width: 400,
			height: 400,
			cropping: true,
		}).then(image => {
			setSmallImage(image.path);
		});
	};

	const captureLayout = () => {
		captureRef(viewShotRef, {
			format: "png",
			quality: 0.9,
			result: "data-uri",
		})
			.then(uri => {
				navigation.navigate("AddText", {
					uri,
					width: imageData.width,
					height: imageData.height,
				});
			})
			.catch(error => console.log(error));
	};

	React.useEffect(() => {
		calcImgSize();
	}, []);

	return (
		<View style={styles.container}>
			{/* Top Header */}
			<View style={[styles.topHeader, { height: HEADER_HEIGHT }]}>
				<View>
					<Pressable onPress={() => navigation.goBack()}>
						<Feather name="arrow-left" size={30} />
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
						width: imageData.width,
						height: imageData.height,
						backgroundColor: "lightgrey",
					}}>
					{/* Absolute */}
					<View
						style={{
							position: "absolute",
							width: "100%",
							height: 2,
							zIndex: 20,
							left: 0,
							top: 50,
							backgroundColor: "#000000",
							// shadowColor: "blue",
							// shadowOpacity: 1,
							// shadowRadius: 50,
							// shadowOffset: {
							// 	width: -40,
							// 	height: -40,
							// },
							elevation: 100,
						}}></View>

					<ViewShot
						ref={viewShotRef}
						onCapture={() => {}}
						captureMode="mount"
						options={{
							format: "png",
							quality: 0.9,
							result: "data-uri",
						}}
						style={{ flex: 1 }}>
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
								source={{ uri: imageData.uri }}
								resizeMethod="auto"
								resizeMode="cover"
								style={{
									width: "100%",
									height: "100%",
								}}
							/>

							{smallImage != null && (
								<SmallImage image={smallImage} />
							)}
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
				<TouchableOpacity
					style={styles.tab}
					activeOpacity={0.8}
					onPress={captureLayout}>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Feather name="type" size={20} />

						<Text style={styles.tabTxt}>Add Text</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.tab}
					activeOpacity={0.8}
					onPress={() => alert("Pressed")}>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Feather name="image" size={20} />

						<Text style={styles.tabTxt}>Set Image</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.tab}
					activeOpacity={0.8}
					onPress={() => {
						if (smallImage != null) {
							setSmallImage(null);
						} else {
							selectSmallImage();
						}
					}}>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						{smallImage ? (
							<Feather name="x" size={20} />
						) : (
							<Feather name="plus" size={20} />
						)}

						<Text style={styles.tabTxt}>
							{smallImage ? "Remove" : "Add Image"}
						</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.tab}
					activeOpacity={0.8}
					onPress={() => alert("Pressed")}>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Feather name="check" size={20} />

						<Text style={styles.tabTxt}>Save</Text>
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
}
