import db from "../models";

/**
 * Creates/Updates user with access- and refresh token
 * @param id userId
 * @param name user's name
 * @param email user's email
 */
export const createOrUpdateUser = async (
	name: string,
	email: string
): Promise<any> => {
	// Check if user already exists
	let user = await db.User.findOne({ where: { email: email } });

	// Check if user should be created or updated
	if (!user) {
		// Create new user
		await db.User.create({
			name: name,
			email: email,
		});
	} else {
		// Update user instance
		await db.User.update(
			{
				name: name,
			},
			{
				where: {
					email: email,
				},
			}
		);
	}

	// Fetch new user instance
	user = await db.User.findOne({ where: { email: email } });

	// Return user instance
	return user.dataValues;
};
