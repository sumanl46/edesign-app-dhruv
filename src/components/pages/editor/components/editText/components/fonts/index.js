import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { fonts } from "./fonts";

import { MainContext } from "../../../../../../../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FontsView({ id }) {
	const { textData } = useContext(MainContext);

	const [textProps, setTextProps] = textData;

	const [fontChanged, setFontChanged] = useState(false);

	const [data, setData] = useState({
		text: "",
		font: "",
	});

	const [focused, setFocused] = useState(
		textProps[id] ? textProps[id].fontsIndex : 0,
	);

	useEffect(() => {
		const __textProps = [...textProps];

		setData({
			...data,
			text: __textProps[id].text,
		});
	}, [id]);

	return (
		<>
			{fonts.map((font, index) => (
				<View
					style={{
						position: "relative",
						width: "auto",
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
					key={index}>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => {
							setFocused(index);

							setData({
								...data,
								font: font.font,
							});

							setFontChanged(true);
						}}
						style={[
							{
								width: "auto",
								height: "auto",
								paddingVertical: 5,
								paddingHorizontal: 10,
								borderRadius: 10,
								overflow: "hidden",
								justifyContent: "center",
								alignItems: "center",
							},
							focused == index
								? {
										backgroundColor: "#00000010",
								  }
								: null,
						]}>
						<Text
							style={{
								fontSize: 18,
								color:
									focused == index ? "#000000" : "#00000050",
								fontFamily: font.font,
							}}>
							{font.name ? font.name : "Hello world"}
						</Text>
					</TouchableOpacity>
				</View>
			))}

			{/* calculating text width and height again */}
			{fontChanged == true ? (
				<View
					style={{
						position: "absolute",
						backgroundColor: "white",
						width: "auto",
						height: "auto",
						bottom: -200,
						left: 0,
						paddingHorizontal: 5,
						overflow: "visible",
						flexWrap: "nowrap",
					}}
					onLayout={async event => {
						const { width: w, height: h } =
							event.nativeEvent.layout;

						let __textProps = [...textProps];

						__textProps[id].fontFamily = fonts[focused].font;
						__textProps[id].fontsIndex = focused;
						__textProps[id].width = w;
						__textProps[id].height = h;

						const pathName =
							"imageProjData-" + __textProps[id].txtId;

						await AsyncStorage.getItem(pathName)
							.then(async res => {
								const { rot, scale, x, y } = res;

								const __data = {
									rot: rot,
									scale: scale,
									x: x,
									y: y,
									w: w,
									h: h,
								};

								await AsyncStorage.setItem(
									pathName,
									JSON.stringify(__data),
								)
									.then(() => console.log("Updated"))
									.catch(error => console.log(error));
							})
							.catch(err => console.log(err));

						setTextProps(__textProps);
						setFontChanged(false);
					}}>
					<Text
						textBreakStrategy="balanced"
						allowFontScaling
						style={{
							fontSize: 20,
							fontFamily: data.font,
						}}>
						{data.text}
					</Text>
				</View>
			) : null}
		</>
	);
}
