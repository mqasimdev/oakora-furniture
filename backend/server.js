const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const products = require('./data/products');
const users = require('./data/users');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECT & AUTO-SEED ---
connectDB()
    .then(async () => {
        try {
            const productCount = await Product.countDocuments();
            if (productCount === 0) {
                console.log('Database empty, seeding...');
                await User.deleteMany({});
                await Product.deleteMany({});

                await User.insertMany(users);
                const insertedProducts = await Product.insertMany(products);
                console.log(`Database seeded with ${insertedProducts.length} products`);
            }
        } catch (err) {
            console.error('Database seeding failed:', err);
        }
    })
    .catch(err => console.error('DB connection failed:', err));

// --- API ROUTES ---
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// --- DEPLOYMENT SETUP ---
const uploadsDir = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(uploadsDir));

const frontendDist = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendDist));

// React Fallback Route (Express 4.x compatible)
app.get('*', (req, res) => {
    // Skip API routes so they don't return HTML
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ message: 'API route not found' });
    }

    const indexHtml = path.join(frontendDist, 'index.html');
    res.sendFile(indexHtml);
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
