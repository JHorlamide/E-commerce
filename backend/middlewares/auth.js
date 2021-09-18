import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const auth = async (req, res, next) => {
  let token;

  /* Verify token */
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select('-password');
      next();
    } catch (error) {
      console.error(error.message);
      return res.status(401).json({ message: 'Not Authorized, token failed' });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization denied, Invalid token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};
