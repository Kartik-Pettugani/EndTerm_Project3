import { createContext, useState, useContext, useEffect } from 'react';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem('trips');
    return savedTrips ? JSON.parse(savedTrips) : [];
  });

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('trips', JSON.stringify(trips));
  }, [trips]);

  const addTrip = (trip) => {
    setTrips(prevTrips => [...prevTrips, {
      ...trip,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }]);
  };

  const deleteTrip = (tripId) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
