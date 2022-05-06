import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
} from "react-native-reanimated";

function OptionsModalView({ setImage, changeTemplate, hideModal }) {
	const progress = useSharedValue(40);
	const __opac = useSharedValue(0);

	const __optBoxCont = useAnimatedStyle(() => {
		return {
			opacity: __opac.value,
		};
	}, []);

	const __optBoxAnim = useAnimatedStyle(() => {
		return {
			opacity: __opac.value,
			transform: [{ translateY: progress.value }],
		};
	}, []);

	useEffect(() => {
		progress.value = withTiming(0);
		__opac.value = withTiming(1);
	}, []);

	return (
		<>
			<Animated.View
				style={[
					{
						position: "absolute",
						zIndex: 60,
						width: "100%",
						height: "100%",
						backgroundColor: "#00000050",
						top: 0,
						left: 0,
						justifyContent: "flex-end",
						alignItems: "flex-end",
					},
					__optBoxCont,
				]}>
				{/* for back click cancel */}
				<TouchableOpacity
					style={{
						position: "absolute",
						left: 0,
						top: 0,
						width: "100%",
						height: "100%",
						zIndex: 20,
					}}
					activeOpacity={1}
					onPress={() => {
						progress.value = withTiming(20);
						__opac.value = withTiming(0);

						setTimeout(() => {
							hideModal();
						}, 400);
					}}
				/>

				{/* required opt view */}
				<Animated.View
					style={[
						{
							position: "relative",
							width: "100%",
							height: "auto",
							zIndex: 30,
							overflow: "hidden",
							paddingVertical: 20,
							paddingHorizontal: 50,
							backgroundColor: "#F1F3F4",
							borderTopLeftRadius: 24,
							borderTopRightRadius: 24,
						},
						__optBoxAnim,
					]}>
					<View
						style={{
							height: "auto",
							width: "100%",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}>
						{/* change big image */}
						<TouchableOpacity
							style={styles.button}
							activeOpacity={0.9}
							onPress={changeTemplate}>
							<Text style={styles.buttonTxt}>
								Change Template
							</Text>
						</TouchableOpacity>

						{/* seperator */}
						<View
							style={{
								marginVertical: 10,
								height: 1,
								width: 200,
								backgroundColor: "#00000040",
							}}></View>

						{/* change small image */}
						<TouchableOpacity
							style={[
								styles.button,
								{
									backgroundColor: "#000000",
								},
							]}
							activeOpacity={0.9}
							onPress={setImage}>
							<Text style={styles.buttonTxt}>Change Image</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Animated.View>
		</>
	);
}

export default OptionsModalView;

const styles = StyleSheet.create({
	button: {
		borderRadius: 999,
		height: 50,
		width: "100%",
		backgroundColor: "#3498DB",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTxt: {
		color: "#FFFFFF",
		fontWeight: "700",
		fontSize: 16,
		opacity: 0.9,
	},
});
