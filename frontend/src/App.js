import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';


import { getError } from './utils';
import axios from 'axios';

import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
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
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
              ? 'site-container d-flex flex-column full-box'
              : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar style={{ backgroundColor: '#52017D' }} variant="dark" expand="lg">
            <Container>

              <LinkContainer to="/">
                <Navbar.Brand> <span className='text-ligt fs-2'>Electronics</span> <span className='text-warning'>Shop</span> </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link text-light">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  <Link to="/search" className="nav-link text-light">
                    Products
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown text-light">
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown" class="text-light">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />

              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>

              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>



        <div >

          <footer style={{ backgroundColor: '#52017D' }} class=" text-center text-lg-start text-white">

            <div class="container p-4">

              <div class="row my-4">

                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">

                  <div class="rounded-circle bg-white shadow-1-strong d-flex align-items-center justify-content-center mb-4 mx-auto" style={{ width: "150px", height: "150px" }}>
                    <img src="https://www.mobiletechtalk.co.uk/wp-content/uploads/2020/10/mobiletechtalk.co_.uk-image3.jpeg" height="70" alt=""
                      loading="lazy" />
                  </div>

                  <h2 class="text-center"><span className='text-ligt fs-2'>Electronics</span> <span className='text-warning'>Shop</span></h2>

                  <ul class="list-unstyled d-flex flex-row justify-content-center">
                    <li>
                      <a class="text-white px-2" href="#!">
                        <i class="fab fa-facebook-square"></i>
                      </a>
                    </li>
                    <li>
                      <a class="text-white px-2" href="#!">
                        <i class="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a class="text-white ps-2" href="#!">
                        <i class="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>

                </div>


                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase mb-4">Category</h5>

                  <ul class="list-unstyled">
                    <li class="mb-2">
                      <a href="#!" class="text-white">Laptop</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Smart Tv</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Camera</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Smartphone</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Tablet</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Smart Watch</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Graphics Tab</a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase mb-4">Brand</h5>

                  <ul class="list-unstyled">
                    <li class="mb-2">
                      <a href="#!" class="text-white">Apple</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Samsung</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">LG</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Lenovo</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Oneplus</a>
                    </li>
                    <li class="mb-2">
                      <a href="#!" class="text-white">Xiaomi</a>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase mb-4">Contact</h5>

                  <ul class="list-unstyled">
                    <li>
                      <p><i class="fas fa-map-marker-alt pe-2"></i>Mohakhali, Dhaka-1212,Bangladesh</p>
                    </li>
                    <li>
                      <p><i class="fas fa-phone pe-2"></i>+ 01 234 567 89</p>
                    </li>
                    <li>
                      <p><i class="fas fa-envelope pe-2 mb-0"></i>electronicsshop@gmail.com</p>
                    </li>
                  </ul>
                </div>

              </div>

            </div>


          </footer>

        </div>




      </div >
    </BrowserRouter >
  );
}

export default App;
