import { useState } from 'react';
import { useTripContext } from '../context/TripContext';
import { useNavigate } from 'react-router-dom';
import WeatherForecast from '../components/WeatherForecast';
import BudgetPlanner from '../components/BudgetPlanner';
import TripTimeline from '../components/TripTimeline';

function PlanTripPage() {
  const navigate = useNavigate();
  const { addTrip } = useTripContext();
  const [tripData, setTripData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
    budget: '',
    travelers: '',
    accommodation: '',
  });
  const [activeTab, setActiveTab] = useState('details');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTrip({
      ...tripData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    });
    navigate('/trips');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-white mb-6">Plan Your Trip</h2>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'details'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
              }`}
            >
              Trip Details
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'weather'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
              }`}
            >
              Weather
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'budget'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
              }`}
            >
              Budget Planner
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'timeline'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-blue-400'
              }`}
            >
              Trip Timeline
            </button>
          </div>

          {activeTab === 'details' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Trip Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={tripData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={tripData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="e.g., Paris, France"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={tripData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={tripData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Budget (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-400">₹</span>
                    <input
                      type="number"
                      name="budget"
                      value={tripData.budget}
                      onChange={handleChange}
                      className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    name="travelers"
                    value={tripData.travelers}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Accommodation Type
                  </label>
                  <select
                    name="accommodation"
                    value={tripData.accommodation}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select accommodation type</option>
                    <option value="hotel">Hotel</option>
                    <option value="apartment">Apartment</option>
                    <option value="hostel">Hostel</option>
                    <option value="resort">Resort</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Trip Description
                  </label>
                  <textarea
                    name="description"
                    value={tripData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows="4"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  Create Trip
                </button>
              </div>
            </form>
          )}

          {activeTab === 'weather' && (
            <div className="mt-6">
              {tripData.destination ? (
                <WeatherForecast destination={tripData.destination} />
              ) : (
                <div className="text-center py-12 bg-gray-700 rounded-lg">
                  <p className="text-gray-300">Enter a destination to see the weather forecast</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'budget' && (
            <BudgetPlanner />
          )}

          {activeTab === 'timeline' && (
            <TripTimeline startDate={tripData.startDate} endDate={tripData.endDate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PlanTripPage;
