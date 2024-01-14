import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInUser } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInPageRender,
  signInStart,
  signInSuccess,
  signInFailure
} from '../redux/user/user.slice';
import OAuth from '../components/oauth/oauth.component';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(signInPageRender());
    }
  }, [dispatch]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signInStart());

    try {
      const response = await signInUser(formData);
      dispatch(signInSuccess(response.data));
      navigate('/');
    } catch (signInError) {
      const errorMessage = !signInError.response.data.message
        ? signInError.message
        : signInError.response.data.message;
      dispatch(signInFailure(errorMessage));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Username or email"
          className="border p-3 rounded-lg"
          id="usernameOrEmail"
          onChange={handleChange}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Signing in' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to={'/signup'}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
