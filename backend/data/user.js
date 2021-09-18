import bcryptjs from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcryptjs.hashSync('pass123', 12),
    isAdmin: true,
  },
  {
    name: 'Sam Smith',
    email: 'sam@gmail.com',
    password: bcryptjs.hashSync('pass123', 12)
  },
  {
    name: 'Sarah Watson',
    email: 'sarah@yahoo.com',
    password: bcryptjs.hashSync('pass123', 12),
  },
  {
    name: 'Tyler Down',
    email: 'tyler@gmail.com',
    password: bcryptjs.hashSync('pass123', 12),
  },
];

export default users;
