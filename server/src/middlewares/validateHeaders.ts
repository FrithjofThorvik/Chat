import { NextFunction, Request, Response } from "express";

export const validateHeaders = (
	req: Request,
	res: Response,
	next: NextFunction
): Response | void => {
	// Check if headers contain id
	if (req.headers.id) {
		return next();
	} else {
		return res.json({ error: "Headers missing user id..." });
	}
};
