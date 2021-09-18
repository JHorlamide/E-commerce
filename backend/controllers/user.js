import asyncMiddleware from '../middlewares/async.js';
import { User, inputValidation } from '../models/User.js';

/***
 * @router  GET: /api/users
 * @desc    Create new user
 * @access  Public
 * ***/
export const createUser = asyncMiddleware(async (req, res) => {
  const { name, email, password } = req.body;

  /* Validate user input */
  const { error } = inputValidation({ name, email, password });
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: email });

  /* Check if user exist */
  if (user) return res.status(400).json({ message: 'User already exist' });

  /* If user does not exist, create new user */
  user = await User.create({ name, email, password });

  if (!user) {
    return res.status(400).json({ message: 'Invalid user data' });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: user.generateAuthToken(),
  });
});

/***
 * @router  GET: /api/users/profile
 * @desc    Get logged in user profile
 * @access  Private
 * ***/
export const getUserProfile = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: await user.generateAuthToken(),
    });
  } else {
    throw new Error('User not found');
  }
});

/***
 * @router  PUT: /api/users/profile
 * @desc    Update user profile
 * @access  Private
 * ***/
export const updateUserProfile = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: await user.generateAuthToken(),
    });
  } else {
    throw new Error('User not found');
  }
});

/***
 * @router  GET: /api/users
 * @desc    GET all users | Admin Users Only Can Access This Endpoint
 * @access  Private/Admin
 * ***/
export const adminGetUsers = asyncMiddleware(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

/***
 * @router  DELETE: api/users/:id
 * @desc    Delete User
 * @access  Private/Admin
 * ***/
export const adminDeleteUser = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed successfully' });
  } else {
    res.status(400);
    throw new Error('User not found');
  }
});

/***
 * @router  GET: api/users/:id
 * @desc    Get User By Id
 * @access  Private/Admin
 * ***/
export const adminGetUserById = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/***
 * @router  PUT: api/users/id
 * @desc    Update User
 * @access  Private/Admin
 * ***/
export const adminUpdateUser = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
