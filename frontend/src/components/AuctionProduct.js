import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';

const AuctionProduct = (props) => {
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
        <div class="card homecard" >
            <Link className='text-decoration-none' to={`/product/${product.slug}`}>
                <div class="row g-0" >
                    <div class="col-md-4 col-4" >
                        <img src={product.image} width='150px' height='150px' class="img-fluid rounded-start homecardimg" alt="..." />
                    </div>
                    <div class="col-md-8 col-8">
                        <div class="card-body">
                            <h5 class="card-title">{product.name}</h5>

                            <p class="card-text">৳{product.price}</p>
                            <input type="number" name="" id="" />
                            <br />
                            <button type="submit" class="btn btn-danger btn-sm mt-2">Bid</button>

                        </div>
                    </div>

                </div>
            </Link>
        </div >
    );
};

export default AuctionProduct;