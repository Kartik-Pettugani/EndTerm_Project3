import { useState, useEffect } from 'react';
import { useTripContext } from '../context/TripContext';
import { useNavigate } from 'react-router-dom';

function TripCountdown() {
  const { trips } = useTripContext();
  const navigate = useNavigate();
  const [upcomingTrip, setUpcomingTrip] = useState(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const now = new Date();
    const upcomingTrips = trips
      .filter(trip => new Date(trip.startDate) > now)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    if (upcomingTrips.length > 0) {
      setUpcomingTrip(upcomingTrips[0]);
    }
  }, [trips]);

  useEffect(() => {
    if (!upcomingTrip) return;

    const calculateCountdown = () => {
      const now = new Date();
      const tripDate = new Date(upcomingTrip.startDate);
      const diffTime = tripDate - now;
      
      if (diffTime <= 0) {
        setCountdown("Your trip has started!");
        return;
      }

      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (diffDays > 0) {
        setCountdown(`${diffDays} day${diffDays !== 1 ? 's' : ''}`);
      } else if (diffHours > 0) {
        setCountdown(`${diffHours} hour${diffHours !== 1 ? 's' : ''}`);
      } else {
        setCountdown("Less than an hour!");
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 60000); 

    return () => clearInterval(timer);
  }, [upcomingTrip]);

  const handleClick = () => {
    if (upcomingTrip) {
      navigate(`/trips/${upcomingTrip.id}`);
    }
  };

  if (!upcomingTrip) {
    return null;
  }

  return (
    <div 
      onClick={handleClick}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-1">Upcoming Trip</h3>
          <p className="text-lg">
            Your trip to <span className="font-bold">{upcomingTrip.destination}</span> starts in {countdown}
          </p>
        </div>
        <div className="text-4xl">✈️</div>
      </div>
      <div className="mt-4 text-sm opacity-90">
        <p>Start Date: {new Date(upcomingTrip.startDate).toLocaleDateString()}</p>
        <p>End Date: {new Date(upcomingTrip.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default TripCountdown; 
