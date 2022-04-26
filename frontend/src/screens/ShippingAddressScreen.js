import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';

import '../index.css'

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
        location: shippingAddress.location,
      })
    );
    navigate('/payment');
  };

  useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox]);

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <div className='gradient-custom pt-5 pb-5'>
        <div class="row mt-3 mx-3" style={{ marginTop: '25px' }}>
          <div class="col-md-3">
            <div style={{ marginTop: '50px', marginLeft: '10px' }} class="text-center">
              <i id="animationDemo" data-mdb-animation="slide-right" data-mdb-toggle="animation"
                data-mdb-animation-reset="true" data-mdb-animation-start="onScroll"
                data-mdb-animation-on-scroll="repeat" class="fas fa-3x fa-shipping-fast text-white"></i>
              <h3 class="mt-3 text-white">Welcome</h3>
              <p class="white-text">You are 30 seconds away from compleating your order!</p>
            </div>

            <Link to='/cart'>
              <div class="text-center">
                <button type="submit" class="btn btn-white btn-rounded back-button">Go back</button>
              </div>
            </Link>


          </div>
          <div class="col-md-9 justify-content-center">
            <div class="card card-custom pb-4">
              <div class="card-body mt-0 mx-5">
                <div class="text-center mb-3 pb-2 mt-3">
                  <h4>Delivery Details</h4>
                </div>

                <form class="mb-0" onSubmit={submitHandler}>

                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">


                        <label class="form-label" for="form9Example1">Full Name</label>
                        <input type="text" id="form9Example1" class="form-control input-custom" onChange={(e) => setFullName(e.target.value)} placeholder='Name' />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">

                        <label class="form-label" for="form9Example6">Address</label>
                        <input type="text" id="form9Example6" class="form-control input-custom" onChange={(e) => setAddress(e.target.value)} placeholder='Address' />
                      </div>
                    </div>

                  </div>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">

                        <label class="form-label" for="form9Example4">Postal Code</label>
                        <input type="number" id="form9Example4" class="form-control input-custom" onChange={(e) => setPostalCode(e.target.value)} placeholder='Postal Code' />
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-outline">
                        <label class="form-label" for="typeEmail">City</label>
                        <input type="text" id="form9Example2" class="form-control input-custom" onChange={(e) => setCity(e.target.value)} placeholder='City' />
                      </div>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col">
                      <div class="form-outline">
                        <div class="form-outline">
                          <label class="form-label" for="form9Example3">Country</label>
                          <input type="text" id="form9Example6" class="form-control input-custom" onChange={(e) => setCountry(e.target.value)} placeholder='Country' />
                        </div>
                      </div>
                    </div>

                  </div>

                  <div class="float-end ">
                    <button type="submit" class="btn btn-primary btn-rounded">Place order</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div >


      </div >





    </div>
  );
}
