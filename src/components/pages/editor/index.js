import React, { useContext, useEffect, useRef, useState } from "react";
import {
	ImageBackground,
	TouchableOpacity,
	View,
	Text,
	Modal,
	Pressable,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	Image,
	StatusBar,
} from "react-native";

import { MainContext } from "../../../contexts/MainContext";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";

import {
	AddTextView,
	EditText,
	ExtraImagePinchableBox,
	ImagePinchableBox,
	PinchableBox,
} from "./components";

import ViewShot from "react-native-view-shot";
import ImagePicker from "react-native-image-crop-picker";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const BOTTOMNAV_HEIGHT = 70;
const TOPNAV_HEIGHT = 35;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const MAIN_CONT_HEIGHT =
	HEIGHT - (BOTTOMNAV_HEIGHT + TOPNAV_HEIGHT + STATUSBAR_HEIGHT);

export default function EditorPage({ navigation, route }) {
	const { mainData, textData } = useContext(MainContext);

	const { template } = route.params;

	const [contextData, setContextData] = mainData;

	const [textProps, setTextProps] = textData;

	const [textAdded, setTextAdded] = useState({
		text: null,
		added: false,
	});

	const [imgWH, setImgWH] = useState({
		calculated: false,
	});

	const [textUpdate, setTextUpdate] = useState(false);
	const [focusedTextId, setFocusedTextId] = useState(null);
	const [focusedImage, setFocusedImage] = useState(false);

	const [add, setAdd] = useState(false);

	const [tempText, setTempText] = useState("");

	const [edit, setEdit] = useState(false);

	// Show and hide the properties modal,
	const [showPropModal, setShowPropModal] = useState(false);
	const [showResizableModal, setShowResizableModal] = useState(false);

	// Image Ref,
	const saveShotImage = useRef(null);

	// Options for launching image gallery,
	const options = {
		storageOptions: {
			path: "images",
			mediaType: "photo",
		},
		includeBase64: true,
	};

	// This is the main image behind the template image
	const selectResizableImage = () => {
		launchImageLibrary(options, response => {
			let __source = "data:image/jpeg;base64,";

			if (response.assets) {
				__source += response.assets[0].base64;

				const imageUri = { uri: __source };

				setContextData({
					...contextData,
					resizableImage: imageUri,
				});

				setShowResizableModal(false);
			}
		});
	};

	// select extra image in the template
	const selectExtraImage = btn => {
		if (btn) {
			if (contextData.overImage != null) {
				setContextData({
					...contextData,
					overImage: null,
				});

				return;
			} else {
				ImagePicker.openPicker({
					width: 400,
					height: 400,
					cropping: true,
				}).then(image => {
					setContextData({
						...contextData,
						overImage: image.path,
					});

					setFocusedImage(true);
					setFocusedTextId(null);
				});

				// launchImageLibrary(options, response => {
				// 	let __source = "data:image/jpeg;base64,";

				// 	if (response.assets) {
				// 		__source += response.assets[0].base64;

				// 		const imageUri = { uri: __source };

				// 		setContextData({
				// 			...contextData,
				// 			overImage: imageUri,
				// 		});

				// 		setFocusedImage(true);
				// 		setFocusedTextId(null);
				// 	}
				// });
			}
		} else {
			ImagePicker.openPicker({
				width: 400,
				height: 400,
				cropping: true,
			}).then(image => {
				setContextData({
					...contextData,
					overImage: image.path,
				});
			});
			// launchImageLibrary(options, response => {
			// 	let __source = "data:image/jpeg;base64,";

			// 	if (response.assets) {
			// 		__source += response.assets[0].base64;

			// 		const imageUri = { uri: __source };

			// 		setContextData({
			// 			...contextData,
			// 			overImage: imageUri,
			// 		});
			// 	}
			// });
		}
	};

	// capturing event,
	const [capturing, setCapturing] = useState(false);

	// capture image from viewshot container,
	const captureImage = () => {
		saveShotImage.current
			.capture()
			.then(uri => {
				navigation.navigate("SaveImage", {
					uri,
					template,
				});

				setCapturing(false);
			})
			.catch(error => console.log(error));
	};

	// Done editing or updating text,
	const doneTextEditing = async () => {
		let __txt = null;
		let __added = false;

		if (tempText.length >= 1) {
			__txt = tempText.trim();
			__added = true;
		}

		setTextAdded({
			...textAdded,
			added: __added,
			text: __txt,
		});

		setFocusedImage(false);

		setAdd(false);
	};

	// update textProps,
	const udpateTextProps = async (w, h, txt, id) => {
		const __w = w;
		const __h = h;
		let __textProps = [...textProps];
		const __ID__ = __textProps.findIndex(p => p.txtId == id);

		__textProps[__ID__].text = txt;
		__textProps[__ID__].width = __w;
		__textProps[__ID__].height = __h;

		const pathName = "imageProjData-" + id;

		await AsyncStorage.getItem(pathName)
			.then(async res => {
				const { rot, scale, x, y } = res;

				const __data = {
					rot: rot,
					scale: scale,
					x: x,
					y: y,
					w: __w,
					h: __h,
				};

				await AsyncStorage.setItem(pathName, JSON.stringify(__data))
					.then(() => console.log("Updated"))
					.catch(error => console.log(error));
			})
			.catch(err => console.log(err));

		setTextProps(__textProps);
		setTextUpdate(false);

		setTextAdded({
			...textAdded,
			added: false,
			text: null,
		});
	};

	// ON pressed text,
	const onPressedText = async index => {
		const __textProps = [...textProps];

		const pathName = "imageProjData-" + __textProps[index].txtId;

		__textProps.splice(index, 1);

		setTextProps(__textProps);

		await AsyncStorage.removeItem(pathName)
			.then(() => {
				console.log("Removed ", pathName);
			})
			.catch(error => console.log(error));

		setFocusedTextId(null);
	};

	// handle back
	const handleBackAction = () => {
		navigation.goBack();
	};

	// back handler,
	useEffect(() => {
		navigation.addListener("beforeRemove", e => {
			// Prevent default behavior of leaving the screen
			setContextData({
				...contextData,
				resizableImage: null,
				overImage: null,
			});

			setTextProps([]);
		});

		return () => {
			navigation.removeListener("beforeRemove", () => {
				console.log("Removed");
			});
		};
	}, [navigation]);

	const calcImgHeight = async (_w, _h) => {
		const DIFF = MAIN_CONT_HEIGHT - WIDTH;

		// Initial width and height values
		let width = WIDTH;
		let height = WIDTH;

		if (_w >= _h) {
			if (_w > WIDTH) {
				width = WIDTH;
				const sub = ((_w - WIDTH) / _w) * 100;
				height = _h - (sub / 100) * _h;
			} else {
				width = WIDTH;
				const sub = ((WIDTH - _w) / _w) * 100;
				height = _h + (sub / 100) * _h;
			}
		} else {
			if (_h >= MAIN_CONT_HEIGHT) {
				height = MAIN_CONT_HEIGHT;
				const sub = ((_h - MAIN_CONT_HEIGHT) / _h) * 100;
				width = _w - (sub / 100) * _w;
			} else {
				if (MAIN_CONT_HEIGHT - _h >= DIFF) {
					height = (80 / 100) * MAIN_CONT_HEIGHT;
					width = _w - (MAIN_CONT_HEIGHT - _h);
				} else {
					height = MAIN_CONT_HEIGHT;
					width = _w + (MAIN_CONT_HEIGHT - _h);
				}
			}
		}

		return { width, height };
	};

	useEffect(() => {
		Image.getSize(template.image, async (wd, ht) => {
			const { width, height } = await calcImgHeight(wd, ht);

			setImgWH({
				...imgWH,
				calculated: true,
				width,
				height,
			});
		});
	}, []);

	return (
		<>
			<View
				style={{
					position: "relative",
					flex: 1,
					overflow: "hidden",
					backgroundColor: "transparent",
				}}>
				{/* Go back to template page */}
				<View
					style={{
						position: "relative",
						width: "100%",
						height: TOPNAV_HEIGHT,
						backgroundColor: "#F1F3F4",
						flexDirection: "row",
						alignItems: "center",
						paddingHorizontal: 20,
					}}>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={handleBackAction}>
						<Icon name="arrow-left" size={26} color="#000" />
					</TouchableOpacity>
				</View>

				{/* Show up while capturing image */}
				{capturing ? (
					<>
						<View
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
								left: 0,
								top: 0,
								zIndex: 80,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#00000070",
							}}>
							<ActivityIndicator size={50} color={"#3498DB"} />
						</View>
					</>
				) : null}

				{/* ViewShot container */}
				<View
					style={{
						position: "relative",
						width: "100%",
						height: MAIN_CONT_HEIGHT,
						maxHeight: MAIN_CONT_HEIGHT,
						overflow: "hidden",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#FFFFFF",
					}}>
					{imgWH.calculated ? (
						<View
							style={{
								position: "relative",
								width: imgWH.width,
								height: imgWH.height,
								overflow: "hidden",
								backgroundColor: "transparent",
							}}>
							<ViewShot
								ref={saveShotImage}
								options={{
									format: "png",
									result: "base64",
									quality: 0.9,
								}}
								style={{
									position: "relative",
									flex: 1,
									justifyContent: "center",
									alignItems: "center",
								}}>
								<Image
									source={{ uri: template.image }}
									resizeMethod="auto"
									resizeMode="contain"
									style={{
										position: "absolute",
										width: "100%",
										height: "100%",
										borderWidth: 1,
									}}
								/>

								<ImagePinchableBox
									removeFocused={() => {
										setFocusedTextId(null);
										setFocusedImage(false);
									}}
									resizableImage={contextData.resizableImage}
								/>

								{/* text */}
								{textProps.length >= 1 ? (
									<>
										{textProps.map((textProp, index) => (
											<PinchableBox
												key={textProp.txtId}
												id={textProp.txtId}
												textProp={textProp}
												enabled={
													focusedTextId ==
													textProp.txtId
														? true
														: false
												}
												deleteText={() =>
													onPressedText(index)
												}>
												<Text
													onPress={() => {
														setEdit(true);

														setFocusedTextId(
															textProp.txtId,
														);

														setFocusedImage(false);
													}}
													style={{
														textAlign: "center",
														fontFamily:
															textProp.fontFamily,
														fontSize: 20,
														color: textProp.color,
														zIndex: 20,
														textAlignVertical:
															"center",
													}}>
													{textProp.text}
												</Text>
											</PinchableBox>
										))}
									</>
								) : null}

								{/* Extra Image in the Template */}
								{contextData.overImage ? (
									<ExtraImagePinchableBox
										enabled={focusedImage}
										deleteImage={() => {
											setContextData({
												...contextData,
												overImage: null,
											});

											setFocusedImage(false);
										}}
										boxSize={{
											width: 150,
											height: 150,
										}}>
										<ImageBackground
											source={{
												uri: contextData.overImage,
											}}
											resizeMethod="auto"
											resizeMode="cover"
											style={{
												width: "100%",
												height: "100%",
											}}>
											{/* click btn */}
											<Pressable
												style={{ flex: 1 }}
												onPress={() => {
													if (focusedImage) {
														selectExtraImage(false);
													}
													setFocusedImage(true);
													setFocusedTextId(null);
												}}
											/>
										</ImageBackground>
									</ExtraImagePinchableBox>
								) : null}
							</ViewShot>
						</View>
					) : null}
				</View>

				{/* flex btns */}
				<View
					style={{
						position: "relative",
						width: "100%",
						height: BOTTOMNAV_HEIGHT,
						minHeight: BOTTOMNAV_HEIGHT,
						maxHeight: BOTTOMNAV_HEIGHT,
						overflow: "hidden",
						borderTopWidth: 1,
						borderColor: "#ddd",
						backgroundColor: "#F1F3F410",
						padding: 0,
					}}>
					<View
						style={{
							position: "relative",
							width: "100%",
							height: "100%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						{/* Add text in the image */}
						<TouchableOpacity
							style={styles.tab}
							activeOpacity={0.9}
							onPress={() => {
								setAdd(true);
								setTextAdded({
									...textAdded,
									text: null,
									added: false,
								});
							}}>
							<Icon name="type" size={22} color="#00000090" />

							{/* tab text */}
							<Text style={styles.tabText}>{"Add Text"}</Text>
						</TouchableOpacity>

						{/* Reselect or change image */}
						<TouchableOpacity
							style={styles.tab}
							activeOpacity={0.9}
							onPress={() => {
								if (contextData.resizableImage) {
									setShowResizableModal(true);
								} else {
									selectResizableImage();
								}
							}}>
							{contextData.resizableImage ? (
								<Icon
									name="repeat"
									size={20}
									color="#00000090"
								/>
							) : (
								<Entypo
									name="image"
									size={20}
									color="#00000090"
								/>
							)}

							{/* Tab text */}
							<Text style={styles.tabText}>
								{contextData.resizableImage
									? "Change"
									: "Set Image"}
							</Text>
						</TouchableOpacity>

						{/* Add image in the viewshot */}
						<TouchableOpacity
							style={styles.tab}
							activeOpacity={0.9}
							onPress={() => selectExtraImage(true)}>
							{contextData.overImage ? (
								<>
									<Icon
										name="x"
										size={22}
										color="#00000090"
									/>

									{/* Tab text */}
									<Text style={styles.tabText}>
										{"Remove"}
									</Text>
								</>
							) : (
								<>
									<Icon
										name="plus"
										size={22}
										color="#00000090"
									/>

									{/* Tab text */}
									<Text style={styles.tabText}>
										{"Insert Image"}
									</Text>
								</>
							)}
						</TouchableOpacity>

						{/* Create 'base64' image:data */}
						{capturing ? (
							<>
								<View style={styles.tab}>
									<ActivityIndicator color={"#3498DB"} />
								</View>
							</>
						) : (
							<>
								<TouchableOpacity
									style={styles.tab}
									activeOpacity={0.9}
									onPress={() => {
										setCapturing(true);
										setFocusedImage(false);
										setFocusedTextId(null);

										setTimeout(() => {
											captureImage();
										}, 300);
									}}>
									<Icon
										name="check"
										size={20}
										color="#3498DB"
									/>

									{/* tab text */}
									<Text style={styles.tabText}>{"Save"}</Text>
								</TouchableOpacity>
							</>
						)}
					</View>
				</View>

				{/* Draggabble box properties modal */}
				{showPropModal ? (
					<PropertiesOfBox
						hideModal={() => setShowPropModal(false)}
					/>
				) : null}

				{/* Add text in the view */}
				<Modal
					visible={add}
					transparent={true}
					animationType="slide"
					onRequestClose={() => setAdd(false)}
					style={{
						width: "100%",
						height: "100%",
					}}>
					<AddTextView
						cancelText={() => {
							setAdd(false);
						}}
						doneText={doneTextEditing}
						defaultValue={
							textUpdate &&
							textProps[
								textProps.findIndex(
									p => p.txtId == focusedTextId,
								)
							]
								? textProps[
										textProps.findIndex(
											p => p.txtId == focusedTextId,
										)
								  ].text
								: ""
						}
						onChangeText={value => {
							setTempText(value);
						}}
					/>
				</Modal>

				{/* Calculating text width */}
				{textAdded.added ? (
					<>
						<View
							style={{
								position: "absolute",
								backgroundColor: "white",
								width: "auto",
								height: "auto",
								bottom: -200,
								left: 0,
								paddingHorizontal: 5,
								overflow: "hidden",
								flexWrap: "nowrap",
							}}
							onLayout={async event => {
								const { width: w, height: h } =
									event.nativeEvent.layout;

								if (textUpdate) {
									udpateTextProps(
										w,
										h,
										textAdded.text,
										focusedTextId,
									);
								} else {
									const date = new Date();
									const txtId = date.getTime();

									const textData = {
										text: textAdded.text,
										txtId: txtId,
										width: w,
										height: h,
										color: "#000000",
										fontFamily: "",
										colorsIndex: 0,
										fontsIndex: 0,
									};

									let __textProps = [...textProps];
									__textProps.push(textData);

									const pathName = "imageProjData-" + txtId;

									const __data = {
										rot: 0,
										scale: 1,
										x: 0,
										y: 0,
										w: w,
										h: h,
										updated: false,
									};

									await AsyncStorage.setItem(
										pathName,
										JSON.stringify(__data),
									)
										.then(() => {
											setTextProps(__textProps);

											setFocusedTextId(txtId);

											setTextAdded({
												...textAdded,
												text: null,
												added: false,
											});
										})
										.catch(error => console.log(error));
								}
							}}>
							<Text
								style={{
									fontSize: 20,
								}}>
								{textAdded.text}
							</Text>
						</View>
					</>
				) : null}

				{/* Edit text modal */}
				<Modal
					visible={edit}
					transparent={true}
					animationType="slide"
					onRequestClose={() => setEdit(false)}
					style={{
						width: "100%",
						height: "100%",
					}}>
					<EditText
						id={textProps.findIndex(p => p.txtId == focusedTextId)}
						hideModal={() => {
							setEdit(false);

							setTextUpdate(false);
						}}
						editText={() => {
							setTextUpdate(true);

							setAdd(true);
						}}
					/>
				</Modal>

				{/* Reselect or delete Image */}
				<Modal
					animationType="fade"
					visible={showResizableModal}
					transparent
					onRequestClose={() => setShowResizableModal(false)}>
					<View style={styles.modal}>
						<TouchableOpacity
							style={{
								position: "absolute",
								width: "100%",
								height: "100%",
								left: 0,
								top: 0,
								zIndex: 10,
								backgroundColor: "transparent",
							}}
							onPress={() =>
								setShowResizableModal(false)
							}></TouchableOpacity>

						<View style={styles.modalContent}>
							<View style={styles.btnGroup}>
								<TouchableOpacity
									style={[
										styles.btn,
										{
											backgroundColor: "#FC8181",
										},
									]}
									onPress={() => {
										setContextData({
											...contextData,
											resizableImage: null,
										});

										setShowResizableModal(false);
									}}
									activeOpacity={0.8}>
									<Text style={styles.btnTxt}>
										{"Delete"}
									</Text>
								</TouchableOpacity>
							</View>

							<View
								style={{
									position: "relative",
									marginVertical: 10,
									width: "50%",
									height: 1,
									backgroundColor: "#F1F3F4",
								}}></View>

							<View style={styles.btnGroup}>
								<TouchableOpacity
									style={[
										styles.btn,
										{
											backgroundColor: "#0096a7",
										},
									]}
									onPress={selectResizableImage}
									activeOpacity={0.8}>
									<Text style={styles.btnTxt}>
										{"Change"}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</>
	);
}

const guidelineBaseWidth = WIDTH;
const scale = size => (WIDTH / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
	size + (scale(size) - size) * factor;

const styles = StyleSheet.create({
	tab: {
		position: "relative",
		paddingHorizontal: 15,
		width: "auto",
		height: "auto",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	tabText: {
		fontSize: moderateScale(12),
		color: "#888",
		marginTop: 4,
	},
	modal: {
		position: "relative",
		width: WIDTH,
		height: "100%",
		backgroundColor: "#00000030",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	modalContent: {
		position: "relative",
		zIndex: 20,
		borderRadius: 16,
		backgroundColor: "#FFFFFF",
		width: "80%",
		height: "auto",
		padding: 15,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	btnGroup: {
		position: "relative",
		width: "100%",
		height: "auto",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	btn: {
		position: "relative",
		width: "100%",
		height: 55,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	btnTxt: {
		fontSize: 22,
		color: "#FFFFFF",
	},
});
