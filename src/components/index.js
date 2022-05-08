import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomePage from "./homePage";
import { SearchPage } from "./pages";
import EditorPage from "./pages/editor";
import SaveImage from "./pages/saveImage";

const Stack = createNativeStackNavigator();

export default function Container() {
	return (
		<>
			<Stack.Navigator initialRouteName="Home">
				{/* Home Page */}
				<Stack.Screen
					name="Home"
					component={HomePage}
					options={{ headerShown: false }}
				/>

				{/* Search Page */}
				<Stack.Screen
					name="Search"
					component={SearchPage}
					options={{ headerShown: false }}
				/>

				{/* Editor Page */}
				<Stack.Screen
					name="Editor"
					component={EditorPage}
					options={{ headerShown: false }}
				/>

				{/* Add Text Page */}
				<Stack.Screen
					name="SaveImage"
					component={SaveImage}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</>
	);
}
