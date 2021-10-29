import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./scss/App.scss";

const App: FC = (): JSX.Element => {
	return (
		<div className="app">
			<Router>
				<div className="app-content">
					<Switch>
						<Route path="/" exact component={Home} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
