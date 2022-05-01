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
import ViewShot from "react-native-view-shot";
import { styles } from "./assets/styles";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const HEADER_HEIGHT = 50;
const BOTTOM_TAB_HEIGHT = 60;
const REMAINING_HEIGHT =
	HEIGHT - (HEADER_HEIGHT + BOTTOM_TAB_HEIGHT + StatusBar.currentHeight);

const absDiff = n => {
	return n < 0 ? -n : n;
};

const calcDiff = (w, h) => {
	let diff = w - h;
	let greater = diff >= 0 ? "W" : "H"; // W or H
	let W = 0;
	let H = 0;

	if (diff >= 0) {
		if (diff <= REMAINING_HEIGHT) {
			W = WIDTH;
			H = (absDiff(diff) / w) * 100 + W;
		} else if (diff >= REMAINING_HEIGHT) {
			W = WIDTH;
			H = (REMAINING_HEIGHT / absDiff(diff)) * 100 + W;
		}
	} else {
		if (diff >= -REMAINING_HEIGHT) {
			W = WIDTH;
			H = (absDiff(diff) / w) * 100 + W;
		} else if (diff <= -REMAINING_HEIGHT) {
			W = WIDTH;
			H = (REMAINING_HEIGHT / absDiff(diff)) * 100 + W;
		}
	}
};

export default function EditorPage({ navigation, route }) {
	const viewShotRef = React.useRef(null);

	const [imageData, setImageData] = React.useState({
		width: 0,
		height: 0,
		uri: null,
	});

	const BIG_IMAGE = require("./assets/images/img_3.jpg");
	const SMALL_IMAGE = require("./assets/images/img_1.jpg");

	const calcImgSize = () => {
		const { width, height, uri } = Image.resolveAssetSource(SMALL_IMAGE);

		// Image.getSize(uri, (width, height) => {
		// 	console.log(width, height);
		// });

		setImageData({ width, height, uri });
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
						width: "100%",
						height: WIDTH,
						backgroundColor: "lightgrey",
					}}>
					<ViewShot
						ref={viewShotRef}
						onCapture={() => {}}
						captureMode="mount"
						options={{ format: "png", quality: 0.9 }}
						style={{ flex: 1 }}>
						<View
							onLayout={({ nativeEvent }) =>
								console.log(nativeEvent.layout)
							}
							style={{ flex: 1, backgroundColor: "skyblue" }}>
							<Image
								source={SMALL_IMAGE}
								resizeMethod="auto"
								resizeMode="contain"
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
					onPress={() => alert("Pressed")}>
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Feather name="x" size={20} />

						<Text style={styles.tabTxt}>Remove</Text>
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
