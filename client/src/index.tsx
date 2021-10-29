import { StrictMode } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ReactDOM from "react-dom";

import App from "./App";
import userReducer from "./data/user";

const store = configureStore({
	reducer: {
		user: userReducer,
	},
});

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
	document.getElementById("root")
);
