import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home.page';
import SignIn from './pages/signIn.page';
import { SignUp } from './pages/signup.page';
import About from './pages/about.page';
import Profile from './pages/profile.page';
import SignOut from './pages/sign-out.page';
import Header from './components/Header/header.component';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}
