import { useState, useEffect } from 'react';

function WeatherForecast({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const getWeather = async () => {
      if (!destination) return;

      setLoading(true);
      setError(null);

      try {
        if (!API_KEY) {
          throw new Error('OpenWeather API key is missing. Please check your .env file.');
        }

        console.log('Fetching weather for:', destination);
        
        // First get coordinates
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(destination)}&limit=1&appid=${API_KEY}`
        );
        
        if (!geoResponse.ok) {
          const errorData = await geoResponse.json();
          throw new Error(`Geocoding API error: ${errorData.message || geoResponse.status}`);
        }

        const geoData = await geoResponse.json();
        console.log('Geocoding response:', geoData);
        
        if (!geoData || geoData.length === 0) {
          throw new Error(`Location "${destination}" not found. Please try a more specific location (e.g., "London, UK")`);
        }

        const { lat, lon } = geoData[0];
        console.log('Coordinates found:', { lat, lon });

        // Then get weather
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        if (!weatherResponse.ok) {
          const errorData = await weatherResponse.json();
          throw new Error(`Weather API error: ${errorData.message || weatherResponse.status}`);
        }

        const weatherData = await weatherResponse.json();
        console.log('Weather data:', weatherData);
        setWeather(weatherData);
      } catch (err) {
        console.error('Weather API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [destination, API_KEY]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600">Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-xl">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error Loading Weather</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <div className="text-sm text-red-500">
          <p className="font-medium mb-2">Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use the format "City, Country" (e.g., "Paris, France")</li>
            <li>Make sure the city name is spelled correctly</li>
            <li>Try using the full country name (e.g., "United States" instead of "US")</li>
            <li>Check your internet connection</li>
          </ul>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Enter a destination to see the weather forecast</p>
      </div>
    );
  }

  // Get one forecast per day
  const dailyForecasts = weather.list.filter((_, index) => index % 8 === 0).slice(0, 5);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">5-Day Forecast for {destination}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast) => (
          <div key={forecast.dt} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-center">
              <p className="text-gray-600 font-medium">
                {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                {new Date(forecast.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              
              <img 
                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                alt={forecast.weather[0].description}
                className="mx-auto w-16 h-16"
              />
              
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {Math.round(forecast.main.temp)}°C
              </p>
              
              <p className="text-sm text-gray-600 capitalize">
                {forecast.weather[0].description}
              </p>
              
              <div className="flex justify-center space-x-4 mt-2 text-sm text-gray-500">
                <span>↓ {Math.round(forecast.main.temp_min)}°</span>
                <span>↑ {Math.round(forecast.main.temp_max)}°</span>
              </div>
              
              <div className="mt-3 text-sm text-gray-500">
                <p>Humidity: {forecast.main.humidity}%</p>
                <p>Wind: {Math.round(forecast.wind.speed * 3.6)} km/h</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherForecast; 