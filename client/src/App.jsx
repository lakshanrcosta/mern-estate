import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.page';
import SignUp from './pages/signUp.page';
import SignIn from './pages/signIn.page';
import About from './pages/about.page';
import Profile from './pages/profile.page';
import SignOut from './pages/signOut.page';
import Header from './components/header/header.component';
import PrivateRoute from './routes/privateRoute/private.route';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signout" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}
