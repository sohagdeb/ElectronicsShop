import React, { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';

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
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get('page') || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) { }
    };

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        toast.success('product created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        toast.success('product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (

    <div className='container mt-5 mb-5'>
      <div className='row'>

        <div className="col-md-2 col-4 text-center " style={{ borderRightStyle: 'solid' }}>
          <Link to="/admin/admindashboard" className=" nav-link ">Dashboard</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/products" className=" nav-link text-danger">Manage Products</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/orders" className="  nav-link">Manage Orders</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/users" className=" nav-link">Manage Users</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
          <Link to="/admin/auction" className=" nav-link">Auction</Link>
          <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
        </div>

        <div className="col-md-10 col-8">


          <div className='container my-3 py-3' style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px" }}>
            <Row>

              <Col className="col text-end">
                <div>
                  <Button type="button" onClick={createHandler}>
                    Create Product
                  </Button>
                </div>
              </Col>
            </Row>

            {loadingCreate && <LoadingBox></LoadingBox>}
            {loadingDelete && <LoadingBox></LoadingBox>}

            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (

              <div class="container table-responsive my-2">
                <table class="table table-bordered table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">IMAGE</th>
                      <th scope="col">NAME</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">CATEGORY</th>
                      <th scope="col">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td> <img style={{ width: '40px', height: '40px' }} src={product.image} alt="" /> </td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => navigate(`/admin/product/${product._id}`)}
                          >
                            Edit
                          </Button>
                          &nbsp;
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => deleteHandler(product)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                      key={x + 1}
                      to={`/admin/products?page=${x + 1}`}
                    >
                      {x + 1}
                    </Link>
                  ))}
                </div>
              </div >

            )
            }
          </div >


        </div>

      </div>



    </div>

  );
}
