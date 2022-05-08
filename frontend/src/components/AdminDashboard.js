import React from 'react';
import DashboardScreen from '../screens/DashboardScreen';

import '../index.css'
import { Link } from 'react-router-dom';


const AdminDashboard = () => {
    return (
        <div className='container mt-5 mb-5'>
            <div className="row">
                <div className="col-md-2 col-4 text-center " style={{ borderRightStyle: 'solid' }}>
                    <Link to="/admin/admindashboard" className="text-danger nav-link ">Dashboard</Link>
                    <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
                    <Link to="/admin/products" className=" nav-link ">Manage Products</Link>
                    <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
                    <Link to="/admin/orders" className="  nav-link">Manage Orders</Link>
                    <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
                    <Link to="/admin/users" className=" nav-link">Manage Users</Link>
                    <hr style={{ backgroundColor: '#52017d', height: '3px' }} />
                </div>
                <div className="col-md-10 col-8">
                    <DashboardScreen></DashboardScreen>
                </div>
            </div>



            {/* <HashRouter>
                    <div className="row">
                        <div className="col-md-3">
                            <Link to="/admin/products" className="p-3 mb-2 nav-link">Manage Products</Link>
                            <Link to="/admin/orders" className="p-3 mb-2 nav-link">Manage Orders</Link>
                            <Link to="/admin/users" className="p-3 mb-2 nav-link">Manage Users</Link>

                        </div>
                        <div className="col-md-9">
                            <div className="container" >

                                <Route exact path="/" component={DashboardScreen} />
                                <Route exact path="/admin/products" component={ProductListScreen} />
                                <Route path="/admin/orders" component={OrderListScreen} />
                                <Route path="/admin/users" component={UserListScreen} />

                            </div>
                        </div>
                    </div>
                </HashRouter> */}

        </div>
    );
};

export default AdminDashboard;