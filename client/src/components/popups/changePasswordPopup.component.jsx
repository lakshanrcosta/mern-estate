import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePassword } from '../../api/api';
import {
  updateUserPasswordStart,
  updateUserPasswordSuccess,
  updateUserPasswordFailure
} from '../../redux/user/user.slice';

const ChangePasswordPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({});
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handlePasswordMatch = (event) => {
    if (formData.newPassword === formData.confirmPassword) {
      setPasswordMatched(true);
      return;
    }
    setPasswordMatched(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(updateUserPasswordStart());

    try {
      await updatePassword(formData, currentUser._id);
      dispatch(updateUserPasswordSuccess());
      onClose();
    } catch (error) {
      const errorMessage = !error.response.data.message
        ? error.message
        : error.response.data.message;
      setPasswordError(errorMessage);
      dispatch(updateUserPasswordFailure(errorMessage));
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isOpen ? 'block' : 'hidden'
      }`}>
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">
              Old Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border rounded-md"
              onChange={handleChange}
              onKeyUp={handlePasswordMatch}
              required
            />
            {!passwordMatched && (
              <p className="text-red-500 text-sm mt-1 text-center">Passwords did not mach</p>
            )}
            {passwordMatched && (
              <p className="text-green-500 mt-1 text-center">Passwords matched</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={!passwordMatched}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Change Password
            </button>
          </div>
          <p className="text-center mt-5">
            {passwordError && (
              <span className="text-red-500 mt-5 text-center">{passwordError}</span>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

ChangePasswordPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ChangePasswordPopup;
