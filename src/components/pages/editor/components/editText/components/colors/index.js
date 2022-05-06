import React, { useContext, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { colorsPaletes } from "./color-paletes";

import { MainContext } from "../../../../../../../contexts/MainContext";

export default function ColorsView({ id }) {
	const { textData } = useContext(MainContext);

	const [textProps, setTextProps] = textData;

	const [focused, setFocused] = useState(
		textProps[id] ? textProps[id].colorsIndex : 0,
	);

	return (
		<>
			{colorsPaletes.map((palete, index) => (
				<View
					style={{
						position: "relative",
						width: 40,
						height: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
					key={index}>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => {
							setFocused(index);

							const __textProps = [...textProps];

							__textProps[id].color = palete.color;
							__textProps[id].colorsIndex = index;

							setTextProps(__textProps);
						}}
						style={[
							{
								width: 25,
								height: 25,
								borderRadius: 999,
								overflow: "hidden",
								justifyContent: "center",
								alignItems: "center",
							},
							focused == index
								? {
										borderWidth: 2,
										borderColor: "#00000070",
								  }
								: null,
						]}>
						<View
							style={{
								width: focused == index ? 18 : 24,
								height: focused == index ? 18 : 24,
								borderRadius: 999,
								overflow: "hidden",
								backgroundColor: palete.color,
							}}
						/>
					</TouchableOpacity>
				</View>
			))}
		</>
	);
}
