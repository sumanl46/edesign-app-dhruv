import React, { createContext, useState } from "react";
import { PermissionsAndroid } from "react-native";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
	const [contextData, setContextData] = useState({
		color: "#3498DB",
		overImage: null,
		resizableImage: null,
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

	// Check Permission for READ && WRITE file
	const checkPermission = async () => {
		await PermissionsAndroid.check(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
		).then(isPermitted => {
			if (isPermitted) {
				console.log(isPermitted);
			} else {
				PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						rationale: {
							message: "Please give access to Save Image.",
							title: "Storage Permission",
						},
					},
				).then(msg => console.log(msg));
			}
		});
	};

	React.useEffect(() => {
		loadTabs();
		setImageData();
		checkPermission();
	}, []);

	return (
		<MainContext.Provider
			value={{
				tabs: contextData.tabs,
				textData: [textProps, setTextProps],
				mainData: [contextData, setContextData],
			}}>
			{children}
		</MainContext.Provider>
	);
}
