import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';
import Col from 'react-bootstrap/esm/Col';
import '../index.css'
import SearchBox from './SearchBox';

const ProductSearch2 = (props) => {
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
        <div>


            <div className='col-md-12 col-12 productsearch2' >
                <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <div className='text-center'>
                        <img className='mt-2' src={product.image} width='150px' height='150px' alt="" />
                    </div>
                </Link>
                <div className='col-md-12 col-12 text-center'>
                    <p className='text-dark'>{product.name}</p>
                    <p style={{ color: '#FF4436', fontWeight: '600, Semi Bold', fontSize: '20px' }}>৳{product.price}</p>
                    {product.countInStock > 0 ? (
                        <button onClick={() => addToCartHandler(product)} className="button btn btn-warning btn-sm">Add to Cart</button>
                    ) : (
                        <button className="button btn btn-warning btn-sm" disabled>Add to Cart</button>
                    )}


                </div>
            </div>



        </div >

    );
};

export default ProductSearch2;