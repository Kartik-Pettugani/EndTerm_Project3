import { useState, useEffect } from 'react';
import { useTripContext } from '../context/TripContext';
import { useNavigate, useParams } from 'react-router-dom';
import TripDetails from '../components/TripDetails';

function MyTripsPage() {
  const { trips, deleteTrip } = useTripContext();
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    if (tripId) {
      const trip = trips.find(t => t.id === parseInt(tripId));
      if (trip) {
        setSelectedTrip(trip);
      } else {
        navigate('/trips');
      }
    }
  }, [tripId, trips, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDelete = (e, tripId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(tripId);
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(null);
        navigate('/trips');
      }
    }
  };

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    navigate(`/trips/${trip.id}`);
  };

  if (selectedTrip) {
    return (
      <TripDetails 
        trip={selectedTrip} 
        onDelete={(tripId) => {
          if (window.confirm('Are you sure you want to delete this trip?')) {
            deleteTrip(tripId);
            setSelectedTrip(null);
            navigate('/trips');
          }
        }} 
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700/20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">My Trips</h2>
          <button
            onClick={() => navigate('/plan')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Plan New Trip</span>
            <span>✈️</span>
          </button>
        </div>

        {trips.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧳</div>
            <h3 className="text-xl font-semibold text-white mb-2">No Trips Yet</h3>
            <p className="text-gray-300 mb-6">Start planning your next adventure!</p>
            <button
              onClick={() => navigate('/plan')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Plan Your First Trip
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => handleTripClick(trip)}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{trip.title}</h3>
                    <button
                      onClick={(e) => handleDelete(e, trip.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">📍</span>
                      <span>{trip.destination}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <span className="mr-2">📅</span>
                      <span>
                        {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                      </span>
                    </div>
                    
                    {trip.budget && (
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">💰</span>
                        <span>₹{trip.budget.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    
                    {trip.travelers && (
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">👥</span>
                        <span>{trip.travelers} travelers</span>
                      </div>
                    )}
                    
                    {trip.accommodation && (
                      <div className="flex items-center text-gray-300">
                        <span className="mr-2">🏨</span>
                        <span>{trip.accommodation}</span>
                      </div>
                    )}
                  </div>
                  
                  {trip.description && (
                    <p className="mt-4 text-gray-300 line-clamp-2">
                      {trip.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTripsPage;
  