import { FC, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import SendIcon from "@mui/icons-material/Send";

import { IMessage } from "../types/interfaces";
import { getBackendUrl, getMessageTime } from "../helpers/functions";

import "../scss/components/Chat.scss";

interface IChatProps {
	room: string;
	username: string;
}

const Chat: FC<IChatProps> = ({ room, username }): JSX.Element => {
	const [socket, setSocket] = useState<Socket | undefined>();
	const [messages, setMessages] = useState<IMessage[]>([]);
	const [message, setMessage] = useState<string>("");
	const messagesRef = useRef<any>(null);
	const CONNECTION_PORT = getBackendUrl("/");

	/**
	 * Sends current message, author, and time
	 */
	const sendMessage = async (): Promise<void> => {
		// Check if socket has been connected
		if (socket) {
			// Prepare message data
			const time = getMessageTime();
			const payload = {
				room: room,
				message: {
					text: message,
					author: username,
					time: time,
				},
			};

			// Send message
			socket.emit("send_message", payload);
			setMessages((messages) => [...messages, payload.message]);

			// Reset message field
			setMessage("");
		}
	};

	useEffect(() => {
		setSocket(io(CONNECTION_PORT));
	}, [CONNECTION_PORT]);

	useEffect(() => {
		if (socket) socket.emit("join_room", room);
	}, [socket, room]);

	useEffect(() => {
		if (socket) {
			socket.on("receive_message", (message: IMessage) => {
				setMessages((messages) => [...messages, message]);
			});
		}

		return () => {
			if (socket) socket.disconnect();
		};
	}, [socket]);

	return (
		<div className="chat">
			<div className="chat-header">
				<div className="chat-header-room">{room}</div>
			</div>
			<div className="chat-body" ref={messagesRef}>
				{messages
					.slice(0)
					.reverse()
					.map((message: IMessage, key: number) => (
						<div
							className={
								message.author === username
									? "chat-body-message-self"
									: "chat-body-message-other"
							}
							key={key}
						>
							<div className="chat-body-message-text">{message.text}</div>
							<div className="chat-body-message-info">
								<div className="chat-body-message-info-time">
									{message.time}
								</div>
								<div className="chat-body-message-info-author">
									{message.author}
								</div>
							</div>
						</div>
					))}
			</div>
			<div className="chat-footer">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<SendIcon className="chat-footer-icon" onClick={sendMessage} />
			</div>
		</div>
	);
};

export default Chat;
