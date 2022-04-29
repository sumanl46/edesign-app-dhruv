import React, { useState, useEffect } from "react";
import {
	View,
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

import firestore from "@react-native-firebase/firestore";

export default function AdmobView() {
	const [image, setImage] = useState(null);

	const loadAdImage = async () => {
		const __image = await firestore()
			.collection("ads")
			.where("pinned", "==", true)
			.get();

		if (__image.empty) {
			return;
		} else {
			setImage({ ...__image.docs[0].data(), id: __image.docs[0].id });
		}
	};

	useEffect(() => {
		loadAdImage();
	}, []);

	if (image) {
		console.log(image);

		return (
			<View style={styles._}>
				<View style={styles.container}>
					{/* Absolute view before the image is loaded */}
					{image.loaded ? null : (
						<View
							style={[
								styles.absolute,
								{
									backgroundColor: "#F1F3F4",
									zIndex: 10,
								},
							]}></View>
					)}

					<Image
						source={{ uri: image.thumbnail }}
						onLoad={() => {
							setImage({
								...image,
								loaded: true,
							});
						}}
						resizeMethod="auto"
						resizeMode="cover"
						style={{ width: "100%", height: "100%" }}
					/>

					{/* Button */}
					<TouchableOpacity
						style={[
							styles.absolute,
							{ backgroundColor: "transparent", zIndex: 20 },
						]}
						onPress={async () => {
							const canOpen = await Linking.canOpenURL(
								image.link,
							);

							if (canOpen) {
								Linking.openURL(image.link);
							} else {
								console.log(canOpen);
							}
						}}
						activeOpacity={0.8}></TouchableOpacity>
				</View>
			</View>
		);
	} else {
		return <></>;
	}
}

const styles = StyleSheet.create({
	_: {
		position: "relative",
		width: "100%",
		height: "auto",
		paddingHorizontal: 20,
	},
	container: {
		position: "relative",
		width: "100%",
		height: 100,
		overflow: "hidden",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#F1F3F4",
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	absolute: {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: 0,
		top: 0,
	},
});
