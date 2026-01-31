const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const products = require('./data/products');
const users = require('./data/users');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Connect to database (Memory or Local)
connectDB().then(async () => {
    // Auto-seed if empty (crucial for in-memory)
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            console.log('Database empty, seeding...');
            // Safe clean
            await User.deleteMany({});
            await Product.deleteMany({});

            await User.insertMany(users);
            const insertedProducts = await Product.insertMany(products);
            console.log(`Database seeded automatically with ${insertedProducts.length} products!`);
        }
    } catch (err) {
        console.error('Seeding failed:', err);
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- DEPLOYMENT SETUP ---
const __dirname_backend = path.resolve(); // Resolves to backend folder usually if running from there, but we need root context often.
// Actually path.resolve() in Node depends on CWD.
// If we run 'node backend/server.js' from root, it is root.
// If we run 'node server.js' from backend, it is backend.
// We will assume standard relative paths.

// Serve Frontend Static Asssets
app.use(express.static(path.join(__dirname_backend, '../frontend/dist')));

app.get('*', (req, res) => {
    // If route isn't an API route, send index.html
    // Verify file exists first to avoid crashing
    const indexPath = path.resolve(__dirname_backend, '../frontend/dist', 'index.html');
    res.sendFile(indexPath);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
