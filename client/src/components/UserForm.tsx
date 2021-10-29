import { FC, useState } from "react";

import { initialUserState } from "../misc/initialData";
import { useStoreDispatch } from "../hooks/useStore";
import { IUser } from "../types/interfaces";
import { setUser } from "../data/user";
import UserService from "../services/userService";

import "../scss/components/UserForm.scss";

interface IUserFormProps {}

const UserForm: FC<IUserFormProps> = (): JSX.Element => {
	const [userState, setUserState] = useState<IUser>(initialUserState);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useStoreDispatch();

	/**
	 * Creates or updates user from user form values
	 * Updates redux state with retured user response
	 */
	const createUser = async (): Promise<void> => {
		setIsLoading(true); // Start laoding

		// Create or update user
		const user: IUser | null = await UserService.createOrUpdateUser(
			userState.name,
			userState.email
		);

		// Check if user was created/updated successfully
		if (user) {
			dispatch(setUser({ user: user }));
		} else {
			console.log("Something went wrong...");
		}

		setIsLoading(false); // Stop loading
	};

	return (
		<div className="userForm">
			<input
				type="text"
				onChange={(e) => setUserState({ ...userState, name: e.target.value })}
			/>
			<input
				type="text"
				onChange={(e) => setUserState({ ...userState, email: e.target.value })}
			/>
			<button onClick={createUser}>
				{!isLoading ? "Create User" : "Loading..."}
			</button>
		</div>
	);
};

export default UserForm;
