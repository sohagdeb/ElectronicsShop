import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import Col from 'react-bootstrap/esm/Col';
import '../index.css'

const ProductSearch = (props) => {
    const { product } = props;
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
        navigate('/cart');
    };
    return (
        <div class="card homecard" >
            <div class="row g-0" >
                <div class="col-md-3 col-2" >
                    <img src={product.image} width='150px' height='150px' class="img-fluid rounded-start homecardimg" alt="..." />
                </div>
                <div class="col-md-6 col-7">
                    <div class="card-body">
                        <h5 class="card-title">{product.name}</h5>

                        <div class="ratings">  <Rating rating={product.rating} numReviews={product.numReviews} />
                            <p><small className='text-danger'>only {product.countInStock} left in stock - order soon</small></p>

                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-3">
                    <p class="card-text">৳{product.price}</p>
                    <Link to={`/product/${product.slug}`}>
                        <button type="button" class="btn btn-danger btn-sm homecardbtn">View Product</button>
                    </Link>

                    {product.countInStock > 0 ? (
                        <button onClick={() => addToCartHandler(product)} className="button btn btn-warning btn-sm mt-2 homecardbtn">Add to Cart</button>
                    ) : (
                        <button className="button btn btn-warning btn-sm mt-2 homecardbtn" disabled>Add to Cart</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductSearch;