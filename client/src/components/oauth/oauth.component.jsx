import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../utils/firebase';
import { signInWithGoogle } from '../../api/api';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from '../../redux/user/user.slice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    dispatch(signInStart());

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const userData = await signInWithPopup(auth, provider);
      const response = await signInWithGoogle(userData);
      dispatch(signInSuccess(response.data));
      navigate('/');
    } catch (error) {
      const errorMessage = !error.response ? error.message : error.response.data.message;
      dispatch(signInFailure(errorMessage));
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
      Continue with Google
    </button>
  );
};

export default OAuth;
