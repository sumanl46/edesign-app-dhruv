import React, { Component, createRef } from "react";
import {
	Animated,
	StyleSheet,
	View,
	TouchableOpacity,
	Dimensions,
} from "react-native";

import {
	PanGestureHandler,
	PinchGestureHandler,
	RotationGestureHandler,
	State,
} from "react-native-gesture-handler";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const boxCenter = {
	x: WIDTH / 2,
	y: HEIGHT / 2,
};

export class PinchableBox extends Component {
	panRef = createRef();
	rotationRef = createRef();
	pinchRef = createRef();
	textViewRef = createRef();
	viewRef = createRef();
	innerViewRef = createRef();
	constructor(props) {
		super(props);

		this.state = {
			width: props.textProp.width,
			height: props.textProp.height,
			created: false,
		};

		/* Box Width and Height */
		this.__boxDim = {
			w: props.textProp.width,
			h: props.textProp.height,
		};

		/* Touched point center */
		this.__touchedPoint = {
			x: 0,
			y: 0,
		};

		this.__boxCenter = {
			x: 0,
			y: 0,
		};

		this._lastPosX = 0;
		this._lastPosY = 0;

		this.__opacity = new Animated.Value(0);

		/* Border Radius */
		this._boxRadius = new Animated.Value(0);
		this._lastRadius = 0;

		/* Rotation */
		this._rotate = new Animated.Value(0);
		this._rotateStr = this._rotate.interpolate({
			inputRange: [0, 360],
			outputRange: ["0deg", "360deg"],
		});
		this._lastRotate = 0;
		this._onRotateGestureEvent = event => {
			const { rotation } = event.nativeEvent;

			const inDeg = (rotation / Math.PI) * 180;

			this._rotate.setValue(inDeg);
		};

		/* Pinching */
		this._tempScale = 1;
		this._baseScale = new Animated.Value(1);
		this._pinchScale = new Animated.Value(1);
		this._scale = Animated.multiply(this._baseScale, this._pinchScale);
		this._lastScale = 1;
		this._onPinchGestureEvent = event => {
			const { scale } = event.nativeEvent;

			this._tempScale = scale + 1;

			this._pinchScale.setValue(scale);

			this.__opacity.setValue(0);
		};

		/* Pan */
		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);
		this._lastOffset = { x: 0, y: 0 };
		this._onPanGestureEvent = Animated.event(
			[
				{
					nativeEvent: {
						translationX: this._translateX,
						translationY: this._translateY,
					},
				},
			],
			{ useNativeDriver: true },
		);
	}

	_onRotateHandlerStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastRotate += (event.nativeEvent.rotation / Math.PI) * 180;
			this._rotate.setOffset(this._lastRotate);
			this._rotate.setValue(0);
		}
	};

	_onPinchHandlerStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastScale *= event.nativeEvent.scale;
			this._baseScale.setValue(this._lastScale);
			this._pinchScale.setValue(1);

			this.viewRef.current.measure((x, y, w, h, px, py) => {
				this.setState({
					width: w,
					height: h,
				});

				this.__boxDim = {
					w: w,
					h: h,
				};

				setTimeout(() => {
					this.__opacity.setValue(1);
				}, 100);
			});
		}
	};

	_onPanGestureStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastOffset.x += event.nativeEvent.translationX;
			this._lastOffset.y += event.nativeEvent.translationY;
			this._translateX.setOffset(this._lastOffset.x);
			this._translateX.setValue(0);
			this._translateY.setOffset(this._lastOffset.y);
			this._translateY.setValue(0);
		}
	};

	_onPanGestureEventIcon = event => {
		const { absoluteX, absoluteY } = event.nativeEvent;

		this.__opacity.setValue(0);

		if (this._lastPosX == absoluteX || this._lastPosY == absoluteY) {
			return;
		} else {
			// lets convert points into degrees
			let angle =
				Math.atan2(
					absoluteX - boxCenter.x,
					-(absoluteY - boxCenter.y),
				) *
				(180 / Math.PI);

			this._rotate.setValue(angle);

			this._lastPosX = absoluteX;
			this._lastPosY = absoluteY;
		}
	};

	_onPanGestureStateChangeIcon = event => {
		const { absoluteX, absoluteY } = event.nativeEvent;

		setTimeout(() => {
			this.__opacity.setValue(1);
		}, 100);

		// lets convert points into degrees
		let angle =
			Math.atan2(absoluteX - boxCenter.x, -(absoluteY - boxCenter.y)) *
			(180 / Math.PI);

		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastRotate += angle;
			this._rotate.setOffset(this._lastRotate);
			this._rotate.setValue(0);
		}
	};

	_onPinchGestureEventIcon = event => {
		const { absoluteX, absoluteY } = event.nativeEvent;

		this.__opacity.setValue(0);

		// If touched position of previous and current matched,
		if (this._lastPosX == absoluteX || this._lastPosY == absoluteY) {
			return;
		} else if (
			absoluteX <= this.__boxCenter.x &&
			absoluteY <= this.__boxCenter.y
		) {
			// If the touched point is less than the __boxCenter,
			return;
		} else if (
			absoluteX > this.__touchedPoint.x &&
			absoluteY > this.__touchedPoint.y
		) {
			// If the touched position is greater than the touchedPoint,
			const xAxes = absoluteX - this.__touchedPoint.x;
			const posY = this.__touchedPoint.y + xAxes;
			const yAxes = posY - this.__touchedPoint.y;

			const dist = Math.sqrt(Math.pow(xAxes, 2) + Math.pow(yAxes, 2));

			let scale = dist / 150;
			this._tempScale = scale + 1;

			this._pinchScale.setValue(this._tempScale);
		} else {
			const xAxes = this.__touchedPoint.x - absoluteX;
			const posY = this.__touchedPoint.y + xAxes;
			const yAxes = this.__touchedPoint.y - posY;

			const dist = Math.sqrt(Math.pow(xAxes, 2) + Math.pow(yAxes, 2));

			let scale = dist / 100;
			this._tempScale = 1;
			this._tempScale -= scale;

			if (this._tempScale <= 0) {
				return;
			}

			this._pinchScale.setValue(this._tempScale);
		}

		this._lastPosX = absoluteX;
		this._lastPosY = absoluteY;
	};

	_onPinchHandlerStateChangeIcon = event => {
		setTimeout(() => {
			this.__opacity.setValue(1);
		}, 100);

		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastScale *= this._tempScale;
			this._baseScale.setValue(this._lastScale);
			this._pinchScale.setValue(1);

			this.viewRef.current.measure((x, y, w, h, px, py) => {
				this.setState({
					width: w,
					height: h,
				});

				this.__boxDim = {
					w: w,
					h: h,
				};
			});
		}
	};

	setDataFromStorage = async () => {
		const pathName = "imageProjData-" + this.props.textProp.txtId;

		const response = await AsyncStorage.getItem(pathName);
		const datas = await JSON.parse(response);

		this._tempScale = datas ? datas.scale : 1;
		this._pinchScale.setValue(datas ? datas.scale : 1);
		this._lastOffset.x += datas ? datas.x : 0;
		this._lastOffset.y += datas ? datas.y : 0;
		this._translateX.setOffset(this._lastOffset.x);
		this._translateX.setValue(0);
		this._translateY.setOffset(this._lastOffset.y);
		this._translateY.setValue(0);
		this._rotate.setValue(datas ? datas.rot : 0);

		this.__boxDim = {
			w: datas.w,
			h: datas.h,
		};
	};

	UNSAFE_componentWillMount() {
		if (this.props.textProp.txtId == this.props.id) {
			this.setDataFromStorage();
		} else {
			return;
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				width: this.__boxDim.w,
				height: this.__boxDim.h,
			});
		}, 0);
	}

	storeDataToStorage = async () => {
		const pathName = "imageProjData-" + this.props.textProp.txtId;

		const __data = {
			w: this.__boxDim.w,
			h: this.__boxDim.h,
			rot: this._rotate,
			scale: this._scale,
			x: this._translateX,
			y: this._translateY,
		};

		await AsyncStorage.setItem(pathName, JSON.stringify(__data));
	};

	componentDidUpdate() {
		this.storeDataToStorage();

		if (this.state.created) {
			this.viewRef.current.measure((x, y, w, h, px, py) => {
				this.setState({
					width: w,
					height: h,
				});

				this.__boxDim = {
					w: w,
					h: h,
				};

				setTimeout(() => {
					this.__opacity.setValue(1);
				}, 100);
			});

			this.setState({
				created: false,
			});
		}
	}

	render() {
		return (
			<>
				<Animated.View
					style={[
						{
							position: "absolute",
							top: 150,
							left: 150,
							width: this.props.textProp.width,
							height: this.props.textProp.height,
							minWidth: this.props.textProp.width,
							minHeight: this.props.textProp.height,
							zIndex: this.props.enabled ? 60 : 50,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center",
						},
						{
							transform: [
								{ translateX: this._translateX },
								{ translateY: this._translateY },
								{ rotate: this._rotateStr },
							],
						},
					]}
					ref={this.textViewRef}>
					<Animated.View
						style={[
							{
								position: "absolute",
								overflow: "hidden",
								width: "100%",
								height: "100%",
								left: 0,
								top: 0,
								backgroundColor: this.props.enabled
									? "#00000030"
									: "transparent",
							},
							{
								transform: [{ scale: this._scale }],
							},
						]}
						onLayout={() => this.setState({ created: true })}
						ref={this.viewRef}>
						<PanGestureHandler
							ref={this.panRef}
							enabled={this.props.enabled}
							shouldCancelWhenOutside={true}
							onGestureEvent={this._onPanGestureEvent}
							onHandlerStateChange={
								this._onPanGestureStateChange
							}>
							<Animated.View style={[styles.wrapper]}>
								<RotationGestureHandler
									ref={this.rotationRef}
									enabled={this.props.enabled}
									simultaneousHandlers={this.pinchRef}
									onGestureEvent={this._onRotateGestureEvent}
									onHandlerStateChange={
										this._onRotateHandlerStateChange
									}>
									<Animated.View style={[styles.wrapper]}>
										<PinchGestureHandler
											ref={this.pinchRef}
											enabled={this.props.enabled}
											simultaneousHandlers={
												this.rotationRef
											}
											onGestureEvent={
												this._onPinchGestureEvent
											}
											onHandlerStateChange={
												this._onPinchHandlerStateChange
											}>
											<Animated.View
												style={[styles.container]}>
												{this.props.children}
											</Animated.View>
										</PinchGestureHandler>
									</Animated.View>
								</RotationGestureHandler>
							</Animated.View>
						</PanGestureHandler>
					</Animated.View>

					{this.props.enabled ? (
						<>
							{/* Relative View Container */}
							<Animated.View
								style={{
									position: "relative",
									zIndex: -1,
									width: this.state.width,
									height: this.state.height,
									backgroundColor: "transparent",
									opacity: this.__opacity,
								}}>
								{/* Delete Image : DONE ✅ */}
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={this.props.deleteText}
									style={[
										styles.outsideItem,
										{
											top: -25,
											left: -25,
											zIndex: 20,
										},
									]}>
									<View style={styles.outsideItemBox}>
										<Icon
											name="close-outline"
											size={16}
											color={"#000"}
										/>
									</View>
								</TouchableOpacity>

								{/* Rotate : PENDING 🔶 PARTIALLY DONE */}
								<View
									style={[
										styles.outsideItem,
										{
											bottom: -25,
											left: -25,
											zIndex: 20,
										},
									]}>
									<PanGestureHandler
										onGestureEvent={
											this._onPanGestureEventIcon
										}
										onHandlerStateChange={
											this._onPanGestureStateChangeIcon
										}>
										<View style={styles.outsideItemBox}>
											<Icon
												name="refresh-outline"
												size={16}
												color={"#000"}
											/>
										</View>
									</PanGestureHandler>
								</View>

								{/* Resize or Scale : DONE ✅ */}
								<View
									style={[
										styles.outsideItem,
										{
											bottom: -25,
											right: -25,
											zIndex: 20,
										},
									]}>
									<PanGestureHandler
										onBegan={event => {
											const { absoluteX, absoluteY } =
												event.nativeEvent;

											this.__touchedPoint = {
												x: absoluteX,
												y: absoluteY,
											};

											this.viewRef.current.measure(
												(x, y, w, h, px, py) => {
													this.__boxCenter = {
														x: px + w / 2,
														y: py + h / 2,
													};
												},
											);
										}}
										onGestureEvent={
											this._onPinchGestureEventIcon
										}
										onHandlerStateChange={
											this._onPinchHandlerStateChangeIcon
										}>
										<View
											style={[
												styles.outsideItemBox,
												{
													transform: [
														{ rotate: "90deg" },
													],
												},
											]}>
											<Icon
												name="resize"
												size={14}
												color={"#000"}
											/>
										</View>
									</PanGestureHandler>
								</View>
							</Animated.View>
						</>
					) : null}
				</Animated.View>
			</>
		);
	}
}

export default PinchableBox;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
	wrapper: {
		flex: 1,
	},

	outsideItem: {
		position: "absolute",
		width: 30,
		height: 30,
		minWidth: 30,
		minHeight: 30,
		zIndex: 40,
		backgroundColor: "transparent",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	outsideItemBox: {
		position: "relative",
		width: 20,
		minWidth: 20,
		height: 20,
		minHeight: 20,
		borderRadius: 99,
		borderWidth: 1,
		borderColor: "#888",
		backgroundColor: "#F1F3F4",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
});
