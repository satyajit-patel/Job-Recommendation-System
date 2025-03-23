import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">MyApp</h1>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Register
            </button>
          </Link>
          <Link to="/">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Home
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
