import express from 'express';
import { auth, admin } from '../middlewares/auth.js';
const router = express.Router();

/* Controllers */
import {
  createUser,
  getUserProfile,
  updateUserProfile,
  adminGetUsers,
  adminDeleteUser,
  adminGetUserById,
  adminUpdateUser,
} from '../controllers/user.js';

/***
 * @router  GET: /api/users
 * @desc    GET all users | Admin Users Only Can Access This Endpoint
 * ***/
router.get('/', [auth, admin], adminGetUsers);

/***
 * @router  GET | PUT: api/users/profile
 * @desc    Get and Update profile my profile.
 * ***/
router
  .route('/profile')
  .get(auth, getUserProfile)
  .put(auth, updateUserProfile);

/***
 * @router  GET | PUT | DELETE: api/users/id
 * @desc    Get user by Id | Update User By Id | (Delete user) => Admin Users Only Can Access This Endpoint
 * ***/
router
  .route('/:id')
  .get([auth, admin], adminGetUserById)
  .put([auth, admin], adminUpdateUser)
  .delete([auth, admin], adminDeleteUser);

/***
 * @router  GET: api/user/register
 * @desc    Create new user.
 * ***/
router.post('/register', createUser);

export default router;
