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

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await Axios.post('/api/users/signup', {
        name,
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
    <div className='container'>
      <Helmet>
        <title>Sign Up</title>
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
                <input onChange={(e) => setName(e.target.value)} pattern='[A-Za-z]{2,12}' type="text" class="form-control" id="name" aria-describedby="name"
                  placeholder="Name" required />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setEmail(e.target.value)} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                  placeholder="Email" required />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" type="password" class="form-control" id="password" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Password" required />
              </div>
              <div class="mb-3">
                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" class="form-control" id="password" placeholder="Confirm Password" required />
              </div>
              <div class="text-center"><button type="submit" class="btn btn-color1 px-5 mb-5 w-100 text-light">Sign Up</button></div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                Already have an account?{' '}
                <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
