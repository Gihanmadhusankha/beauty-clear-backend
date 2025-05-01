import Product from "../models/products.js";

// CREATE PRODUCT
export function createProduct(req, res) {
    if (!req.user) {
        return res.status(403).json({
            message: "You need to login first"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to create a product"
        });
    }

    const product = new Product(req.body);
    product.save()
        .then(() => {
            res.json({ message: "Product saved successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Product not saved" });
        });
}

// GET PRODUCTS
export function getProduct(req, res) {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Failed to fetch products" });
        });
}

// DELETE PRODUCT
export function deleteProduct(req, res) {
    if (!req.user) {
        return res.status(403).json({
            message: "You need to login first"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to delete a product"
        });
    }

    Product.findOneAndDelete({ productId: req.params.productId })
        .then((deleted) => {
            if (!deleted) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Product not deleted" });
        });
}

// UPDATE PRODUCT
export function updateProduct(req, res) {
    if (!req.user) {
        return res.status(403).json({
            message: "You need to login first"
        });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "You are not authorized to update a product"
        });
    }

    Product.findOneAndUpdate({ productId: req.params.productId }, req.body, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product updated successfully", product: updatedProduct });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Product not updated" });
        });
}
