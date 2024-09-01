import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-blue-600 text-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">SmartClass</Link>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link 
                                to="/dashboard" 
                                className="hover:text-blue-300 transition duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className="hover:text-blue-300 transition duration-300"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link 
                                to="/about" 
                                className="hover:text-blue-300 transition duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/register" 
                                className="hover:text-blue-300 transition duration-300"
                            >
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/login" 
                                className="hover:text-blue-300 transition duration-300"
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
