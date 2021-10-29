import axios from "axios";
import { getBackendUrl } from "../helpers/functions";
import { IUser } from "../types/interfaces";

class Service {
	/**
	 * Creates or updates existing user in database
	 * @returns user instance
	 */
	public createOrUpdateUser = async (
		username: string
	): Promise<IUser | null> => {
		// Prepare payload
		const payload = {
			username: username,
		};

		// Make api request
		const response: any = await axios.post(getBackendUrl("/api/user"), payload);

		// Validate response
		if (response.data?.user) {
			// Create user instance from response
			const user: IUser = {
				id: response.data.user.id,
				username: response.data.user.username,
			};

			// Return user
			return user;
		} else {
			console.log("[Error] ", response.data); // Log for debugging
			return null; // Return null indicating failed request
		}
	};
}

const UserService = new Service();
export default UserService;
