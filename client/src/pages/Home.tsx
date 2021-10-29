import { FC } from "react";

import UserForm from "../components/UserForm";
import User from "../components/User";

import "../scss/pages/Home.scss";

interface IHomeProps {}

const Home: FC<IHomeProps> = (): JSX.Element => {
	return (
		<div className="home">
			<User />
			<UserForm />
		</div>
	);
};

export default Home;
