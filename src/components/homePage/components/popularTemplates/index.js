import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";

export default function PopularsTemplates() {
	const [images, setImages] = useState([]);

	const loadImages = async () => {
		const __images = [
			{
				url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWQPTpIrUXsndB_-G8fybL1_lja4iSvBEHw&usqp=CAU",
				loaded: false,
			},
			{
				url: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
				loaded: false,
			},
			{
				url: "https://designsmaz.com/wp-content/uploads/2016/03/Cat-with-Sunglasses-Background.jpg",
				loaded: false,
			},
			{
				url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWQPTpIrUXsndB_-G8fybL1_lja4iSvBEHw&usqp=CAU",
				loaded: false,
			},
			{
				url: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
				loaded: false,
			},
			{
				url: "https://designsmaz.com/wp-content/uploads/2016/03/Cat-with-Sunglasses-Background.jpg",
				loaded: false,
			},
			{
				url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBWQPTpIrUXsndB_-G8fybL1_lja4iSvBEHw&usqp=CAU",
				loaded: false,
			},
			{
				url: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
				loaded: false,
			},
			{
				url: "https://designsmaz.com/wp-content/uploads/2016/03/Cat-with-Sunglasses-Background.jpg",
				loaded: false,
			},
		];

		await setImages([...__images]);
	};

	useEffect(() => {
		loadImages();
	}, []);

	return (
		<View style={[styles._, styles.container]}>
			<View
				style={[
					styles._,
					{
						marginBottom: 15,
					},
				]}>
				<Text
					style={{
						fontSize: 15,
						fontWeight: "700",
						color: "#000000",
						textAlign: "left",
						paddingHorizontal: 5,
					}}>
					Popular Templates
				</Text>
			</View>

			{/* Horizontal ScrollView */}
			<View style={[styles._, { height: 70, overflow: "hidden" }]}>
				<ScrollView
					style={{ flex: 1 }}
					showsHorizontalScrollIndicator={false}
					horizontal>
					{images.length > 0 &&
						images.map((image, index) => (
							<TouchableOpacity
								style={[
									styles.box,
									{
										marginLeft:
											index > 0 &&
											index <= images.length - 1
												? 20
												: 0,
									},
								]}
								onPress={() => console.log(index)}
								activeOpacity={0.8}
								key={index}>
								{/* When Image is not loaded */}
								{image.loaded ? null : (
									<View
										style={{
											position: "absolute",
											width: "100%",
											height: "100%",
											left: 0,
											top: 0,
											zIndex: 10,
											backgroundColor: "#F1F3F4",
										}}></View>
								)}

								{/* Image */}
								<Image
									source={{
										uri: image.url,
									}}
									onLoad={() => {
										const __images = [...images];
										__images[index].loaded = true;

										setImages(__images);
									}}
									resizeMethod="auto"
									resizeMode="cover"
									style={{ width: "100%", height: "100%" }}
								/>
							</TouchableOpacity>
						))}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	_: {
		position: "relative",
		width: "100%",
	},
	container: {
		height: "auto",
		overflow: "hidden",
		paddingHorizontal: 20,
	},
	box: {
		position: "relative",
		width: 70,
		height: 70,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: "#F1F3F4",
		overflow: "hidden",
	},
});
