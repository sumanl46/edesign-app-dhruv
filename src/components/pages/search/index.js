import React, { useState, useRef, useEffect } from "react";
import { styles } from "./styles/mainStyle";
import {
	View,
	Text,
	Animated,
	Keyboard,
	Platform,
	TextInput,
	Pressable,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";

import Feather from "react-native-vector-icons/Feather";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export default function SearchPage({ navigation, route }) {
	const searchRef = useRef(null);
	const fadeAnimOpac = new Animated.Value(0);
	const fadeAnimScale = new Animated.Value(0.2);

	const [search, setSearch] = useState("");
	const [animated, setAnimated] = useState(false);

	// Run at first run,
	useEffect(() => {
		const { tab: k } = route.params;

		setSearch(k);
	}, []);

	useEffect(() => {
		if (animated) {
			Animated.parallel([
				Animated.timing(fadeAnimOpac, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnimScale, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
			]).start();
		} else {
			Animated.parallel([
				Animated.timing(fadeAnimOpac, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(fadeAnimScale, {
					toValue: 0.2,
					duration: 500,
					useNativeDriver: true,
				}),
			]).start();
		}
	}, [animated]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					{/* Top Search Bar Container */}
					<View style={styles.searchBarContainer}>
						<View style={styles.searchBar}>
							{/* Back Button */}
							<TouchableOpacity
								style={styles.backBtn}
								activeOpacity={0.8}
								onPress={() => navigation.goBack()}>
								<Feather
									name="arrow-left"
									size={24}
									color={"#000000"}
								/>
							</TouchableOpacity>

							{/* TextInput Container */}
							<View style={styles.textInputContainer}>
								<TextInput
									style={styles.textInputText}
									ref={searchRef}
									placeholder="Search Templates"
									keyboardType="web-search"
									returnKeyLabel="Go"
									returnKeyType="search"
									defaultValue={search}
									onChangeText={e => {
										setSearch(e);

										if (e.length > 0) {
											setAnimated(true);
										} else {
											setAnimated(false);
										}
									}}
								/>

								{/* Absolute clear text input */}
								<Animated.View
									style={[
										styles.clearSearchFieldIconContainer,
										{
											opacity: fadeAnimOpac,
											transform: [
												{ scale: fadeAnimScale },
											],
										},
									]}>
									<Pressable
										onPress={() => setSearch("")}
										style={styles.clearSearchFieldIcon}>
										<Feather
											name="x"
											size={12}
											color={"#FFF"}
										/>
									</Pressable>
								</Animated.View>
							</View>

							{/* Search Text */}
							<Pressable
								style={styles.searchTextContainer}
								onPress={() => {}}>
								<Text
									style={[
										styles.searchText,
										{
											color:
												search.length > 0
													? "#000000"
													: "#00000090",
										},
									]}>
									Search
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
