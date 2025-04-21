import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WeatherForecast from './WeatherForecast';
import BudgetPlanner from './BudgetPlanner';
import TripTimeline from './TripTimeline';

function TripDetails({ trip, onDelete }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBack = () => {
    navigate('/trips');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{trip.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleBack}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Back to Trips
              </button>
              <button
                onClick={() => onDelete(trip.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
              >
                Delete Trip
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'details'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600'
              }`}
            >
              Trip Details
            </button>
            <button
              onClick={() => setActiveTab('weather')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'weather'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600'
              }`}
            >
              Weather
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'budget'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600'
              }`}
            >
              Budget Planner
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeTab === 'timeline'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600'
              }`}
            >
              Trip Timeline
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Destination</h3>
                  <p className="text-gray-600 dark:text-gray-300">{trip.destination}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Accommodation</h3>
                  <p className="text-gray-600 dark:text-gray-300">{trip.accommodation || 'Not specified'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Budget</h3>
                  <p className="text-gray-600 dark:text-gray-300">₹{trip.budget?.toLocaleString('en-IN') || '0'}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Travelers</h3>
                  <p className="text-gray-600 dark:text-gray-300">{trip.travelers || 'Not specified'}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Description</h3>
                  <p className="text-gray-600 dark:text-gray-300">{trip.description || 'No description provided'}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'weather' && (
            <div className="mt-6">
              {trip.destination ? (
                <WeatherForecast destination={trip.destination} />
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-500 dark:text-gray-300">No destination specified</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'budget' && (
            <BudgetPlanner />
          )}

          {activeTab === 'timeline' && (
            <TripTimeline startDate={trip.startDate} endDate={trip.endDate} />
          )}
        </div>
      </div>
    </div>
  );
}

export default TripDetails; 