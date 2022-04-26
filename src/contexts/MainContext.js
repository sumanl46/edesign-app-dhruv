import React, { createContext, useState } from "react";

export const MainContext = createContext();

export function MainContextProvider({ children }) {
	const [appData, setAppData] = useState({
		color: "#3498DB",
		b_r: 14,
		f_s: 14,
		drawerOpened: false,
	});

	return (
		<MainContext.Provider
			value={{
				drawerOpened: appData.drawerOpened,
				appDatas: [appData, setAppData],
			}}>
			{children}
		</MainContext.Provider>
	);
}
