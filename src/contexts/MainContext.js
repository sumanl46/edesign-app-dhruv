import React, { createContext, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
	const [appData, setAppData] = useState({
		color: "#3498DB",
		b_r: 14,
		f_s: 14,
		drawerOpened: false,
		tabs: [],
	});

	const loadTabs = async () => {
		const tabs = await firestore().collection("tabs").get();

		if (tabs.empty) return;
		else {
			setAppData({
				...appData,
				tabs: tabs.docs.map(doc => ({ ...doc.data(), id: doc.id })),
			});
		}
	};

	React.useEffect(() => {
		loadTabs();
	}, []);

	return (
		<MainContext.Provider
			value={{
				drawerOpened: appData.drawerOpened,
				tabs: appData.tabs,
				appDatas: [appData, setAppData],
			}}>
			{children}
		</MainContext.Provider>
	);
}
