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
import Auction from '../components/Auction';


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
            src="https://storage-asset.msi.com/global/picture/news/2019/nb/gs75-20190107-1.jpg"
            alt="First slide"
          />
          <div class="carousel-caption d-md-block" >
            <SearchBox></SearchBox>
          </div>

        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://www.iplace.com.br/file/general/banner-iplace-home-slides-081021-iphone-13-varejo-banner-1-desk-1.png"
            alt="Second slide"
          />
          <div class="carousel-caption d-md-block" >
            <SearchBox></SearchBox>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img

            className="d-block w-100 carousel-css"
            src="https://cdn.technosports.co.in/wp-content/uploads/2021/05/Xiaomi-Mi-TV-P1-zrodlo-Xiaomi-Polska.jpg"
            alt="Third slide"
          />
          <div class="carousel-caption d-md-block" >
            <SearchBox></SearchBox>
          </div>
        </Carousel.Item>
      </Carousel>
      <br />
      <Auction></Auction>
      <br />

      <HomeProduct></HomeProduct>
      <div className='text-center mt-5'>
        <Link to='/products'>
          <button className='btn btn-warning'>See More </button>
        </Link>
      </div>

      {/* <section class="section gray-bg mt-5 mb-5" id="blog">
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
      </section> */}




      <div className='mt-5'>
        <h1 className='text-center'><span>PRODUCTS</span> <span className='text-danger'>BRAND</span></h1>
        <div className="container text-center">
          <div className="row row-cols-2 row-cols-lg-6 g-2 g-lg-3 mt-5">
            <div className="col" >
              <div className="shadow p-3 mb-5 bg-body rounded brand">

                <img src="/images/apple.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/google.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/samsung.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/oneplus.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/mi.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/blackbery.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/huawei.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/nokia.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/sony.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/vivo.png" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/lg.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>
            <div className="col">
              <div className="shadow p-3 mb-5 bg-body rounded brand">
                <img src="/images/walton.jpg" width='150px' height='120px' alt="" />
              </div>
            </div>

          </div>
        </div>
      </div>





      <div className='container mb-5 mt-5'>

        <h1 className='text-center mb-5'><span>What people think of</span> <span className='text-danger'>ELECTRONICS SHOP</span></h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col ">
            <div class="card9 text-center py-5">
              <img src="/images/client1.jpg" style={{ borderRadius: '50%' }} height='100px' width='100px' class="mx-auto d-block" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-danger">ANTONIO MORENO</h5>
                <ul class="list-inline text-warning">
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                </ul>
                <p class="card-text">Really good, you have saved our business! I made bacck the purchase price in just 48 hours!
                  man, this thing is getting better and better as I learn more about it.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card9 text-center py-5">
              <img src="/images/client2.jpg" style={{ borderRadius: '50%' }} height='100px' width='100px' class="mx-auto d-block" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-danger">PAULA WILSON</h5>
                <ul class="list-inline text-warning">
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                </ul>
                <p class="card-text">Really good, you have saved our business! I made bacck the purchase price in just 48 hours!
                  man, this thing is getting better and better as I learn more about it.</p>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card9 text-center py-5">
              <img src="/images/client3.jpg" style={{ borderRadius: '50%' }} height='100px' width='100px' class="mx-auto d-block" alt="..." />
              <div class="card-body">
                <h5 class="card-title text-danger">MICHAEL HOLZ</h5>
                <ul class="list-inline text-warning">
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                  <li class="list-inline-item"><i class="fa fa-star"></i></li>
                </ul>
                <p class="card-text">Really good, you have saved our business! I made bacck the purchase price in just 48 hours!
                  man, this thing is getting better and better as I learn more about it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
}
export default HomeScreen;
