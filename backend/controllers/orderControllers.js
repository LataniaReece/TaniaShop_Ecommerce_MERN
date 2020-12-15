import Order from '../models/orderModel.js'
import mongoose from 'mongoose'

const pageSize = 12

// @desc    Create new order 
// @route   POST /api/orders
// @access  Private
export const createNewOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentResult,
    } = req.body

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' })
    }

    if (!shippingAddress) {
        return res.status(404).json({ message: 'Please enter a shipping address' })
    }

    if (!paymentMethod) {
        return res.status(404).json({ message: 'Please enter a payment method' })
    }

    if (!paymentResult || Object.keys(paymentResult).length === 0) {
        return res.status(404).json({ message: 'Please complete your payment' })
    }

    try {

        const order = Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentResult
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Get order by ID 
// @route   POST /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {

    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const order = await Order.findById(req.params.id).populate('user', 'name email')

            if (!order) {
                return res.status(404).json({ message: 'Order not found' })
            } else {
                res.json(order)
            }
        } else {
            return res.status(404).json({ message: 'Invalid ID' })
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {


    try {
        const orders = await Order.find({ user: req.user._id })
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' })
        } else {
            res.json(orders)
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1

    try {
        const count = await Order.countDocuments({})
        const orders = await Order.find({}).populate('user', 'id name').limit(pageSize).skip(pageSize * (page - 1))

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' })
        } else {
            res.json({ orders, page, pages: Math.ceil(count / pageSize) })
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }

}

// @desc    Update order to be delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'No order found' })
        } else {
            order.isDelivered = true
            order.deliveredAt = Date.now()

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

}