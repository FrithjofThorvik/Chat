import { Request, Response } from "express";

import { createOrUpdateUser } from "../services/user";

export const CreateOrUpdateUser = async (
	req: Request,
	res: Response
): Promise<any> => {
	try {
		const username = req.body.username; // Fetch name & email from post request

		// Check if id is of valid type
		if (typeof username === "string") {
			const user = await createOrUpdateUser(username);

			// Check if user was cerated/updated successfullt
			if (user) {
				return res.json({ user: user }); // Return access token
			} else {
				return res.json({ error: "Could not fetch access token..." });
			}
		} else {
			return res.json({ error: "Id was not a string..." });
		}
	} catch (err: any) {
		return res.json({ error: err });
	}
};
