import Product from '../models/productModel.js'


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})

        if (products) {
            res.json(products)
        } else {
            return res.status(404).json({ message: 'No Products Found' })

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
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' })
        }
        res.json(product)

    } catch (err) {
        console.log(err)
        if (err.kind === "ObjectId" && err.value.length === 24) {
            return res.status(404).json({ message: 'Product Not Found' })
        } else if (err.value.length < 24 || err.value.length > 24) {
            return res.status(500).json({ message: 'Invalid Product ID' })
        } else {
            return res.status(500).json({ message: 'Server Error' })
        }
    }

}