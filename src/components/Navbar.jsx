import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-3xl">✈️</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Travel Planner
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {['/plan', '/explore', '/trips'].map(path => (
                <Link 
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    pathname === path 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-blue-400'
                  }`}
                >
                  {path === '/plan' ? 'Plan Trip' : path === '/explore' ? 'Explore' : 'My Trips'}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
