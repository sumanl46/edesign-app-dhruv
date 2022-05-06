import React, { Component, createRef } from "react";
import {
	Animated,
	ImageBackground,
	Dimensions,
	Pressable,
	StyleSheet,
} from "react-native";

import {
	PanGestureHandler,
	PinchGestureHandler,
	RotationGestureHandler,
	State,
} from "react-native-gesture-handler";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export class ImagePinchableBox extends Component {
	panRef = createRef();
	rotationRef = createRef();
	pinchRef = createRef();
	constructor(props) {
		super(props);

		this.removeFocused = props.removeFocused;

		this.state = {
			x: 0,
			y: 0,
		};

		/* Pinching */
		this._baseScale = new Animated.Value(1);
		this._pinchScale = new Animated.Value(1);
		this._scale = Animated.multiply(this._baseScale, this._pinchScale);
		this._lastScale = 1;
		this._onPinchGestureEvent = Animated.event(
			[{ nativeEvent: { scale: this._pinchScale } }],
			{ useNativeDriver: true },
		);

		/* Rotation */
		this._rotate = new Animated.Value(0);
		this._rotateStr = this._rotate.interpolate({
			inputRange: [-100, 100],
			outputRange: ["-100rad", "100rad"],
		});
		this._lastRotate = 0;
		this._onRotateGestureEvent = Animated.event(
			[{ nativeEvent: { rotation: this._rotate } }],
			{ useNativeDriver: true },
		);

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
			this._lastRotate += event.nativeEvent.rotation;
			this._rotate.setOffset(this._lastRotate);
			this._rotate.setValue(0);
		}
	};

	_onPinchHandlerStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this._lastScale *= event.nativeEvent.scale;
			this._baseScale.setValue(this._lastScale);
			this._pinchScale.setValue(1);
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

	render() {
		return (
			<>
				{/* image */}
				<Animated.View
					style={[
						styles.fixedRoundedBox,
						{
							zIndex: -1,
							transform: [
								{ translateX: this._translateX },
								{ translateY: this._translateY },
								{ scale: this._scale },
								{ rotate: this._rotateStr },
							],
						},
					]}>
					{this.props.resizableImage ? (
						<>
							<ImageBackground
								source={this.props.resizableImage}
								resizeMethod="auto"
								resizeMode="contain"
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</>
					) : null}
				</Animated.View>

				<Animated.View
					style={[
						{
							position: "absolute",
							width: WIDTH,
							height: HEIGHT,
							backgroundColor: "transparent",
							bottom: 0,
						},
					]}>
					<PanGestureHandler
						ref={this.panRef}
						shouldCancelWhenOutside={true}
						onGestureEvent={this._onPanGestureEvent}
						onHandlerStateChange={this._onPanGestureStateChange}>
						<Animated.View style={[styles.wrapper]}>
							<RotationGestureHandler
								ref={this.rotationRef}
								simultaneousHandlers={this.pinchRef}
								onGestureEvent={this._onRotateGestureEvent}
								onHandlerStateChange={
									this._onRotateHandlerStateChange
								}>
								<Animated.View style={[styles.wrapper]}>
									<PinchGestureHandler
										ref={this.pinchRef}
										simultaneousHandlers={this.rotationRef}
										onGestureEvent={
											this._onPinchGestureEvent
										}
										onHandlerStateChange={
											this._onPinchHandlerStateChange
										}>
										<Animated.View
											style={[styles.container]}
											collapsable={false}>
											<Pressable
												style={[styles.container]}
												collapsable={false}
												onPress={this.removeFocused}
											/>
										</Animated.View>
									</PinchGestureHandler>
								</Animated.View>
							</RotationGestureHandler>
						</Animated.View>
					</PanGestureHandler>
				</Animated.View>
			</>
		);
	}
}

export default ImagePinchableBox;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		overflow: "hidden",
		alignItems: "center",
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: "transparent",
		justifyContent: "center",
	},
	wrapper: {
		flex: 1,
	},
	fixedRoundedBox: {
		position: "absolute",
		bottom: 0,
		left: 0,
		zIndex: -1,
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: "rgba(0, 0, 0, 0)",
		overflow: "hidden",
		justifyContent: "center",
		alignItems: "center",
	},
});
