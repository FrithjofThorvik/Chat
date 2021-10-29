import axios from "axios";
import { getBackendUrl } from "../helpers/functions";
import { IUser } from "../types/interfaces";

class Service {
	/**
	 * Creates or updates existing user in database
	 * @returns user instance
	 */
	public createOrUpdateUser = async (
		name: string,
		email: string
	): Promise<IUser | null> => {
		// Prepare payload
		const payload = {
			name: name,
			email: email,
		};

		// Make api request
		const response: any = await axios.post(getBackendUrl("/api/user"), payload);

		// Validate response
		if (response.data?.user) {
			// Create user instance from response
			const user: IUser = {
				id: response.data.user.id,
				name: response.data.user.name,
				email: response.data.user.email,
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
