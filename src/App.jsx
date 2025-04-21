import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import PlanTripPage from './pages/PlanTripPage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import MyTripsPage from './pages/MyTripsPage.jsx';
import Navbar from './components/Navbar.jsx';
import { TripProvider } from './context/TripContext.jsx';

function App() {
  return (
    <TripProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plan" element={<PlanTripPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/trips" element={<MyTripsPage />} />
            <Route path="/trips/:tripId" element={<MyTripsPage />} />
          </Routes>
        </div>
      </div>
    </TripProvider>
  );
}

export default App;