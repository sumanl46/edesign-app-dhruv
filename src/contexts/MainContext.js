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

	const tabs = [
		{
			id: "06VLWJUdJdwPLLzTK5hy",
			key: "congratulation",
			orderId: 4,
			title: "Congratulation",
		},
		{
			id: "0KPhKiPwbbBgrR1jfVaP",
			key: "buddhashanti",
			orderId: 0,
			title: "Buddhashanti",
		},
		{
			id: "41bNISSkuCHywWGI44HH",
			key: "designs",
			orderId: 7,
			title: "Designs",
		},
		{
			id: "BIY2VcECFKgEW80PXaSN",
			key: "sports",
			orderId: 1,
			title: "Sports",
		},
		{
			id: "ERYr4HsyXDdGI3Avm1s3",
			key: "anniversary",
			orderId: 5,
			title: "Anniversary",
		},
		{
			id: "FIcZpsty9EXcXVlc3SZt",
			key: "quotes",
			orderId: 2,
			title: "Quotes",
		},
		{
			id: "IoTZILqMWmWDdzZJ13LY",
			key: "business",
			orderId: 4,
			title: "Business",
		},
		{
			id: "NRDTi9IPSfNS7IMKLqKx",
			key: "samabedana",
			orderId: 2,
			title: "Samabedana",
		},
		{
			id: "VfEOHqxA6QWdrotaCeKM",
			key: "new-year",
			orderId: 1,
			title: "New Year",
		},
		{
			id: "aTAW7WtylhZtWE4cgLol",
			key: "shivaratri",
			orderId: 1,
			title: "Shivaratri",
		},
		{
			id: "bOTO4bFt6sdhqnKSzK6k",
			key: "birthday",
			orderId: 3,
			title: "Birthday",
		},
		{
			id: "h5rfJ7arq9TbXzDBowCY",
			key: "election-2079",
			orderId: 0,
			title: "Election 2079",
		},
		{
			id: "i8BYTUa4UvyMXYoBg6T5",
			key: "nari-diwas",
			orderId: 1,
			title: "Nari Diwas",
		},
		{
			id: "qL1H1RHZteJIrkcXX2NB",
			key: "ram-nawami",
			orderId: 0,
			title: "Ram Nawami",
		},
		{ id: "yWJ57K1QhDbLRFD4vNvs", key: "holi", orderId: 0, title: "Holi" },
		{
			id: "zbkDXaTbznWuQe9zh4FC",
			key: "profile-frame",
			orderId: 0,
			title: "Profile Frame",
		},
	];

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
