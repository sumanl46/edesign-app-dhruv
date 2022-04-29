import React from "react";
import {
	Text,
	View,
	Image,
	Modal,
	Linking,
	FlatList,
	Pressable,
	StyleSheet,
	Dimensions,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./assets/styles/styles";
import AdmobView from "./components/admobCustom";
import PopularsTemplates from "./components/popularTemplates";
import TemplatesContainer from "./components/templates";

import firestore from "@react-native-firebase/firestore";

const { width: WIDTH } = Dimensions.get("screen");

const HomePage = ({ navigation }) => {
	const [newsData, setNewsData] = React.useState([]);
	const [showModal, setShowModal] = React.useState(false);

	const loadNewsData = async () => {
		const news = await firestore().collection("news").get();

		if (news.empty) {
			return;
		} else {
			setNewsData(news.docs.map(doc => ({ ...doc.data(), id: doc.id })));
		}
	};

	React.useEffect(() => {
		loadNewsData();
	}, []);

	const NewsItem = ({ item }) => {
		return (
			<View
				style={{
					position: "relative",
					padding: 10,
					width: "50%",
					height: WIDTH / 2,
				}}>
				<View
					style={{
						position: "relative",
						flex: 1,
						borderRadius: 10,
						borderWidth: 1,
						borderColor: "lightgrey",
						justifyContent: "center",
						alignItems: "center",
						overflow: "hidden",
					}}>
					<Image
						source={{ uri: item.thumbnail }}
						resizeMethod="auto"
						resizeMode="cover"
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							left: 0,
							top: 0,
							zIndex: 10,
						}}
					/>

					<TouchableOpacity
						activeOpacity={0.8}
						style={{
							position: "relative",
							width: "100%",
							height: "100%",
							zIndex: 20,
						}}
						onPress={async () => {
							const canBeOpened = await Linking.canOpenURL(
								item.url,
							);

							if (canBeOpened) {
								await Linking.openURL(item.url);
							} else {
								return;
							}
						}}
					/>
				</View>
			</View>
		);
	};

	const ModalView = () => {
		return (
			<View style={styles.modal}>
				{/* Close modal when clicking outside the view box */}
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => setShowModal(false)}
					style={[
						StyleSheet.absoluteFillObject,
						{
							zIndex: 20,
						},
					]}></TouchableOpacity>

				<View
					style={[
						styles.modalContent,
						{
							zIndex: 30,
						},
					]}>
					<View style={styles.modalHeading}>
						<View
							style={{
								position: "relative",
								flexDirection: "column",
								alignItems: "center",
							}}>
							<Text style={styles.modalHeadingText}>
								All News Sources
							</Text>

							<View style={styles.modalHeadingBar}></View>
						</View>
					</View>

					<View
						style={{
							position: "relative",
							width: "100%",
							height: "80%",
						}}>
						<FlatList
							numColumns={2}
							showsVerticalScrollIndicator={false}
							data={newsData}
							keyExtractor={item => item.id}
							renderItem={NewsItem}
						/>
					</View>
				</View>
			</View>
		);
	};

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			nestedScrollEnabled
			style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
			<View style={styles.container}>
				{/* Top Part */}
				<View style={[styles.box, styles.searchContainer]}>
					{/* App logo */}
					<View style={styles.appLogo}>
						<Image
							source={require("./assets/images/app_image.jpg")}
							resizeMethod="auto"
							resizeMode="contain"
							style={{ width: "100%", height: "100%" }}
						/>
					</View>

					{/* Search box */}
					<View style={styles.searchBox}>
						<ImageBackground
							style={{
								flex: 1,
							}}
							source={require("./assets/images/alexander-andrews-yOIT88xWkbg-unsplash.jpg")}
							// "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
							resizeMethod="scale"
							resizeMode="cover">
							{/* Black Background */}
							<View
								style={{
									position: "absolute",
									width: "100%",
									height: "100%",
									left: 0,
									top: 0,
									zIndex: 10,
									backgroundColor: "#00000070",
								}}></View>

							<View
								style={{
									flex: 1,
									zIndex: 20,
									paddingVertical: 12,
									paddingHorizontal: 20,
									flexDirection: "row",
									justifyContent: "center",
									alignItems: "flex-end",
								}}>
								{/* Search */}
								<TouchableOpacity
									style={styles.search}
									activeOpacity={0.9}
									onPress={() =>
										navigation.navigate("Search", {
											tab: "",
										})
									}>
									{/* Search Icon Container */}
									<View
										style={{
											position: "relative",
											flexDirection: "row",
											justifyContent: "center",
											alignItems: "center",
										}}>
										{/* Search Icon */}
										<Ionicons name="search" size={24} />
									</View>

									{/* Text */}
									<Text
										style={{
											color: "#000",
											fontSize: 15,
											fontWeight: "600",
											marginLeft: 20,
										}}>
										Search Templates
									</Text>
								</TouchableOpacity>
							</View>
						</ImageBackground>
					</View>
				</View>

				{/* Bottom Part */}
				<View style={styles.box}>
					{/* Popular Templates */}
					<PopularsTemplates />

					{/* Admob Custom */}
					<AdmobView />

					{/* Remove Background Link && News Show Button */}
					<View
						style={{
							position: "relative",
							width: "100%",
							height: "auto",
							marginTop: 20,
							paddingHorizontal: 20,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}>
						<Pressable
							onPress={async () => {
								const __url = "https://www.remove.bg/";
								const canOpen = await Linking.canOpenURL(__url);

								if (canOpen) {
									Linking.openURL(__url);
								} else {
									return;
								}
							}}
							style={{
								width: "60%",
								marginRight: "4%",
								height: 50,
								borderRadius: 12,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#3498DB",
							}}>
							<Text
								style={{
									color: "white",
									fontWeight: "700",
									fontSize: 14,
								}}>
								Remove Background
							</Text>
						</Pressable>

						<Pressable
							onPress={() => setShowModal(true)}
							style={{
								width: "36%",
								height: 50,
								borderRadius: 12,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#3498DB",
							}}>
							<Text
								style={{
									color: "white",
									fontWeight: "700",
									fontSize: 14,
								}}>
								News
							</Text>
						</Pressable>
					</View>

					{/* All Templates */}
					<TemplatesContainer />
				</View>
			</View>

			{/* News Modal */}
			<Modal
				transparent
				animationType="fade"
				onRequestClose={() => setShowModal(false)}
				visible={showModal}>
				<ModalView />
			</Modal>
		</ScrollView>
	);
};

export default HomePage;
