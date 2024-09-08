import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) return next();

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ login: decoded.login });

		if (!user) return next();

		req.user = user;
		next();
	} catch (error) {
		return next();
	}
};

export default authMiddleware;

