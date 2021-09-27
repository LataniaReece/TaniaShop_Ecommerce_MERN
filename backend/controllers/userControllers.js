import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const pageSize = 12


// @desc    Auth User and Get Token
// @route   GET /api/users/login
// @access  Public
export const authUser = async (req, res) => {
    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(404).json({ message: 'Please enter both email and password' })
        }

        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            return res.status(404).json({ message: 'Invalid email or password' })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {

    const user = await User.findById(req.user._id)

    try {
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            })
        } else {
            return res.status(401).json({ message: 'User not found' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {

        if (!email || !password || !name) {
            return res.status(404).json({ message: 'Please enter your name, email and a password' })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: 'Someone is already using that email address' })
        }

        const user = await User.create({
            name,
            email,
            password
        })
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(404).json('User Not Found')
        }

    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res) => {

    const user = await User.findById(req.user._id)

    // Check is someone is already using the new email addrress
    if (req.body.email !== user.email) {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({ message: 'Someone is already using that email address' })
        }

    }

    try {
        if (user) {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id)
            })
        } else {
            return res.status(401).json({ message: 'User not found' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
    const page = Number(req.query.pageNumber) || 1

    try {

        const count = await User.countDocuments({})
        const users = await User.find({}).limit(pageSize).skip(pageSize * (page - 1))

        if (!users) {
            return res.status(404).json({ message: 'No users found' })
        } else {

            res.json({ users, page, pages: Math.ceil(count / pageSize) })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Delete user
// @route   Delete /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {

    const user = await User.findById(req.params.id)

    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            await user.remove()
            res.json({ message: 'User removed' })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Get user By ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {

    const user = await User.findById(req.params.id).select('-password')

    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            res.json(user)
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

// @desc    Update User
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    // Check is someone is already using the new email addrress
    if (req.body.email !== user.email) {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({ message: 'Someone is already using that email address' })
        }

    }

    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        } else {
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email


            if (!('isAdmin' in req.body)) {
                user.isAdmin = user.isAdmin
            } else {
                user.isAdmin = req.body.isAdmin
            }

            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' })
    }
}