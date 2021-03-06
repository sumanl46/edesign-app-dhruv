import { StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("screen");

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		position: "relative",
		width: "100%",
		height: "auto",
		paddingVertical: 10,
		paddingHorizontal: 0,
	},
	searchContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	appLogo: {
		position: "relative",
		width: "auto",
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	searchBox: {
		marginTop: 10,
		width: "100%",
		height: 170,
		borderRadius: 14,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#F1F3F4",
	},
	search: {
		position: "relative",
		width: "100%",
		height: 45,
		borderRadius: 8,
		backgroundColor: "#F1F3F4",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 10,
		zIndex: 20,
	},
	modal: {
		position: "relative",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		backgroundColor: "#00000050",
	},
	modalContent: {
		position: "relative",
		width: "100%",
		height: "50%",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		backgroundColor: "#FFF",
	},
	modalHeading: {
		position: "relative",
		width: "100%",
		height: "auto",
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	modalHeadingText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#000",
	},
	modalHeadingBar: {
		position: "relative",
		width: 40,
		height: 5,
		borderRadius: 8,
		backgroundColor: "lightgrey",
		marginTop: 8,
	},
	newsBoxContainer: {
		position: "relative",
		width: "50%",
		height: WIDTH / 2,
		padding: 10,
	},
	newsBox: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#F1F3F4",
		backgroundColor: "lightgrey",
		overflow: "hidden",
	},
});

export { styles };
