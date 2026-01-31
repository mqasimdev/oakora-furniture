const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        imageURL: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        priceGBP: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        sku: { type: String, required: false },
        dimensions: { type: String, required: false },
        material: { type: String, required: false },
        designStyle: { type: String, required: false, default: "Modern UK" },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
