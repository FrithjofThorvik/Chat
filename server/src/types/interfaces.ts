export interface IAuthHeader {
	headers: {
		Authorization: string;
	};
}

export interface IMessage {
	text: string;
	author: string;
	time: string;
}
