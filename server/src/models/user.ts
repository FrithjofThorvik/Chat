module.exports = (sequelize: any, DataTypes: any) => {
	const User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return User;
};
