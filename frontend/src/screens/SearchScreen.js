import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';
import Product from '../components/Product';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import ProductSearch from '../components/ProductSearch';
import '../index.css'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '$1 to $500',
    value: '1-500',
  },
  {
    name: '$500 to $1000',
    value: '500-1000',
  },
  {
    name: '$1000 to $1500',
    value: '1000-1500',
  },
];

export default function SearchScreen() {


  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';
  const rating = sp.get('rating') || 'all';
  const order = sp.get('order') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const sortOrder = filter.order || order;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
  };
  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Row>
        <Col md={3}>

          <div>
            <ul style={{ listStyleType: 'none' }}>
              <h3 className='text-center'>Category</h3>
              <li className='bg-warning text-center mb-2 border border-danger' >

                <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                  className={'all' === category ? 'text-bold text-danger ' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  All
                </Link>
              </li>
              {categories.map((c) => (
                <li className='bg-warning text-center mb-2 border border-danger' key={c}>
                  <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                    className={c === category ? 'text-bold text-danger ' : ''}
                    to={getFilterUrl({ category: c })}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>

            <ul style={{ listStyleType: 'none' }}>
              <h3 className='text-center'>Price</h3>
              <li className='bg-warning text-center mb-2 border border-danger'>
                <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                  className={'all' === price ? 'text-bold text-danger ' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  All
                </Link>
              </li>
              {prices.map((p) => (
                <li className='bg-warning text-center mb-2 border border-danger' key={p.value}>
                  <Link style={{ textDecoration: 'none', color: 'black', fontSize: '20px' }}
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold text-danger ' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>

          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}

              <Row>
                {products.map((product) => (
                  <Col sm={12} lg={4} className="mb-3" key={product._id}>
                    <ProductSearch product={product}></ProductSearch>
                  </Col>
                ))}
              </Row>


              <div>
                {[...Array(pages).keys()].map((x) => (
                  <LinkContainer
                    key={x + 1}
                    className="mx-1"
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    <Button
                      className={Number(page) === x + 1 ? 'text-bold' : ''}
                      variant="light"
                    >
                      {x + 1}
                    </Button>
                  </LinkContainer>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
