import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

export default class SmallImage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<PanGestureHandler>
				<View style={styles.container}>
					<Image
						source={{
							uri: this.props.image,
						}}
						resizeMethod="auto"
						resizeMode="contain"
						style={{ width: "100%", height: "100%" }}
					/>
				</View>
			</PanGestureHandler>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
		backgroundColor: "#FFF",
	},
	topHeader: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderColor: "#F1F3F4",
	},
	middleContentContainer: {
		position: "relative",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	bottomTabsContainer: {
		position: "relative",
		width: "100%",
		borderTopWidth: 1,
		borderColor: "#F1F3F4",
		backgroundColor: "#F1F3F470",
		flexDirection: "row",
		justifyContent: "flex-start",
	},
	tab: {
		width: "25%",
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	tabTxt: {
		marginTop: 4,
		textAlign: "center",
		fontSize: 12,
		fontWeight: "600",
	},
});
