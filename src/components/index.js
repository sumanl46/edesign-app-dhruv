import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomePage from "./homePage";

const Stack = createNativeStackNavigator();

export default function Container() {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Home"
						component={HomePage}
						options={{ title: "Welcome" }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
