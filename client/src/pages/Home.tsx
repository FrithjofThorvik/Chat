import { FC, useState } from "react";

import Chat from "../components/Chat";

import "../scss/pages/Home.scss";

interface IHomeProps {}

const Home: FC<IHomeProps> = (): JSX.Element => {
	const [showChat, setShowChat] = useState<boolean>(false);
	const [room, setRoom] = useState<string>("");
	const [username, setUsername] = useState<string>("");

	return (
		<div className="home">
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="text"
				value={room}
				onChange={(e) => setRoom(e.target.value)}
			/>
			<button onClick={() => setShowChat(!showChat)}>Join</button>
			{showChat && username && room && <Chat room={room} username={username} />}
		</div>
	);
};

export default Home;
