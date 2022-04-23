import React, { useState, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Dimensions,
	StatusBar,
} from "react-native";
import HeaderTabs from "./headerTabs";
import TabContent from "./tabContent";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function CustomScrollView() {
	const [focused, setFocused] = useState(0);
	const [headerTabs, setHeaderTabs] = useState([]);

	const loadTabs = async () => {
		const tabs = [
			{
				title: "Diwali",
				key: "diwali",
			},
			{
				title: "Holi",
				key: "holi",
			},
			{
				title: "New Year",
				key: "new_year",
			},
			{
				title: "Birthday",
				key: "birthday",
			},
			{
				title: "MCC",
				key: "mcc",
			},
			{
				title: "Chatth",
				key: "chatth",
			},
		];

		setHeaderTabs([...tabs]);
	};

	const onScroll = ({ nativeEvent }) => {
		const index = Math.round(nativeEvent.contentOffset.x / (WIDTH - 80));

		console.log(index <= 0 ? 0 : index);
		setFocused(index <= 0 ? 0 : index);
	};

	useEffect(() => {
		loadTabs();
	}, []);

	return (
		<View style={styles.container}>
			{/* Headers */}
			{headerTabs.length > 0 ? (
				<HeaderTabs focused={focused} tabs={headerTabs} />
			) : null}

			{/* Templates */}
			<View
				style={{
					position: "relative",
					width: "100%",
					height: HEIGHT - 90,
					overflow: "hidden",
				}}>
				<ScrollView
					style={{ flex: 1 }}
					pagingEnabled
					onScroll={onScroll}
					horizontal
					bounces
					snapToAlignment="center"
					decelerationRate={"fast"}
					showsHorizontalScrollIndicator={false}>
					{headerTabs.map((e, i) => (
						<TabContent key={i} clr={"#3498DB"} />
					))}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: "100%",
		height: HEIGHT - STATUSBAR_HEIGHT - 30,
		marginTop: 30,
		backgroundColor: "transparent",
	},
});
