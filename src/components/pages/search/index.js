import React, { useState, useRef, useEffect } from "react";
import {
	Text,
	View,
	Image,
	Modal,
	Keyboard,
	Platform,
	TextInput,
	Pressable,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
} from "react-native";

import firestore from "@react-native-firebase/firestore";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles/mainStyle";
import { MainContext } from "../../../contexts/MainContext";

export default function SearchPage({ navigation, route }) {
	const { tabs } = React.useContext(MainContext);

	const searchRef = useRef(null);

	const [search, setSearch] = useState("");

	const [firstSearch, setFirstSearch] = useState(false);

	const [showTabsModal, setShowTabsModal] = useState(false);
	const [showPopularSearch, setShowPopularSearch] = useState(false);

	const [popularSearches, setPopularSearches] = useState(null);
	const [crrSearchList, setCrrSearchList] = useState([]);
	const [allTags, setAllTags] = useState([]);
	const [allTemplates, setAllTemplates] = useState([]);

	const [searchedTemplates, setSearchedTemplates] = useState([]);

	const getAllTags_Templates = async () => {
		const response = await firestore().collection("templates").get();

		let tags = [];
		if (response.empty) {
			// __templates.length <= 0
			return;
		} else {
			response.docs.map(doc => {
				const { tags: _tgs } = doc.data();

				tags = tags.concat(_tgs);
			});
			// __templates.map(temp => {
			// 	const { tags: __tags } = temp;

			// 	tags = tags.concat(__tags);
			// });
		}

		let __allTags = [];
		if (tags.length > 0) {
			tags.forEach(tag => {
				if (__allTags.indexOf(tag) === -1) {
					__allTags.push(tag);
				} else {
					return;
				}
			});
		}

		setAllTags([...__allTags]);
		setAllTemplates(
			response.docs.map(doc => ({ ...doc.data(), id: doc.id })),
		);

		// setAllTemplates([...__templates]);
	};

	const getPopularSearches = async () => {
		const response = await firestore()
			.collection("search_tags")
			.doc("tags")
			.get();

		if (response.exists) {
			setPopularSearches({ ...response.data() });
		} else {
			return;
		}

		// setPopularSearches([])
		// let tags = [];
		// if (response.exists) {
		// 	// response.empty
		// 	return;
		// } else {
		// 	response.docs.map(doc => {
		// 		const { tags: _tgs } = doc.data();

		// 		tags = tags.concat(_tgs);
		// 	});
		// 	__templates.map(temp => {
		// 		if (temp.popular) {
		// 			const { tags: __tags } = temp;

		// 			tags = tags.concat(__tags);
		// 		}
		// 	});
		// }

		// let __allTags = [];
		// if (tags.length > 0) {
		// 	tags.forEach((tag, itr) => {
		// 		if (itr <= 15) {
		// 			if (__allTags.indexOf(tag) === -1) {
		// 				__allTags.push(tag);
		// 			} else {
		// 				return;
		// 			}
		// 		}
		// 	});
		// }

		// setPopularSearches({ tags: [...__allTags] });
	};

	const searchTemplates = (searchedKey, tab) => {
		let results = [];
		if (tab) {
			results = allTemplates.filter(template => {
				return template.key === searchedKey;
			});
		} else {
			results = allTemplates.filter(template => {
				return template.tags.indexOf(searchedKey) > -1;
			});
		}

		setSearchedTemplates([...results]);
	};

	useEffect(() => {
		if (search == "" || search.length <= 0) {
			setShowPopularSearch(true);
		} else {
			setShowPopularSearch(false);
		}
	}, [search]);

	// Run at first run,
	useEffect(() => {
		const { tab: k } = route.params;

		setSearch(k);
		setShowPopularSearch(false);
		setCrrSearchList([]);
		getPopularSearches();
		getAllTags_Templates();

		return () => {
			console.log("Closed");
		};
	}, []);

	useEffect(() => {
		if (allTemplates.length > 0) {
			if (firstSearch) {
				return;
			} else {
				searchTemplates(search, true);

				setFirstSearch(true);
			}
		}

		return () => {
			console.log("Done Downloading");
		};
	}, [allTemplates]);

	const TabsView = () => {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "flex-end",
					alignItems: "center",
					backgroundColor: "#00000030",
				}}>
				{/* Absolute touchable view */}
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => setShowTabsModal(false)}
					style={[
						StyleSheet.absoluteFillObject,
						{
							zIndex: 20,
						},
					]}></TouchableOpacity>

				{/* Tabs View */}
				<View
					style={{
						position: "relative",
						zIndex: 40,
						width: "70%",
						height: "100%",
						borderLeftWidth: 1,
						borderLeftColor: "#F1F3F4",
						backgroundColor: "#FFFFFF",
					}}>
					<ScrollView style={{ flex: 1 }}>
						{tabs.map(tab => (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									setSearch(tab.key);
									searchTemplates(tab.key, true);
									setShowTabsModal(false);
								}}
								key={tab.key}
								style={{
									width: "100%",
									height: "auto",
									paddingVertical: 15,
									paddingHorizontal: 25,
									borderBottomWidth: 1,
									borderBottomColor: "#F1F3F4",
								}}>
								<Text
									style={{
										textAlign: "left",
										fontSize: 17,
										fontWeight: "600",
										color: "#000",
									}}>
									{tab.title}
								</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				</View>
			</View>
		);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					{/* Top Search Bar Container */}
					<View style={styles.searchBarContainer}>
						<View style={styles.searchBar}>
							{/* Back Button and Menu Button */}
							<View style={styles.backBtn}>
								<TouchableOpacity
									style={{
										position: "relative",
										width: "60%",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}
									activeOpacity={0.8}
									onPress={() => navigation.goBack()}>
									<Feather
										name="arrow-left"
										size={24}
										color={"#000000"}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									style={{
										position: "relative",
										width: "40%",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}
									activeOpacity={0.8}
									onPress={() => setShowTabsModal(true)}>
									<Feather
										name="menu"
										size={22}
										color={"#000000"}
									/>
								</TouchableOpacity>
							</View>

							{/* TextInput Container */}
							<View style={styles.textInputContainer}>
								<TextInput
									style={styles.textInputText}
									ref={searchRef}
									placeholder="Search Templates"
									keyboardType="web-search"
									returnKeyLabel="Go"
									returnKeyType="search"
									autoFocus
									defaultValue={search}
									onSubmitEditing={({ nativeEvent }) => {
										searchTemplates(
											nativeEvent.text,
											false,
										);

										setCrrSearchList([]);
									}}
									onChangeText={e => {
										setSearch(e);

										const searchesLists = allTags.filter(
											t => {
												return (
													t
														.toLowerCase()
														.indexOf(
															e.toLowerCase(),
														) > -1
												);
											},
										);

										setCrrSearchList([...searchesLists]);
									}}
								/>

								{/* Absolute clear text input */}
								{search.length > 0 && (
									<View
										style={[
											styles.clearSearchFieldIconContainer,
										]}>
										<Pressable
											onPress={() => {
												setSearch("");

												searchRef.current.focus();
											}}
											style={styles.clearSearchFieldIcon}>
											<Feather
												name="x"
												size={12}
												color={"#FFF"}
											/>
										</Pressable>
									</View>
								)}
							</View>

							{/* Search Text */}
							<TouchableOpacity
								activeOpacity={0.6}
								style={styles.searchTextContainer}
								onPress={() => {
									{
										searchTemplates(search, false);
										setCrrSearchList([]);
									}
								}}>
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
							</TouchableOpacity>
						</View>

						{/* List Of some popular searches */}
						{showPopularSearch && (
							<View style={styles.searchListContainer}>
								{/* Title */}
								<View style={styles.searchTitleContainer}>
									<Text style={styles.searchTitleText}>
										Popular Searches
									</Text>
								</View>

								{/* Lists */}
								<View style={styles.searchLists}>
									{popularSearches &&
										popularSearches.tags.map(
											(tag, index) =>
												index <= 10 && (
													<View
														key={index}
														style={{
															position:
																"relative",
															width: "auto",
															height: "auto",
															padding: 4,
														}}>
														<Pressable
															onPress={() => {
																Keyboard.dismiss();
																setSearch(tag);
																searchTemplates(
																	tag,
																	false,
																);
																setCrrSearchList(
																	[],
																);
															}}
															style={
																styles.searchListBox
															}>
															<Text
																style={
																	styles.searchListBoxText
																}>
																{tag.toLowerCase()}
															</Text>
														</Pressable>
													</View>
												),
										)}
								</View>
							</View>
						)}

						{/* Recent Search List */}
						{search.length > 0 && (
							<View style={styles.crrSearchLists}>
								{crrSearchList.length > 0 &&
									crrSearchList.map(
										(srch, index) =>
											index <= 10 && (
												<Pressable
													key={index}
													onPress={() => {
														Keyboard.dismiss();

														setSearch(srch);

														searchTemplates(
															srch,
															false,
														);
														setCrrSearchList([]);
													}}
													style={{
														position: "relative",
														width: "100%",
														height: "auto",
														paddingVertical: 8,
														paddingHorizontal: 25,
														borderBottomWidth: 1,
														borderBottomColor:
															"#F1F3F4",
														backgroundColor: "#FFF",
													}}>
													<View
														style={
															styles.crrSearchListBox
														}>
														<View
															style={
																styles.crrSearchListBox
															}>
															<Feather
																name="search"
																size={22}
																color="#888"
															/>

															<Text
																style={[
																	styles.searchListBoxText,
																	{
																		marginLeft: 20,
																	},
																]}>
																{srch.toLowerCase()}
															</Text>
														</View>
													</View>
												</Pressable>
											),
									)}
							</View>
						)}
					</View>

					{/* FlatList below search bar */}
					{/* Searched Templates List */}
					<View style={styles.flatListContainer}>
						{searchedTemplates.length > 0 ? (
							<ScrollView style={{ flex: 1 }}>
								<View style={styles.renderedBoxesContainer}>
									{searchedTemplates.map(item => (
										<Pressable
											onPress={() =>
												navigation.navigate("Editor", {
													template: item,
												})
											}
											style={styles.renderedBox}
											key={item.id}>
											<View style={styles.box}>
												<Image
													source={{ uri: item.image }}
													resizeMethod="auto"
													resizeMode="cover"
													style={
														StyleSheet.absoluteFillObject
													}
												/>
											</View>
										</Pressable>
									))}
								</View>
							</ScrollView>
						) : (
							<View
								style={{
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}>
								<View
									style={{
										flexDirection: "column",
										alignItems: "center",
									}}>
									<Feather
										name="search"
										size={54}
										color="#999"
									/>

									<Text
										style={{
											marginTop: 20,
											fontSize: 20,
											fontWeight: "600",
											color: "#888",
										}}>
										Not Found
									</Text>
								</View>
							</View>
						)}
					</View>
				</View>
			</TouchableWithoutFeedback>
			{/* Tabs Grid Modal */}
			<Modal
				transparent
				animationType="fade"
				onRequestClose={() => showTabsModal(false)}
				visible={showTabsModal}>
				<TabsView />
			</Modal>
		</KeyboardAvoidingView>
	);
}
