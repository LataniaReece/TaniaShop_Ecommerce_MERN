import express from 'express'
const router = express.Router()
import { getProducts, getProductById, getProductsByCategory, getRecentProducts, deleteProduct, updateProduct, createProduct, createProductReview, getTopRatedProducts } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/recent').get(getRecentProducts)
router.route('/top').get(getTopRatedProducts)
router.route('/category/:category').get(getProductsByCategory)
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)
router.route('/:id/reviews').post(protect, createProductReview)


export default router;