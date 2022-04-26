import Axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import '../index.css'

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div >
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="card my-5">

            <form onSubmit={submitHandler} class="card-body cardbody-color p-lg-5">

              <div class="text-center">
                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px" alt="profile" />
              </div>

              <div class="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="email" aria-describedby="emailHelp"
                  placeholder="Email" />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="password" />
              </div>
              <div class="text-center"><button type="submit" class="btn btn-color1 px-5 mb-5 w-100 text-light">Sign in</button></div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                New customer?{' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
