import React from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";

function HeaderTabs({ focused, tabs }) {
	return (
		<View style={styles.container}>
			<ScrollView
				style={{ flex: 1, marginHorizontal: 5 }}
				horizontal
				showsHorizontalScrollIndicator={false}>
				{tabs.map((tab, index) => (
					<Pressable
						key={index}
						onPress={() => console.log(tab)}
						style={{
							marginLeft:
								index > 0 && index <= tabs.length - 1 ? 20 : 0,
						}}>
						<Text
							style={{
								fontSize: 14,
								fontWeight: index == focused ? "700" : "600",
								color: index == focused ? "#000000" : "#888888",
							}}>
							{tab.title}
						</Text>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
}

export default HeaderTabs;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: "100%",
		height: 40,
	},
});
