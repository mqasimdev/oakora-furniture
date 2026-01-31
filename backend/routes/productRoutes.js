const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Fetch all products with filtering and pagination
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {};

    const category = req.query.category
        ? { category: req.query.category }
        : {};

    const minPrice = req.query.minPrice ? { priceGBP: { $gte: Number(req.query.minPrice) } } : {};
    const maxPrice = req.query.maxPrice ? { priceGBP: { $lte: Number(req.query.maxPrice) } } : {};

    // Combine query filters (price needs to be merged properly if both min and max exist)
    let priceFilter = {};
    if (req.query.minPrice && req.query.maxPrice) {
        priceFilter = { priceGBP: { $gte: Number(req.query.minPrice), $lte: Number(req.query.maxPrice) } };
    } else {
        priceFilter = { ...minPrice, ...maxPrice };
    }

    const count = await Product.countDocuments({ ...keyword, ...category, ...priceFilter });
    const products = await Product.find({ ...keyword, ...category, ...priceFilter })
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    const {
        name,
        priceGBP,
        description,
        imageURL,
        category,
        countInStock,
        sku,
        dimensions,
        material,
        designStyle
    } = req.body;

    const product = new Product({
        name: name || 'Sample Name',
        priceGBP: priceGBP || 0,
        imageURL: imageURL || '/images/sample.jpg',
        category: category || 'Sample Category',
        countInStock: countInStock || 0,
        numReviews: 0,
        description: description || 'Sample description',
        sku: sku || '',
        dimensions: dimensions || '',
        material: material || '',
        designStyle: designStyle || 'Modern UK'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    const {
        name,
        priceGBP,
        description,
        imageURL,
        category,
        countInStock,
        sku,
        dimensions,
        material,
        designStyle
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.priceGBP = priceGBP || product.priceGBP;
        product.description = description || product.description;
        product.imageURL = imageURL || product.imageURL;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        product.sku = sku || product.sku;
        product.dimensions = dimensions || product.dimensions;
        product.material = material || product.material;
        product.designStyle = designStyle || product.designStyle;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;
