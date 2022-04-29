import React, { useRef, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	DrawerLayoutAndroid,
} from "react-native";

import HomePage from "./homePage";
import { MainContext } from "../contexts/MainContext";
import { SearchPage } from "./pages";

const Stack = createNativeStackNavigator();
const WIDTH = Dimensions.get("screen").width;
const DRAWER_WIDTH = (70 / 100) * WIDTH; // i.e 70% of the screen width

export default function Container() {
	const drawer = useRef(null);

	const navigation = useNavigation();

	const { drawerOpened, tabs, appDatas } = useContext(MainContext);
	const [appData, setAppData] = appDatas;

	const navigationView = () => (
		<View style={[styles.container, styles.navigationContainer]}>
			<View style={styles.drawerTitleCont}>
				<Text style={styles.drawerTitle}>All Templates</Text>
			</View>

			{/* Templates Tabs */}
			<View
				style={{
					position: "relative",
					width: "100%",
					height: "90%",
					overflow: "hidden",
				}}>
				<ScrollView style={{ flex: 1 }}>
					{tabs.map((e, i) => (
						<TouchableOpacity
							key={i}
							activeOpacity={0.7}
							onPress={async () => {
								await navigation.navigate("Search", {
									tab: e.key,
								});

								drawer.current.closeDrawer();
							}}
							style={{
								width: "100%",
								height: "auto",
								paddingVertical: 12,
								paddingHorizontal: 25,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								borderBottomWidth: 1,
								borderBottomColor: "lightgrey",
							}}>
							<Text
								style={{
									fontSize: 18,
									fontWeight: "600",
									color: "#000000AA",
								}}>
								{e.title}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</View>
	);

	useEffect(() => {
		if (drawerOpened) {
			drawer.current.openDrawer();
		} else {
			drawer.current.closeDrawer();
		}
	}, [drawerOpened]);

	return (
		<>
			<DrawerLayoutAndroid
				ref={drawer}
				drawerWidth={DRAWER_WIDTH}
				drawerBackgroundColor={"#F1F3F4"}
				drawerPosition={"left"}
				onDrawerClose={() => {
					setAppData({
						...appData,
						drawerOpened: false,
					});
				}}
				renderNavigationView={navigationView}>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomePage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Search"
						component={SearchPage}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</DrawerLayoutAndroid>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	navigationContainer: {
		backgroundColor: "#ecf0f1",
	},
	drawerTitleCont: {
		position: "relative",
		width: "100%",
		height: "10%",
		paddingHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "grey",
	},
	drawerTitle: {
		fontSize: 20,
		textAlign: "left",
		fontWeight: "700",
		color: "#000",
		paddingHorizontal: 10,
	},
});
