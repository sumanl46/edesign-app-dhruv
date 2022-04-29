import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { height: H, width: W } = Dimensions.get("screen");

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBarContainer: {
		position: "relative",
		width: "100%",
		height: "auto",
	},
	searchBar: {
		width: "100%",
		height: 50,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "lightgrey",
	},
	backBtn: {
		width: "15%",
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	textInputContainer: {
		width: "65%",
		height: "100%",
	},
	textInputText: {
		fontWeight: "600",
		color: "#000000",
		fontSize: 14,
		textAlign: "left",
	},
	searchTextContainer: {
		width: "20%",
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	searchText: {
		fontSize: 14,
		fontWeight: "700",
		textTransform: "capitalize",
	},
	clearSearchFieldIconContainer: {
		position: "absolute",
		top: 0,
		right: -10,
		height: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		zIndex: 20,
		backgroundColor: "transparent",
	},
	clearSearchFieldIcon: {
		position: "relative",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 20,
		height: 20,
		backgroundColor: "#000",
		borderRadius: 24,
	},
	flatListContainer: {
		width: "100%",
		height: H - StatusBar.currentHeight - 50,
		backgroundColor: "transparent",
	},
	renderedBoxesContainer: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
		backgroundColor: "#F1F3F4",
	},
	renderedBox: {
		padding: 5,
		width: "50%",
		height: W / 2,
	},
	box: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#F1F3F4",
		backgroundColor: "slightgrey",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

export { styles };
