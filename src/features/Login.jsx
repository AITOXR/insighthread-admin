import { useState } from 'react';
import PropTypes from 'prop-types';

import { useLoginMutation } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import Alerts from '../components/Alerts'; // Import the Alerts component

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    try {
      const user = await login({ email, password }).unwrap();
      console.log('Login Successful', user);
      document.cookie = `access_token=${user.accessToken}; path=/;`;
      onLogin(user);
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } catch (error) {
      console.log('Login Failed', error);
      setAlert({ show: true, type: 'error', message: 'Login failed. Please check your credentials.' });
      setTimeout(() => handleCloseAlert(), 4000); // Auto-close after 4 seconds
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 m-auto">
      {alert.show && <Alerts type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Panel</h1>
      <p className="mb-6">Please log in to access the admin panel.</p>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <Input
          className="mb-4"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="mb-4"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className="mb-4" text={isLoading ? 'Signing In...' : 'Sign In'} />
      </form>
    </div>
  );
}


Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};