import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../../actions/actionTypes/productTypes'
import { getProductDetail, updateProduct } from '../../actions/productActions'
import Alert from '../../components/Layout/Alert'
import Spinner from '../../components/Layout/Spinner'



const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const productDetail = useSelector(state => state.productDetail)
    const { loading, error, product } = productDetail

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (!userInfo.isAdmin) {
            history.push('/auth')
        }

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/products')
        } else {
            if (!product || !product.name || product._id !== productId) {
                dispatch(getProductDetail(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, history, productId, product, successUpdate, userInfo])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        })
        )
    }


    return (
        <>
            { loading ? <Spinner />
                : error ?
                    <Alert type="danger"><Link to="/admin/products" className="btn btn-primary btn-sm btn-stable-hover btn-in-alert go-back"><i class="fas fa-arrow-left"></i> Go Back</Link>{error}</Alert>
                    : (
                        <section className="container user-edit">
                            <Link to="/admin/products" className="btn btn-primary go-back"><i class="fas fa-arrow-left"></i>Go Back</Link>
                            <form className="form" onSubmit={(e) => submitHandler(e)}>
                                <h3 className="form-heading">Edit Product</h3>
                                {loadingUpdate && <Spinner />}
                                {errorUpdate && <Alert type="danger" >{errorUpdate}</Alert>}
                                <label className="form-label">Name</label>
                                <input
                                    className="form-input"
                                    type="name"
                                    name="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label className="form-label">Price</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="price"
                                    value={price}
                                    min="0"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <label className="form-label">
                                    <span>Image</span>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="image"
                                        placeholder="Enter image url"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </label>
                                <label className="form-label">
                                    <span>Upload Image: </span>
                                    <input
                                        className="form-input"
                                        type="file"
                                        id="image-file"
                                        onChange={uploadFileHandler}
                                    />
                                </label>
                                {uploading && <Spinner />}
                                <label className="form-label">
                                    <span>Brand</span>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="brand"
                                        placeholder="Enter brand"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </label>
                                <label className="form-label">
                                    <span>Count In Stock</span>
                                    <input
                                        className="form-input"
                                        type="number"
                                        name="countInStock"
                                        min="0"
                                        value={countInStock}
                                        onChange={(e) => setCountInStock(e.target.value)}
                                    />
                                </label>
                                <label className="form-label">
                                    <span>Category</span>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="category"
                                        placeholder="Enter category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </label>
                                <label className="form-label">
                                    <span>Description</span>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="description"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </label>
                                <span>
                                    <button className="form-submit btn btn-dark" type="submit">Update</button>
                                </span></form>

                        </section>
                    )}

        </>
    )
}

export default ProductEditScreen
