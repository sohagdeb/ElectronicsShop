import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import Col from 'react-bootstrap/esm/Col';
import '../index.css'

const ProductSearch = (props) => {
    const { product } = props;

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
    };
    return (
        <Col style={{ backgroundColor: '#52017D' }}>
            <div class="text-center">
                <img className='mt-3' width='200px' height='150px' src={product.image} alt="Alternate Text" />
            </div>
            <div class="card-body text-center">
                <div class="m-auto text-light">
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                    <h5>{product.name}</h5>
                    <p>${product.price}</p>
                </div>
                <Link to={`/product/${product.slug}`}>
                    <button type="button" class="btn btn-danger btn-sm">View Product</button>
                </Link>
                <button onClick={() => addToCartHandler(product)} className="button btn btn-warning btn-sm">Add to Cart</button>
            </div>
        </Col>

    );
};

export default ProductSearch;