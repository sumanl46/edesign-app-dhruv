import React from "react";
import {
	View,
	Text,
	ScrollView,
	ImageBackground,
	TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./assets/styles/styles";
import AdmobView from "./components/admobCustom";
import PopularsTemplates from "./components/popularTemplates";
import CustomScrollView from "./components/scrollView";

const COLOR = "#006ae9";

const HomePage = () => {
	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			nestedScrollEnabled
			style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
			<View style={styles.container}>
				{/* Top Part */}
				<View style={[styles.box, styles.searchContainer]}>
					{/* App logo */}
					<View style={styles.appLogo}>
						<Text>App Logo Goes Here</Text>
					</View>

					{/* Search box */}
					<View style={styles.searchBox}>
						<ImageBackground
							style={{
								flex: 1,
							}}
							source={{
								uri: "https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
							}}
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
									onPress={() => {}}>
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

					{/* All Templates */}
					<CustomScrollView />
				</View>
			</View>
		</ScrollView>
	);
};

export default HomePage;
