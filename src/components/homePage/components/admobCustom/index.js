import React, { useState, useEffect } from "react";
import {
	View,
	Image,
	Linking,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

export default function AdmobView() {
	const [image, setImage] = useState({
		url: null,
		loaded: false,
		adUrl: null,
	});

	const loadAdImage = async () => {
		const __image = {
			url: "https://designsmaz.com/wp-content/uploads/2016/03/Cat-with-Sunglasses-Background.jpg",
			loaded: false,
			adUrl: "https://designsmaz.com/wp-content/uploads/2016/03/Cat-with-Sunglasses-Background.jpg",
		};

		await setImage(__image);
	};

	useEffect(() => {
		loadAdImage();
	}, []);

	if (image.url) {
		return (
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
					source={{
						uri: image.url,
					}}
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
						const canOpen = await Linking.canOpenURL(image.adUrl);

						if (canOpen) {
							Linking.openURL(image.adUrl);
						} else {
							console.log(canOpen);
						}
					}}
					activeOpacity={0.8}></TouchableOpacity>
			</View>
		);
	} else {
		return <></>;
	}
}

const styles = StyleSheet.create({
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
