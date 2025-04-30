import { Link } from 'react-router-dom';
import TripCountdown from '../components/TripCountdown';

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {}
        <div className="mb-16">
          <TripCountdown />
        </div>

        {}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Plan Your Perfect Trip
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing destinations, plan your itinerary, and create unforgettable memories with our travel planning tools.
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link 
            to="/plan" 
            className="group p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
              ✈️
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Plan Your Trip</h3>
            <p className="text-gray-300">
              Create detailed itineraries and organize your travel plans.
            </p>
          </Link>

          <Link 
            to="/explore" 
            className="group p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4 text-indigo-400 group-hover:text-indigo-300 transition-colors">
              🌍
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Explore Destinations</h3>
            <p className="text-gray-300">
              Discover new places and get inspired for your next adventure.
            </p>
          </Link>

          <Link 
            to="/trips" 
            className="group p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-4 text-purple-400 group-hover:text-purple-300 transition-colors">
              📅
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Manage Trips</h3>
            <p className="text-gray-300">
              Keep track of all your past and upcoming trips in one place.
            </p>
          </Link>
        </div>

        {}
        <div className="bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">
            Why Choose Our Travel Planner?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4 text-blue-400">📝</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Itinerary Planning</h3>
              <p className="text-gray-300">
                Create detailed day-by-day plans with our intuitive interface.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-indigo-400">🌎</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Global Destinations</h3>
              <p className="text-gray-300">
                Access information about thousands of destinations worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4 text-purple-400">📱</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Mobile Friendly</h3>
              <p className="text-gray-300">
                Plan and manage your trips on any device, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
