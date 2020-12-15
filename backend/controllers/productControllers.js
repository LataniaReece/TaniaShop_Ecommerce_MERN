import Product from '../models/productModel.js'
import mongoose from 'mongoose'
import moment from 'moment'

const pageSize = 12

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    try {
        const count = await Product.countDocuments({ ...keyword })
        const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))

        if (products) {
            res.json({ products, page, pages: Math.ceil(count / pageSize) })
        } else {
            return res.status(404).json({ message: 'No Products Found' })

        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Fetch recent products
// @route   GET /api/products
// @access  Public
export const getRecentProducts = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1


    let today = moment()
    let oneMonthAgo = moment().subtract(1, 'months');

    try {

        const count = await Product.countDocuments({
            createdAt: {
                $gte: oneMonthAgo,
                $lte: today
            }
        })
        const products = await Product.find({
            createdAt: {
                $gte: oneMonthAgo,
                $lte: today
            }
        }).sort({ createdAt: 'desc' }).limit(pageSize).skip(pageSize * (page - 1))

        if (products) {
            res.json({ products, page, pages: Math.ceil(count / pageSize) })
        } else {
            return res.status(404).json({ message: 'No Recent Products Found' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Fetch one product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {

    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const product = await Product.findById(req.params.id)

            if (!product) {
                return res.status(404).json({ message: 'Product not Found' })
            } else {
                res.json(product)
            }
        } else {
            return res.status(404).json({ message: 'Invalid ID' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
export const getProductsByCategory = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1

    try {

        const count = await Product.countDocuments({ category: req.params.category })
        const products = await Product.find({ category: req.params.category }).limit(pageSize).skip(pageSize * (page - 1))
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No Products for this category' })
        } else {
            res.json({ products, page, pages: Math.ceil(count / pageSize) })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    try {
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        } else {
            await product.remove()
            res.json({ message: 'Product Removed!' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Create a Product 
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {

    try {
        const product = new Product({
            name: 'Sample name',
            price: 0,
            user: req.user._id,
            image: '/images/sample.jpg',
            brand: 'Sample brand',
            category: 'Sample category',
            countInStock: 0,
            numReviews: 0,
            description: 'Sample description',
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Update a Product 
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock } = req.body

    if (!name || !description || !image || !brand || !category) {
        return res.status(404).json({ message: 'Please fill out all fields' })
    }

    if (!price) {
        return res.status(404).json({ message: 'Please enter price' })
    }

    if (!countInStock) {
        return res.status(404).json({ message: 'Please fill in Count In Stock' })
    }

    try {

        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        } else {
            product.name = name
            product.price = price
            product.description = description
            product.image = image
            product.brand = brand
            product.category = category
            product.countInStock = countInStock

            const updatedProduct = await product.save()
            return res.json(updatedProduct)

        }

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
    const { rating, comment } = req.body

    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })

        } else {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            )

            if (alreadyReviewed) {
                return res.status(400).json({ message: 'You already reviewed this product!' })
            }

            if (!rating) {
                return res.status(400).json({ message: 'Please select a rating.' })
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            }

            product.reviews.push(review)

            product.numReviews = product.reviews.length

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length

            await product.save()
            res.status(201).json({ message: 'Review added' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })

    }
}

// @desc    Get top rated products
// @route   POST /api/products/top
// @access  Private
export const getTopRatedProducts = async (req, res) => {

    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(pageSize)

        if (!products) {
            return res.status(404).json({ message: 'Products Not Found' })

        } else {
            res.json(products)
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })

    }
}