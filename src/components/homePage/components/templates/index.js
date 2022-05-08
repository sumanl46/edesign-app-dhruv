import React, { useState, useContext } from "react";
import {
	Text,
	View,
	Image,
	Pressable,
	StatusBar,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
} from "react-native";

import firestore from "@react-native-firebase/firestore";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const SCROLLVIEW_HEIGHT = HEIGHT - STATUSBAR_HEIGHT - 20; // 20 is for padding vertical of 10-10
const SCROLLVIEW_WIDTH = WIDTH - 40; // 40 is for padding horizontal of 20-20
const SCROLLVIEW_WIDTH_HALF = SCROLLVIEW_WIDTH / 2;

// const COLOR = "#006ae9";

export default function TemplatesContainer({ navigation, showTabsModal }) {
	const [allTemplates, setAllTemplates] = useState([]);

	const loadTemplates = async () => {
		const templates = await firestore()
			.collection("templates")
			.limit(30)
			.orderBy("createdAt", "desc")
			.get();

		if (templates.empty) return;
		else {
			setAllTemplates(
				templates.docs.map(doc => ({
					...doc.data(),
					id: doc.id,
					ad: false,
				})),
			);
		}
	};

	React.useEffect(() => {
		loadTemplates();
	}, []);

	return (
		<View style={styles.container}>
			{/* Title */}
			<View
				style={{
					position: "relative",
					width: "100%",
					height: 50,
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					paddingVertical: 10,
					paddingHorizontal: 25,
				}}>
				<View
					style={{
						position: "relative",
					}}>
					<Text
						style={{
							fontSize: 15,
							fontWeight: "700",
							color: "#000000",
							textAlign: "left",
						}}>
						Templates
					</Text>

					{/* Absolute Line Under Title Text */}
					<View
						style={{
							position: "relative",
							marginTop: 7,
							marginLeft: 2,
							width: 40,
							height: 4,
							backgroundColor: "#888",
							borderRadius: 12,
						}}></View>
				</View>

				{/* Bars */}
				<View
					style={{
						position: "relative",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<Pressable onPress={showTabsModal}>
						<View
							style={{
								position: "relative",
								flexDirection: "column",
								alignItems: "flex-end",
							}}>
							<View style={[styles.bar, { width: 23 }]}></View>
							<View
								style={[
									styles.bar,
									{ width: 18, marginVertical: 3 },
								]}></View>
							<View style={[styles.bar, { width: 13 }]}></View>
						</View>
					</Pressable>
				</View>
			</View>

			{/* Templates ScrollView */}
			<View
				style={{
					position: "relative",
					width: "100%",
					height: SCROLLVIEW_HEIGHT - 50,
					paddingHorizontal: 15,
				}}>
				<ScrollView
					style={{ flex: 1 }}
					nestedScrollEnabled
					showsVerticalScrollIndicator={false}>
					<View style={styles.templates}>
						{allTemplates.map(template =>
							template.ad ? (
								<View style={styles.adBox} key={template.id}>
									<View style={styles.box}>
										<Image
											source={{ uri: template.image }}
											resizeMethod="auto"
											resizeMode="cover"
											style={{
												position: "absolute",
												left: 0,
												top: 0,
												width: "100%",
												height: "100%",
												zIndex: 10,
											}}
										/>

										<TouchableOpacity
											activeOpacity={0.7}
											onPress={() => {}}
											style={{
												position: "relative",
												zIndex: 20,
												width: "100%",
												height: "100%",
											}}></TouchableOpacity>
									</View>
								</View>
							) : (
								<View
									style={[styles.templateBox]}
									key={template.id}>
									<View style={styles.box}>
										<Image
											source={{ uri: template.image }}
											resizeMethod="auto"
											resizeMode="cover"
											style={{
												position: "absolute",
												left: 0,
												top: 0,
												width: "100%",
												height: "100%",
												zIndex: 10,
											}}
										/>

										<TouchableOpacity
											activeOpacity={0.7}
											onPress={() => {
												navigation.navigate("Editor", {
													template,
												});
											}}
											style={{
												position: "relative",
												zIndex: 20,
												width: "100%",
												height: "100%",
											}}></TouchableOpacity>
									</View>
								</View>
							),
						)}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		marginTop: 20,
		width: "100%",
		height: SCROLLVIEW_HEIGHT,
		overflow: "hidden",
		padding: 0,
		margin: 0,
	},
	templates: {
		position: "relative",
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
	templateBox: {
		position: "relative",
		width: "50%",
		height: SCROLLVIEW_WIDTH_HALF,
		padding: 5,
	},
	adBox: {
		position: "relative",
		width: "100%",
		height: SCROLLVIEW_WIDTH_HALF,
		padding: 5,
	},
	box: {
		position: "relative",
		width: "100%",
		height: "100%",
		backgroundColor: "#F1F3F4",
		borderRadius: 8,
		padding: 0,
		margin: 0,
		borderWidth: 1,
		borderColor: "#88888830",
		overflow: "hidden",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	bar: {
		position: "relative",
		borderRadius: 4,
		backgroundColor: "#00000090",
		height: 3,
	},
});
