import { useState, useEffect } from 'react';

function ExplorePage() {
  const [search, setSearch] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  const API_KEY = import.meta.env.VITE_FOURSQUARE_API_KEY;

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please enable location services.');
        }
      );
    }
  }, []);

  const searchPlaces = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const ll = location ? `${location.lat},${location.lng}` : '40.7128,-74.0060'; // Default to NYC if no location
      const response = await fetch(
        `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(search)}&ll=${ll}&limit=10`,
        {
          headers: {
            'Authorization': API_KEY,
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }

      const data = await response.json();
      setPlaces(data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
      setError('Failed to fetch places. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-700/20">
        <h2 className="text-3xl font-bold text-white mb-6">Explore Places</h2>
        
        <form onSubmit={searchPlaces} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for places, restaurants, attractions..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <span>Searching...</span>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <span>Search</span>
                  <span>🔍</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 text-red-300 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <div 
                key={place.fsq_id} 
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {place.photos && place.photos[0] ? (
                  <div className="aspect-w-16 aspect-h-9 bg-gray-700">
                    <img 
                      src={`${place.photos[0].prefix}300x300${place.photos[0].suffix}`}
                      alt={place.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="aspect-w-16 aspect-h-9 bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">🏛️</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{place.name}</h3>
                  <p className="text-gray-300 mb-2">
                    {place.categories?.map(cat => cat.name).join(', ')}
                  </p>
                  {place.location?.address && (
                    <p className="text-gray-400 text-sm">
                      📍 {place.location.address}
                    </p>
                  )}
                  {place.distance && (
                    <p className="text-gray-400 text-sm mt-2">
                      🚶‍♂️ {(place.distance / 1000).toFixed(1)} km away
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <p className="text-gray-300">
              Search for places to discover amazing locations around you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
  