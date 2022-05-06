import React, { useEffect, useRef } from "react";
import { View, TouchableOpacity, TextInput, Platform } from "react-native";

import Icon from "react-native-vector-icons/Feather";

export default function AddTextView({ cancelText, doneText, ...rest }) {
	const inputRef = useRef(null);

	useEffect(() => {
		Platform.OS === "ios"
			? inputRef.current.focus()
			: setTimeout(() => inputRef.current.focus(), 40);
	}, []);

	return (
		<>
			<View
				style={{
					position: "absolute",
					zIndex: 60,
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
					left: 0,
					bottom: 0,
					paddingHorizontal: 5,
					backgroundColor: "#000000",
				}}>
				{/* cancel and done button */}
				<View
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: 60,
						justifyContent: "space-between",
						alignItems: "center",
						paddingHorizontal: 15,
						flexDirection: "row",
					}}>
					{/* cancel button */}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={cancelText}
						style={{
							width: 40,
							height: 40,
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Icon name="x" size={24} color={"#F1F3F4"} />
					</TouchableOpacity>

					{/* done button */}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={doneText}
						style={{
							width: 40,
							height: 40,
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Icon name="check" size={24} color={"#F1F3F4"} />
					</TouchableOpacity>
				</View>

				{/* text area */}
				<TextInput
					style={{
						position: "relative",
						width: "100%",
						height: "auto",
						fontWeight: "600",
						color: "#FFFFFF",
						fontSize: 20,
						textAlign: "center",
					}}
					keyboardType="default"
					keyboardAppearance="dark"
					ref={inputRef}
					maxLength={100}
					multiline={true}
					{...rest}
				/>
			</View>
		</>
	);
}
