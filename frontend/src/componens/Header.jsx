import { Link } from 'react-router-dom';
import logoImage from '../assets/images/SmartClass.png';  // Sesuaikan path sesuai dengan direktori Anda

const Header = () => {
  return (
    <header className="bg-[#78B7D0] text-white shadow-lg py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <img src={logoImage} alt="SmartClass Logo" className="h-10 w-auto" />
          <Link to="/" className="text-3xl font-extrabold tracking-wide hover:text-white transition duration-300">
            SmartClass
          </Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link
                to="/"
                className="hover:text-blue-200 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-200 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-200 transition duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-blue-200 transition duration-300"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-200 transition duration-300"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
