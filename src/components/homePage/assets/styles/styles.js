import { StyleSheet } from "react-native";

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
		height: 60,
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
});

export { styles };
