const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const users = [
    {
        _id: new mongoose.Types.ObjectId('65b925a2c42095550a123456'),
        name: 'Admin Qasim',
        email: 'qaali@gmail.com',
        password: bcrypt.hashSync('qasim187', 10),
        isAdmin: true,
    },
    {
        _id: new mongoose.Types.ObjectId('65b925a2c42095550a123457'),
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
    },
    {
        _id: new mongoose.Types.ObjectId('65b925a2c42095550a123458'),
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: bcrypt.hashSync('password123', 10),
        isAdmin: false,
    },
];

module.exports = users;
