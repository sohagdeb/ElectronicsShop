import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import '../index.css';

import Carousel from 'react-bootstrap/Carousel'
import SearchBox from '../components/SearchBox';
import { Link } from 'react-router-dom';
import HomeProduct from '../components/HomeProduct';


const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Helmet>
        <title>Electronis Shop</title>
      </Helmet>

      <Carousel fade>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://thumbs.dreamstime.com/b/vector-banner-iphone-vinnytsia-ukraine-september-illustration-app-web-presentation-design-229970813.jpg"
            alt="First slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://i5.walmartimages.com/dfw/4ff9c6c9-aa3e/k2-_04d10305-9058-4a6d-b6ce-ece3ff28df37.v1.jpg"
            alt="Second slide"
          />

        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://www.kindpng.com/picc/m/213-2136825_mac-model-banner-apple-mac-pro-banners-hd.png"
            alt="Third slide"
          />

        </Carousel.Item>
      </Carousel>
      <SearchBox></SearchBox>
      <h1 className='text-center mt-3'>Products</h1>
      <br />
      {/* <div className="products mt-1">

        <SearchBox />
        <Row>
          {products.slice(0, 9).map((product) => (
            <Col key={product.slug} sm={12} md={6} lg={4} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
        <Link to='/products'>
          <button className='btn btn-warning'>See More </button>
        </Link>
      </div> */}

      <HomeProduct></HomeProduct>
      <div className='text-center'>
        <Link to='/products'>
          <button className='btn btn-warning'>See More </button>
        </Link>
      </div>




      <section class="section gray-bg mt-5 mb-5" id="blog">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 text-center">
              <div class="section-title">


              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="blog-grid">
                <div class="blog-img">

                  <a href="#">
                    <img width='350px' height='270px'
                      src="https://media.wired.com/photos/5fb2cc575c9914713ead03de/4:3/w_1777,h_1332,c_limit/Gear-Apple-MacBook-Air-top-down-SOURCE-Apple.jpg"
                      title="" alt="" />
                  </a>
                </div>
                <div class="blog-info">
                  <h5>Laptop
                  </h5>
                  <p>We have different variety of Laptops</p>
                  <div class="btn-bar">
                    <Link to={`/search?category=Laptop&query=all&price=all&rating=all&order=newest&page=1`} class="px-btn-arrow">
                      <span>Shop Now</span>
                      <i class="arrow"></i>
                    </Link>


                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="blog-grid">
                <div class="blog-img">

                  <a href="#">
                    <img width='350px' height='270px'
                      src="https://media.wired.com/photos/610050dc8eb98ab033ce45df/master/w_2400,h_1800,c_limit/Gear-Nokia-G20.jpg"
                      title="" alt="" />
                  </a>
                </div>
                <div class="blog-info">
                  <h5>Smart Phone
                  </h5>
                  <p>We have different variety of phones</p>
                  <div class="btn-bar">
                    <Link to={`/search?category=Smartphone&query=all&price=all&rating=all&order=newest&page=1`} class="px-btn-arrow">
                      <span>Shop Now</span>
                      <i class="arrow"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="blog-grid">
                <div class="blog-img">

                  <a href="#">
                    <img width='350px' height='270px'
                      src="https://www.pinkvilla.com/files/smarttv_0.jpg"
                      title="" alt="" />
                  </a>
                </div>
                <div class="blog-info">
                  <h5>Smart Tv
                  </h5>
                  <p>We have different variety of Smart Tv</p>
                  <div class="btn-bar">
                    <Link to={`/search?category=TV&query=all&price=all&rating=all&order=newest&page=1`} class="px-btn-arrow">
                      <span>Shop Now</span>
                      <i class="arrow"></i>
                    </Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>










      <section class="mb-4 py-2 container" style={{ boxShadow: ' rgba(0, 0, 0, 0.35) 0px 5px 15px' }} >


        <h2 class="h1-responsive font-weight-bold text-center my-4">Contact us</h2>


        <div class="row">

          <div class="col-md-12 mb-md-0 mb-5">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">


              <div class="row">


                <div class="col-md-6">
                  <div class="md-form mb-0">
                    <label for="name" class="">Your name</label>
                    <input type="text" id="name" name="name" class="form-control" />

                  </div>
                </div>

                <div class="col-md-6">
                  <div class="md-form mb-0">   <label for="email" class="">Your email</label>
                    <input type="text" id="email" name="email" class="form-control" />

                  </div>
                </div>


              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="md-form mb-0"><label for="subject" class="">Subject</label>
                    <input type="text" id="subject" name="subject" class="form-control" />

                  </div>
                </div>
              </div>

              <div class="row">


                <div class="col-md-12">

                  <div class="md-form">   <label for="message">Your message</label>
                    <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>

                  </div>

                </div>
              </div>


            </form>

            <div class="text-center text-md-left">
              <a class="btn btn-primary mt-3">Send</a>
            </div>
            <div class="status"></div>
          </div>
        </div>

      </section>


    </div>
  );
}
export default HomeScreen;
