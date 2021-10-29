import db from "../models";

/**
 * Creates/Updates user with access- and refresh token
 * @param id userId
 * @param name user's name
 * @param email user's email
 */
export const createOrUpdateUser = async (username: string): Promise<any> => {
	// Check if user already exists
	let user = await db.User.findOne({ where: { username: username } });

	// Check if user should be created or updated
	if (!user) {
		// Create new user
		await db.User.create({
			username: username,
		});
	} else {
		// Update user instance
	}

	// Fetch new user instance
	user = await db.User.findOne({ where: { username: username } });

	// Return user instance
	return user.dataValues;
};
