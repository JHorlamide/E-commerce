import asyncMiddleware from '../middlewares/async.js';
import { User } from '../models/User.js';
import Joi from 'joi';

const authValidation = (input) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .lowercase('lower')
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().min(5).max(20).required(),
    });

    return schema.validate(input);
  } catch (error) {
    console.log('Error from Validation', error);
  }
};

/***
 * @router  POST: api/user/login
 * @desc    Authenticate User & get token
 * @access  Public
 * ***/
export const authenticateUser = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const { error } = authValidation({ email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.generateAuthToken(),
    });
  } else {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
});
