import React, { createContext, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
	const [contextData, setContextData] = useState({
		color: "#3498DB",
		overImage: "https://wallpaperaccess.com/full/1204217.jpg",
		resizableImage: require("../components/homePage/assets/images/ashley-knedler-Pf5Pj7A5ddA-unsplash.jpg"),
		drawerOpened: false,
		tabs: [],
	});

	const [textProps, setTextProps] = useState([]);

	const loadTabs = async () => {
		const tabs = await firestore().collection("tabs").get();

		if (tabs.empty) return;
		else {
			setContextData({
				...contextData,
				tabs: tabs.docs.map(doc => ({ ...doc.data(), id: doc.id })),
			});
		}
	};

	const setImageData = async () => {
		const pathName = "imageProjData-0";

		const __data = {
			rot: 0,
			scale: 1,
			x: 0,
			y: 0,
			w: 0,
			h: 0,
		};

		await AsyncStorage.setItem(pathName, JSON.stringify(__data))
			.then(() => console.log("Updated"))
			.catch(error => console.log(error));
	};

	React.useEffect(() => {
		loadTabs();
		setImageData();
	}, []);

	return (
		<MainContext.Provider
			value={{
				drawerOpened: contextData.drawerOpened,
				tabs: contextData.tabs,
				textData: [textProps, setTextProps],
				mainData: [contextData, setContextData],
			}}>
			{children}
		</MainContext.Provider>
	);
}
