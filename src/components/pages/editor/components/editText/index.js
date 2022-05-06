import React, { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

import ColorsView from "./components/colors";
import FontsView from "./components/fonts";

import styles from "./styles";

export default function EditText({ id, hideModal, editText }) {
	const [page, setPage] = useState("COLORS");

	return (
		<>
			<View style={styles.container}>
				{/* background tochableopacity */}
				<TouchableOpacity
					style={styles.hideModal}
					activeOpacity={1}
					onPress={hideModal}
				/>

				<View style={styles.modal}>
					{/* contents */}
					<View style={styles.modalContentFlex}>
						<View
							style={[
								styles.modalContent,
								{
									paddingHorizontal: 15,
									paddingVertical: 0,
								},
							]}>
							<View
								style={{
									width: "100%",
									height: "100%",
									borderBottomWidth: 1,
									borderColor: "#00000010",
								}}>
								<ScrollView
									horizontal
									showsHorizontalScrollIndicator={false}
									style={{
										position: "relative",
										width: "100%",
										height: "100%",
									}}>
									<View
										style={{
											height: "100%",
											width: "100%",
											flexDirection: "row",
											justifyContent: "flex-start",
											alignItems: "center",
										}}>
										{page === "COLORS" ? (
											<ColorsView id={id} />
										) : (
											<FontsView id={id} />
										)}
									</View>
								</ScrollView>
							</View>
						</View>
					</View>

					<View style={styles.modalContentFlex}>
						<View
							style={[
								styles.modalContent,
								{
									flexDirection: "row",
								},
							]}>
							{/* colors tab */}
							<View style={{ width: "33.33%", height: "100%" }}>
								<TouchableOpacity
									activeOpacity={0.9}
									style={{
										flex: 1,
										justifyContent: "center",
										alignItems: "center",
									}}
									onPress={() => setPage("COLORS")}>
									<Text
										style={[
											styles.tabText,
											{
												color:
													page === "COLORS"
														? "#000000"
														: "#00000050",
											},
										]}>
										{"Colors"}
									</Text>
								</TouchableOpacity>
							</View>

							{/* fonts tab */}
							<View style={{ width: "33.33%", height: "100%" }}>
								<TouchableOpacity
									activeOpacity={0.9}
									style={{
										flex: 1,
										justifyContent: "center",
										alignItems: "center",
									}}
									onPress={() => setPage("FONTS")}>
									<Text
										style={[
											styles.tabText,
											{
												color:
													page === "FONTS"
														? "#000000"
														: "#00000050",
											},
										]}>
										{"Fonts"}
									</Text>
								</TouchableOpacity>
							</View>

							{/* edit text tab */}
							<View style={{ width: "33.33%", height: "100%" }}>
								<TouchableOpacity
									activeOpacity={0.9}
									style={{
										flex: 1,
										justifyContent: "center",
										alignItems: "center",
									}}
									onPress={editText}>
									<Text
										style={[
											styles.tabText,
											{ color: "#0096a7" },
										]}>
										{"Edit Text"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
		</>
	);
}
