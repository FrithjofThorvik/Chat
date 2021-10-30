/**
 * Returns url with endpoint connected to either deployed or dev environment
 * @param endpoint endpoint from base url
 * @returns complete url connected to correct environment
 */
export const getBackendUrl = (endpoint: string): string => {
	const url =
		!process.env.NODE_ENV || process.env.NODE_ENV === "development"
			? `http://localhost:3001${endpoint}`
			: `https://chat-frithjof.herokuapp.com${endpoint}`;
	return url;
};

export const getMessageTime = (): string => {
	const date = new Date();
	const time = date.toLocaleTimeString();
	return time.slice(0, 5);
};
