import React, { useState, useEffect, useRef } from "react";
import {
	Text,
	View,
	Animated,
	StatusBar,
	Pressable,
	Dimensions,
	StyleSheet,
	ScrollView,
	findNodeHandle,
} from "react-native";

import TabContent from "./tabContent";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function CustomScrollView() {
	const scrollRef = useRef();
	const scrollX = useRef(new Animated.Value(0)).current;

	const [focused, setFocused] = useState(0);
	const [firstTimeR, setFirstTimeR] = useState(true);

	const [headerTabs, setHeaderTabs] = useState([]);
	const [allTemplates, setAllTemapltes] = useState([]);

	const loadTabs = async () => {
		const tabs = {
			new_year: "New Year",
			holi: "Holi",
			birthday: "Birthday",
			chatth: "Chatth",
			football: "Football",
		};

		const data = await Object.keys(tabs).map(i => ({
			key: i,
			title: tabs[i],
			ref: React.createRef(),
		}));

		setHeaderTabs([...data]);
	};

	const loadTemplates = async () => {
		const templates = {
			new_year: [
				require("../../assets/images/karsten-winegeart-oU6KZTXhuvk-unsplash.jpg"),
				require("../../assets/images/pexels-felix-mittermeier-957061.jpg"),
				require("../../assets/images/andrei-korostyliov--5svGQJwrU0-unsplash.jpg"),
			],
			holi: [
				require("../../assets/images/marek-szturc-n3qWOO_WO3E-unsplash.jpg"),
				require("../../assets/images/aleksey-kuprikov-sKJH-nRnthg-unsplash.jpg"),
				require("../../assets/images/aleksey-kuprikov-sKJH-nRnthg-unsplash.png"),
			],
			birthday: [
				require("../../assets/images/andrei-korostyliov--5svGQJwrU0-unsplash.jpg"),
				require("../../assets/images/ashley-knedler-Pf5Pj7A5ddA-unsplash.jpg"),
			],
			chatth: [
				require("../../assets/images/stefano-zocca-zjaOb2kOk_8-unsplash.jpg"),
				require("../../assets/images/timothy-salter-hewitt-v6SaSuhC6kc-unsplash.jpg"),
				require("../../assets/images/daniel-leone-g30P1zcOzXo-unsplash.jpg"),
				require("../../assets/images/tim-swaan-eOpewngf68w-unsplash.jpg"),
			],
			football: [
				require("../../assets/images/josiah-pauls-XpM3UKpzBeQ-unsplash.jpg"),
				require("../../assets/images/linus-sandvide-5DIFvVwe6wk-unsplash.jpg"),
				require("../../assets/images/manuel-will-gd3t5Dtbwkw-unsplash.jpg"),
				require("../../assets/images/vincent-ledvina-zZsBlaGwJiw-unsplash.jpg"),
				require("../../assets/images/ray-hennessy-xUUZcpQlqpM-unsplash.jpg"),
			],
		};

		setAllTemapltes(
			Object.keys(templates).map(temp => ({
				key: temp,
				images: templates[temp],
			})),
		);
	};

	const Tab = React.forwardRef(({ index, tab }, ref) => {
		return (
			<View
				ref={ref}
				style={{
					marginLeft:
						index > 0 && index <= headerTabs.length - 1 ? 20 : 0,
				}}>
				<Pressable
					key={index}
					onPress={() => {
						setFocused(index);
						setFirstTimeR(false);
					}}>
					<Text
						style={{
							fontSize: 14,
							fontWeight: index == focused ? "700" : "600",
							color: index == focused ? "#000000" : "#888888",
						}}>
						{tab.title}
					</Text>
				</Pressable>
			</View>
		);
	});

	const Indicator = ({ measures, scrollX }) => {
		const inputRange = headerTabs.map((_, i) => i * (WIDTH - 40));
		const indicatorWidth = scrollX.interpolate({
			inputRange,
			outputRange: measures.map(measure => measure.width),
		});
		const translateX = scrollX.interpolate({
			inputRange,
			outputRange: measures.map(measure => measure.x),
		});

		return (
			<Animated.View
				style={{
					position: "absolute",
					zIndex: 30,
					bottom: 0,
					width: indicatorWidth,
					left: 0,
					transform: [
						{
							translateX,
						},
					],
					height: 4,
					borderRadius: 12,
					backgroundColor: "lightgrey",
				}}></Animated.View>
		);
	};

	const Tabs = ({ scrollX }) => {
		const containerRef = useRef();
		const [measures, setMeasures] = useState([]);

		useEffect(() => {
			let m = [];

			headerTabs.forEach(tab => {
				tab.ref.current.measureLayout(
					containerRef.current,
					(x, y, width, height) => {
						m.push({
							x,
							y,
							width,
							height,
						});

						if (m.length === headerTabs.length) {
							setMeasures(m);
						}
					},
				);
			});
		}, []);

		return (
			<View
				ref={containerRef}
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					zIndex: 20,
					width: "100%",
					height: 80,
					flexDirection: "column",
					justifyContent: "center",
				}}>
				<View style={{ position: "relative", width: "100%" }}>
					<ScrollView
						style={{ top: 10, height: 30 }}
						horizontal
						showsHorizontalScrollIndicator={false}>
						{headerTabs.map((tab, index) => (
							<Tab
								key={tab.key}
								index={index}
								tab={tab}
								ref={tab.ref}
								onTabPress={() => onTabPress(index)}
							/>
						))}

						{measures.length > 0 && (
							<Indicator measures={measures} scrollX={scrollX} />
						)}
					</ScrollView>
				</View>
			</View>
		);
	};

	useEffect(() => {
		if (firstTimeR) return;
		else {
			// scrollRef.current?.scrollToOffset({
			// 	scrollTo: focused * (WIDTH - 40),
			// });
		}
	}, [focused]);

	useEffect(() => {
		loadTabs();
		loadTemplates();
	}, []);

	return (
		<View style={styles.container}>
			{/* Templates */}
			<View
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					paddingTop: 80,
					overflow: "hidden",
				}}>
				{/* Tabs */}
				<Tabs scrollX={scrollX} />

				<Animated.ScrollView
					ref={scrollRef}
					style={{ flex: 1 }}
					pagingEnabled
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false },
					)}
					horizontal
					disableIntervalMomentum
					bounces
					snapToAlignment="center"
					decelerationRate={"fast"}
					showsHorizontalScrollIndicator={false}>
					{headerTabs.map((e, i) => (
						<TabContent
							key={i}
							tab={e.key}
							templates={allTemplates}
						/>
					))}
				</Animated.ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "relative",
		width: "100%",
		height: HEIGHT - STATUSBAR_HEIGHT - 0,
		marginTop: 0,
		backgroundColor: "transparent",
	},
});
